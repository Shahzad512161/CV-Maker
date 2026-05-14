import { ResumeContent, EducationItem, ExperienceItem, SkillItem } from '@/types/resume';
import mammoth from 'mammoth';
import { createWorker } from 'tesseract.js';
import { GeminiService } from '@/lib/gemini';

// Worker source will be set dynamically

interface TextItem {
    // ...
    str: string;
    x: number;
    y: number; // PDF usually Bottom-Left origin, but we'll normalize or just sort DESC
    w: number;
    h: number; // Font size / height
    hasEOL: boolean;
}

/**
 * Visual Block-Based Parser with AI Intelligence Layer
 * Analyzes PDF based on layout (Font Size, Coordinates) and enhances with Gemini AI.
 */
export class ResumeParser {
    private static sanitizeText(text: string): string {
        if (!text) return '';
        return text
            .replace(/[•·\u2022\u2023\u2043\u2219]/g, '') // Remove bullet points
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();
    }

    /**
     * Strictly maps any partial data to the ResumeContent schema.
     * Ensures all fields exist and have correct default types.
     * Filters out empty sections.
     */
    static mapParsedDataToSchema(data: any): ResumeContent {
        const generateId = () => Math.random().toString(36).substr(2, 9);
        console.log("[ResumeParser] Mapping data to schema...", {
            hasPersonal: !!data?.personalDetails,
            sectionsCount: data?.sections?.length
        });

        const defaultPersonal: any = {
            fullName: '',
            jobTitle: '',
            email: '',
            phone: '',
            location: '',
            socials: [],
            photo: ''
        };

        const cleanDetails = {
            ...defaultPersonal,
            ...(data?.personalDetails || {})
        };

        // Ensure socials is always an array and have IDs
        if (!Array.isArray(cleanDetails.socials)) {
            cleanDetails.socials = [];
        } else {
            cleanDetails.socials = cleanDetails.socials.map((s: any) => ({
                id: s.id || generateId(),
                label: s.label || '',
                value: s.value || ''
            }));
        }

        const rawSections: any[] = Array.isArray(data?.sections) ? data.sections : [];

        // STRICT FILTERING: Only include sections with actual content
        const filteredSections = rawSections.filter(section => {
            if (!section.content) {
                console.log(`[ResumeParser] Filtering out section ${section.type || 'unknown'} - no content`);
                return false;
            }

            const type = (section.type || '').toLowerCase();
            if (type === 'profile' || type === 'summary' || type === 'about me') {
                const hasText = (typeof section.content === 'string' && section.content.trim().length > 0);
                return hasText;
            }

            if (Array.isArray(section.content)) {
                return section.content.length > 0;
            }

            if (typeof section.content === 'string' && section.content.trim().length > 0) {
                return true;
            }

            return false;
        });

        // Final structure validation and normalization
        return {
            personalDetails: cleanDetails,
            sections: filteredSections.map(section => {
                const rawType = section.type || 'Custom';
                const formattedType = rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase() as any;

                let content = section.content;

                // NORMALIZATION LAYER
                const needsArray = ['Education', 'Experience', 'Skills', 'Languages', 'Projects', 'Certificates', 'Interests', 'Awards', 'Publications', 'References', 'Custom', 'Courses', 'Organisations'].includes(formattedType);

                if (needsArray) {
                    if (typeof content === 'string') {
                        // If it's a string, use our internal helper parsers
                        const lines = content.split('\n').filter(l => l.trim().length > 0);
                        if (formattedType === 'Education') content = this.parseEducationItems(lines);
                        else if (formattedType === 'Experience') content = this.parseExperienceItems(lines);
                        else if (formattedType === 'Skills') content = this.parseSkills(lines);
                        else if (formattedType === 'Languages') content = this.parseLanguages(lines);
                        else content = this.parseGeneralItems(lines, formattedType.toLowerCase());
                    } else if (Array.isArray(content)) {
                        // Ensure every item in the array has an ID and required fields for its type
                        content = content.map((item: any) => {
                            if (typeof item === 'string') {
                                // Convert string item to object if needed
                                if (formattedType === 'Skills') return { id: generateId(), skill: item, level: 'Expert', information: '' };
                                if (formattedType === 'Languages') return { id: generateId(), language: item, level: 'Professional' };
                                if (formattedType === 'Interests') return { id: generateId(), name: item };
                                return { id: generateId(), name: item, description: '' };
                            }
                            return { ...item, id: item.id || generateId() };
                        });
                    }
                } else if (formattedType === 'Profile') {
                    if (Array.isArray(content)) {
                        content = content.join('\n');
                    }
                }

                return {
                    id: section.id || generateId(),
                    type: (formattedType === 'Profile' ? 'Profile' : formattedType),
                    title: section.title || formattedType,
                    isVisible: typeof section.isVisible === 'boolean' ? section.isVisible : true,
                    content: content
                };
            })
        };
    }

