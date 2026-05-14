import React from 'react';
import { ResumeSection, LanguageItem } from '@/types/resume';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Trash2, ChevronLeft, ChevronDown } from 'lucide-react';
import { EditorInput } from '../EditorInput';

interface Props {
    section: ResumeSection;
    onChange: (section: ResumeSection) => void;
    onDone: () => void;
    onDelete: () => void;
    entryIndex?: number;
}

const LANGUAGE_LEVELS = [
    'Basic',
    'Conversational',
    'Fluent',
    'Native',
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2'
];

export const LanguagesForm = ({ section, onChange, onDone, onDelete, entryIndex = 0 }: Props) => {
    // Ensure content is treated as an array of LanguageItem
    const items = Array.isArray(section.content) ? section.content as LanguageItem[] : [];
    const item = items[entryIndex] || {
        id: Date.now().toString(),
        language: '',
        information: '',
        level: ''
    };

    const handleChange = (field: keyof LanguageItem, value: string) => {
        const newItem = { ...item, [field]: value };
        const newItems = [...items];
        if (entryIndex >= newItems.length) {
            newItems.push(newItem);
        } else {
            newItems[entryIndex] = newItem;
        }

        onChange({
            ...section,
            content: newItems
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
                <h2 className="text-lg sm:text-xl font-black text-[#1a1b3a] tracking-tight uppercase italic truncate">Language</h2>
                <div className="flex shrink-0">
                    <button
                        onClick={onDelete}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>

            <div className="space-y-8 mb-12">
                <EditorInput
                    label="Language"
                    placeholder="e.g. English, Spanish, German"
                    value={item.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                />

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">Additional information</label>
                    <div className="rounded-[2rem] overflow-hidden border border-gray-100 bg-gray-50 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500 transition-all">
                        <RichTextEditor
                            value={item.information || ''}
                            onChange={(val) => handleChange('information', val)}
                            placeholder="e.g. TOEFL 110/120, IELTS 8.5..."
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors pl-1">Language level</label>
                    <div className="relative group/select">
                        <select
                            className="w-full h-14 bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl px-4 text-base font-medium placeholder:text-gray-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                            value={item.level}
                            onChange={(e) => handleChange('level', e.target.value)}
                        >
                            <option value="">Select language level</option>
                            {LANGUAGE_LEVELS.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover/select:text-blue-500 transition-colors">
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-10 border-t border-gray-100">
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
