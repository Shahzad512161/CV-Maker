'use client';

import React, { useState, useEffect } from 'react';
import { X, Edit3, Save, PenTool } from 'lucide-react';

interface InputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (value: string) => void;
    title: string;
    defaultValue?: string;
    placeholder?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

export const InputModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    defaultValue = "",
    placeholder = "Enter name...",
    confirmLabel = "Save",
    cancelLabel = "Cancel"
}: InputModalProps) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    useEffect(() => {
        if (isOpen) {
            setInputValue(defaultValue);
        }
    }, [isOpen, defaultValue]);

    if (!isOpen) return null;

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        onConfirm(inputValue);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#1a1b3a]/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-white/50 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 sm:p-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                                <Edit3 className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-[#1a1b3a] tracking-tight uppercase italic decoration-blue-500/20 underline-offset-4">
                                {title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                autoFocus
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={placeholder}
                                className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl outline-none text-sm font-bold text-[#1a1b3a] placeholder:text-gray-300 transition-all shadow-inner"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none group-focus-within:opacity-100 transition-opacity">
                                < PenTool className="w-4 h-4 text-blue-500" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-8 py-4 rounded-2xl bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 hover:text-gray-600 transition-all active:scale-95"
                            >
                                {cancelLabel}
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-8 py-4 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:bg-[#1a1b3a] transform hover:translate-y-[-2px] transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {confirmLabel}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Bottom decorative bar */}
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />
            </div>
        </div>
    );
};
