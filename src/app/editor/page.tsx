// 'use client';

// import React, { useState, useEffect } from 'react';
// const generateId = () => Math.random().toString(36).substr(2, 9);
// import { PersonalDetailsForm } from '@/components/editor/forms/PersonalDetailsForm';
// import { ProfileForm } from '@/components/editor/forms/ProfileForm';
// import { EducationForm } from '@/components/editor/forms/EducationForm';
// import { LanguagesForm } from '@/components/editor/forms/LanguagesForm';
// import { ExperienceForm } from '@/components/editor/forms/ExperienceForm';
// import { SkillsForm } from '@/components/editor/forms/SkillsForm';
// import { LivePreview } from '@/components/editor/previews/LivePreview';
// import { AddContentButton } from '@/components/editor/AddContentButton';
// import { AddContentModal } from '@/components/editor/AddContentModal';
// import { ResumeContent, ResumeSection, SectionType } from '@/types/resume';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { CertificateForm } from '@/components/editor/forms/CertificateForm';
// import { InterestForm } from '@/components/editor/forms/InterestForm';
// import { ProjectForm } from '@/components/editor/forms/ProjectForm';
// import { PublicationForm } from '@/components/editor/forms/PublicationForm';
// import { ReferenceForm } from '@/components/editor/forms/ReferenceForm';
// import { CustomSectionForm } from '@/components/editor/forms/CustomSectionForm';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// // New Imports
// import { PersonalDetailsCard } from '@/components/editor/PersonalDetailsCard';
// import { SectionAccordion } from '@/components/editor/SectionAccordion';
// import {
//     Briefcase,
//     GraduationCap,
//     User,
//     Globe,
//     Award,
//     BookOpen,
//     Layout,
//     Puzzle,
//     Users,
//     FileText,
//     Download,
//     Plus,
//     Trash2
// } from 'lucide-react';

// import { dummyResume } from '@/components/dashboard/dummyResume';

// export default function EditorPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const initialTemplateId = searchParams.get('templateId');

//     const [resumeData, setResumeData] = useState<ResumeContent>({
//         personalDetails: {
//             fullName: '',
//             jobTitle: '',
//             email: '',
//             phone: '',
//             location: '',
//             socials: []
//         },
//         sections: []
//     });

//     const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
//     const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
//     const [activeTemplateId, setActiveTemplateId] = useState(initialTemplateId || undefined);
//     const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

//     useEffect(() => {
//         // 1. Try to load from local storage
//         const savedData = localStorage.getItem('resume_data');
//         const importedData = localStorage.getItem('imported_resume_data');

//         if (importedData) {
//             try {
//                 const parsed = JSON.parse(importedData);
//                 setResumeData(parsed);
//                 localStorage.removeItem('imported_resume_data'); // Clear after use
//             } catch (e) {
//                 console.error('Failed to parse imported data', e);
//             }
//         } else if (savedData) {
//             try {
//                 const parsed = JSON.parse(savedData);
//                 setResumeData(parsed);
//             } catch (e) {
//                 // Ignore error
//             }
//         }
//     }, []);

//     const handleSectionChange = (updatedSection: ResumeSection) => {
//         setResumeData((prev) => ({
//             ...prev,
//             sections: prev.sections.map((sec) => (sec.id === updatedSection.id ? updatedSection : sec)),
//         }));
//     };

//     const handleDeleteSection = (sectionId: string) => {
//         setResumeData((prev) => ({
//             ...prev,
//             sections: prev.sections.filter((sec) => sec.id !== sectionId),
//         }));
//         setActiveSectionId(null);
//     };

//     const handleAddSection = (type: SectionType) => {
//         const newSection: ResumeSection = {
//             id: generateId(),
//             type,
//             title: type,
//             content: [],
//             isVisible: true
//         };
//         setResumeData((prev) => ({
//             ...prev,
//             sections: [...prev.sections, newSection],
//         }));
//         setActiveSectionId(newSection.id);
//         setIsAddContentModalOpen(false);
//     };

//     const renderActiveForm = () => {
//         if (activeSectionId === 'personal') {
//             return (
//                 <div className="space-y-6">
//                     <PersonalDetailsForm
//                         data={resumeData.personalDetails}
//                         onChange={(data) => setResumeData((prev) => ({ ...prev, personalDetails: data }))}
//                     />
//                     <div className="px-8 pb-8">
//                         <button
//                             onClick={() => setActiveSectionId(null)}
//                             className="w-full bg-[#1a1b3a] text-white py-3 rounded-lg font-bold hover:bg-[#2d2e55] transition-colors"
//                         >
//                             Done
//                         </button>
//                     </div>
//                 </div>
//             );
//         }

//         const section = resumeData.sections.find(s => s.id === activeSectionId);

//         if (!section) return null;

//         if (section.type === 'Profile') {
//             return (
//                 <ProfileForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }

//         if (section.type === 'Skills') {
//             return (
//                 <SkillsForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }

//         if (section.type === 'Education') {
//             return (
//                 <EducationForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }



//         if (section.type === 'Certificates') {
//             return (
//                 <CertificateForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }


//         if (section.type === 'Interests') {
//             return (
//                 <InterestForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }


//         if (section.type === 'Projects') {
//             return (
//                 <ProjectForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }


