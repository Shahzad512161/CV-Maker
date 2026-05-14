'use client';

import React from 'react';
import Image from 'next/image';
import { X, ArrowRight, Layout, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TemplateActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    templateId: string;
    templateName: string;
    templateImage: string;
}

export const TemplateActionModal = ({
    isOpen,
    onClose,
    templateId,
    templateName,
    templateImage
}: TemplateActionModalProps) => {
    const router = useRouter();

    if (!isOpen) return null;

    const handleUseTemplate = () => {
        router.push(`/editor?templateId=${templateId}`);
        onClose();
    };

    const handleSeeAll = () => {
        router.push('/dashboard');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div
                className="bg-[#F0EEEB] rounded-3xl sm:rounded-[2.5rem] w-full max-w-4xl max-h-[95vh] sm:max-h-none overflow-y-auto sm:overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.25)] border border-white/20 animate-in zoom-in-95 duration-300"
                style={{ isolation: 'isolate' }}
            >
                {/* Left Side: Template Preview */}
                <div className="md:w-1/2 relative aspect-[210/297] sm:aspect-[210/250] md:aspect-auto bg-[#F9F8F6] overflow-hidden">
                    <Image
                        src={templateImage}
                        alt={templateName}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
                </div>

                {/* Right Side: Actions & Details */}
                <div className="md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative bg-[#F0EEEB]">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-black/5 transition-colors group z-20"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]" />
                    </button>

                    <div className="mb-6 sm:mb-8">
                        <span className="inline-block px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] bg-blue-100 text-blue-700 mb-3 sm:mb-4">
                            Premium Template
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight italic uppercase mb-3 sm:mb-4 leading-tight">
                            {templateName}
                        </h2>
                        <div className="space-y-2 sm:space-y-3">
                            {[
                                "ATS Optimized Design",
                                "Professional Layout",
                                "Unlimited PDF Downloads",
                                "Easy to Customize"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center text-[#1A1A1A]/70 text-[10px] sm:text-sm font-bold uppercase tracking-wider">
                                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-green-600/70" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        <button
                            onClick={handleUseTemplate}
                            className="w-full bg-[#1A1A1A] hover:bg-black text-[#F3F1EC] font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] h-14 sm:h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
                        >
                            Use This Template
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={handleSeeAll}
                            className="w-full bg-white text-[#1A1A1A] hover:bg-gray-50 border border-black/[0.05] font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] h-14 sm:h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
                        >
                            <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                            See All Templates
                        </button>
                    </div>

                    <p className="mt-8 text-center text-[#1A1A1A]/40 text-[10px] font-black uppercase tracking-[0.2em]">
                        No credit card required
                    </p>
                </div>
            </div>
        </div>
    );
};
