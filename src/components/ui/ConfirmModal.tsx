'use client';

import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isDestructive?: boolean;
}

export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    isDestructive = true
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#1a1b3a]/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border border-white/50 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDestructive ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-black text-[#1a1b3a] tracking-tight uppercase italic underline decoration-red-500/20 underline-offset-4">
                            {title}
                        </h2>
                    </div>

                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-xl bg-gray-50 text-gray-400 text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-100 hover:text-gray-600 transition-all active:scale-95"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 px-6 py-4 rounded-xl text-white text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-current/10 transition-all active:scale-95 ${isDestructive
                                    ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                                    : 'bg-[#1a1b3a] hover:bg-black shadow-black/20'
                                }`}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>

                {/* Bottom decorative bar */}
                <div className={`h-1.5 w-full ${isDestructive ? 'bg-red-500' : 'bg-[#1a1b3a]'}`} />
            </div>
        </div>
    );
};
