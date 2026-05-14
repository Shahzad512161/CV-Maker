'use client';

import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, X, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ModeUploadProps {
    onCapture: (signature: string | null) => void;
}

export const ModeUpload = ({ onCapture }: ModeUploadProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (PNG, JPG, WEBP)');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result as string;
            setPreview(dataUrl);
            onCapture(dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onCapture(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="w-full h-full flex flex-col gap-10">
            <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Handwritten Signature</h3>
                <p className="text-sm font-medium text-slate-500">Sign on white paper, take a photo, and upload here. For best results, use good lighting.</p>
            </div>

            <div
                onClick={() => !preview && fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file) handleFile(file);
                }}
                className={`flex-1 min-h-[350px] border-4 border-dashed rounded-[3rem] transition-all duration-500 flex flex-col items-center justify-center p-12 text-center relative group ${preview
                        ? 'border-black/5 bg-white'
                        : isDragging
                            ? 'border-black bg-[#F3F1EC] scale-[0.98]'
                            : 'border-black/10 hover:border-black/20 hover:bg-gray-50 cursor-pointer'
                    }`}
            >
                {preview ? (
                    <div className="w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
                        <div className="relative max-w-md w-full aspect-video bg-[#F9F8F6] rounded-3xl overflow-hidden border border-black/5 shadow-inner p-8 flex items-center justify-center">
                            <img src={preview} alt="Upload Preview" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                            <button
                                onClick={handleClear}
                                className="absolute top-4 right-4 p-3 bg-white border border-black/5 rounded-2xl text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-emerald-500 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Image Loaded Ready to Use</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-[#F3F1EC] rounded-[2rem] flex items-center justify-center text-[#1A1A1A] shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500">
                            <UploadIcon className="w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-black text-[#1a1b3a] tracking-tight mb-2">Drop your image here</h4>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">or click to browse from device</p>

                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-black/5 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <ImageIcon className="w-4 h-4" />
                                JPG
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-black/5 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <ImageIcon className="w-4 h-4" />
                                PNG
                            </div>
                        </div>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    className="hidden"
                    accept="image/*"
                />
            </div>

            {/* Pro Tip */}
            {!preview && (
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50 flex gap-4 items-center">
                    <div className="bg-blue-600 p-2 rounded-xl text-white">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                        <h5 className="text-sm font-black text-blue-900 tracking-tight">Pro Tip: Removal Background</h5>
                        <p className="text-xs font-semibold text-blue-800/60 leading-relaxed">Our system will automatically try to blend your signature based on the document's design.</p>
                    </div>
                </div>
            )}
        </div>
    );
};
