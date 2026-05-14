'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Clock, FileText, ChevronRight, Layout, MoreVertical, Trash2, Copy, Edit3, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ConfirmModal } from '@/components/ui/ConfirmModal';


const COVER_LETTERS = Array.from({ length: 50 }, (_, i) => i + 1);

export default function CoverLetterPage() {
    const { user } = useAuth();
    const [savedLetters, setSavedLetters] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; letterId: string | null }>({
        isOpen: false,
        letterId: null
    });
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);


    useEffect(() => {
        const fetchLetters = async () => {
            if (!user) {
                setSavedLetters([]);
                setIsLoading(false);
                return;
            }
            try {
                // Try ordered query first
                let q = query(
                    collection(db, 'coverLetters'),
                    where('userId', '==', user.uid),
                    orderBy('updatedAt', 'desc')
                );

                let querySnapshot;
                try {
                    querySnapshot = await getDocs(q);
                } catch (err: any) {
                    console.warn("Ordered fetch failed, likely missing index. Falling back to unordered fetch.", err);
                    // Fallback to unordered query if index is missing
                    q = query(
                        collection(db, 'coverLetters'),
                        where('userId', '==', user.uid)
                    );
                    querySnapshot = await getDocs(q);
                }

                const letters: any[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // If we fell back to unordered, we should sort locally
                if (querySnapshot.metadata.fromCache || !letters[0]?.updatedAt) {
                    setSavedLetters(letters);
                } else {
                    // Sort locally if we had to fallback
                    const sorted = [...letters].sort((a, b) => {
                        const timeA = a.updatedAt?.toMillis?.() || 0;
                        const timeB = b.updatedAt?.toMillis?.() || 0;
                        return timeB - timeA;
                    });
                    setSavedLetters(sorted);
                }
            } catch (error) {
                console.error("Error fetching cover letters:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLetters();
    }, [user]);

    // Handle clicking outside to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeMenuId && !(event.target as HTMLElement).closest('.dropdown-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    const handleDelete = async (e: React.MouseEvent, letterId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteModal({ isOpen: true, letterId });
    };

    const confirmDelete = async () => {
        if (!deleteModal.letterId) return;
        try {
            await deleteDoc(doc(db, 'coverLetters', deleteModal.letterId));
            setSavedLetters(prev => prev.filter(l => l.id !== deleteModal.letterId));
        } catch (error) {
            console.error("Error deleting letter:", error);
            alert("Failed to delete design. Please try again.");
        }
    };


    const handleDuplicate = async (e: React.MouseEvent, letter: any) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const { id, ...dataToCopy } = letter;
            const newDoc = await addDoc(collection(db, 'coverLetters'), {
                ...dataToCopy,
                data: {
                    ...letter.data,
                    personal: {
                        ...letter.data.personal,
                        fullName: `${letter.data.personal.fullName || 'Untitled'} (Copy)`
                    }
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            // Refresh list
            const fullNewDoc = {
                id: newDoc.id,
                ...dataToCopy,
                data: {
                    ...letter.data,
                    personal: {
                        ...letter.data.personal,
                        fullName: `${letter.data.personal.fullName || 'Untitled'} (Copy)`
                    }
                },
                updatedAt: { toMillis: () => Date.now() } // Temp fallback for local sort
            };
            setSavedLetters(prev => [fullNewDoc, ...prev]);
        } catch (error) {
            console.error("Error duplicating letter:", error);
            alert("Failed to duplicate design.");
        }
    };

    const handleRename = async (e: React.MouseEvent, letterId: string, currentName: string) => {
        e.preventDefault();
        e.stopPropagation();

        const newName = window.prompt("Enter a new name for this design:", currentName || 'Untitled');
        if (!newName || newName === currentName) return;

        try {
            await updateDoc(doc(db, 'coverLetters', letterId), {
                'data.personal.fullName': newName,
                updatedAt: serverTimestamp()
            });

            setSavedLetters(prev => prev.map(l =>
                l.id === letterId ? { ...l, data: { ...l.data, personal: { ...l.data.personal, fullName: newName } } } : l
            ));
        } catch (error) {
            console.error("Error renaming letter:", error);
            alert("Failed to rename design.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F1EC] pb-20 -m-4 md:-m-12 px-2 md:px-12 pt-0 md:pt-12">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-4 sm:pt-8">

                {/* Header Section */}
                <header className="mb-8 sm:mb-12 text-left max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1b3a] tracking-tight mb-4 text-left">
                        Create your cover letter
                    </h1>
                    <p className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                        Stand out from the crowd with a professionally designed cover letter.
                        Free, forever, with unlimited downloads.
                    </p>
                </header>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                        <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Loading your designs...</p>
                    </div>
                )}

                {/* Saved Cover Letters Section - Visible only if there are saved letters */}
                {!isLoading && savedLetters.length > 0 && (
                    <div className="mb-12 sm:mb-16">
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black flex items-center justify-center shadow-lg">
                                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-[#1a1b3a] tracking-tight leading-tight">
                                        Your Saved Designs
                                    </h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                        Continue where you left off
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 sm:px-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                                {savedLetters.map((letter) => (
                                    <Link
                                        key={letter.id}
                                        href={`/cover-letter/editor?templateId=${letter.templateId}&id=${letter.id}`}
                                        className={`group transition-all duration-500 ${activeMenuId === letter.id ? 'z-[100] relative' : 'hover:z-50 relative'}`}
                                    >
                                        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-4 border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 relative">
                                            <div className="aspect-[210/297] bg-[#F9F8F6] rounded-[1rem] sm:rounded-[1.5rem] mb-3 sm:mb-4 overflow-hidden relative border border-black/[0.02]">
                                                <Image
                                                    src={letter.thumbnailUrl || `/coverLetterTemplates/cover-letter-${letter.templateId}.webp`}
                                                    alt="Cover Letter Thumbnail"
                                                    fill
                                                    className="object-cover object-top"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                                                />

                                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                                                        <ChevronRight className="w-6 h-6 text-black" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-2 flex justify-between items-start group/card relative">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-black text-[#1a1b3a] truncate mb-1">
                                                        {letter.data.personal.fullName || 'Untitled'}
                                                    </h3>
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <Clock className="w-3 h-3" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">
                                                            {letter.updatedAt?.toDate ? letter.updatedAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Just now'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Action Menu */}
                                                <div className="relative dropdown-container">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setActiveMenuId(activeMenuId === letter.id ? null : letter.id);
                                                        }}
                                                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-slate-400 hover:text-[#1a1b3a]"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                    {activeMenuId === letter.id && (
                                                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-black/[0.05] z-[110] py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                            <button
                                                                onClick={(e) => {
                                                                    handleRename(e, letter.id, letter.data.personal.fullName);
                                                                    setActiveMenuId(null);
                                                                }}
                                                                className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                                            >
                                                                <Edit3 className="w-3.5 h-3.5" />
                                                                Rename
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    handleDuplicate(e, letter);
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
                                                                    handleDelete(e, letter.id);
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
                                ))}
                            </div>
                        </div>
                        <div className="h-px w-full bg-black/[0.05] mt-16" />
                    </div>
                )}

                <div className="flex items-center gap-3 mb-6 sm:mb-8 mt-4 sm:mt-8">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-black/[0.05] flex items-center justify-center shadow-sm">
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#1a1b3a] tracking-tight leading-tight">
                            Choose a Template
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            Professional layouts to get you started
                        </p>
                    </div>
                </div>

                <div className="px-6 sm:px-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">
                        <Link href="/cover-letter/editor" className="group">
                            <div className="aspect-[210/297] bg-white rounded-[1.5rem] sm:rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative overflow-hidden border-2 border-dashed border-black/[0.3] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-2">

                                {/* Subtle Inner Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[#F3F1EC]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col items-center p-4 text-center">
                                    {/* Icon Container */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.25rem] sm:rounded-[1.5rem] bg-[#F3F1EC] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#1A1A1A] transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:rotate-90">
                                        <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-[#1A1A1A] group-hover:text-white transition-colors duration-500" />
                                    </div>

                                    {/* Text Logic */}
                                    <h3 className="text-[#1A1A1A] font-black text-lg sm:text-xl tracking-tight transition-colors">
                                        Create Blank
                                    </h3>
                                    <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1 group-hover:text-slate-500 transition-colors">
                                        Start from scratch
                                    </p>
                                </div>

                                {/* Bottom Decorative Bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </div>
                        </Link>

                        {/* Templates */}
                        {COVER_LETTERS.map((num) => (
                            <div
                                key={num}
                                className="group relative bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                                style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
                            >
                                {/* Template Image Container */}
                                <div className="aspect-[210/297] relative bg-[#F9F8F6] overflow-hidden rounded-t-[1.5rem] sm:rounded-t-[2rem]">
                                    <Image
                                        src={`/coverLetterTemplates/cover-letter-${num}.webp`}
                                        alt={`Cover Letter Template ${num}`}
                                        fill
                                        className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                                        style={{ willChange: 'transform' }}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1400px"
                                    />

                                    {/* Hover Overlay */}
                                    <Link
                                        href={`/cover-letter/editor?templateId=${num}`}
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#1A1A1A]/10 transition-all duration-500 z-10 backdrop-blur-[2px]"
                                    >
                                        <div className="bg-[#1A1A1A] text-[#F3F1EC] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-black hover:scale-105 active:scale-95">
                                            Use Template
                                        </div>
                                    </Link>
                                </div>

                                {/* Card Footer */}
                                <div className="p-4 sm:p-5 bg-white border-t border-[#F3F1EC] flex justify-between items-center relative z-20">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                                            Template {num}
                                        </span>
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-black px-2 sm:px-3 py-1 bg-[#F3F1EC] text-[#1A1A1A] rounded-full uppercase tracking-tighter">
                                        Free
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, letterId: null })}
                onConfirm={confirmDelete}
                title="Delete Cover Letter?"
                message="Are you sure you want to delete this design? This action cannot be undone."
                confirmLabel="Delete"
                isDestructive={true}
            />
        </div>

    );
}
