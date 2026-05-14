'use client';

import React from 'react';
import { X, User, GraduationCap, Briefcase, Wrench, Globe, Award, BookOpen, Users, FileText, PenTool, Plus, Download } from 'lucide-react';
import { SectionType } from '@/types/resume';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: SectionType) => void;
}

const sections: { type: SectionType; label: string; icon: any; desc: string }[] = [
    { type: 'Profile', label: 'Profile', icon: User, desc: 'Make a great first impression.' },
    { type: 'Education', label: 'Education', icon: GraduationCap, desc: 'Show off your degrees.' },
    { type: 'Experience', label: 'Experience', icon: Briefcase, desc: 'Highlight your professional past.' },
    { type: 'Skills', label: 'Skills', icon: Wrench, desc: 'List your technical & soft skills.' },
    { type: 'Languages', label: 'Languages', icon: Globe, desc: 'Do you speak multiple languages?' },
    { type: 'Certificates', label: 'Certificates', icon: Award, desc: 'Industry-specific certifications.' },
    { type: 'Interests', label: 'Interests', icon: BookOpen, desc: 'What aligns with your career?' },
    { type: 'Projects', label: 'Projects', icon: PenTool, desc: 'Worked on challenging projects?' },
    { type: 'Publications', label: 'Publications', icon: FileText, desc: 'Academic publications/books.' },
    { type: 'References', label: 'References', icon: Users, desc: 'Colleagues who vouch for you.' },
    { type: 'Custom', label: 'Custom', icon: Plus, desc: "Can't find what you're looking for?" },
];

export const AddContentModal = ({ isOpen, onClose, onSelect }: Props) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 md:p-10 bg-[#1a1b3a]/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-[#F3F1EC] rounded-none sm:rounded-[2rem] w-full max-w-5xl h-full sm:h-auto sm:max-h-[85vh] md:max-h-[90vh] overflow-hidden shadow-2xl border-0 sm:border border-white/50 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 sm:px-10 sm:py-8 flex items-center justify-between border-b border-gray-200/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3 sm:gap-6">
                        <h2 className="text-lg sm:text-2xl font-black text-[#1a1b3a] tracking-tight uppercase italic truncate">Add content</h2>
                        <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 hover:border-blue-100 transition-all group shrink-0">
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform" />
                            <span className="hidden xs:inline">Import</span>
                            <span className="hidden sm:inline">Resume</span>
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all text-gray-400 hover:text-[#1a1b3a]"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>

                {/* Grid */}
                <div className="p-6 sm:p-10 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {sections.map((item) => (
                            <button
                                key={item.type}
                                onClick={() => {
                                    onSelect(item.type);
                                    onClose();
                                }}
                                className="bg-white hover:bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-5 sm:p-8 rounded-2xl sm:rounded-3xl text-left border border-gray-100 hover:border-blue-200 flex flex-row sm:flex-col items-center sm:items-start gap-4 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                                    <Plus className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f4f5f7] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#1a1b3a] group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <span className="font-black text-[#1a1b3a] uppercase tracking-tight text-xs sm:text-sm italic block mb-0.5 sm:mb-1 truncate">
                                        {item.label}
                                    </span>
                                    <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed line-clamp-2">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="ml-auto sm:hidden text-gray-300">
                                    <Plus className="w-4 h-4" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer hint */}
                <div className="px-6 py-4 sm:px-10 sm:py-6 bg-white/30 border-t border-gray-200/50 text-center">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Choose a section to add it to your resume
                    </p>
                </div>
            </div>
        </div>
    );
};