    static async parse(file: File): Promise<ResumeContent> {
        console.log(`[ResumeParser] Starting parse for file: ${file.name} (${file.type})`);
        try {
            let textItems: TextItem[] = [];
            let rawTextForAI = '';
            let images: string[] = [];

            if (file.type === 'application/pdf') {
                // 1. Convert PDF to Images (Vision Mode)
                console.log("[ResumeParser] Converting PDF to images for Vision flow...");
                images = await this.pdfToImages(file);

                // 2. Also extract text for reference fallback
                textItems = await this.extractPdfItems(file);
                rawTextForAI = textItems.map(i => i.str).join(' ');

                if (textItems.length < 5 || (rawTextForAI.length < 100)) {
                    console.log("[ResumeParser] Content looks like an image or is very sparse. Running OCR...");
                    rawTextForAI = await this.performOCR(file);
                }
            } else {
                throw new Error('Unsupported format. Please upload a PDF file.');
            }

            // --- AI INTELLIGENCE LAYER (VISION + LLM) ---
            console.log("[ResumeParser] Attempting Vision-powered extraction...");
            const aiResult = await GeminiService.parseResumeWithAI(rawTextForAI, images);

            if (aiResult) {
                console.log("[ResumeParser] AI Extraction successful. Mapping to schema...");
                return this.mapParsedDataToSchema(aiResult);
            }

            // --- FALLBACK TO RULE-BASED PARSER ---
            console.warn("[ResumeParser] AI Extraction failed or skipped. Falling back to rule-based parser.");
            if (file.type === 'application/pdf' && textItems.length > 0) {
                return this.mapParsedDataToSchema(this.parseFromVisualBlocks(textItems));
            } else {
                return this.mapParsedDataToSchema(this.mapSimpleTextToResume(rawTextForAI));
            }

        } catch (error: any) {
            console.error("[ResumeParser] CRITICAL ERROR during parsing:", error);
            throw new Error(`Import failed: ${error.message || 'Unknown error'}. Please try a different PDF or copy-paste your content manually.`);
        }
    }

