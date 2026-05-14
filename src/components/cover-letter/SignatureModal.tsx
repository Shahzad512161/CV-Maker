import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { X, Upload, Check, Trash2, PenTool, Image as ImageIcon } from 'lucide-react';

interface SignatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (signature: string) => void;
}

// export const SignatureModal = ({ isOpen, onClose, onSave }: SignatureModalProps) => {
//     const padRef = useRef<SignatureCanvas>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [mode, setMode] = useState<'select' | 'draw' | 'upload'>('select');
//     const [uploadedImage, setUploadedImage] = useState<string | null>(null);

//     const handleClear = () => {
//         padRef.current?.clear();
//     };

//     const handleSaveDraw = () => {
//         if (padRef.current && !padRef.current.isEmpty()) {
//             // trimWhitespace: true is default, helpful for signatures
//             const dataUrl = padRef.current.getTrimmedCanvas().toDataURL('image/png');
//             onSave(dataUrl);
//             onClose();
//         }
//     };

//     const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setUploadedImage(reader.result as string);
//                 setMode('upload');
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSaveUpload = () => {
//         if (uploadedImage) {
//             onSave(uploadedImage);
//             onClose();
//         }
//     };

//     // Reset state on close/open if needed, but for now simple return
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col min-h-[400px]">
//                 {/* Header */}
//                 <div className="px-6 py-4 border-b flex items-center justify-between">
//                     <h2 className="text-xl font-bold text-gray-900">Add Signature</h2>
//                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                         <X className="w-5 h-5 text-gray-500" />
//                     </button>
//                 </div>

//                 {/* Content Body */}
//                 <div className="flex-1 p-6 flex flex-col items-center justify-center">

//                     {/* MODE: SELECT */}
//                     {mode === 'select' && (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
//                             <button
//                                 onClick={() => setMode('draw')}
//                                 className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all group h-48"
//                             >
//                                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
//                                     <PenTool className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
//                                 </div>
//                                 <span className="font-semibold text-gray-700 group-hover:text-gray-900">Draw Signature</span>
//                             </button>

//                             <button
//                                 onClick={() => fileInputRef.current?.click()}
//                                 className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all group h-48"
//                             >
//                                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
//                                     <Upload className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
//                                 </div>
//                                 <span className="font-semibold text-gray-700 group-hover:text-gray-900">Upload Image</span>
//                                 <input
//                                     type="file"
//                                     ref={fileInputRef}
//                                     className="hidden"
//                                     accept="image/*"
//                                     onChange={handleFileUpload}
//                                 />
//                             </button>
//                         </div>
//                     )}

//                     {/* MODE: DRAW */}
//                     {mode === 'draw' && (
//                         <div className="w-full flex flex-col h-full">
//                             <div className="flex-1 border bg-gray-50 rounded-xl overflow-hidden relative mb-6">
//                                 <SignatureCanvas
//                                     ref={padRef}
//                                     penColor="black"
//                                     canvasProps={{
//                                         className: 'w-full h-full cursor-crosshair signatures-canvas',
//                                         style: { minHeight: '300px' }
//                                     }}
//                                     backgroundColor="rgba(0,0,0,0)" // Transparent
//                                 />
//                                 <div className="absolute top-4 left-4 pointer-events-none text-xs text-gray-400 font-medium bg-white/50 px-2 py-1 rounded">
//                                     Draw below
//                                 </div>
//                             </div>

//                             <div className="flex items-center justify-between gap-4">
//                                 <button
//                                     onClick={handleClear}
//                                     className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
//                                 >
//                                     Clear
//                                 </button>
//                                 <div className="flex gap-3">
//                                     <button
//                                         onClick={() => setMode('select')}
//                                         className="px-6 py-2.5 rounded-full text-gray-500 hover:bg-gray-100 font-medium transition-colors"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleSaveDraw}
//                                         className="px-8 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-lg shadow-pink-500/30 transition-all flex items-center gap-2"
//                                     >
//                                         Save
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* MODE: UPLOAD PREVIEW */}
//                     {mode === 'upload' && uploadedImage && (
//                         <div className="w-full flex flex-col items-center h-full">
//                             <div className="flex-1 w-full flex items-center justify-center border bg-gray-50 rounded-xl overflow-hidden mb-6 min-h-[300px] p-4">
//                                 <img src={uploadedImage} alt="Signature Preview" className="max-w-full max-h-[250px] object-contain" />
//                             </div>

