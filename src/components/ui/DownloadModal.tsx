'use client';

import React from 'react';
import { X, FileText, ImageIcon, Check, Download, Loader2 } from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownload: (format: 'pdf' | 'png', size: 'a4' | 'letter') => Promise<void>;
    title?: string;
    subtitle?: string;
}

export const DownloadModal = ({
    isOpen,
    onClose,
    onDownload,
    title = "Export Document",
    subtitle = "High-Resolution Generation"
}: DownloadModalProps) => {
    const [format, setFormat] = React.useState<'pdf' | 'png'>('pdf');
    const [size, setSize] = React.useState<'a4' | 'letter'>('a4');
    const [isDownloading, setIsDownloading] = React.useState(false);

    if (!isOpen) return null;

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await onDownload(format, size);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2rem] w-full max-w-lg overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-t-2 sm:border-2 border-black animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">

                {/* Header */}
                <div className="px-6 py-6 sm:px-8 sm:py-7 flex justify-between items-center border-b-2 border-[#F3F0EA]">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">{title}</h2>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">{subtitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black hover:text-white rounded-full transition-all border-2 border-transparent hover:border-black"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 sm:p-8 space-y-8 sm:space-y-10 bg-white">
                    {/* Format Selection */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-black uppercase tracking-[0.2em]">1. Format</label>
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => setFormat('pdf')}
                                className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all ${format === 'pdf'
                                    ? 'border-black bg-[#F3F0EA] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                    : 'border-[#F3F0EA] bg-white hover:border-black'
                                    }`}
                            >
                                <div className={`p-1.5 sm:p-2 rounded-lg ${format === 'pdf' ? 'bg-black text-white' : 'bg-[#F3F0EA] text-black'}`}>
                                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-black text-base sm:text-lg leading-none">PDF</p>
                                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase mt-1">Document</p>
                                </div>
                            </button>

                            {/* <button
                                onClick={() => setFormat('png')}
                                className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all ${format === 'png'
                                    ? 'border-black bg-[#F3F0EA] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                    : 'border-[#F3F0EA] bg-white hover:border-black'
                                    }`}
                            >
                                <div className={`p-1.5 sm:p-2 rounded-lg ${format === 'png' ? 'bg-black text-white' : 'bg-[#F3F0EA] text-black'}`}>
                                    <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-black text-base sm:text-lg leading-none">PNG</p>
                                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase mt-1">Image</p>
                                </div>
                            </button> */}
                        </div>
                    </div>

                    {/* Page Size Selection */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-black uppercase tracking-[0.2em]">2. Page Size</label>
                        <div className="flex bg-[#F3F0EA] rounded-full p-1.5 border-2 border-black/5">
                            <button
                                onClick={() => setSize('a4')}
                                className={`flex-1 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all ${size === 'a4'
                                    ? 'bg-black text-white shadow-lg'
                                    : 'text-slate-500 hover:text-black'
                                    }`}
                            >
                                A4 Standard
                            </button>
                            <button
                                onClick={() => setSize('letter')}
                                className={`flex-1 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all ${size === 'letter'
                                    ? 'bg-black text-white shadow-lg'
                                    : 'text-slate-500 hover:text-black'
                                    }`}
                            >
                                US Letter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 bg-white flex flex-col gap-4 sm:gap-5">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full bg-black text-white py-4 sm:py-5 rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl active:scale-[0.98]"
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                Download {format.toUpperCase()}
                            </>
                        )}
                    </button>
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[8px] sm:text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.2em]">
                            400 DPI High Definition Ready
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