//         if (section.type === 'Publications') {
//             return (
//                 <PublicationForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }


//         if (section.type === 'References') {
//             return (
//                 <ReferenceForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }


//         if (section.type === 'Custom') {
//             return (
//                 <CustomSectionForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }

//         if (section.type === 'Languages') {
//             return (
//                 <LanguagesForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }

//         if (section.type === 'Experience') {
//             return (
//                 <ExperienceForm
//                     section={section}
//                     onChange={handleSectionChange}
//                     onDone={() => setActiveSectionId('')}
//                     onDelete={() => handleDeleteSection(section.id)}
//                 />
//             );
//         }

//         return (
//             <div className="bg-white p-8 rounded-xl">
//                 <p>Form for {section.type} is coming soon.</p>
//                 <button
//                     onClick={() => setActiveSectionId('')}
//                     className="mt-4 px-4 py-2 bg-gray-200 rounded"
//                 >
//                     Done
//                 </button>
//             </div>
//         );
//     };


//     // ... (existing helper functions)

//     const handleDownloadPDF = async () => {
//         const element = document.getElementById('resume-preview');
//         if (!element) return;

//         try {
//             // 1. Clone the element to isolate it from page styles/transforms
//             const clone = element.cloneNode(true) as HTMLElement;

//             // 2. Create a temporary container
//             const container = document.createElement('div');
//             container.style.position = 'fixed';
//             container.style.top = '-10000px';
//             container.style.left = '-10000px';
//             container.style.width = '210mm'; // Force A4 width
//             container.style.minHeight = '297mm'; // Force A4 height
//             container.style.zIndex = '-1';
//             container.appendChild(clone);
//             document.body.appendChild(container);

//             // 3. Reset any problematic styles on the cloned root
//             clone.style.transform = 'none';
//             clone.style.margin = '0';
//             clone.style.boxShadow = 'none';

//             // 4. Capture the clone
//             const canvas = await html2canvas(clone, {
//                 scale: 2, // Higher scale for better quality
//                 useCORS: true,
//                 logging: false,
//                 backgroundColor: '#ffffff',
//                 windowWidth: 794, // Standard A4 width at 96 DPI (~210mm)
//             });

//             // 5. Cleanup
//             document.body.removeChild(container);

//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF({
//                 orientation: 'portrait',
//                 unit: 'mm',
//                 format: 'a4'
//             });

//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = pdf.internal.pageSize.getHeight();
//             const imgWidth = canvas.width;
//             const imgHeight = canvas.height;

//             const componentWidth = pdfWidth;
//             const componentHeight = (imgHeight * componentWidth) / imgWidth;

//             pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
//             pdf.save('resume.pdf');
//         } catch (error) {
//             console.error('Error generating PDF:', error);
//             alert('Failed to generate PDF. Please try again.');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#F3F0EA]">
//             {/* Header */}
//             <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
//                 <div className="flex items-center gap-4">
//                     {/* <button
//                         onClick={() => router.replace('/dashboard')}
//                         className="text-gray-500 hover:text-gray-900 font-medium"
//                     >
//                         &larr; Back to Dashboard
//                     </button> */}
//                     {/* <div className="h-6 w-[1px] bg-gray-300 mx-2"></div> */}
//                     <button
//                         onClick={() => setIsTemplateModalOpen(true)}
//                         className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                         <Layout className="w-4 h-4" />
//                         Change Template
//                     </button>
//                 </div>
//                 <button
//                     onClick={handleDownloadPDF}
//                     className="bg-[#1a1b3a] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#2d2e55] transition-colors"
//                 >
//                     Download PDF
//                 </button>
//             </header>


//             <div className="flex h-[calc(100vh-73px)]">
//                 {/* Left: Scrollable Form Area */}
//                 <div className="w-full md:w-1/2 lg:w-[45%] p-6 overflow-y-auto custom-scrollbar">
//                     <div className="max-w-2xl mx-auto space-y-8 pb-20">

//                         {/* If a specific form is active, show it */}
//                         {activeSectionId ? (
//                             renderActiveForm()
//                         ) : (
//                             <div className="space-y-4 max-w-3xl mx-auto">
//                                 <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Resume Content</h1>

//                                 <PersonalDetailsCard
//                                     data={resumeData.personalDetails}
//                                     onEdit={() => setActiveSectionId('personal')}
//                                 />

//                                 <div className="space-y-3">
//                                     {resumeData.sections.map((section) => (
//                                         <div
//                                             key={section.id}
//                                             className="bg-white p-4 rounded-xl border flex justify-between items-center cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group"
//                                             onClick={() => setActiveSectionId(section.id)}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 {/* Icon Rendering */}
//                                                 {section.type === 'Profile' && <User className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Education' && <GraduationCap className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Experience' && <Briefcase className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Skills' && <Puzzle className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Languages' && <Globe className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Certificates' && <Award className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Interests' && <BookOpen className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Projects' && <Layout className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Publications' && <FileText className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'References' && <Users className="w-5 h-5 text-gray-500" />}
//                                                 {section.type === 'Custom' && <Layout className="w-5 h-5 text-gray-500" />}

