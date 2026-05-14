'use client';

import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { ImportResumeModal } from './ImportResumeModal';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { templates } from '@/components/editor/previews/templates';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    deleteDoc,
    doc,
    addDoc,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import { FileText, Clock, MoreVertical, Edit3, Copy, Trash2, ChevronRight } from 'lucide-react';
import { ConfirmModal } from '@/components/ui/ConfirmModal';



const CATEGORIES = [
    { id: 'all', label: 'All Templates' },
    { id: 'popular', label: 'Popular' },
    { id: 'simple', label: 'ATS' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' },
];

const TEMPLATES_MAPPING = {
    popular: [1, 8, 5, 7, 6, 4, 9, 35, 39],
    simple: [2, 20, 21, 26, 27, 28, 29, 30, 32, 36],
    modern: [10, 12, 13, 14, 15, 16, 18, 31, 34, 37, 40],
    creative: [3, 11, 17, 19, 22, 23, 24, 25, 33, 38]
};

const ActionCard = ({ icon: Icon, title, onClick, subtitle }: { icon: any, title: string, onClick?: () => void, subtitle?: string }) => (
    <div
        onClick={onClick}
        className="group aspect-[210/297] bg-white rounded-[1.5rem] sm:rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative overflow-hidden border-2 border-dashed border-black/[0.3] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2"
        /* Essential for smooth rounded corners during the hover transition */
        style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
    >
        {/* Soft Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[#F3F1EC]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 text-center">
            {/* Dynamic Icon Container */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.25rem] sm:rounded-[1.5rem] bg-[#F3F1EC] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#1A1A1A] transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-rotate-12">
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#1A1A1A] group-hover:text-[#F3F1EC] transition-colors duration-500" />
            </div>

            {/* Typography */}
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                Action
            </span>
            <h3 className="text-[#1A1A1A] font-black text-lg sm:text-xl tracking-tight transition-colors">
                {title}
            </h3>
            {subtitle && (
                <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1 group-hover:text-slate-500 transition-colors line-clamp-2">
                    {subtitle}
                </p>
            )}
        </div>

        {/* Hover Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </div>
);

export const DashboardGrid = () => {
    const { user } = useAuth();
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [savedResumes, setSavedResumes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; resumeId: string | null }>({
        isOpen: false,
        resumeId: null
    });
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const router = useRouter();


    // Fetch Saved Resumes
    React.useEffect(() => {
        const fetchResumes = async () => {
            if (!user) {
                setSavedResumes([]);
                setIsLoading(false);
                return;
            }
            try {
                let q = query(
                    collection(db, 'resumes'),
                    where('userId', '==', user.uid),
                    orderBy('updatedAt', 'desc')
                );

                let querySnapshot;
                try {
                    querySnapshot = await getDocs(q);
                } catch (err: any) {
                    console.warn("Ordered fetch failed, falling back to unordered", err);
                    q = query(
                        collection(db, 'resumes'),
                        where('userId', '==', user.uid)
                    );
                    querySnapshot = await getDocs(q);
                }

                const resumes: any[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort locally if fallback was used
                if (querySnapshot.metadata.fromCache || !resumes[0]?.updatedAt) {
                    setSavedResumes(resumes);
                } else {
                    const sorted = [...resumes].sort((a, b) => {
                        const timeA = a.updatedAt?.toMillis?.() || 0;
                        const timeB = b.updatedAt?.toMillis?.() || 0;
                        return timeB - timeA;
                    });
                    setSavedResumes(sorted);
                }
            } catch (error) {
                console.error("Error fetching resumes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResumes();
    }, [user]);

    // Handle clicking outside to close menu
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeMenuId && !(event.target as HTMLElement).closest('.dropdown-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    const handleDelete = async (e: React.MouseEvent, resumeId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteModal({ isOpen: true, resumeId });
    };

    const confirmDelete = async () => {
        if (!deleteModal.resumeId) return;
        try {
            await deleteDoc(doc(db, 'resumes', deleteModal.resumeId));
            setSavedResumes(prev => prev.filter(r => r.id !== deleteModal.resumeId));
        } catch (error) {
            console.error("Error deleting resume:", error);
        }
    };


    const handleDuplicate = async (e: React.MouseEvent, resume: any) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const { id, ...dataToCopy } = resume;
            const newDoc = await addDoc(collection(db, 'resumes'), {
                ...dataToCopy,
                data: {
                    ...resume.data,
                    personalDetails: {
                        ...resume.data.personalDetails,
                        fullName: `${resume.data.personalDetails.fullName || 'Untitled'} (Copy)`
                    }
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            const fullNewDoc = {
                id: newDoc.id,
                ...dataToCopy,
                data: {
                    ...resume.data,
                    personalDetails: {
                        ...resume.data.personalDetails,
                        fullName: `${resume.data.personalDetails.fullName || 'Untitled'} (Copy)`
                    }
                },
                updatedAt: { toMillis: () => Date.now() }
            };
            setSavedResumes(prev => [fullNewDoc, ...prev]);
        } catch (error) {
            console.error("Error duplicating resume:", error);
        }
    };

    const handleRename = async (e: React.MouseEvent, resumeId: string, currentName: string) => {
        e.preventDefault();
        e.stopPropagation();
        const newName = window.prompt("Enter a new name for this resume:", currentName || 'Untitled');
        if (!newName || newName === currentName) return;
        try {
            await updateDoc(doc(db, 'resumes', resumeId), {
                'data.personalDetails.fullName': newName,
                updatedAt: serverTimestamp()
            });
            setSavedResumes(prev => prev.map(r =>
                r.id === resumeId ? { ...r, data: { ...r.data, personalDetails: { ...r.data.personalDetails, fullName: newName } } } : r
            ));
        } catch (error) {
            console.error("Error renaming resume:", error);
        }
    };


    const filteredTemplates = activeCategory === 'all'
        ? templates
        : templates.filter(t => {
            const idNum = parseInt(t.id.replace('template-', ''));
            return TEMPLATES_MAPPING[activeCategory as keyof typeof TEMPLATES_MAPPING].includes(idNum);
        });

    return (
        <div className="space-y-12">
            {/* Sticky Category Navigation - Wrapping for better mobile fit */}
            <div className="sticky top-[64px] md:top-[40px] z-30 w-full flex justify-center mb-10 sm:mb-12 px-4 sm:px-0">
                <div className="w-fit bg-[#f0eeeb]/95 backdrop-blur-md border border-black/[0.03] rounded-3xl sm:rounded-full shadow-sm transition-all duration-300">
                    <div className="max-w-full px-4 sm:px-6 py-2.5 sm:py-3">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`text-xs sm:text-sm md:text-base font-bold whitespace-nowrap px-4 sm:px-6 py-2 rounded-full transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-[#1a1a1a] text-white shadow-lg shadow-black/10 scale-105'
                                        : 'text-gray-500 hover:text-[#1a1a1a] hover:bg-white/50'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Saved Resumes Section */}
            {!isLoading && savedResumes.length > 0 && (
                <div className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8 pl-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black flex items-center justify-center shadow-lg">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-[#1a1b3a] tracking-tight leading-tight">
                                Your Saved Resumes
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                Continue where you left off
                            </p>
                        </div>
                    </div>

                    <div className="px-6 sm:px-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">
                            {savedResumes.map((resume) => {
                                const template = templates.find(t => t.id === resume.templateId);
                                return (
                                    <Link
                                        key={resume.id}
                                        href={`/editor?templateId=${resume.templateId || ''}&id=${resume.id}`}
                                        className={`group transition-all duration-500 ${activeMenuId === resume.id ? 'z-[100] relative' : 'hover:z-50 relative'}`}
                                    >
                                        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-4 border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative">
                                            <div className="aspect-[210/297] bg-[#F9F8F6] rounded-[1rem] sm:rounded-[1.5rem] mb-3 sm:mb-4 overflow-hidden relative border border-black/[0.02]">
                                                {template && (
                                                    <Image
                                                        src={template.thumbnail}
                                                        alt="Resume Thumbnail"
                                                        fill
                                                        className="object-cover object-top"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                                                    />
                                                )}

                                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                                                        <ChevronRight className="w-6 h-6 text-black" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-2 flex justify-between items-start">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-black text-[#1a1b3a] truncate mb-1">
                                                        {resume.data.personalDetails.fullName || 'Untitled Resume'}
                                                    </h3>
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <Clock className="w-3 h-3" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">
                                                            {resume.updatedAt?.toDate ? resume.updatedAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Recently'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="relative dropdown-container">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setActiveMenuId(activeMenuId === resume.id ? null : resume.id);
                                                        }}
                                                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-slate-400 hover:text-[#1a1b3a]"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                    {activeMenuId === resume.id && (
                                                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-black/[0.05] z-[110] py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                            <button
                                                                onClick={(e) => {
                                                                    handleRename(e, resume.id, resume.data.personalDetails.fullName);
                                                                    setActiveMenuId(null);
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                                            >
                                                                <Edit3 className="w-3.5 h-3.5" />
                                                                Rename
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    handleDuplicate(e, resume);
                                                                    setActiveMenuId(null);
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                                            >
                                                                <Copy className="w-3.5 h-3.5" />
                                                                Duplicate
                                                            </button>
                                                            <div className="h-px bg-black/[0.05] my-1" />
                                                            <button
                                                                onClick={(e) => {
                                                                    handleDelete(e, resume.id);
                                                                    setActiveMenuId(null);
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="h-px w-full bg-black/[0.05] mt-16" />
                </div>
            )}


            <div className="px-6 sm:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">
                    {/* Always show action cards at the start */}
                    <Link href="/editor?templateId=" className="group">
                        <div
                            className="aspect-[210/297] bg-white rounded-[1.5rem] sm:rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative overflow-hidden border-2 border-dashed border-black/[0.3] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-2"
                            style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[#F3F1EC]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col items-center p-4 text-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.25rem] sm:rounded-[1.5rem] bg-[#F3F1EC] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#1A1A1A] transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:rotate-90">
                                    <Plus className="w-7 h-7 sm:w-8 sm:h-8 text-[#1A1A1A] group-hover:text-[#F3F1EC] transition-colors duration-500" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                                    New Project
                                </span>
                                <h3 className="text-[#1A1A1A] font-black text-lg sm:text-xl tracking-tight transition-colors">
                                    Create Blank
                                </h3>
                                <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1 group-hover:text-slate-500 transition-colors">
                                    Start from scratch
                                </p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                    </Link>

                    <ActionCard
                        icon={Upload}
                        title="Import Resume"
                        subtitle="Upload PDF or DOCX"
                        onClick={() => setIsImportModalOpen(true)}
                    />

                    {filteredTemplates.map((template) => (
                        <div
                            key={template.id}
                            className="group relative bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                            style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
                        >
                            {/* Template Image Container */}
                            <div className="aspect-[210/297] relative bg-[#F9F8F6] overflow-hidden rounded-t-[1.5rem] sm:rounded-t-[2rem]">
                                <Image
                                    src={template.thumbnail}
                                    alt={template.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                                    style={{ willChange: 'transform' }}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                                    priority={false}
                                />

                                {/* Hover Overlay - Using #1A1A1A Theme */}
                                <Link
                                    href={`/editor?templateId=${template.id}`}
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#1A1A1A]/10 transition-all duration-500 z-10 backdrop-blur-[2px]"
                                >
                                    <div className="bg-[#1A1A1A] text-[#F3F1EC] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-black hover:scale-105 active:scale-95">
                                        Use Template
                                    </div>
                                </Link>
                            </div>

                            {/* Card Footer - Matching the premium typography */}
                            <div className="p-4 sm:p-5 bg-white border-t border-[#F3F1EC] flex justify-between items-center relative z-20">
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {template.name}
                                    </span>
                                </div>

                                {/* Free Tag */}
                                <span className="text-[9px] sm:text-[10px] font-black px-2 sm:px-3 py-1 bg-[#F3F1EC] text-[#1A1A1A] rounded-full uppercase tracking-tighter shrink-0 ml-2">
                                    Free
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ImportResumeModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
            />
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, resumeId: null })}
                onConfirm={confirmDelete}
                title="Delete Resume?"
                message="Are you sure you want to delete this resume? This action cannot be undone."
                confirmLabel="Delete"
                isDestructive={true}
            />
        </div>
    );
};