//                             <div className="flex items-center justify-end w-full gap-4">
//                                 <button
//                                     onClick={() => { setUploadedImage(null); setMode('select'); }}
//                                     className="px-6 py-2.5 rounded-full text-gray-500 hover:bg-gray-100 font-medium transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSaveUpload}
//                                     className="px-8 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-lg shadow-pink-500/30 transition-all flex items-center gap-2"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
export const SignatureModal = ({ isOpen, onClose, onSave }: SignatureModalProps) => {
    const padRef = useRef<SignatureCanvas>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mode, setMode] = useState<'select' | 'draw' | 'upload'>('select');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleClear = () => padRef.current?.clear();

    const handleSaveDraw = () => {
        if (padRef.current && !padRef.current.isEmpty()) {
            const dataUrl = padRef.current.getTrimmedCanvas().toDataURL('image/png');
            onSave(dataUrl);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col border-2 border-black">

                {/* Header - High Contrast */}
                <div className="px-8 py-6 border-b-2 border-[#F3F0EA] flex items-center justify-between bg-white">
                    <h2 className="text-2xl font-black text-black tracking-tight">
                        Add Signature
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black hover:text-white rounded-full transition-all border-2 border-transparent hover:border-black"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content Body */}
                <div className="p-8 bg-white">

                    {/* MODE: SELECT - Large, Readable Tiles */}
                    {mode === 'select' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <button
                                onClick={() => setMode('draw')}
                                className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-black rounded-2xl hover:bg-[#F3F0EA] transition-all group h-52 text-center"
                            >
                                <PenTool className="w-8 h-8 text-black" />
                                <span className="text-lg font-black text-black uppercase tracking-tight">Draw Now</span>
                            </button>

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-black rounded-2xl hover:bg-[#F3F0EA] transition-all group h-52 text-center"
                            >
                                <Upload className="w-8 h-8 text-black" />
                                <span className="text-lg font-black text-black uppercase tracking-tight">Upload Image</span>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => { setUploadedImage(reader.result as string); setMode('upload'); };
                                        reader.readAsDataURL(file);
                                    }
                                }} />
                            </button>
                        </div>
                    )}

                    {/* MODE: DRAW - Clean Drawing Area */}
                    {mode === 'draw' && (
                        <div className="w-full space-y-6">
                            <div className="bg-[#F9F8F6] rounded-xl border-2 border-black overflow-hidden relative">
                                <SignatureCanvas
                                    ref={padRef}
                                    penColor="black"
                                    canvasProps={{ className: 'w-full h-64 cursor-crosshair' }}
                                />
                                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">
                                    Canvas
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                <button
                                    onClick={handleClear}
                                    className="text-sm font-bold text-black border-b-2 border-black hover:pb-1 transition-all"
                                >
                                    Clear Canvas
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setMode('select')}
                                        className="px-6 py-3 rounded-full text-sm font-bold text-black border-2 border-black hover:bg-[#F3F0EA] transition-all"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSaveDraw}
                                        className="px-8 py-3 rounded-full bg-black text-white text-sm font-bold shadow-lg hover:bg-zinc-800 transition-all"
                                    >
                                        Save Signature
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MODE: UPLOAD PREVIEW */}
                    {mode === 'upload' && uploadedImage && (
                        <div className="w-full space-y-6">
                            <div className="w-full bg-[#F9F8F6] rounded-xl border-2 border-black p-8 flex items-center justify-center min-h-[250px]">
                                <img src={uploadedImage} alt="Preview" className="max-h-48 object-contain" />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setMode('select')}
                                    className="text-sm font-bold text-black border-b-2 border-black"
                                >
                                    Change File
                                </button>
                                <button
                                    onClick={() => onSave(uploadedImage)}
                                    className="px-10 py-3 rounded-full bg-black text-white text-sm font-bold shadow-lg transition-all"
                                >
                                    Confirm & Use
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};