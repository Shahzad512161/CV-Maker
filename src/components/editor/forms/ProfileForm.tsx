import React from 'react';
import { ResumeSection } from '@/types/resume';
import { Trash2, ChevronLeft } from 'lucide-react';
import { EditorTextArea } from '../EditorInput';

interface Props {
    section: ResumeSection;
    onChange: (section: ResumeSection) => void;
    onDone: () => void;
    onDelete: () => void;
}

export const ProfileForm = ({ section, onChange, onDone, onDelete }: Props) => {
    // Content is just a string for Profile
    const content = typeof section.content === 'string' ? section.content : '';

    const handleChange = (value: string) => {
        onChange({
            ...section,
            content: value
        });
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm p-6 sm:p-10 border border-gray-100 animate-in slide-in-from-left-5 duration-300">
            <div className="flex justify-between items-center mb-8 sm:mb-10 gap-4">
                <button
                    onClick={onDone}
                    className="flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-[#1a1b3a] transition-colors group shrink-0"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">Back</span>
                </button>
                <h2 className="text-lg sm:text-xl font-black text-[#1a1b3a] tracking-tight uppercase italic truncate">Profile</h2>
                <div className="flex shrink-0">
                    <button
                        onClick={onDelete}
                        className="p-2 sm:p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                <EditorTextArea
                    label="Professional Summary"
                    placeholder="Briefly describe your professional background, key achievements, and what you bring to the table..."
                    value={content}
                    onChange={(e) => handleChange(e.target.value)}
                    className="min-h-[320px]"
                />
                <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Recommended length: 300-500 characters</p>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{content.length} characters</span>
                </div>
            </div>



            <div className="mt-12 pt-10 border-t border-gray-100">
                <button
                    onClick={onDone}
                    className="w-full h-14 bg-[#1a1b3a] hover:bg-[#2d2e55] text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};
