import React from 'react';
import { X, Check } from 'lucide-react';
import { templates } from './previews/templates';

interface ResumeTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTemplateId: string;
    onSelect: (templateId: string) => void;
}

export const ResumeTemplateModal = ({
    isOpen,
    onClose,
    activeTemplateId,
    onSelect
}: ResumeTemplateModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-0 sm:p-4 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#F0EEEB] rounded-none sm:rounded-2xl w-full max-w-6xl h-full sm:h-auto sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl scale-100 animate-in zoom-in-95 duration-300 border-0 sm:border border-white/20">
                {/* Header */}
                <div className="px-6 py-4 sm:px-8 sm:py-6 border-b border-gray-200/50 flex justify-between items-center bg-[#F0EEEB] sticky top-0 z-10 backdrop-blur-xl">
                    <div>
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Resume Template</h2>
                        <p className="hidden sm:block text-gray-500 mt-1 text-sm">Select a design for your resume. Your information will be preserved.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gray-50/50 custom-scrollbar">
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
                        {templates.map((template) => {
                            const isActive = activeTemplateId === template.id;

                            return (
                                <button
                                    key={template.id}
                                    onClick={() => {
                                        onSelect(template.id);
                                        onClose();
                                    }}
                                    className={`
                                        group relative flex flex-col bg-white rounded-xl transition-all duration-300
                                        ${isActive
                                            ? 'ring-2 ring-blue-600 shadow-xl scale-[1.02]'
                                            : 'hover:shadow-xl hover:-translate-y-1 hover:ring-2 hover:ring-blue-500/20 shadow-sm border border-gray-200'}
                                    `}
                                >
                                    {/* Thumbnail Container */}
                                    <div className="relative aspect-[210/297] w-full overflow-hidden rounded-t-xl bg-gray-100">
                                        <div className="absolute inset-0 animate-pulse bg-gray-200" />
                                        <img
                                            src={template.thumbnail}
                                            alt={template.name}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-contain object-top transition-transform duration-700 group-hover:scale-105 p-2"
                                        />
                                        {/* Active Badge */}
                                        {isActive && (
                                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-blue-600 text-white p-1.5 rounded-full shadow-lg z-10">
                                                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </div>
                                        )}
                                        <div className={`absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-0' : ''}`} />
                                    </div>

                                    {/* Footer Info */}
                                    <div className="p-3 sm:p-4 w-full text-left bg-white border-t border-gray-100 rounded-b-xl group-hover:bg-blue-50/30 transition-colors">
                                        <h3 className={`font-bold text-xs sm:text-sm truncate ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                                            {template.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span
                                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-gray-200"
                                                style={{ backgroundColor: template.theme.color }}
                                            />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
