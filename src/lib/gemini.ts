import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGeminiApiKey } from "./firebase";

// API key will be fetched from Firebase Remote Config
let API_KEY = "";
let genAI: GoogleGenerativeAI | null = null;

/**
 * Initialize the Gemini API with the key from Firebase Remote Config
 */
async function initializeGeminiAPI(): Promise<boolean> {
    if (genAI) {
        return true; // Already initialized
    }

    try {
        API_KEY = await getGeminiApiKey();

        if (!API_KEY) {
            console.warn("[GeminiService] API Key not available from Remote Config");
            return false;
        }

        genAI = new GoogleGenerativeAI(API_KEY);
        console.log("[GeminiService] Successfully initialized with Remote Config API key");
        return true;
    } catch (error) {
        console.error("[GeminiService] Failed to initialize:", error);
        return false;
    }
}

export class GeminiService {
    static async parseResumeWithAI(rawText?: string, images?: string[]): Promise<any> {
        // Initialize API if not already done
        const initialized = await initializeGeminiAPI();

        if (!initialized || !genAI || !API_KEY) {
            console.warn("[GeminiService] API Key missing, skipping AI enhancement.");
            return null;
        }

        const systemContext = `
            You are a World-Class Resume Parser Agent with Vision. 
            Transform the provided resume (text or images) into a perfectly structured JSON object.
            
            CORE RULES:
            1. SCANNING: If images are provided, use them to understand layout (sidebars, grouping).
            2. CLEANING: Fix typos/noise. Normalize text to natural English.
            3. STRICT OMISSION: DO NOT include sections that have NO content. DO NOT hallucinate. 
            4. TWO-COLUMN LAYOUTS: Resumes often have two columns. Ensure you capture content from BOTH columns (e.g., Work Experience on the right, Profile/Awards on the left).
            5. DATES: Normalize to "MMM YYYY".
        `;

        const promptMessage = `
            PARSE THIS RESUME INTO JSON. 
            
            STRICT SCHEMA:
            {
              "personalDetails": { 
                "fullName": string, 
                "jobTitle": string, 
                "email": string, 
                "phone": string, 
                "location": string, 
                "socials": [{ "label": string, "value": string }] 
              },
              "sections": [
                {
                  "type": "Profile",
                  "title": "Profile",
                  "content": string
                },
                {
                  "type": "Experience",
                  "title": "Work Experience",
                  "content": [{ "jobTitle": string, "employer": string, "startDate": string, "endDate": string, "location": string, "description": "HTML or Plain Text" }]
                },
                {
                  "type": "Education",
                  "title": "Education",
                  "content": [{ "degree": string, "school": string, "startDate": string, "endDate": string, "location": string, "description": string }]
                },
                {
                  "type": "Skills",
                  "title": "Skills",
                  "content": [{ "skill": string, "level": "Beginner" | "Intermediate" | "Advanced" | "Expert", "information": string }]
                },
                {
                  "type": "Languages",
                  "title": "Languages",
                  "content": [{ "language": string, "level": string, "information": string }]
                },
                {
                    "type": "Projects",
                    "title": "Projects",
                    "content": [{ "title": string, "startDate": string, "endDate": string, "description": string }]
                },
                {
                    "type": "Certificates",
                    "title": "Certificates",
                    "content": [{ "title": string, "issuer": string, "date": string, "description": string }]
                },
                {
                    "type": "Interests",
                    "title": "Interests",
                    "content": [{ "name": string }]
                }
              ]
            }

            CRITICAL: 
            - "content" for Experience, Education, Skills, Languages, Projects, Certificates, Interests MUST be an ARRAY of OBJECTS.
            - "content" for Profile MUST be a STRING.
            - If a value is missing, use empty string "".
        `;

        // 1. TRY THE SDK FIRST (PROBING CONFIRMED 2.x & 2.5 MODELS)
        const modelsToTry = [
            "gemini-2.0-flash-exp",
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-1.5-pro"
        ];

        for (const modelId of modelsToTry) {
            try {
                console.log(`[GeminiService] SDK Probe: ${modelId}...`);
                const model = genAI.getGenerativeModel({
                    model: modelId,
                    generationConfig: {
                        responseMimeType: "application/json",
                        temperature: 0.1,
                    }
                });

                let promptContent: any[] = [`${systemContext}\n\n${promptMessage}`];

                if (images && images.length > 0) {
                    images.forEach(base64 => {
                        promptContent.push({
                            inlineData: {
                                data: base64.split(',')[1] || base64,
                                mimeType: "image/jpeg"
                            }
                        });
                    });
                }

                if (rawText) {
                    promptContent.push(`RAW TEXT REFERENCE: \n${rawText}`);
                }

                const result = await model.generateContent(promptContent);
                const response = await result.response;
                const text = response.text();

                console.log(`[GeminiService] SDK SUCCESS with ${modelId}`);
                const cleanJson = text.replace(/```json|```/g, '').trim();
                return JSON.parse(cleanJson);
            } catch (err: any) {
                if (err.message?.includes("404") || err.message?.includes("not found")) {
                    console.warn(`[GeminiService] SDK 404 for ${modelId}, checking next...`);
                    continue;
                }
                if (err.message?.includes("429") || err.message?.includes("quota")) {
                    console.warn(`[GeminiService] SDK 429 (Quota) for ${modelId}, checking next...`);
                    continue;
                }
                console.warn(`[GeminiService] SDK error for ${modelId}:`, err.message);
            }
        }

        // 2. FALLBACK: DIRECT FETCH (Using gemini-2.5-flash or 2.0-flash)
        console.log("[GeminiService] SDK probes failed. Attempting Direct Fetch Fallback...");
        try {
            const fallbackModel = "gemini-2.5-flash";
            const apiURL = `https://generativelanguage.googleapis.com/v1/models/${fallbackModel}:generateContent?key=${API_KEY}`;

            const contents = [{
                parts: [
                    { text: `${systemContext}\n\n${promptMessage}` },
                    ...(rawText ? [{ text: `RAW TEXT: ${rawText}` }] : []),
                    ...(images || []).map(b64 => ({
                        inlineData: {
                            mimeType: "image/jpeg",
                            data: b64.split(',')[1] || b64
                        }
                    }))
                ]
            }];

            const response = await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents })
            });

            if (!response.ok) {
                const errText = await response.text();
                // If 404 on v1, try v1beta as a last resort
                if (response.status === 404) {
                    console.warn("[GeminiService] Direct Fetch v1 failed with 404. Trying v1beta...");
                    const betaURL = apiURL.replace('/v1/', '/v1beta/');
                    const betaRes = await fetch(betaURL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contents })
                    });
                    if (betaRes.ok) {
                        const betaData = await betaRes.json();
                        const betaText = betaData.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (betaText) {
                            console.log("[GeminiService] Direct Fetch (v1beta) SUCCESS!");
                            return JSON.parse(betaText.replace(/```json|```/g, '').trim());
                        }
                    }
                }
                throw new Error(`Direct Fetch Failed (${response.status}): ${errText}`);
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                console.log("[GeminiService] Direct Fetch SUCCESS!");
                const cleanJson = text.replace(/```json|```/g, '').trim();
                return JSON.parse(cleanJson);
            }
        } catch (err: any) {
            console.error("[GeminiService] All connectivity options failed.", err.message);
        }

        // 3. DIAGNOSTIC: List Models
        this.listAvailableModels().catch(() => { });

        return null;
    }

    static async listAvailableModels(): Promise<void> {
        try {
            console.log("[GeminiService] Running Diagnostic: Listing available models...");
            const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log("[GeminiService] Models available for this key:", data.models?.map((m: any) => m.name));
        } catch (e) {
            console.error("[GeminiService] Failed to list models.");
        }
    }
}
