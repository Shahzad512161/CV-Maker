import React, { useState, useRef } from 'react';
import { Camera, Plus, Trash2, Upload, PenTool, X, GripVertical } from 'lucide-react';
import { ResumeContent, SocialLink } from '@/types/resume';
import { EditorInput } from '../EditorInput';
import { ImageUploadModal } from '../../common/ImageUploadModal';
import { SocialSelectionModal } from '../../common/SocialSelectionModal';

interface Props {
    data: ResumeContent['personalDetails'];
    onChange: (data: ResumeContent['personalDetails']) => void;
    onDone?: () => void;
}

export const PersonalDetailsForm: React.FC<Props> = ({ data, onChange, onDone }) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
    const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleChange = (field: keyof typeof data, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const addSocial = (label: string) => {
        const newSocial: SocialLink = {
            id: Math.random().toString(36).substr(2, 9),
            label,
            value: '',
            placeholder: label === 'LinkedIn' ? 'in/username' : label === 'Website' ? 'www.example.com' : 'Enter value'
        };
        onChange({
            ...data,
            socials: [...(data.socials || []), newSocial]
        });
    };

    const updateSocial = (id: string, value: string) => {
        const updatedSocials = data.socials.map(s => s.id === id ? { ...s, value } : s);
        handleChange('socials', updatedSocials);
    };

    const removeSocial = (id: string) => {
        const updatedSocials = data.socials.filter(s => s.id !== id);
        handleChange('socials', updatedSocials);
    };

    const contactItems = [
        { id: 'email', label: 'Email', value: data.email, type: 'fixed' },
        { id: 'phone', label: 'Phone', value: data.phone, type: 'fixed' },
        { id: 'location', label: 'Location', value: data.location, type: 'fixed' },
        ...(data.socials || []).map(s => ({ ...s, type: 'social' }))
    ];

    // Get the actual order: either from data.contactOrder or the default contactItems order
    const orderedItems = data.contactOrder
        ? data.contactOrder.map(id => contactItems.find(item => item.id === id)).filter(Boolean) as any[]
        : contactItems;

    // Add any items that might be missing from contactOrder (e.g. newly added socials)
    const finalItems = [
        ...orderedItems,
        ...contactItems.filter(item => !orderedItems.find(oi => oi.id === item.id))
    ];

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        // Perform live reordering
        const newItems = [...finalItems];
        const [movedItem] = newItems.splice(draggedIndex, 1);
        newItems.splice(index, 0, movedItem);

        const newOrder = newItems.map(item => item.id);
        onChange({ ...data, contactOrder: newOrder });
        setDraggedIndex(index);
    };

    const handleDrop = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleValueChange = (item: any, value: string) => {
        if (item.type === 'fixed') {
            handleChange(item.id as keyof typeof data, value);
        } else {
            updateSocial(item.id, value);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm p-6 sm:p-10 border border-gray-100 animate-in slide-in-from-left-5 duration-300">
            <div className="flex justify-between items-center mb-8 sm:mb-10">
                <div className="flex flex-col">
                    <h2 className="text-lg sm:text-xl font-black text-[#1a1b3a] tracking-tight uppercase italic drop-shadow-sm">Personal Details</h2>
                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1 italic animate-pulse">Drag handles to reorder items live</p>
                </div>
                {onDone && (
                    <button
                        onClick={onDone}
                        className="text-blue-600 text-[10px] sm:text-xs font-black hover:underline tracking-widest uppercase italic"
                    >
                        Save & Close
                    </button>
                )}
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-8 sm:gap-10">
                {/* Form Inputs */}
                <div className="flex-1 space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <EditorInput
                            label="Full name"
                            placeholder="Enter your title, first- and last name"
                            value={data.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                        />

                        <EditorInput
                            label="Professional title"
                            placeholder="Target position or current role"
                            value={data.jobTitle}
                            onChange={(e) => handleChange('jobTitle', e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        {finalItems.map((item, index) => (
                            <div
                                key={item.id}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={handleDrop}
                                className={`relative transition-all duration-300 ease-out ${draggedIndex === index ? 'z-50' : 'z-0'
                                    }`}
                            >
                                <div className={`flex items-start gap-4 transition-all duration-300 ${draggedIndex === index ? 'opacity-40 blur-[1px] translate-x-2' : 'opacity-100 translate-x-0'
                                    }`}>
                                    {/* Integrated Drag Handle - More prominent and grabbable */}
                                    <div
                                        draggable
                                        onDragStart={() => handleDragStart(index)}
                                        className="mt-7 w-12 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shrink-0 shadow-sm group/handle"
                                    >
                                        <GripVertical className="w-6 h-6 group-hover/handle:scale-110 transition-transform" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-end gap-3">
                                            <div className="flex-1">
                                                <EditorInput
                                                    label={item.label}
                                                    type={item.id === 'email' ? 'email' : 'text'}
                                                    placeholder={item.placeholder || `Enter ${item.label.toLowerCase()}`}
                                                    value={item.value}
                                                    onChange={(e) => handleValueChange(item, e.target.value)}
                                                />
                                            </div>
                                            {item.type === 'social' && (
                                                <button
                                                    onClick={() => removeSocial(item.id)}
                                                    className="mb-3.5 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Remove"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Photo Upload */}
                <div className="flex flex-col items-center shrink-0">
                    <label className="block w-full text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center md:text-left pl-1">Photo</label>
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
                    <div className="relative group">
                        <div
                            onClick={() => data.photo ? (setTempImageSrc(data.photo), setIsImageModalOpen(true)) : fileInputRef.current?.click()}
                            className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-50 rounded-2xl sm:rounded-[2rem] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all border-2 border-dashed border-gray-200 overflow-hidden relative shadow-inner ring-4 sm:ring-8 ring-white"
                        >
                            {data.photo ? (
                                <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 sm:mt-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">High Definition Recommended</p>
                </div>
            </div>

            {/* Add Details Buttons */}
            <div className="mt-12 pt-10 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 pl-1">Add Details</h3>
                <div className="flex flex-wrap gap-4">
                    {['LinkedIn', 'Website', 'Nationality', 'Date of Birth', 'Visa', 'Passport or Id'].map(item => (
                        <button
                            key={item}
                            onClick={() => addSocial(item)}
                            className="flex items-center gap-3 px-6 py-3.5 bg-gray-50 text-[#1a1b3a] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:shadow-md transition-all border border-gray-100 hover:border-gray-200 active:scale-95"
                        >
                            <Plus className="w-4 h-4 text-blue-500" />
                            {item}
                        </button>
                    ))}
                    <button
                        onClick={() => setIsSocialModalOpen(true)}
                        className="flex items-center gap-3 px-6 py-3.5 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-black shadow-md shadow-black/10 active:scale-95"
                    >
                        Show More
                    </button>
                </div>
            </div>

            {onDone && (
                <div className="mt-12 pt-10 border-t border-gray-100">
                    <button
                        onClick={onDone}
                        className="w-full h-14 bg-[#1a1b3a] hover:bg-[#2d2e55] text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        Done
                    </button>
                </div>
            )}

            <ImageUploadModal
                isOpen={isImageModalOpen}
                imageSrc={tempImageSrc}
                onClose={() => {
                    setIsImageModalOpen(false);
                    if (!data.photo) setTempImageSrc(null);
                }}
                onSave={(newImage) => {
                    handleChange('photo', newImage);
                    setTempImageSrc(null);
                }}
                onDelete={() => {
                    handleChange('photo', undefined);
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
        </div>
    );
};
