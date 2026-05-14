import React from 'react';
import { X, Check } from 'lucide-react';
import { TemplateData } from '@/services/api';
import { ModernResume } from '../templates/ModernResume';
import { Button } from '@/components/ui/Button';

interface TemplatePreviewModalProps {
    template: TemplateData | null;
    isOpen: boolean;
    onClose: () => void;
    onUseTemplate: (template: TemplateData) => void;
}

export const TemplatePreviewModal = ({ template, isOpen, onClose, onUseTemplate }: TemplatePreviewModalProps) => {
    if (!isOpen || !template) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Left Column - Preview */}
                <div className="w-1/2 bg-[#2c3e50] p-12 overflow-y-auto flex items-start justify-center relative hidden lg:flex">
                    {/* 
                        Resume Scale Wrapper 
                        The Resume is A4 (210mm ~ 794px).
                        We scale it down to fit nicely in the modal view.
                     */}
                    <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] origin-top transform scale-[0.65]">
                        <div className="pointer-events-none select-none">
                            <ModernResume />
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="w-full lg:w-1/2 p-12 flex flex-col overflow-y-auto bg-gray-50/50">
                    <div className="max-w-md">
                        <h2 className="text-3xl font-serif text-gray-800 tracking-wide uppercase mb-8">
                            {template.name}
                        </h2>

                        <div className="w-16 h-1 bg-gray-200 mb-8 rounded-full"></div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            Each template has been crafted with care to make designing your resume an absolute breeze for you.
                        </p>

                        <ul className="space-y-4 mb-12">
                            {[
                                'A4 / US Letter Size',
                                'Editable Text',
                                'Fully customizable',
                                'Print ready format',
                                'Online resume with shareable link'
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            onClick={() => onUseTemplate(template)}
                            className="bg-[#1a1b3a] hover:bg-[#2d2e55] text-white text-lg font-bold px-8 py-6 rounded-lg w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                        >
                            Use this template
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
