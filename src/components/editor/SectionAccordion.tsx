import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    GripVertical,
    Eye,
    EyeOff,
    Plus,
    Trash2,
    Edit2,
    Settings,
    Layout
} from 'lucide-react';
import { ResumeSection } from '@/types/resume';

interface Props {
    section: ResumeSection;
    icon?: React.ReactNode;
    onEditSection: () => void;
    onAddEntry: () => void;
    onEditEntry: (index: number) => void;
    onToggleVisibility: (index: number) => void;
    onReorderEntries?: (startIndex: number, endIndex: number) => void;
    onEditIcon?: () => void;
    isOpen: boolean;
    onToggleExpansion: () => void;
}

export const SectionAccordion: React.FC<Props> = ({
    section,
    icon,
    onEditSection,
    onAddEntry,
    onEditEntry,
    onToggleVisibility,
    onReorderEntries,
    onEditIcon,
    isOpen,
    onToggleExpansion
}) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const getItemTitle = (item: any) => {
        if (typeof item === 'string') return item;
        if ('jobTitle' in item && 'employer' in item) return `${item.jobTitle} at ${item.employer}`;
        if ('degree' in item && 'school' in item) return `${item.degree} at ${item.school}`;
        if ('skill' in item) return item.skill;
        if ('language' in item) return item.language;
        if ('certificate' in item) return item.certificate;
        if ('name' in item) return item.name;
        if ('title' in item) return item.title;
        return 'Untitled Entry';
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        if (onReorderEntries) {
            onReorderEntries(draggedIndex, index);
            setDraggedIndex(index);
        }
    };

    const handleDrop = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const isSingular = section.type === 'Profile';

    return (
        <div className={`bg-white rounded-[2rem] shadow-sm border transition-all duration-300 overflow-hidden ${isOpen && !isSingular ? 'ring-4 ring-blue-500/5 border-blue-100' : 'border-gray-100'}`}>
            {/* Header */}
            <div
                className="p-5 sm:p-7 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors group"
                onClick={() => isSingular ? onEditSection() : onToggleExpansion()}
            >
                <div className="flex items-center gap-4 sm:gap-5">
                    <div
                        onClick={(e) => {
                            if (onEditIcon) {
                                e.stopPropagation();
                                onEditIcon();
                            }
                        }}
                        className="relative group/icon"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f4f5f7] rounded-2xl flex items-center justify-center text-[#1a1b3a] group-hover:bg-[#1a1b3a] group-hover:text-white transition-all shrink-0 shadow-sm border border-transparent group-hover/icon:border-blue-500/20">
                            {icon || <Layout className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </div>
                        {/* Edit Badge for Icon */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center text-white opacity-0 group-hover/icon:opacity-100 transition-all shadow-lg scale-50 group-hover/icon:scale-100">
                            <Settings className="w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[13px] sm:text-[15px] font-black text-[#1a1b3a] uppercase tracking-tight italic truncate">{section.title}</span>
                        {!isSingular && (
                            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                {Array.isArray(section.content) ? section.content.length : 0} entries
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isSingular) {
                                onEditSection();
                            } else {
                                onAddEntry();
                            }
                        }}
                        className="p-2.5 sm:p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                        title={isSingular ? "Edit" : "Add Entry"}
                    >
                        {isSingular ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                    {!isSingular && (
                        <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-[#1a1b3a] text-white rotate-180' : 'text-gray-400 group-hover:text-[#1a1b3a]'} duration-300`}>
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Body */}
            {isOpen && !isSingular && (
                <div className="border-t border-gray-50 bg-[#f4f5f7]/30 p-5 sm:p-6 space-y-4 animate-in slide-in-from-top-2 duration-300 accordion-content">
                    {Array.isArray(section.content) && section.content.length > 0 ? (
                        <div className="space-y-3">
                            {section.content.map((item, index) => (
                                <div
                                    key={index}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDrop={handleDrop}
                                    className={`relative transition-all duration-300 ease-out ${draggedIndex === index ? 'z-50' : 'z-0'
                                        }`}
                                >
                                    <div
                                        className={`bg-white p-5 rounded-2xl border flex items-center justify-between group/item transition-all duration-300 ${draggedIndex === index
                                            ? 'opacity-40 blur-[1px] scale-95 shadow-inner translate-x-1'
                                            : 'opacity-100 border-gray-100 hover:border-blue-200 hover:shadow-lg'
                                            }`}
                                    >
                                        <div className="flex items-center gap-5 flex-1 overflow-hidden">
                                            {/* Grabbable Square handle */}
                                            <div
                                                draggable
                                                onDragStart={() => handleDragStart(index)}
                                                className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-blue-600 transition-colors p-2.5 bg-gray-50 group-hover/item:bg-blue-50 rounded-xl border border-gray-100 group-hover/item:border-blue-100 shadow-sm"
                                            >
                                                <GripVertical className="w-5 h-5" />
                                            </div>
                                            <div
                                                className="flex flex-col flex-1 min-w-0 cursor-pointer"
                                                onClick={() => onEditEntry(index)}
                                            >
                                                <span className="font-black text-[#1a1b3a] text-[13px] uppercase tracking-tight italic truncate">
                                                    {getItemTitle(item)}
                                                </span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${(item as any).isVisible !== false ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                                        {(item as any).isVisible !== false ? 'Visible' : 'Hidden'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onToggleVisibility(index)}
                                                className={`p-2.5 rounded-xl transition-all shadow-sm border ${(item as any).isVisible !== false
                                                    ? 'bg-white border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100'
                                                    : 'bg-gray-50 border-gray-100 text-gray-300'
                                                    }`}
                                            >
                                                {(item as any).isVisible !== false ? (
                                                    <Eye className="w-4 h-4" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => onEditEntry(index)}
                                                className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-xl transition-all shadow-sm"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 px-6 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
                            <div className="w-14 h-14 bg-white rounded-[1.25rem] flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <Plus className="w-7 h-7 text-gray-200" />
                            </div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                                No entries yet
                            </p>
                            <button
                                onClick={onAddEntry}
                                className="mt-4 text-xs font-black text-blue-500 uppercase tracking-widest hover:underline"
                            >
                                Add your first entry
                            </button>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            onClick={onAddEntry}
                            className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#1a1b3a] border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:shadow-lg hover:border-blue-100 transition-all active:scale-95 shadow-sm"
                        >
                            <Plus className="w-4 h-4 text-blue-500" />
                            Add Item
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