//                                                 <span className="font-bold text-lg text-gray-700">{section.title}</span>
//                                             </div>
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleDeleteSection(section.id);
//                                                 }}
//                                                 className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
//                                             >
//                                                 <Trash2 className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <button
//                                     onClick={() => setIsAddContentModalOpen(true)}
//                                     className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50/50 transition-all"
//                                 >
//                                     <Plus className="w-5 h-5" />
//                                     Add Section
//                                 </button>
//                             </div>
//                         )}

//                     </div>
//                 </div>

//                 {/* Right: Preview Area */}
//                 <div className="hidden md:block flex-1 bg-gray-200/50 p-8 overflow-y-auto flex justify-center items-start">
//                     <div className="transform scale-[0.8] origin-top transition-all duration-300">
//                         <div id="resume-preview" className="w-[210mm] min-h-[297mm] bg-white shadow-xl">
//                             <LivePreview data={resumeData} templateId={activeTemplateId} />
//                         </div>
//                     </div>
//                 </div>
//             </div >

//             <AddContentModal
//                 isOpen={isAddContentModalOpen}
//                 onClose={() => setIsAddContentModalOpen(false)}
//                 onSelect={handleAddSection}
//             />

//             {/* Template Selection Modal - Simple inline implementation for speed */}
//             {isTemplateModalOpen && (
//                 <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
//                     <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
//                         <header className="p-6 border-b flex justify-between items-center">
//                             <h2 className="text-2xl font-bold">Choose a Template</h2>
//                             <button onClick={() => setIsTemplateModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
//                                 <Trash2 className="w-5 h-5 rotate-45" /> {/* Close Icon hack using Trash2 X logic or just X */}
//                             </button>
//                         </header>

//                         <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
//                             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                                 {require('@/components/editor/previews/templates').templates.map((t: any) => (
//                                     <button
//                                         key={t.id}
//                                         onClick={() => { setActiveTemplateId(t.id); setIsTemplateModalOpen(false); }}
//                                         className={`group relative aspect-[210/297] bg-white rounded-lg shadow-sm border-2 overflow-hidden hover:border-blue-500 transition-all ${activeTemplateId === t.id ? 'border-blue-600 ring-2 ring-blue-200' : 'border-transparent'}`}
//                                     >
//                                         <div
//                                             className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500"
//                                             style={{ backgroundColor: t.theme.background }}
//                                         >
//                                             {/* Simulate thumbnail if image missing */}
//                                             <div className="w-[80%] h-[80%] border border-dashed border-gray-300 flex flex-col gap-2 p-2">
//                                                 <div className="w-1/3 h-2 bg-gray-300 rounded" style={{ backgroundColor: t.theme.color }}></div>
//                                                 <div className="w-full h-1 bg-gray-200 rounded"></div>
//                                                 <div className="w-full h-1 bg-gray-200 rounded"></div>
//                                             </div>
//                                         </div>
//                                         <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur p-3 border-t">
//                                             <p className="font-bold text-gray-800 text-sm">{t.name}</p>
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div >
//     );
// }




'use client';

import React, { useState, useEffect, Suspense } from 'react';
const generateId = () => Math.random().toString(36).substr(2, 9);
import { PersonalDetailsForm } from '@/components/editor/forms/PersonalDetailsForm';
import { ProfileForm } from '@/components/editor/forms/ProfileForm';
import { EducationForm } from '@/components/editor/forms/EducationForm';
import { LanguagesForm } from '@/components/editor/forms/LanguagesForm';
import { ExperienceForm } from '@/components/editor/forms/ExperienceForm';
import { SkillsForm } from '@/components/editor/forms/SkillsForm';
import { LivePreview } from '@/components/editor/previews/LivePreview';
import { AddContentButton } from '@/components/editor/AddContentButton';
import { AddContentModal } from '@/components/editor/AddContentModal';
import { ResumeContent, ResumeSection, SectionType } from '@/types/resume';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CertificateForm } from '@/components/editor/forms/CertificateForm';
import { InterestForm } from '@/components/editor/forms/InterestForm';
import { ProjectForm } from '@/components/editor/forms/ProjectForm';
import { PublicationForm } from '@/components/editor/forms/PublicationForm';
import { ReferenceForm } from '@/components/editor/forms/ReferenceForm';
import { CustomSectionForm } from '@/components/editor/forms/CustomSectionForm';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { ResumeTemplateModal } from '@/components/editor/ResumeTemplateModal';
import { DownloadModal } from '@/components/ui/DownloadModal';
import { IconSelectionModal } from '@/components/common/IconSelectionModal';
import { getActiveTemplate } from '@/components/editor/previews/templates';
import { useAuth } from '@/context/AuthContext';
import * as LucideIcons from 'lucide-react';
import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { ResumeParser } from '@/services/resumeParser';

// New Imports
import { PersonalDetailsCard } from '@/components/editor/PersonalDetailsCard';
import { SectionAccordion } from '@/components/editor/SectionAccordion';
import {
    Briefcase,
    GraduationCap,
    User,
    Globe,
    Award,
    BookOpen,
    Layout,
    Puzzle,
    Users,
    FileText,
    ChevronLeft,
    Download,
    Plus,
    Trash2,
    Settings,
    Eye,
    X,
    ArrowLeft,
    PenTool,
    ChevronDown,
    Palette,
    GripVertical,
    Cloud,
    CloudOff,
    Check,
    Save,
    Import
} from 'lucide-react';