    private static async pdfToImages(file: File): Promise<string[]> {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.449/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const images: string[] = [];

        // Limit to first 3 pages to avoid payload issues with Gemini API
        const MaxPages = Math.min(pdf.numPages, 3);

        for (let i = 1; i <= MaxPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 }); // High scale for better OCR by Gemini

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) continue;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport, canvas: canvas }).promise;
            images.push(canvas.toDataURL('image/jpeg', 0.8));
        }

        return images;
    }

    // --- PDF Extraction (Visual) ---

    private static async extractPdfItems(file: File): Promise<TextItem[]> {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.449/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let allItems: TextItem[] = [];

        // We focus primarily on the first page for Personal Details
        // But extract all for content.
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            const pageItems = textContent.items.map((item: any) => {
                if (!('str' in item)) return null;
                // Transform [scaleX, skewY, skewX, scaleY, x, y]
                // item.height might vary, use transform[3] (scaleY) as proxy for Font Size
                const fontSize = Math.abs(item.transform[3]);

                return {
                    str: item.str,
                    x: item.transform[4] as number,
                    y: item.transform[5] as number,
                    w: item.width as number,
                    h: fontSize,
                    hasEOL: item.hasEOL
                };
            }).filter((item): item is TextItem => item !== null);

            // Add simple Page Breaker for logic if needed (optional)
            allItems = allItems.concat(pageItems);
        }
        return allItems;
    }


    private static async performOCR(file: File): Promise<string> {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.449/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        const worker = await createWorker('eng');

        for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better OCR
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) continue;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport: viewport } as any).promise;
            const { data: { text } } = await worker.recognize(canvas);
            fullText += text + '\n\n';
        }
        await worker.terminate();
        return fullText;
    }

    // --- Visual Parsing Logic ---

    private static parseFromVisualBlocks(items: TextItem[]): ResumeContent {
        console.log(`[ResumeParser] Starting Visual Reconstruction with ${items.length} items`);

        if (items.length === 0) {
            return { personalDetails: { fullName: '', jobTitle: '', email: '', phone: '', location: '', socials: [] }, sections: [] };
        }

        // 1. Initial Cleanup & Style Profiling
        const cleanItems = this.mergeAdjacentItems(items);
        const styleProfile = this.analyzeStyleDistribution(cleanItems);

        // 2. Identify and Isolate the Personal Header Box
        const { details, headerBox } = this.reconstructPersonalDetailsWithExclusion(cleanItems, styleProfile);
        console.log(`[ResumeParser] Name detected: "${details.fullName}". Header Box Y: ${headerBox.minY} to ${headerBox.maxY}`);

        // 3. Spatially group text into logical sections (EXCLUDING text already in the header box)
        const remainingItems = cleanItems.filter(i => i.y < headerBox.minY - 5);
        const blocks = this.clusterByLogicalFlow(remainingItems, styleProfile);

        // 4. Final Semantic Mapping
        const sectionsContent = this.segmentTextByLogicalHeaders(blocks, styleProfile);

        return this.mapSectionsToResume(sectionsContent, details);
    }

    private static reconstructPersonalDetailsWithExclusion(items: TextItem[], profile: any) {
        const sorted = [...items].sort((a, b) => b.y - a.y); // Page Top to Bottom

        // Establish the "Personal Header Box": All text in the top area until the first large gap or first header
        const maxY = Math.max(...items.map(i => i.y));
        const pageHeight = maxY || 842;

        // Pick the absolute highest visual peak for the Name
        const nameCandidates = sorted.filter(i =>
            i.y > maxY * 0.7 &&
            i.str.trim().length > 2 &&
            !this.isContactInfo(i.str) &&
            !/\d/.test(i.str) &&
            i.str.split(' ').length <= 6
        ).sort((a, b) => (b.h * b.str.length) - (a.h * a.str.length)); // Bias towards larger font AND length

        const topPeak = nameCandidates[0] || sorted[0];
        const fullName = this.sanitizeText(topPeak.str);

        // Identify possible Job Title (text immediately below or near name with slightly smaller font)
        const jobTitleCandidates = items.filter(i =>
            Math.abs(i.y - topPeak.y) < 50 &&
            i !== topPeak &&
            i.h < topPeak.h && i.h > 10 &&
            !this.isContactInfo(i.str)
        ).sort((a, b) => b.y - a.y);

        const extractedJobTitle = jobTitleCandidates[0]?.str || '';

        // Calculate the boundary by finding all contact info or adjacent text NEAR the top
        const headerItems = items.filter(i => {
            const isNearPeak = Math.abs(i.y - topPeak.y) < 250;
            const isContact = this.isContactInfo(i.str);
            const isTopArea = i.y > pageHeight * 0.65;
            return (isContact && isNearPeak) || (isTopArea && isNearPeak) || i === topPeak;
        });

        let minY = topPeak.y - 30;
        if (headerItems.length > 0) {
            minY = Math.min(...headerItems.map(i => i.y));
        }

        const details = this.parsePersonalDetailsWithPrecomputedName(headerItems.map(i => i.str), fullName);
        if (!details.jobTitle) details.jobTitle = extractedJobTitle;

        return {
            details,
            headerBox: { minY, maxY }
        };
    }

    private static analyzeStyleDistribution(items: TextItem[]) {
        const sizes = items.map(i => i.h).sort((a, b) => a - b);
        const bodyFontSize = sizes[Math.floor(sizes.length * 0.5)] || 10; // Median
        const headerFontSize = Math.max(...sizes.filter(s => s < 40)) || bodyFontSize * 1.2;

        return { bodyFontSize, headerFontSize };
    }

    /**
     * Merges text fragments that are visually part of the same word or line.
     */
    private static mergeAdjacentItems(items: TextItem[]): TextItem[] {
        if (items.length === 0) return [];

        // Sort by Y desc (Top to Bottom), X asc (Left to Right)
        const sorted = [...items].sort((a, b) => {
            const yDiff = Math.abs(b.y - a.y);
            if (yDiff < 3) return a.x - b.x;
            return b.y - a.y;
        });

        const merged: TextItem[] = [];
        let current = { ...sorted[0] };

        for (let i = 1; i < sorted.length; i++) {
            const next = sorted[i];
            const yDiff = Math.abs(next.y - current.y);
            const xGap = next.x - (current.x + current.w);

            // Merge if on same line and gap is tiny (likely same word or adjacent text)
            if (yDiff < 3 && xGap < 5) {
                current.str += (xGap > 1 ? ' ' : '') + next.str;
                current.w = (next.x + next.w) - current.x;
                current.h = Math.max(current.h, next.h);
            } else {
                merged.push(current);
                current = { ...next };
            }
        }
        merged.push(current);
        return merged;
    }

    /**
     * Detects if the document has multiple columns.
     */
    private static detectColumns(items: TextItem[]): number[] {
        if (items.length < 10) return [0];

        // Find the "Valleys" in X-coordinates (gaps where almost no text starts)
        const minX = Math.min(...items.map(i => i.x));
        const maxX = Math.max(...items.map(i => i.x + i.w));
        const width = maxX - minX;
        if (width < 200) return [minX];

        const resolution = 10;
        const histogram = new Array(Math.ceil(width / resolution)).fill(0);

        items.forEach(item => {
            const startIdx = Math.floor((item.x - minX) / resolution);
            const endIdx = Math.floor((item.x + item.w - minX) / resolution);
            for (let i = startIdx; i <= endIdx && i < histogram.length; i++) {
                histogram[i]++;
            }
        });

        const columns = [minX];
        let inGap = false;
        // More sensitive threshold: ignore bins with very few starts
        const gapThreshold = 0;

        for (let i = 0; i < histogram.length; i++) {
            if (histogram[i] <= gapThreshold) {
                inGap = true;
            } else if (inGap) {
                const minGapWidth = 3; // bins (30 pts)
                let gapCount = 0;
                for (let j = i - 1; j >= 0 && histogram[j] <= gapThreshold; j--) gapCount++;

                if (gapCount >= minGapWidth) {
                    columns.push(minX + (i * resolution));
                }
                inGap = false;
            }
        }

        return columns;
    }

    /**
     * Groups items into logical blocks of text while respecting column boundaries.
     */
    private static clusterByLogicalFlow(items: TextItem[], profile: any) {
        const blocks: { column: number, y: number, text: string, isHeader: boolean }[] = [];
        const columns = this.detectColumns(items); // Ensure columns are detected

        // Sort items primarily by Y (top to bottom), then by X (left to right)
        const sortedItems = [...items].sort((a, b) => {
            if (Math.abs(a.y - b.y) < 5) { // Treat items on roughly the same line
                return a.x - b.x;
            }
            return b.y - a.y; // Higher Y means closer to top of page (PDF coordinates)
        });

        // Group items by their assigned column
        const itemsByColumn: { [colX: number]: TextItem[] } = {};
        columns.forEach(colX => itemsByColumn[colX] = []);

        sortedItems.forEach(item => {
            // Assign item to the closest column
            const closestCol = columns.reduce((prev, curr) =>
                (Math.abs(item.x - curr) < Math.abs(item.x - prev) ? curr : prev)
            );
            itemsByColumn[closestCol].push(item);
        });

        const minX = Math.min(...items.map(i => i.x));
        const maxX = Math.max(...items.map(i => i.x + i.w));
        const totalWidth = maxX - minX;

        for (const colX of columns) {
            const colItems = itemsByColumn[colX];
            if (colItems.length === 0) continue;

            // Estimated col width for sanity checks
            const estimatedColWidth = totalWidth / columns.length;

            // Process items within each column
            colItems.sort((a, b) => b.y - a.y);

            let currentBlockText = colItems[0].str;
            let currentBlockY = colItems[0].y;
            let currentBlockH = colItems[0].h;

            for (let i = 1; i < colItems.length; i++) {
                const item = colItems[i];
                const yGap = Math.abs(currentBlockY - item.y); // Vertical distance between current block's last item and new item
                const isStylisticallyDifferent = Math.abs(currentBlockH - item.h) > 2; // Significant font size change

                // Merge if items are close vertically and stylistically similar
                // Use a dynamic threshold for yGap based on font size
                if (yGap < Math.max(item.h * 1.8, 12) && !isStylisticallyDifferent) {
                    // If the gap is very small, it's likely part of the same line or word
                    currentBlockText += (yGap < 4 ? ' ' : '\n') + item.str;
                } else {
                    // Otherwise, start a new block
                    blocks.push({
                        column: colX,
                        y: currentBlockY,
                        text: this.sanitizeText(currentBlockText),
                        isHeader: currentBlockH >= profile.headerFontSize * 0.8
                    });
                    currentBlockText = item.str;
                    currentBlockH = item.h;
                }
                currentBlockY = item.y;
            }
            // Push the last accumulated block
            blocks.push({
                column: colX,
                y: currentBlockY,
                text: this.sanitizeText(currentBlockText),
                isHeader: currentBlockH >= profile.headerFontSize * 0.8
            });
        }

        // Sort all blocks by column, then by Y (top to bottom)
        return blocks.sort((a, b) => {
            if (a.column !== b.column) {
                return a.column - b.column;
            }
            return b.y - a.y;
        });
    }

    private static parsePersonalDetailsWithPrecomputedName(lines: string[], precomputedName: string) {
        let fullName = precomputedName;
        let jobTitle = '';
        let email = '';
        let phone = '';
        let socials: any[] = [];
        let location = '';

        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi;
        const phoneRegex = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
        const urlRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)(?:\/[^\s]*)?/gi;

        const fullText = lines.join(' ');

        // Extract Email
        const emailMatch = fullText.match(emailRegex);
        if (emailMatch) email = emailMatch[0];

        // Extract Phone (Broadened regex)
        const phoneMatch = fullText.match(phoneRegex);
        if (phoneMatch) phone = phoneMatch.find(p => p.replace(/\D/g, '').length >= 10) || '';

        // Extract URLs
        let match;
        while ((match = urlRegex.exec(fullText)) !== null) {
            const url = match[0].replace(/[.,]$/, '');
            const id = Math.random().toString(36).substr(2, 9);
            if (url.includes('linkedin.com')) socials.push({ id, label: 'LinkedIn', value: url });
            else if (url.includes('github.com')) socials.push({ id, label: 'GitHub', value: url });
            else if (url.includes('twitter.com')) socials.push({ id, label: 'Twitter', value: url });
            else if (url.includes('facebook.com')) socials.push({ id, label: 'Facebook', value: url });
            else if (!url.includes('@')) socials.push({ id, label: 'Website', value: url });
        }

        // Job Title & Location - Search top 25% of lines
        const topLines = lines.slice(0, Math.max(10, Math.floor(lines.length * 0.25)));
        for (const line of topLines) {
            const cleanLine = line.trim();
            if (fullName && cleanLine.toLowerCase().includes(fullName.toLowerCase())) continue;
            if (this.isContactInfo(cleanLine)) continue;

            if (!jobTitle && /(engineer|developer|manager|specialist|consultant|designer|lead|analyst|worker|student|intern|expert|architect|officer|director|coordinator)/i.test(cleanLine) && cleanLine.length < 60) {
                jobTitle = cleanLine;
            } else if (!location && /(pakistan|india|usa|uk|uae|canada|australia|germany|france|london|dubai|tokyo|new york|california|texas|florida|berlin|paris|toronto|street|ave|road|city|state|zip)/i.test(cleanLine) && cleanLine.length < 50) {
                location = cleanLine;
            }
        }

        return {
            fullName: fullName || '',
            jobTitle: jobTitle || '',
            email: email || '',
            phone: phone || '',
            location: location || '',
            socials,
            photo: undefined
        };
    }

    private static isContactInfo(str: string): boolean {
        return str.includes('@') || str.includes('http') || /\d{8,}/.test(str);
    }



    // --- Standard Heuristics (Reused) ---

    private static segmentTextByLogicalHeaders(blocks: any[], profile: any) {
        const detectedSections: { type: string, title: string, lines: string[] }[] = [];
        let currentSection: { type: string, title: string, lines: string[] } = { type: 'profile', title: 'Profile', lines: [] };
        let hasContent = false;

        const headerKeywords: Record<string, string[]> = {
            profile: ['profile', 'summary', 'about me', 'objective', 'personal profile', 'professional summary', 'career goal', 'statement', 'background', 'intro', 'biography', 'professional background', 'executive summary', 'abstract', 'professional profile', 'profile summary'],
            education: ['education', 'academic', 'qualifications', 'degree', 'study', 'schooling', 'training', 'professional development', 'courses', 'college', 'university', 'educational background', 'academic history', 'academies', 'academic background', 'educational qualifications', 'education & certifications'],
            experience: ['experience', 'work', 'employment', 'history', 'career', 'professional background', 'work experience', 'occupational', 'internship', 'professional history', 'employment history', 'work history', 'professional experience', 'background', 'professional work', 'experience summary'],
            skills: ['skills', 'competencies', 'technologies', 'technical skills', 'stack', 'expertise', 'tools', 'languages', 'proficiencies', 'abilities', 'strengths', 'core competencies', 'key skills', 'areas of expertise', 'skill set', 'hard skills', 'soft skills'],
            certificates: ['certificates', 'certifications', 'licenses', 'courses', 'awards', 'honors', 'accomplishments', 'recognition', 'credentials', 'attainments', 'achievements', 'certifications & licenses'],
            projects: ['projects', 'personal projects', 'portfolio', 'key projects', 'assignments', 'case studies', 'relevant projects', 'selected projects', 'technical projects', 'key achievements'],
            languages: ['languages', 'linguistic', 'tongue', 'communication', 'multilingual', 'verbal proficiencies', 'language proficiency'],
            interests: ['interests', 'hobbies', 'activities', 'passions', 'volunteering', 'extracurricular', 'interests & hobbies', 'leisure'],
            awards: ['awards', 'honors', 'accomplishments', 'recognition', 'credentials', 'attainments', 'achievements', 'prizes'],
            references: ['references', 'referees', 'testimonials', 'recommendations', 'availability'],
            custom: ['publications', 'research', 'papers', 'journals', 'patents', 'affiliations', 'memberships', 'additional information', 'miscellaneous', 'other info']
        };

        for (const block of blocks) {
            const lines = block.text.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const rawLine = lines[i].trim();
                if (!rawLine || rawLine.length < 2) continue;

                // CRITICAL: If this line is the candidate's name, SKIP IT.
                // This prevents duplication since name is already in personalDetails.
                if (profile && rawLine.toLowerCase() === profile.fullName?.toLowerCase()) continue;

                const lower = rawLine.toLowerCase().replace(/[:\-\.]/g, '').trim();
                const words = lower.split(/\s+/);
                const isShort = words.length <= 4;

                // Improved Header Detection: Check for keywords
                let detectedType = '';
                let remainingContent = '';

                // Clean input for matching: remove colons, dashes etc but preserve them for content extraction
                const lowerForMatch = rawLine.toLowerCase().replace(/[:\-\.]/g, ' ').trim();

                for (const [type, keywords] of Object.entries(headerKeywords)) {
                    const hasKeyword = keywords.some(k => {
                        const words = lowerForMatch.split(/\s+/);
                        // Exact match or starts with keyword (e.g. "Skills" or "Skills:")
                        return lowerForMatch === k || (isShort && words[0] === k);
                    });

                    if (hasKeyword && (i === 0 || block.isHeader)) {
                        detectedType = type;
                        // Extract content after colon if present (e.g. "Skills: React, Node")
                        const colonIndex = rawLine.indexOf(':');
                        if (colonIndex !== -1 && colonIndex < 35) {
                            remainingContent = rawLine.slice(colonIndex + 1).trim();
                        }
                        break;
                    }
                }

                // If not a known keyword header, but visually looks like a header (Large font, Short text)
                if (!detectedType && block.isHeader && isShort && rawLine.length < 50 && !/\d/.test(rawLine)) {
                    detectedType = 'custom';
                }

                if (detectedType) {
                    if (hasContent) {
                        detectedSections.push(currentSection);
                    }
                    currentSection = { type: detectedType, title: rawLine.split(':')[0].trim(), lines: [] };
                    if (remainingContent) {
                        currentSection.lines.push(remainingContent);
                        hasContent = true;
                    } else {
                        hasContent = false;
                    }
                    console.log(`[ResumeParser] SECTION DETECTED: ${detectedType} ("${rawLine}")`);
                    continue;
                }

                currentSection.lines.push(rawLine);
                hasContent = true;
            }
        }
        if (hasContent) {
            detectedSections.push(currentSection);
        }

        return detectedSections;
    }

    private static mapSectionsToResume(sections: { type: string, title: string, lines: string[] }[], personalDetails: any): ResumeContent {
        const genId = () => Math.random().toString(36).substr(2, 9);
        const finalSections = [];

        console.log("[ResumeParser] Mapping sections to resume structure...");

        for (const section of sections) {
            if (section.lines.length === 0 && section.type !== 'profile') continue;

            const type = section.type.charAt(0).toUpperCase() + section.type.slice(1) as any;
            let content: any = section.lines.join('\n');

            if (section.type === 'education') {
                content = this.parseEducationItems(section.lines);
            } else if (section.type === 'experience') {
                content = this.parseExperienceItems(section.lines);
            } else if (section.type === 'skills') {
                content = this.parseSkills(section.lines);
            } else if (section.type === 'languages') {
                content = this.parseLanguages(section.lines);
            } else if (['certificates', 'projects', 'interests', 'references', 'awards'].includes(section.type)) {
                content = this.parseGeneralItems(section.lines, section.type === 'certificates' ? 'certificate' : (section.type === 'projects' ? 'project' : (section.type === 'awards' ? 'award' : 'name')));
            } else if (section.type === 'custom') {
                content = section.lines.map(l => ({ id: genId(), title: 'Detail', description: l, isVisible: true }));
            }

            finalSections.push({
                id: genId(),
                type: (type === 'Profile' ? 'Profile' : type) as any,
                title: section.title,
                content,
                isVisible: true
            });
        }

        console.log(`[ResumeParser] Final count of sectors: ${finalSections.length}`);

        return {
            personalDetails,
            sections: finalSections as any
        };
    }

    private static parseEducationItems(lines: string[]): EducationItem[] {
        const items: EducationItem[] = [];
        let currentItem: Partial<EducationItem> | null = null;

        for (const line of lines) {
            const isInstitution = /(university|college|school|institute|academy|technique|polytechnic|learning|faculty|department|campus|secondary|high school|varsity|vocational|training center|bootcamp)/i.test(line);
            const hasDates = this.containsDate(line);
            const isDegree = /(bachelor|master|phd|degree|diploma|graduate|certificate|associate|minor|major|m\.s|b\.s|m\.a|b\.a)/i.test(line);

            if (isInstitution && line.length < 120) {
                // If we found a NEW institution and already have one with some content, flush it.
                if (currentItem && currentItem.school && (currentItem.degree || currentItem.description)) {
                    items.push(currentItem as EducationItem);
                    currentItem = null;
                }

                if (currentItem) {
                    currentItem.school = line;
                } else {
                    currentItem = { id: Math.random().toString(), school: line, degree: '', startDate: '', endDate: '', location: '', description: '' };
                }
                continue;
            }

            if (hasDates) {
                if (!currentItem) currentItem = { id: Math.random().toString(), school: '', degree: '', startDate: '', endDate: '', location: '', description: '' };
                const dates = this.extractDates(line);
                currentItem.startDate = dates.start || currentItem.startDate;
                currentItem.endDate = dates.end || currentItem.endDate;
                const locMatch = line.replace(/(?:19|20)\d{2}|present|current|[\-\|]/gi, '').trim();
                if (locMatch.length > 3 && !currentItem.location) currentItem.location = locMatch;
            } else if (isDegree) {
                if (!currentItem) currentItem = { id: Math.random().toString(), school: '', degree: '', startDate: '', endDate: '', location: '', description: '' };
                currentItem.degree = line;
            } else if (currentItem) {
                if (!currentItem.school && line.length < 100) {
                    currentItem.school = line;
                } else if (!currentItem.location && line.length < 50 && !/\d/.test(line)) {
                    currentItem.location = line;
                } else {
                    currentItem.description += (currentItem.description ? '\n' : '') + line;
                }
            }
        }
        if (currentItem && (currentItem.school || currentItem.degree)) items.push(currentItem as EducationItem);
        return items;
    }

    private static parseExperienceItems(lines: string[]): ExperienceItem[] {
        const items: ExperienceItem[] = [];
        let currentItem: Partial<ExperienceItem> | null = null;

        for (const line of lines) {
            const isJobTitle = /(engineer|developer|manager|consultant|analyst|coordinator|director|specialist|lead|designer|intern|associate|worker|clerk|representative|executive|supervisor|administrator|officer|technician|assistant|trainee|founder|owner|partner|principal|head|chef|driver|sales|clerk|operator|accountant)/i.test(line) && line.length < 100;
            const hasDates = this.containsDate(line);

            if (isJobTitle && !hasDates) {
                if (currentItem && currentItem.jobTitle && (currentItem.employer || currentItem.description)) {
                    items.push(currentItem as ExperienceItem);
                    currentItem = null;
                }

                if (currentItem) {
                    currentItem.jobTitle = line;
                } else {
                    currentItem = { id: Math.random().toString(), jobTitle: line, employer: '', startDate: '', endDate: '', location: '', description: '' };
                }
                continue;
            }

            if (hasDates) {
                if (!currentItem) currentItem = { id: Math.random().toString(), jobTitle: '', employer: '', startDate: '', endDate: '', location: '', description: '' };
                const dates = this.extractDates(line);
                currentItem.startDate = dates.start || currentItem.startDate;
                currentItem.endDate = dates.end || currentItem.endDate;
                const locMatch = line.replace(/(?:19|20)\d{2}|present|current|[\-\|]/gi, '').trim();
                if (locMatch.length > 3 && !currentItem.location) currentItem.location = locMatch;
            } else if (currentItem) {
                if (!currentItem.employer && line.length < 100) {
                    currentItem.employer = line;
                } else if (!currentItem.jobTitle && line.length < 100) {
                    currentItem.jobTitle = line;
                } else {
                    currentItem.description += (currentItem.description ? '\n' : '') + line;
                }
            } else if (line.length > 10) {
                currentItem = { id: Math.random().toString(), jobTitle: '', employer: line, startDate: '', endDate: '', location: '', description: '' };
            }
        }
        if (currentItem && (currentItem.jobTitle || currentItem.employer)) items.push(currentItem as ExperienceItem);
        return items;
    }

    private static parseGeneralItems(lines: string[], mainField: string): any[] {
        const items: any[] = [];
        let currentItem: any = null;

        for (const line of lines) {
            const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
            if (!cleanLine) continue;

            if (cleanLine.length < 100 && !currentItem) {
                currentItem = { id: Math.random().toString(), [mainField]: cleanLine, description: '', date: '' };

                // Specific field mapping based on common schema requirements
                if (mainField === 'award') {
                    currentItem = { id: Math.random().toString(), award: cleanLine, issuer: '', date: '', description: '' };
                } else if (mainField === 'project') {
                    currentItem = { id: Math.random().toString(), title: cleanLine, startDate: '', endDate: '', description: '' };
                } else if (mainField === 'certificate') {
                    currentItem = { id: Math.random().toString(), title: cleanLine, issuer: '', date: '' };
                }
            } else if (currentItem) {
                if (this.containsDate(cleanLine)) {
                    currentItem.date = cleanLine;
                } else if (currentItem.hasOwnProperty('issuer') && !currentItem.issuer && cleanLine.length < 80) {
                    currentItem.issuer = cleanLine;
                } else {
                    currentItem.description = (currentItem.description || '') + (currentItem.description ? '\n' : '') + cleanLine;
                }
            }

            // Logic to flush current item if it looks complete or next one starts
            if (currentItem && (line.length === 0 || line.includes('\n\n'))) {
                items.push(currentItem);
                currentItem = null;
            }
        }
        if (currentItem) items.push(currentItem);
        return items;
    }

    private static parseLanguages(lines: string[]): any[] {
        const items: any[] = [];
        for (const line of lines) {
            const languages = line.split(/[,/•]|and/).map(s => s.trim()).filter(s => s.length > 1);
            for (const lang of languages) {
                const parts = lang.split(/[-:(]/);
                items.push({
                    id: Math.random().toString(),
                    language: parts[0].trim(),
                    level: parts[1]?.replace(/[)]/g, '').trim() || 'Professional'
                });
            }
        }
        return items.filter(l => l.language.length > 1 && l.language.length < 35);
    }

    private static parseSkills(lines: string[]): SkillItem[] {
        const text = lines.join(', ');
        // Split by common delimiters: comma, bullet, pipe, semicolon, or newline
        const raw = text.split(/[,•|;\n]|\s(?![\/\d])\/\s?/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 80);
        return raw.map(s => ({ id: Math.random().toString(), skill: s, information: '', level: 'Expert' }));
    }

    private static containsDate(str: string): boolean {
        return /(19|20)\d{2}/.test(str) || /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(str) || /present|current/i.test(str);
    }

    private static extractDates(str: string): { start: string, end: string } {
        const yearRegex = /(?:19|20)\d{2}/g;
        const yearMatch = str.match(yearRegex);
        const presentMatch = /present|current/i.test(str);

        let start = '';
        let end = '';

        if (yearMatch) {
            start = yearMatch[0];
            if (presentMatch) {
                end = 'Present';
            } else if (yearMatch.length > 1) {
                end = yearMatch[1];
            }
        }

        const lineLower = str.toLowerCase();
        const monthsInLine = lineLower.match(/(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/g);

        if (monthsInLine && monthsInLine.length > 0) {
            if (start && lineLower.indexOf(monthsInLine[0]) < lineLower.indexOf(start)) {
                start = `${monthsInLine[0].charAt(0).toUpperCase() + monthsInLine[0].slice(1)} ${start}`;
            }
            if (end && end !== 'Present' && monthsInLine.length > 1) {
                end = `${monthsInLine[1].charAt(0).toUpperCase() + monthsInLine[1].slice(1)} ${end}`;
            }
        }

        return { start, end };
    }

    private static mapSimpleTextToResume(text: string): ResumeContent {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length);

        // Find best candidate for Name (not just lines[0])
        let name = lines[0];
        for (let i = 0; i < Math.min(8, lines.length); i++) {
            const line = lines[i];
            const words = line.split(/\s+/);
            if (!this.isContactInfo(line) && words.length >= 2 && words.length <= 4 && !/\d/.test(line)) {
                name = line;
                break;
            }
        }

        const details = this.parsePersonalDetailsWithPrecomputedName(lines, name);

        // Wrap lines in dummy blocks for segmentTextByLogicalHeaders
        const dummyBlocks = lines.map(l => ({ text: l, isHeader: false }));
        const sections = this.segmentTextByLogicalHeaders(dummyBlocks, details);

        return this.mapSectionsToResume(sections, details);
    }
}
