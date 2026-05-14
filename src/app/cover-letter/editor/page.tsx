'use client';

import React, { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Layout,
    Loader2,
    Palette,
    Download,
    ChevronDown,
    Plus,
    Trash2,
    Check,
    X,
    PenTool,
    Upload,
    ArrowLeft
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import UnderlineExtension from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { CoverLetterData, INITIAL_DATA, SocialLink } from './types';
import { FormSection } from '@/components/cover-letter/FormSection';
import { Toolbar } from '@/components/cover-letter/Toolbar';
import { Preview } from '@/components/cover-letter/Preview';
import { TemplateSelectionModal } from '@/components/cover-letter/TemplateSelectionModal';
import { PaginationWrapper } from '@/components/cover-letter/PaginationWrapper';
import { DownloadModal } from '@/components/ui/DownloadModal';
import { ImageUploadModal } from '@/components/cover-letter/ImageUploadModal';
import { SocialSelectionModal } from '@/components/cover-letter/SocialSelectionModal';
import { SignatureModal } from '@/components/cover-letter/SignatureModal';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { db, storage } from '@/lib/firebase';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDoc,
    serverTimestamp,
    query,
    where,
    getDocs
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { Cloud, CloudOff, Save } from 'lucide-react';

// Reusable Input Component
const Input = ({ label, value, onChange, placeholder, type = "text" }: { label?: string, value: string, onChange: (val: string) => void, placeholder?: string, type?: string }) => (
    <div className="group">
        {label && <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors pl-1">{label}</label>}
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                className="w-full h-14 bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl px-4 text-base font-medium placeholder:text-gray-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    </div>
);

function CoverLetterEditor() {
    const { user, openModal } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const templateId = searchParams.get('templateId') || "1";

    const [data, setData] = useState<CoverLetterData>(INITIAL_DATA);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [activeTemplateId, setActiveTemplateId] = useState(templateId);
    const [isChangingTemplate, setIsChangingTemplate] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');

    // Image Modal State
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

    // Social Modal State
    const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

    // Signature Modal State
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

    // Firebase Saving State
    const [id, setId] = useState<string | null>(searchParams.get('id'));
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);


    // Update active template when URL param changes
    React.useEffect(() => {
        if (templateId) {
            setActiveTemplateId(templateId);
        }
    }, [templateId]);

    const handleTemplateSelect = (newTemplateId: string) => {
        setIsTemplateModalOpen(false);
        if (newTemplateId === activeTemplateId) return;

        setIsChangingTemplate(true);
        // Artificial delay for "Applying" effect
        setTimeout(() => {
            setActiveTemplateId(newTemplateId);
            setIsChangingTemplate(false);
            saveCoverLetter(newTemplateId);
        }, 800);
    };

    // Tiptap Editor
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            UnderlineExtension,
            LinkExtension,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: data.body,
        onUpdate: ({ editor }) => {
            setData(prev => ({ ...prev, body: editor.getHTML() }));
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-6 bg-white outline-none',
            },
        },
    });

    // --- Firebase Persistence Logic (Moved below Editor for declaration sync) ---

    // 1. Loading Logic
    React.useEffect(() => {
        const loadDoc = async () => {
            if (id && user) {
                try {
                    const docRef = doc(db, 'coverLetters', id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const docData = docSnap.data();
                        if (docData.userId === user.uid) {
                            setData(docData.data);
                            setActiveTemplateId(docData.templateId);
                            if (editor) {
                                editor.commands.setContent(docData.data.body);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error loading document:", error);
                } finally {
                    setIsLoaded(true);
                }
            } else {
                // Load from localStorage for guests or new ones
                const savedData = localStorage.getItem('cover_letter_data');
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    setData(parsedData);
                    if (editor) {
                        editor.commands.setContent(parsedData.body);
                    }
                }
                setIsLoaded(true);
            }
        };

        if (editor) {
            loadDoc();
        }
    }, [id, user, !!editor]);

    // 2. Save Logic
    const saveCoverLetter = async (forceTemplateId?: string) => {
        if (!user || !isLoaded) return;

        const templateToSave = forceTemplateId || activeTemplateId;
        setIsSaving(true);

        try {
            if (id) {
                // UPDATE
                const docRef = doc(db, 'coverLetters', id);
                await updateDoc(docRef, {
                    templateId: templateToSave,
                    data: data,
                    updatedAt: serverTimestamp(),
                });
            } else {
                // CREATE
                const docRef = await addDoc(collection(db, 'coverLetters'), {
                    userId: user.uid,
                    templateId: templateToSave,
                    data: data,
                    updatedAt: serverTimestamp(),
                    createdAt: serverTimestamp(),
                });
                setId(docRef.id);
            }

            // Update URL with current state
            const searchParams = new URLSearchParams(window.location.search);
            if (id || (searchParams.get('id'))) {
                const finalId = id || searchParams.get('id');
                if (finalId) searchParams.set('id', finalId);
            }
            searchParams.set('templateId', templateToSave);

            const newPath = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.replaceState(null, '', newPath);

            setLastSaved(new Date());
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);

            // Also keep local storage as backup
            localStorage.setItem('cover_letter_data', JSON.stringify(data));
        } catch (error) {
            console.error("Error saving document:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Helper for future thumbnail usage
    const generateThumbnail = async () => {
        // This is ready to capture the A4 preview when storage is enabled
        const element = document.getElementById('preview-container');
        if (!element) return null;
        try {
            return await toJpeg(element, { quality: 0.5, pixelRatio: 0.5 });
        } catch (e) {
            return null;
        }
    };

    // 3. Auto-save Effect
    React.useEffect(() => {
        if (!isLoaded || !user) {
            // For guests, still save to localStorage
            if (isLoaded && !user) {
                localStorage.setItem('cover_letter_data', JSON.stringify(data));
            }
            return;
        }

        const timer = setTimeout(() => {
            saveCoverLetter();
        }, 2000);

        return () => clearTimeout(timer);
    }, [data, activeTemplateId, user, isLoaded]);

    const handleDownload = async (format: 'pdf' | 'png', size: 'a4' | 'letter') => {
        if (!user) {
            openModal('login');
            return;
        }

        const originalElement = document.getElementById('preview-container') || document.getElementById('preview-container-mobile');
        if (!originalElement) return;

        // 1. Clone the element to avoid interfering with the live editor
        const clone = originalElement.cloneNode(true) as HTMLElement;
        clone.id = 'export-clone';

        // 2. Set up a hidden container for the clone
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '794px'; // Fixed A4 width for capture
        container.style.height = 'fit-content';
        container.style.backgroundColor = '#ffffff';

        // 2.5. STRIP FORMATTING FOR EXPORT
        // - Remove scaling
        clone.style.transform = 'none';
        clone.style.width = '794px';
        clone.classList.remove('scale-[0.7]', 'sm:scale-[0.85]', 'md:scale-[0.9]', 'lg:scale-[0.6]', 'xl:scale-[0.8]', 'overflow-hidden');

        // - Remove all gaps, paddings and ANIMATIONS that could interfere with capture
        const allElements = clone.querySelectorAll('*');
        allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            // Remove spacing that causes page displacement
            if (htmlEl.classList.contains('gap-8')) htmlEl.classList.remove('gap-8');
            if (htmlEl.classList.contains('py-8')) htmlEl.classList.remove('py-8');
            // Remove animations to avoid semi-transparent captures
            if (htmlEl.classList.contains('animate-in')) {
                htmlEl.classList.remove('animate-in', 'fade-in', 'duration-500', 'duration-700', 'duration-1000');
                htmlEl.style.opacity = '1';
                htmlEl.style.visibility = 'visible';
            }
        });

        // 3. Append to body
        container.appendChild(clone);
        document.body.appendChild(container);

        try {
            // Wait for DOM to settle
            await new Promise(r => setTimeout(r, 100));

            // 4. Capture using html-to-image (Higher fidelity for alignment)
            const dataUrl = await toPng(clone, {
                quality: 1,
                pixelRatio: 4, // Ultra high resolution
                backgroundColor: '#ffffff',
                width: 794,
                height: clone.scrollHeight,
                style: {
                    transform: 'none',
                    margin: '0',
                    padding: '0'
                },
                cacheBust: true,
            });

            // Need to get image dimensions for sizing
            const img = new Image();
            img.src = dataUrl;
            await new Promise((resolve) => {
                img.onload = resolve;
            });

            if (format === 'png') {
                const link = document.createElement('a');
                link.download = `cover-letter.${format}`;
                link.href = dataUrl;
                link.click();
            } else {
                // PDF Multi-page Logic with PROFESSIONAL MARGINS
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: size
                });

                const pageDims = {
                    a4: { width: 210, height: 297 },
                    letter: { width: 215.9, height: 279.4 }
                }[size];

                const margin = 10; // 10mm standard margin
                const pdfWidth = pageDims.width;
                const pdfHeight = pageDims.height;
                const contentWidth = pdfWidth - (2 * margin);
                const contentHeight = pdfHeight - (2 * margin);

                const imgData = dataUrl;
                const imgHeightInPdf = (img.height / 4) * (contentWidth / 794);

                let heightLeft = imgHeightInPdf;
                let position = 0; // The y-offset into the image (in mm)

                while (heightLeft > 0) {
                    if (position > 0) pdf.addPage(size, 'portrait');

                    // 1. Add the image slice
                    pdf.addImage(
                        imgData,
                        'PNG',
                        margin,
                        margin - position,
                        contentWidth,
                        imgHeightInPdf,
                        undefined,
                        'FAST'
                    );

                    // 2. Add white "masks" to the margins
                    pdf.setFillColor(255, 255, 255);
                    pdf.rect(0, 0, pdfWidth, margin, 'F');
                    pdf.rect(0, pdfHeight - margin, pdfWidth, margin, 'F');
                    pdf.rect(0, 0, margin, pdfHeight, 'F');
                    pdf.rect(pdfWidth - margin, 0, margin, pdfHeight, 'F');

                    heightLeft -= contentHeight;
                    position += contentHeight;
                }

                pdf.save(`cover-letter.pdf`);
            }
        } catch (error) {
            console.error('Error generating download:', error);
            alert('Failed to generate download. Please try again.');
        } finally {
            // 5. Clean up
            document.body.removeChild(container);
        }
    };

    // --- Personal Details Handlers ---
    const updatePersonal = (field: keyof CoverLetterData['personal'], value: any) => {
        setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
    };



    const addSocial = (label: string) => {
        const newSocial: SocialLink = {
            id: Math.random().toString(36).substr(2, 9),
            label,
            value: '',
            placeholder: label === 'LinkedIn' ? 'in/username' : label === 'Website' ? 'www.example.com' : 'Enter value'
        };
        updatePersonal('socials', [...data.personal.socials, newSocial]);
    };

    const updateSocial = (id: string, value: string) => {
        const updatedSocials = data.personal.socials.map(s => s.id === id ? { ...s, value } : s);
        updatePersonal('socials', updatedSocials);
    };

    const removeSocial = (id: string) => {
        const updatedSocials = data.personal.socials.filter(s => s.id !== id);
        updatePersonal('socials', updatedSocials);
    };

    // --- Other Handlers ---
    const updateRecipient = (field: keyof CoverLetterData['recipient'], value: string) => {
        setData(prev => ({ ...prev, recipient: { ...prev.recipient, [field]: value } }));
    };

    const updateSignature = (field: keyof CoverLetterData['signature'], value: string | undefined) => {
        setData(prev => ({ ...prev, signature: { ...prev.signature, [field]: value } }));
    };

    return (
        <div className="h-screen bg-[#F3F0EA] flex flex-col overflow-hidden">
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            {/* Top Navigation Bar */}
            {/* <header className="w-full bg-white border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-black text-[#1A1A1A] bg-[#F3F1EC] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl active:scale-95 group"
                            type="button"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Dashboard
                        </button>

                        <div className="h-6 w-px bg-black/[0.05]" />

                        <div className="flex items-center gap-2.5 text-xs font-black text-[#1A1A1A] opacity-30">
                            <PenTool className="w-4 h-4" />
                            Write
                        </div>
                    </div>

                    <div className="flex items-center gap-8">

                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Template</span>
                            <button
                                onClick={() => setIsTemplateModalOpen(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-white hover:border-blue-500 transition-all shadow-sm"
                                type="button"
                            >
                                Letter {activeTemplateId}
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>

                        <div className="w-px h-6 bg-black/[0.08]" />

                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Format</span>
                            <div className="flex bg-white/50 rounded-lg p-0.5 border border-black/[0.03]">
                                <button
                                    onClick={() => setPageSize('a4')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${pageSize === 'a4'
                                        ? 'bg-white text-black shadow-sm border border-black/[0.03]'
                                        : 'text-slate-400'
                                        }`}
                                    type="button"
                                >
                                    A4
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsDownloadModalOpen(true)}
                            className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg active:scale-95"
                            type="button"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>
            </header> */}

            <div className="sticky top-0 z-50 w-full flex justify-center">
                {/* The Actual Header: Limited to 7xl with rounded corners */}
                {/* The Actual Header: Limited to 7xl with rounded corners */}
                <header className="w-full max-w-7xl bg-white border border-gray-200 rounded-2xl sm:rounded-[1.5rem] shadow-lg">
                    <div className="px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">

                        {/* Left Side */}
                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-black text-[#1A1A1A] bg-[#F3F1EC] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 shadow-sm active:scale-95 group"
                                type="button"
                            >
                                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </button>

                            <div className="h-6 w-px bg-black/[0.05] hidden xs:block" />

                            <div className="hidden md:flex items-center gap-2.5 text-xs font-black text-[#1A1A1A] opacity-30">
                                <PenTool className="w-4 h-4" />
                                Write
                            </div>

                            {/* Sync Status Indicator */}
                            <div className="h-4 w-px bg-black/[0.05] hidden lg:block" />
                            <div className="flex items-center gap-1.5 min-w-fit">
                                {isSaving ? (
                                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">
                                        <Cloud className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        <span className="hidden lg:inline">Syncing</span>
                                    </div>
                                ) : lastSaved ? (
                                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        <span className="hidden lg:inline">Saved</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                                        <CloudOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        <span className="hidden lg:inline">Offline</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                            {/* Template Selector */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="hidden xl:block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Template</span>
                                <button
                                    onClick={() => setIsTemplateModalOpen(true)}
                                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold text-gray-700 hover:bg-white hover:border-blue-500 transition-all shadow-sm"
                                >
                                    <span className="hidden sm:inline">Letter</span> {activeTemplateId}
                                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                </button>
                            </div>

                            <div className="w-px h-6 bg-black/[0.08] hidden sm:block" />

                            {/* Action Button */}
                            <button
                                onClick={() => setIsDownloadModalOpen(true)}
                                className="bg-[#1A1A1A] text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold hover:bg-black transition-all flex items-center gap-2 shadow-md active:scale-95"
                            >
                                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="hidden xs:inline">Download</span>
                            </button>
                        </div>
                    </div>
                </header>
            </div>

            {/* Main Workspace */}
            <main className="flex-1 max-w-7xl mx-auto px-4 py-4 w-full overflow-hidden relative">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start h-full">
                    {/* Left: Input Areas */}
                    <div className="w-full lg:w-1/2 h-full overflow-y-auto scrollbar-hide space-y-8 pb-32">
                        {/* Section: Personal Details */}
                        <FormSection title="Personal Details">
                            <div className="flex flex-col sm:flex-row gap-8">
                                <div className="flex-1 space-y-6">
                                    <Input
                                        label="Full name"
                                        placeholder="Enter your title, first- and last name"
                                        value={data.personal.fullName}
                                        onChange={(v) => updatePersonal('fullName', v)}
                                    />
                                    <Input
                                        label="Professional title"
                                        placeholder="Target position or current role"
                                        value={data.personal.jobTitle}
                                        onChange={(v) => updatePersonal('jobTitle', v)}
                                    />
                                </div>

                                {/* Photo Upload - Side-by-side as in Flow CV */}
                                <div className="flex flex-col items-center">
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 self-start pl-1">Photo</span>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setTempImageSrc(reader.result as string);
                                                    setIsImageModalOpen(true);
                                                    e.target.value = '';
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <div
                                        onClick={() => data.personal.photo ? (setTempImageSrc(data.personal.photo), setIsImageModalOpen(true)) : fileInputRef.current?.click()}
                                        className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border-2 border-transparent cursor-pointer hover:bg-gray-200 transition-all group overflow-hidden relative shadow-inner"
                                    >
                                        {data.personal.photo ? (
                                            <img src={data.personal.photo} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                                <Upload className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PenTool className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Email" type="email" placeholder="Enter email" value={data.personal.email} onChange={(v) => updatePersonal('email', v)} />
                                <Input label="Phone" type="tel" placeholder="Enter Phone" value={data.personal.phone} onChange={(v) => updatePersonal('phone', v)} />
                                <div className="md:col-span-2">
                                    <Input label="Location" placeholder="City, Country" value={data.personal.address} onChange={(v) => updatePersonal('address', v)} />
                                </div>

                                {/* Dynamic Social Inputs */}
                                {data.personal.socials.map(social => (
                                    <div key={social.id} className="relative group md:col-span-2">
                                        <Input
                                            label={social.label}
                                            placeholder={social.placeholder}
                                            value={social.value}
                                            onChange={(v) => updateSocial(social.id, v)}
                                        />
                                        <button
                                            onClick={() => removeSocial(social.id)}
                                            className="absolute top-0 right-0 p-1 text-gray-300 hover:text-red-500 transition-colors"
                                            title="Remove"
                                            type="button"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-4">Add Details</label>
                                <div className="flex flex-wrap gap-2">
                                    {['LinkedIn', 'Website', 'Nationality', 'Date of Birth', 'Visa', 'Passport or Id'].map(item => (
                                        <button
                                            key={item}
                                            onClick={() => addSocial(item)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-black hover:text-white rounded-lg text-xs font-bold text-gray-600 transition-all border border-gray-300 active:scale-95"
                                            type="button"
                                        >
                                            <Plus className="w-3 h-3 text-current" />
                                            {item}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setIsSocialModalOpen(true)}
                                        className="flex items-center gap-1.5 px-4 py-1.5 bg-black hover:bg-zinc-800 text-white rounded-lg text-xs font-bold transition-all border border-black shadow-md"
                                        type="button"
                                    >
                                        Show More
                                    </button>
                                </div>
                            </div>
                        </FormSection>

                        {/* Section: Date */}
                        <FormSection title="Date">
                            <Input placeholder="Enter date" value={data.date} onChange={(v) => setData({ ...data, date: v })} />
                        </FormSection>

                        {/* Section: Recipient Details */}
                        <FormSection title="Recipient Details">
                            <div className="space-y-6">
                                <Input label="Recipient Name" placeholder="Enter name of recipient/department" value={data.recipient.name} onChange={(v) => updateRecipient('name', v)} />
                                <Input label="Company Name" placeholder="Enter Company Name" value={data.recipient.company} onChange={(v) => updateRecipient('company', v)} />
                                <Input label="Address" placeholder="Enter Company Address" value={data.recipient.address} onChange={(v) => updateRecipient('address', v)} />
                            </div>
                        </FormSection>

                        {/* Section: Body */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
                                <h2 className="text-xl font-bold text-gray-800">Body</h2>
                            </div>
                            <Toolbar editor={editor} />
                            <div className="min-h-[400px]">
                                <EditorContent editor={editor} />
                            </div>
                        </div>

                        {/* Section: Signature */}
                        <FormSection title="Signature">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Full name" placeholder="Full Name" value={data.signature.name} onChange={(v) => updateSignature('name', v)} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input label="Place" placeholder="City" value={data.signature.place} onChange={(v) => updateSignature('place', v)} />
                                        <Input label="Date" placeholder="Date" value={data.signature.date} onChange={(v) => updateSignature('date', v)} />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Signature Image</label>
                                    {data.signature.image ? (
                                        <div className="relative group inline-block">
                                            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 shadow-inner">
                                                <img src={data.signature.image} alt="Signature" className="h-16 object-contain" />
                                            </div>
                                            <button
                                                onClick={() => updateSignature('image', undefined)}
                                                className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 border border-gray-100 transition-all hover:scale-110"
                                                type="button"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setIsSignatureModalOpen(true)}
                                            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 rounded-2xl text-gray-600 font-bold text-sm hover:bg-blue-50 hover:text-blue-600 transition-all w-full border-2 border-dashed border-gray-200 hover:border-blue-200"
                                            type="button"
                                        >
                                            <PenTool className="w-5 h-5" />
                                            Draw or Upload Signature
                                        </button>
                                    )}
                                </div>
                            </div>
                        </FormSection>
                    </div>

                    {/* Right: Preview Area - Hidden on mobile, shown on lg */}
                    <div className="hidden lg:flex lg:w-1/2 h-full overflow-y-auto scrollbar-hide justify-center pb-20">
                        {/* Shadow Container for the Page */}
                        <div className="relative group">
                            {/* Loading Overlay */}
                            {isChangingTemplate && (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-sm transition-all duration-300">
                                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                                </div>
                            )}

                            <div className={`transition-all duration-500 rounded-sm   ${isChangingTemplate ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                                <div id="preview-container" className="origin-top scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.55] xl:scale-[0.7]">
                                    <Preview data={data} templateId={activeTemplateId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Preview Button - Only visible on small screens */}
                <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                    <button
                        onClick={() => setIsPreviewModalOpen(true)}
                        className="flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-black shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none"
                    >
                        <Layout className="w-5 h-5" />
                        Preview Letter
                    </button>
                </div>
            </main>

            {/* Mobile Preview Full-screen Modal */}
            {isPreviewModalOpen && (
                <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-300">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Preview</span>
                        </div>
                        <button
                            onClick={() => setIsPreviewModalOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
                        >
                            <X className="w-6 h-6 text-gray-900" />
                        </button>
                    </div>

                    {/* Modal Content - Scrollable Preview */}
                    <div className="flex-1 overflow-y-auto bg-gray-50 p-4 scrollbar-hide">
                        <div className="flex justify-center min-h-full py-8">
                            <div className="transform origin-top scale-[0.45] sm:scale-[0.7] md:scale-[0.85] w-fit">
                                <div id="preview-container-mobile">
                                    <Preview data={data} templateId={activeTemplateId} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer - Actions */}
                    <div className="p-4 border-t bg-white flex gap-3">
                        <button
                            onClick={() => {
                                setIsPreviewModalOpen(false);
                                setIsDownloadModalOpen(true);
                            }}
                            className="flex-1 bg-black text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                        >
                            <Download className="w-5 h-5" />
                            Download PDF
                        </button>
                    </div>
                </div>
            )}

            <TemplateSelectionModal
                isOpen={isTemplateModalOpen}
                onClose={() => setIsTemplateModalOpen(false)}
                activeTemplateId={activeTemplateId}
                onSelect={handleTemplateSelect}
            />

            {/* Saving Snackbar */}
            {isSaving && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-[#1a1b3a] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/90">Saving Changes...</span>
                    </div>
                </div>
            )}

            {showToast && !isSaving && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white">Changes saved</span>
                    </div>
                </div>
            )}

            <DownloadModal
                isOpen={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
                onDownload={handleDownload}
            />

            <ImageUploadModal
                isOpen={isImageModalOpen}
                imageSrc={tempImageSrc}
                onClose={() => {
                    setIsImageModalOpen(false);
                    // Clear temp if cancelled? maybe not strictly necessary but good cleanup
                    if (!data.personal.photo) setTempImageSrc(null);
                }}
                onSave={(newImage) => {
                    updatePersonal('photo', newImage);
                    setTempImageSrc(null);
                }}
                onDelete={() => {
                    updatePersonal('photo', undefined);
                    setTempImageSrc(null);
                }}
                onReplace={() => {
                    fileInputRef.current?.click();
                }}
            />

            <SocialSelectionModal
                isOpen={isSocialModalOpen}
                onClose={() => setIsSocialModalOpen(false)}
                onSelect={(label) => addSocial(label)}
            />

            <SignatureModal
                isOpen={isSignatureModalOpen}
                onClose={() => setIsSignatureModalOpen(false)}
                onSave={(signature) => updateSignature('image', signature)}
            />
        </div>
    );
}

export default function CoverLetterEditorPage() {
    return (
        <Suspense fallback={
            <div className="h-screen bg-[#F3F0EA] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        }>
            <CoverLetterEditor />
        </Suspense>
    );
}