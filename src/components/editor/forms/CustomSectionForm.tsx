import React, { useState } from 'react';
import { ResumeSection, CustomItem, SkillItem } from '@/types/resume';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Trash2, GripVertical, ChevronDown, ChevronUp, Eye, EyeOff, Plus, Puzzle, ChevronLeft, Layout, Star } from 'lucide-react';
import { EditorInput } from '../EditorInput';

interface Props {
    section: ResumeSection;
    onChange: (section: ResumeSection) => void;
    onDone: () => void;
    onDelete: () => void;
    entryIndex?: number;
}

export const CustomSectionForm: React.FC<Props> = ({ section, onChange, onDone, onDelete, entryIndex = 0 }) => {
    const items = (section.content as any[]) || [];
    const variant = section.variant || 'normal';

    const item = items[entryIndex] || (variant === 'normal' ? {
        id: Date.now().toString(),
        title: '',
        subTitle: '',
        startDate: '',
        endDate: '',
        location: '',
        url: '',
        description: '',
        isVisible: true
    } as CustomItem : {
        id: Date.now().toString(),
        skill: '',
        information: '',
        level: 'Beginner'
    } as SkillItem);

    const updateSection = (updates: Partial<ResumeSection>) => {
        onChange({ ...section, ...updates });
    };

    const handleUpdateItem = (updates: any) => {
        const newItems = [...items];
        const newItem = { ...item, ...updates };

        if (entryIndex >= newItems.length) {
            newItems.push(newItem);
        } else {
            newItems[entryIndex] = newItem;
        }

        updateSection({ content: newItems });
    };

    const handleVariantChange = (newVariant: 'normal' | 'skill') => {
        if (newVariant === variant) return;
        updateSection({ variant: newVariant, content: [] });
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
                <h2 className="text-lg sm:text-xl font-black text-[#1a1b3a] tracking-tight uppercase italic truncate">{section.title}</h2>
                <div className="flex shrink-0">
                    <button
                        onClick={onDelete}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>

            {/* Custom Section Settings */}
            <div className="bg-gray-50 p-8 rounded-[2rem] mb-10 space-y-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-24">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
                                    Icon
                                </label>
                                <div className="w-full h-14 bg-white rounded-xl flex items-center justify-center text-[#1a1b3a] shadow-sm border border-gray-100">
                                    <Puzzle className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <EditorInput
                                    label="Section Title"
                                    value={section.title}
                                    onChange={(e) => updateSection({ title: e.target.value })}
                                    placeholder="e.g. Projects, Volunteering"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
                            Layout Type
                        </label>
                        <div className="flex p-1.5 bg-gray-200/40 rounded-xl h-14">
                            <button
                                onClick={() => handleVariantChange('normal')}
                                className={`flex-1 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${variant === 'normal'
                                    ? 'bg-white text-[#1a1b3a] shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <Layout className="w-4 h-4" />
                                Normal
                            </button>
                            <button
                                onClick={() => handleVariantChange('skill')}
                                className={`flex-1 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${variant === 'skill'
                                    ? 'bg-white text-[#1a1b3a] shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <Star className="w-4 h-4" />
                                Skill
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8 mb-12">
                {variant === 'skill' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <EditorInput
                            label="Skill Name"
                            placeholder="e.g. Project Management"
                            value={item.skill}
                            onChange={(e) => handleUpdateItem({ skill: e.target.value })}
                        />
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
                                Skill Level
                            </label>
                            <div className="relative">
                                <select
                                    value={item.level}
                                    onChange={(e) => handleUpdateItem({ level: e.target.value })}
                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none appearance-none transition-all"
                                >
                                    <option>Novice</option>
                                    <option>Beginner</option>
                                    <option>Skillful</option>
                                    <option>Experienced</option>
                                    <option>Expert</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
                                Information (Optional)
                            </label>
                            <div className="rounded-[2rem] overflow-hidden border border-gray-100 bg-gray-50 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500 transition-all">
                                <RichTextEditor
                                    value={item.information || ''}
                                    onChange={(content) => handleUpdateItem({ information: content })}
                                    placeholder="Additional information about this skill..."
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <EditorInput
                            label="Title"
                            placeholder="Enter title"
                            value={item.title}
                            onChange={(e) => handleUpdateItem({ title: e.target.value })}
                        />

                        <EditorInput
                            label="URL (optional)"
                            placeholder="e.g. https://example.com"
                            value={item.url || ''}
                            onChange={(e) => handleUpdateItem({ url: e.target.value })}
                        />

                        <EditorInput
                            label="Subtitle"
                            placeholder="e.g. Volunteer, Freelancer"
                            value={item.subTitle}
                            onChange={(e) => handleUpdateItem({ subTitle: e.target.value })}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <EditorInput
                                label="Start Date"
                                placeholder="MM/YYYY"
                                value={item.startDate || ''}
                                onChange={(e) => handleUpdateItem({ startDate: e.target.value })}
                            />
                            <EditorInput
                                label="End Date"
                                placeholder="MM/YYYY"
                                value={item.endDate || ''}
                                onChange={(e) => handleUpdateItem({ endDate: e.target.value })}
                            />
                            <EditorInput
                                label="Location"
                                placeholder="City, Country"
                                value={item.location || ''}
                                onChange={(e) => handleUpdateItem({ location: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
                                Description
                            </label>
                            <div className="rounded-[2rem] overflow-hidden border border-gray-100 bg-gray-50 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-500 transition-all">
                                <RichTextEditor
                                    value={item.description || ''}
                                    onChange={(content) => handleUpdateItem({ description: content })}
                                    placeholder="Add a description of your activities..."
                                />
                            </div>
                        </div>
                    </>
                )}
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
