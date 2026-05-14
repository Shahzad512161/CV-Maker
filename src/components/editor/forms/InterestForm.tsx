import React, { useState } from 'react';
import { ResumeSection, InterestItem } from '@/types/resume';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Trash2, GripVertical, ChevronDown, ChevronUp, Link as LinkIcon, Eye, EyeOff, Plus, ChevronLeft } from 'lucide-react';
import { EditorInput } from '../EditorInput';

interface Props {
    section: ResumeSection;
    onChange: (section: ResumeSection) => void;
    onDone: () => void;
    onDelete: () => void;
    entryIndex?: number;
}

export const InterestForm: React.FC<Props> = ({ section, onChange, onDone, onDelete, entryIndex = 0 }) => {
    const items = (section.content as InterestItem[]) || [];
    const item = items[entryIndex] || {
        id: Date.now().toString(),
        name: '',
        url: '',
        additionalInfo: '',
        isVisible: true
    };

    const handleUpdateItem = (updates: Partial<InterestItem>) => {
        const newItems = [...items];
        const newItem = { ...item, ...updates };

        if (entryIndex >= newItems.length) {
            newItems.push(newItem);
        } else {
            newItems[entryIndex] = newItem;
        }

        onChange({ ...section, content: newItems });
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
                <h2 className="text-lg sm:text-xl font-black text-[#1a1b3a] tracking-tight uppercase italic truncate">Interest</h2>
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
                    label="Interest / Hobby"
                    placeholder="e.g. Photography, Chess, Mountain Biking"
                    value={item.name}
                    onChange={(e) => handleUpdateItem({ name: e.target.value })}
                />

                <EditorInput
                    label="Link (optional)"
                    placeholder="e.g. portfolio or blog"
                    value={item.url || ''}
                    onChange={(e) => handleUpdateItem({ url: e.target.value })}
                />

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
                        Additional information
                    </label>
                    <div className="rounded-[2rem] overflow-hidden border border-gray-100 bg-gray-50 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500 transition-all">
                        <RichTextEditor
                            value={item.additionalInfo || ''}
                            onChange={(content) => handleUpdateItem({ additionalInfo: content })}
                            placeholder="Provide more context or key details..."
                        />
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