function Editor() {
    const { user, openModal } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialTemplateId = searchParams.get('templateId');

    const [resumeData, setResumeData] = useState<ResumeContent>({
        personalDetails: {
            fullName: '',
            jobTitle: '',
            email: '',
            phone: '',
            location: '',
            socials: []
        },
        sections: []
    });

    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const [activeEntryIndex, setActiveEntryIndex] = useState<number>(0);
    const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
    const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
    const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
    const [isIconModalOpen, setIsIconModalOpen] = useState(false);
    const [activeIconSectionId, setActiveIconSectionId] = useState<string | null>(null);

    const toggleSectionExpansion = (sectionId: string) => {
        setExpandedSectionId(prev => prev === sectionId ? null : sectionId);
    };

    const getSectionIcon = (section: ResumeSection) => {
        const iconClass = "w-4 h-4 sm:w-5 sm:h-5";

        // Use custom icon if set
        if (section.icon) {
            const IconComponent = (require('lucide-react') as any)[section.icon];
            if (IconComponent) return <IconComponent className={iconClass} />;
        }

        // Fallback to defaults
        switch (section.type) {
            case 'Profile': return <User className={iconClass} />;
            case 'Education': return <GraduationCap className={iconClass} />;
            case 'Experience': return <Briefcase className={iconClass} />;
            case 'Skills': return <Puzzle className={iconClass} />;
            case 'Languages': return <Globe className={iconClass} />;
            case 'Certificates': return <Award className={iconClass} />;
            case 'Interests': return <BookOpen className={iconClass} />;
            case 'Projects': return <Layout className={iconClass} />;
            case 'Publications': return <FileText className={iconClass} />;
            case 'References': return <Users className={iconClass} />;
            default: return <Layout className={iconClass} />;
        }
    };

    // -------------------------------------------------------------------------
    // HELPERS & UTILITIES (Must be defined before usage in state/effects)
    // -------------------------------------------------------------------------

    // Robust template ID helper
    const isValidTemplate = (tid: any): tid is string =>
        typeof tid === 'string' && tid !== 'undefined' && tid !== 'null';

    const getInitialTemplateId = (): string | undefined => {
        const tid = searchParams.get('templateId');
        return isValidTemplate(tid) ? tid : undefined;
    };

    // Sanitization utility for Firestore
    const sanitizeFirestoreData = (obj: any): any => {
        if (Array.isArray(obj)) {
            return obj.map(sanitizeFirestoreData);
        } else if (obj !== null && typeof obj === 'object') {
            return Object.fromEntries(
                Object.entries(obj)
                    .filter(([_, v]) => v !== undefined)
                    .map(([k, v]) => [k, sanitizeFirestoreData(v)])
            );
        }
        return obj;
    };

    const [activeTemplateId, setActiveTemplateId] = useState<string | undefined>(getInitialTemplateId());
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    // Firebase Saving State
    const [id, setId] = useState<string | null>(searchParams.get('id'));
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [toastMessage, setToastMessage] = useState('Changes saved');
    const [showToast, setShowToast] = useState(false);



    const activeTemplate = getActiveTemplate(activeTemplateId || null);
    const [lastSavedDisplay, setLastSavedDisplay] = useState<string>('');

    useEffect(() => {
        if (lastSaved) {
            setLastSavedDisplay(lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
    }, [lastSaved]);

    console.log("[Editor] Current State - ResumeData:", resumeData);
    console.log("[Editor] Current State - Sections:", resumeData.sections.length);

    // 1. Loading Logic
    useEffect(() => {
        const loadInitialData = async () => {
            console.log("[Editor] Initializing data. User:", user?.uid, "ID:", id);

            // ALWAYS check for imported data first, as it takes precedence
            const importedData = localStorage.getItem('imported_resume_data');
            if (importedData) {
                try {
                    const rawParsed = JSON.parse(importedData);
                    console.log("[Editor] Found imported data. Validating schema...");

                    // VALIDATION MAPPER: Ensure 100% compatibility
                    const validatedData = ResumeParser.mapParsedDataToSchema(rawParsed);

                    setResumeData(validatedData);
                    setActiveTemplateId('template-1'); // Default to Template 1 on import
                    localStorage.removeItem('imported_resume_data');

                    // SUCCESS TOAST
                    setToastMessage('Resume imported successfully!');
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);

                    setIsLoaded(true);
                    return; // Stop here, import is fresh
                } catch (e) {
                    console.error('[Editor] Failed to parse imported data', e);
                }
            }

            if (!id || !user) {
                // Check for regular session data
                const savedData = localStorage.getItem('resume_data');
                if (savedData) {
                    try {
                        const parsed = JSON.parse(savedData);
                        console.log("[Editor] Loading regular session data.");

                        if (parsed.data) {
                            setResumeData(ResumeParser.mapParsedDataToSchema(parsed.data));
                            // Only overwrite template if URL doesn't have a valid one
                            if (!isValidTemplate(initialTemplateId) && isValidTemplate(parsed.templateId)) {
                                setActiveTemplateId(parsed.templateId);
                            }
                        } else if (parsed.personalDetails) {
                            setResumeData(ResumeParser.mapParsedDataToSchema(parsed));
                        }
                    } catch (e) {
                        console.error('[Editor] Failed to parse session data', e);
                    }
                }
                setIsLoaded(true);
                return;
            }

            // If we have an ID and user, try to load from Firebase
            try {
                console.log("[Editor] Loading from Firebase ID:", id);
                const docRef = doc(db, 'resumes', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const docData = docSnap.data();
                    if (docData.userId === user.uid) {
                        console.log("[Editor] Firebase data loaded. Template:", docData.templateId);
                        setResumeData(ResumeParser.mapParsedDataToSchema(docData.data));
                        const loadedTemplate = docData.templateId;
                        // URL PRIORITY: Only override URL template if URL doesn't have a valid one
                        if (!isValidTemplate(initialTemplateId) && isValidTemplate(loadedTemplate)) {
                            console.log("[Editor] Setting active template from Firebase:", loadedTemplate);
                            setActiveTemplateId(loadedTemplate);
                        }
                    } else {
                        console.warn("[Editor] Permission denied for resume ID:", id);
                    }
                } else {
                    console.warn("[Editor] No such document in Firebase:", id);
                }
            } catch (error) {
                console.error("[Editor] Error loading from Firebase:", error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadInitialData();
    }, [id, user]);

    // 2. Save Logic
    const saveResume = async (forceTemplateId?: string) => {
        if (!user || !isLoaded) return;

        const templateToSave = isValidTemplate(forceTemplateId)
            ? forceTemplateId
            : (isValidTemplate(activeTemplateId) ? activeTemplateId : getInitialTemplateId());

        // Don't auto-save empty resumes if it's a new one
        if (!id && !resumeData.personalDetails.fullName && resumeData.sections.length === 0) {
            return;
        }

        setIsSaving(true);
        try {
            const sanitizedData = sanitizeFirestoreData(resumeData);
            let savedId = id;
            if (id) {
                // UPDATE
                const docRef = doc(db, 'resumes', id);
                await updateDoc(docRef, {
                    templateId: templateToSave,
                    data: sanitizedData,
                    updatedAt: serverTimestamp(),
                });
            } else {
                // CREATE
                const docRef = await addDoc(collection(db, 'resumes'), {
                    userId: user.uid,
                    templateId: templateToSave,
                    data: sanitizedData,
                    updatedAt: serverTimestamp(),
                    createdAt: serverTimestamp(),
                });
                savedId = docRef.id;
                setId(docRef.id);
            }

            // Update URL with correct ID
            const searchParams = new URLSearchParams(window.location.search);
            if (savedId) {
                searchParams.set('id', savedId);
            }
            if (templateToSave) {
                searchParams.set('templateId', templateToSave);
            } else {
                searchParams.delete('templateId');
            }

            const newPath = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.replaceState(null, '', newPath);

            setLastSaved(new Date());
            setToastMessage('Changes saved');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);

            // Also keep local storage as backup
            localStorage.setItem('resume_data', JSON.stringify({
                data: resumeData,
                templateId: templateToSave
            }));

        } catch (error) {
            console.error("Error saving document:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // 3. Auto-save Effect
    useEffect(() => {
        if (!isLoaded || !user) {
            // For guests, still save to localStorage
            if (isLoaded && !user) {
                localStorage.setItem('resume_data', JSON.stringify(resumeData));
            }
            return;
        }

        const timer = setTimeout(() => {
            saveResume();
        }, 2000);

        return () => clearTimeout(timer);
    }, [resumeData, activeTemplateId, user, isLoaded]);


    const handleSectionChange = (updatedSection: ResumeSection) => {
        setResumeData((prev) => ({
            ...prev,
            sections: prev.sections.map((sec) => (sec.id === updatedSection.id ? updatedSection : sec)),
        }));
    };

    const handleDeleteSection = (sectionId: string) => {
        setResumeData((prev) => ({
            ...prev,
            sections: prev.sections.filter((sec) => sec.id !== sectionId),
        }));
        setActiveSectionId(null);
    };

    const handleAddSection = (type: SectionType) => {
        const newSection: ResumeSection = {
            id: generateId(),
            type,
            title: type,
            content: type === 'Profile' ? '' : [],
            isVisible: true
        };
        setResumeData((prev) => ({
            ...prev,
            sections: [...prev.sections, newSection],
        }));

        // Expand ONLY the freshly added section
        setExpandedSectionId(newSection.id);

        setActiveSectionId(newSection.id);
        setActiveEntryIndex(0);
        setIsAddContentModalOpen(false);
    };

    const handleDeleteEntry = (sectionId: string, index: number) => {
        setResumeData((prev) => {
            const section = prev.sections.find(s => s.id === sectionId);
            if (!section || !Array.isArray(section.content)) return prev;

            const newContent = section.content.filter((_, i) => i !== index);

            if (newContent.length === 0) {
                // If it was the last entry, delete the whole section
                return {
                    ...prev,
                    sections: prev.sections.filter(s => s.id !== sectionId)
                };
            }

            // Otherwise just update the content
            return {
                ...prev,
                sections: prev.sections.map(s =>
                    s.id === sectionId ? { ...s, content: newContent as any } : s
                )
            };
        });
        setActiveSectionId(null);
    };

    const renderActiveForm = () => {
        if (activeSectionId === 'personal') {
            return (
                <PersonalDetailsForm
                    data={resumeData.personalDetails}
                    onChange={(data) => setResumeData((prev) => ({ ...prev, personalDetails: data }))}
                    onDone={() => setActiveSectionId(null)}
                />
            );
        }

        const section = resumeData.sections.find(s => s.id === activeSectionId);

        if (!section) return null;

        if (section.type === 'Profile') {
            return (
                <ProfileForm
                    section={section}
                    onChange={handleSectionChange}
                    onDone={() => setActiveSectionId('')}
                    onDelete={() => handleDeleteSection(section.id)}
                />
            );
        }

        const commonFormProps = {
            section,
            onChange: handleSectionChange,
            onDone: () => setActiveSectionId(''),
            onDelete: () => handleDeleteEntry(section.id, activeEntryIndex),
            entryIndex: activeEntryIndex,
        };

        if (section.type === 'Skills') {
            return <SkillsForm {...commonFormProps} />;
        }

        if (section.type === 'Education') {
            return <EducationForm {...commonFormProps} />;
        }

        if (section.type === 'Certificates') {
            return <CertificateForm {...commonFormProps} />;
        }

        if (section.type === 'Interests') {
            return <InterestForm {...commonFormProps} />;
        }

        if (section.type === 'Projects') {
            return <ProjectForm {...commonFormProps} />;
        }

        if (section.type === 'Publications') {
            return <PublicationForm {...commonFormProps} />;
        }

        if (section.type === 'References') {
            return <ReferenceForm {...commonFormProps} />;
        }

        if (section.type === 'Custom' || ['Courses', 'Awards', 'Organisations', 'Volunteering', 'Research'].includes(section.type)) {
            return <CustomSectionForm {...commonFormProps} />;
        }

        if (section.type === 'Languages') {
            return <LanguagesForm {...commonFormProps} />;
        }

        if (section.type === 'Experience') {
            return <ExperienceForm {...commonFormProps} />;
        }

        return (
            <div className="bg-white p-8 rounded-xl">
                <p>Form for {section.type} is coming soon.</p>
                <button
                    onClick={() => setActiveSectionId('')}
                    className="mt-4 px-4 py-2 bg-gray-200 rounded"
                >
                    Done
                </button>
            </div>
        );
    };

    const handleDownload = async (format: 'pdf' | 'png', size: 'a4' | 'letter') => {
        if (!user) {
            openModal('login');
            return;
        }

        setIsDownloading(true);
        const originalElement =
            document.getElementById('resume-preview') ||
            document.getElementById('resume-preview-mobile') ||
            document.getElementById('preview-container') ||
            document.getElementById('preview-container-mobile');

        if (!originalElement) {
            setIsDownloading(false);
            return;
        }

        // 1. Create a hidden capture container
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '210mm'; // Standard A4 width for layout
        container.style.backgroundColor = '#ffffff';

        // 2. Clone the preview and clean up styles for capture
        const clone = originalElement.cloneNode(true) as HTMLElement;
        const previewContent = clone.querySelector('div') || clone;

        // Ensure the content is raw and full-width
        if (previewContent) {
            previewContent.style.transform = 'none';
            previewContent.style.margin = '0';
            previewContent.style.width = '210mm';
            previewContent.style.minHeight = '297mm';
            previewContent.style.boxShadow = 'none';
        }

        document.body.appendChild(container);

        try {
            container.appendChild(clone);

            // Wait for fonts and images to load - Syncing window width for stable rendering
            await new Promise(r => setTimeout(r, 1200));

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
                link.download = `resume.${format}`;
                link.href = dataUrl;
                link.click();
            } else {
                // PDF Implementation - Precise Contiguous Slicing
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: size
                });

                const pageDims = {
                    a4: { width: 210, height: 297 },
                    letter: { width: 215.9, height: 279.4 }
                }[size];

                const pdfWidth = pageDims.width;
                const pdfHeight = pageDims.height;

                // Content fitting: Map the captured width (210mm) to the PDF width
                const imgWidth = pdfWidth;
                const imgHeight = (img.height * pdfWidth) / img.width;

                let heightLeft = imgHeight;
                let position = 0;

                while (heightLeft > 0) {
                    // Use JPEG for faster PDF generation and smaller file size without quality loss at 3x
                    const pageCanvas = dataUrl;

                    pdf.addImage(
                        pageCanvas,
                        'JPEG',
                        0,
                        -position,
                        imgWidth,
                        imgHeight,
                        undefined,
                        'FAST'
                    );

                    heightLeft -= pdfHeight;
                    position += pdfHeight;

                    if (heightLeft > 0) {
                        pdf.addPage(size, 'portrait');
                    }
                }

                pdf.save(`resume.pdf`);
            }
        } catch (error) {
            console.error('Error generating document:', error);
            alert('Failed to generate document. Please try again.');
        } finally {
            if (document.body.contains(container)) {
                document.body.removeChild(container);
            }
            setIsDownloading(false);
        }
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

            {/* Top Navigation Bar - Floating Design */}
            <div className="sticky top-0 z-50 w-full flex justify-center py-2 sm:py-4">
                <header className="w-full max-w-8xl bg-white border border-gray-200 rounded-2xl sm:rounded-[1.5rem] shadow-lg mx-2 sm:mx-4">
                    <div className="px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
                            {/* Back Button - Dashboard */}
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-black text-[#1A1A1A] bg-[#F3F1EC] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 shadow-sm active:scale-95 group"
                                type="button"
                            >
                                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
                                <span className="hidden xs:inline">Dashboard</span>
                            </button>

                            <div className="h-6 w-px bg-black/[0.05] hidden xs:block" />

                            <div className="hidden sm:flex items-center gap-2.5 text-xs font-black text-[#1A1A1A] opacity-30">
                                <PenTool className="w-4 h-4" />
                                <span className="hidden md:inline">Write</span>
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
                                        <span className="hidden lg:inline">Saved</span> {/*{lastSavedDisplay && `at ${lastSavedDisplay}`}*/}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                                        <CloudOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        <span className="hidden lg:inline">Offline</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                            {/* Template Selector */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="hidden xl:block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Template</span>
                                <button
                                    onClick={() => setIsTemplateModalOpen(true)}
                                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-gray-100 border border-gray-100 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold text-gray-700 hover:bg-white hover:border-blue-500 transition-all shadow-sm"
                                    type="button"
                                >
                                    <span className="hidden xs:inline">Theme</span> {activeTemplate.name.replace('Template ', '')}
                                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                </button>
                            </div>

                            {/* Vertical Separator */}
                            <div className="w-px h-6 bg-black/[0.08] hidden sm:block" />

                            {/* Format Indicator */}
                            <div className="hidden lg:flex items-center gap-3">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Format</span>
                                <div className="flex bg-white/50 rounded-lg p-0.5 border border-black/[0.03]">
                                    <div className="px-3 py-1 bg-white text-black shadow-sm border border-black/[0.03] rounded-md text-[10px] font-black">
                                        A4
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={() => setIsDownloadModalOpen(true)}
                                className="bg-[#1A1A1A] text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold hover:bg-black transition-all flex items-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
                                type="button"
                            >
                                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="hidden xs:inline">{isDownloading ? '...' : 'Download'}</span>
                            </button>
                        </div>
                    </div>
                </header>
            </div>


            <main className="flex-1 max-w-8xl mx-auto px-4 py-4 w-full overflow-hidden relative">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start h-full">
                    {/* Left: Scrollable Form Area */}
                    <div className="w-full lg:w-1/2 h-full overflow-y-auto scrollbar-hide space-y-8 pb-32">
                        <div className="max-w-2xl mx-auto space-y-8">

                            {/* If a specific form is active, show it */}
                            {activeSectionId ? (
                                renderActiveForm()
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h1 className="text-2xl font-black text-[#1a1b3a] tracking-tight uppercase italic pl-1">Content</h1>
                                    </div>

                                    <PersonalDetailsCard
                                        data={resumeData.personalDetails}
                                        onEdit={() => setActiveSectionId('personal')}
                                    />

                                    <div className="space-y-4">
                                        {resumeData.sections.map((section, sectionIndex) => (
                                            <div
                                                key={section.id}
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    if (draggedSectionIndex === null || draggedSectionIndex === sectionIndex) return;

                                                    const newSections = [...resumeData.sections];
                                                    const [moved] = newSections.splice(draggedSectionIndex, 1);
                                                    newSections.splice(sectionIndex, 0, moved);
                                                    setResumeData(prev => ({ ...prev, sections: newSections }));
                                                    setDraggedSectionIndex(sectionIndex);
                                                }}
                                                onDragEnd={() => setDraggedSectionIndex(null)}
                                                className={`relative group/section transition-all duration-300 ${draggedSectionIndex === sectionIndex ? 'opacity-40 blur-[1px] translate-x-2' : 'opacity-100 translate-x-0'
                                                    }`}
                                            >
                                                {/* Section Drag Handle - Integrated vertical handle */}
                                                <div
                                                    draggable
                                                    onDragStart={() => setDraggedSectionIndex(sectionIndex)}
                                                    className="absolute -left-14 top-4 bottom-4 w-10 hidden lg:flex items-center justify-center p-2 cursor-grab active:cursor-grabbing text-gray-300 hover:text-blue-600 transition-all bg-white hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-2xl opacity-30 group-hover/section:opacity-100 shadow-sm z-30"
                                                >
                                                    <GripVertical className="w-6 h-6" />
                                                </div>

                                                <SectionAccordion
                                                    section={section}
                                                    icon={getSectionIcon(section)}
                                                    isOpen={expandedSectionId === section.id}
                                                    onToggleExpansion={() => toggleSectionExpansion(section.id)}
                                                    onAddEntry={() => {
                                                        setExpandedSectionId(section.id);
                                                        if (section.type === 'Profile') {
                                                            setActiveSectionId(section.id);
                                                        } else {
                                                            const currentItems = (section.content as any[]) || [];
                                                            const newIndex = currentItems.length;
                                                            setActiveSectionId(section.id);
                                                            setActiveEntryIndex(newIndex);
                                                        }
                                                    }}
                                                    onEditEntry={(index) => {
                                                        setExpandedSectionId(section.id);
                                                        setActiveSectionId(section.id);
                                                        setActiveEntryIndex(index);
                                                    }}
                                                    onEditSection={() => {
                                                        setActiveSectionId(section.id);
                                                    }}
                                                    onToggleVisibility={(index) => {
                                                        if (Array.isArray(section.content)) {
                                                            const newContent = [...section.content];
                                                            const currentItem = newContent[index] as any;
                                                            newContent[index] = {
                                                                ...currentItem,
                                                                isVisible: currentItem.isVisible === false ? true : false
                                                            };
                                                            handleSectionChange({ ...section, content: newContent as any });
                                                        } else {
                                                            const updatedSection = { ...section, isVisible: !section.isVisible };
                                                            handleSectionChange(updatedSection);
                                                        }
                                                    }}
                                                    onReorderEntries={(from, to) => {
                                                        if (Array.isArray(section.content)) {
                                                            const newContent = [...section.content];
                                                            const [moved] = newContent.splice(from, 1);
                                                            newContent.splice(to, 0, moved);
                                                            handleSectionChange({ ...section, content: newContent });
                                                        }
                                                    }}
                                                    onEditIcon={() => {
                                                        setActiveIconSectionId(section.id);
                                                        setIsIconModalOpen(true);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setIsAddContentModalOpen(true)}
                                        className="w-full py-6 border-2 border-dashed border-gray-200 rounded-[2rem] flex items-center justify-center gap-4 text-gray-400 font-black uppercase tracking-widest text-xs hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50/30 transition-all group mt-6"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors shadow-sm">
                                            <Plus className="w-6 h-6" />
                                        </div>
                                        <span>Add Section</span>
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>


                    {/* Right Column: Preview Area - Hidden on mobile, shown on lg */}
                    <div className="hidden lg:flex lg:w-1/2 h-full overflow-y-auto scrollbar-hide justify-center pb-0">
                        {/* Shadow Container for the Page */}
                        <div className="relative group">
                            <div className="transition-all duration-500 rounded-sm">
                                <div id="preview-container" className="origin-top scale-[0.8]">
                                    <div id="resume-preview" className="w-[210mm] min-h-[297mm] bg-white shadow-xl">
                                        <LivePreview data={resumeData} templateId={activeTemplateId} />
                                    </div>
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
                        Preview Resume
                    </button>
                </div>
            </main>

            {/* Mobile Preview Full-screen Modal */}
            {isPreviewModalOpen && (
                <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-300">
                    {/* Modal Header */}
                    <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                <Layout className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Resume Preview</h3>
                                <p className="text-[10px] font-bold text-gray-400">Mobile Adaptation</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsPreviewModalOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Modal Content: Scrollable Preview */}
                    <div className="flex-1 overflow-y-auto bg-gray-50 px-8 p-4  scrollbar-hide">
                        <div className="flex justify-center min-h-full py-8">
                            <div className="transform origin-top scale-[0.45] xs:scale-[0.5] sm:scale-[0.85] md:scale-[1] w-fit transition-transform duration-500">
                                <div id="preview-container-mobile">
                                    <div id="resume-preview-mobile" className="w-[210mm] min-h-[297mm] bg-white shadow-2xl ">
                                        <LivePreview data={resumeData} templateId={activeTemplateId} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer Actions */}
                    <div className="p-4 border-t border-gray-100 bg-white grid grid-cols-2 gap-3 pb-8">
                        <button
                            onClick={() => {
                                setIsPreviewModalOpen(false);
                                setIsTemplateModalOpen(true);
                            }}
                            className="flex items-center justify-center gap-2 py-4 bg-gray-50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-all border border-gray-100"
                        >
                            <Palette className="w-4 h-4" />
                            Theme
                        </button>
                        <button
                            onClick={() => {
                                setIsPreviewModalOpen(false);
                                setIsDownloadModalOpen(true);
                            }}
                            className="flex items-center justify-center gap-2 py-4 bg-black rounded-2xl text-[11px] font-black uppercase tracking-widest text-white shadow-xl active:scale-95 transition-all"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>
            )}

            <AddContentModal
                isOpen={isAddContentModalOpen}
                onClose={() => setIsAddContentModalOpen(false)}
                onSelect={handleAddSection}
            />

            <DownloadModal
                isOpen={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
                onDownload={handleDownload}
            />

            <ResumeTemplateModal
                isOpen={isTemplateModalOpen}
                onClose={() => setIsTemplateModalOpen(false)}
                activeTemplateId={activeTemplateId || 'template-1'}
                onSelect={(id) => {
                    setActiveTemplateId(id);
                    saveResume(id);
                }}
            />

            <IconSelectionModal
                isOpen={isIconModalOpen}
                onClose={() => {
                    setIsIconModalOpen(false);
                    setActiveIconSectionId(null);
                }}
                currentIcon={resumeData.sections.find(s => s.id === activeIconSectionId)?.icon}
                onSelect={(iconName) => {
                    if (activeIconSectionId) {
                        const section = resumeData.sections.find(s => s.id === activeIconSectionId);
                        if (section) {
                            handleSectionChange({ ...section, icon: iconName });
                        }
                    }
                }}
            />

            {/* Saving Snackbar */}
            {isSaving && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-[#1a1b3a] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">Saving changes...</span>
                    </div>
                </div>
            )}

            {showToast && !isSaving && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
                        {toastMessage.includes('imported') ? <Import className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        <span className="text-xs font-bold uppercase tracking-widest">{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>

    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={
            <div className="h-screen bg-[#F3F0EA] flex items-center justify-center">
                <Layout className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        }>
            <Editor />
        </Suspense>
    );
}
