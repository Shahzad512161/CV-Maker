import React from 'react';
import { X, FileText, ImageIcon, Check, Download, Loader2 } from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownload: (format: 'pdf' | 'png', size: 'a4' | 'letter') => Promise<void>;
}

// export const DownloadModal = ({ isOpen, onClose, onDownload }: DownloadModalProps) => {
//     const [format, setFormat] = React.useState<'pdf' | 'png'>('pdf');
//     const [size, setSize] = React.useState<'a4' | 'letter'>('a4');
//     const [isDownloading, setIsDownloading] = React.useState(false);

//     if (!isOpen) return null;

//     const handleDownload = async () => {
//         setIsDownloading(true);
//         try {
//             await onDownload(format, size);
//             onClose();
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setIsDownloading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
//             <div className="bg-[#F0EEEB] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-300 border border-white/20">
//                 {/* Header */}
//                 <div className="px-8 py-6 flex justify-between items-center bg-white/50 border-b border-gray-200/50 backdrop-blur-xl">
//                     <div>
//                         <h2 className="text-xl font-bold text-[#1a1b3a]">Expert Export</h2>
//                         <p className="text-sm text-gray-500 font-medium">Professional document generation</p>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                     >
//                         <X className="w-5 h-5 text-gray-400" />
//                     </button>
//                 </div>

//                 <div className="p-8 space-y-8">
//                     {/* Format Selection */}
//                     <div className="space-y-4">
//                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Format</label>
//                         <div className="grid grid-cols-2 gap-4">
//                             <button
//                                 onClick={() => setFormat('pdf')}
//                                 className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${format === 'pdf' ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-500/10' : 'border-gray-100 bg-white hover:border-gray-200'}`}
//                             >
//                                 <div className={`p-2 rounded-xl ${format === 'pdf' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
//                                     <FileText className="w-5 h-5" />
//                                 </div>
//                                 <div className="text-left">
//                                     <p className="font-bold text-[#1a1b3a]">PDF</p>
//                                     <p className="text-[10px] text-gray-500 font-bold uppercase">Standard document</p>
//                                 </div>
//                                 {format === 'pdf' && <Check className="ml-auto w-4 h-4 text-blue-600" />}
//                             </button>

//                             <button
//                                 onClick={() => setFormat('png')}
//                                 className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${format === 'png' ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-500/10' : 'border-gray-100 bg-white hover:border-gray-200'}`}
//                             >
//                                 <div className={`p-2 rounded-xl ${format === 'png' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
//                                     <ImageIcon className="w-5 h-5" />
//                                 </div>
//                                 <div className="text-left">
//                                     <p className="font-bold text-[#1a1b3a]">PNG</p>
//                                     <p className="text-[10px] text-gray-500 font-bold uppercase">High resolution</p>
//                                 </div>
//                                 {format === 'png' && <Check className="ml-auto w-4 h-4 text-blue-600" />}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Page Size Selection */}
//                     <div className="space-y-4">
//                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Page Size</label>
//                         <div className="flex gap-4">
//                             <button
//                                 onClick={() => setSize('a4')}
//                                 className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${size === 'a4' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-blue-600/20' : 'text-gray-500 hover:text-gray-700'}`}
//                             >
//                                 A4 (210 × 297mm)
//                             </button>
//                             <button
//                                 onClick={() => setSize('letter')}
//                                 className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${size === 'letter' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-blue-600/20' : 'text-gray-500 hover:text-gray-700'}`}
//                             >
//                                 US Letter (8.5 × 11in)
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="px-8 py-6 bg-white flex flex-col gap-4">
//                     <button
//                         onClick={handleDownload}
//                         disabled={isDownloading}
//                         className="w-full bg-[#1a1b3a] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#2d2e55] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
//                     >
//                         {isDownloading ? (
//                             <>
//                                 <Loader2 className="w-6 h-6 animate-spin" />
//                                 Generating...
//                             </>
//                         ) : (
//                             <>
//                                 <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
//                                 Download {format.toUpperCase()}
//                             </>
//                         )}
//                     </button>
//                     <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
//                         Document quality: 400 DPI High Definition
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };
export const DownloadModal = ({ isOpen, onClose, onDownload }: DownloadModalProps) => {
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
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-2 border-black animate-in zoom-in-95 duration-300">

                {/* Header - High Contrast & Clear */}
                <div className="px-8 py-7 flex justify-between items-center border-b-2 border-[#F3F0EA]">
                    <div>
                        <h2 className="text-2xl font-black text-black tracking-tight">Export Document</h2>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">High-Resolution Generation</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black hover:text-white rounded-full transition-all border-2 border-transparent hover:border-black"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-10 bg-white">
                    {/* Format Selection */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-black uppercase tracking-[0.2em]">1. Select Format</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setFormat('pdf')}
                                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${format === 'pdf'
                                    ? 'border-black bg-[#F3F0EA] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                    : 'border-[#F3F0EA] bg-white hover:border-black'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${format === 'pdf' ? 'bg-black text-white' : 'bg-[#F3F0EA] text-black'}`}>
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-black text-lg leading-none">PDF</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Document</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setFormat('png')}
                                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${format === 'png'
                                    ? 'border-black bg-[#F3F0EA] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                    : 'border-[#F3F0EA] bg-white hover:border-black'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${format === 'png' ? 'bg-black text-white' : 'bg-[#F3F0EA] text-black'}`}>
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-black text-lg leading-none">PNG</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Image</p>
                                </div>
                            </button>
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
                <div className="px-8 pb-10 pt-2 bg-white flex flex-col gap-5">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full bg-black text-white py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl active:scale-[0.98]"
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5" />
                                Download {format.toUpperCase()}
                            </>
                        )}
                    </button>
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.2em]">
                            400 DPI High Definition Ready
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};