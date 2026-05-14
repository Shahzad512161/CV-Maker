import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';
import { X, Upload, Trash2, RefreshCw, ZoomIn, Image as ImageIcon, Check } from 'lucide-react';

interface ImageUploadModalProps {
    isOpen: boolean;
    imageSrc: string | null;
    onClose: () => void;
    onSave: (croppedImage: string) => void;
    onDelete: () => void;
    onReplace: () => void;
}

// Helper to create the cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return '';
    }

    // Set canvas size to the actual crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return canvas.toDataURL('image/png', 1.0); // High quality
};

export const ImageUploadModal = ({ isOpen, imageSrc, onClose, onSave, onDelete, onReplace }: ImageUploadModalProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (imageSrc && croppedAreaPixels) {
            setIsSaving(true);
            try {
                const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
                onSave(croppedImage);
                onClose();
            } catch (e) {
                console.error(e);
            } finally {
                setIsSaving(false);
            }
        }
    };

    if (!isOpen || !imageSrc) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1A1A]/40 backdrop-blur-md animate-in fade-in duration-300">
            <div
                className="bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-black/[0.03]"
                style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
            >
                {/* Header */}
                <div className="px-8 py-6 flex items-center justify-between border-b border-[#F3F1EC]">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                            Photo Editor
                        </span>
                        <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight">
                            Adjust Profile Image
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#F3F1EC] rounded-full transition-colors group"
                    >
                        <X className="w-5 h-5 text-slate-400 group-hover:text-[#1A1A1A] transition-colors" />
                    </button>
                </div>

                {/* Cropper Body */}
                <div className="relative w-full h-[380px] bg-[#F9F8F6]">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        classes={{
                            containerClassName: "bg-[#F9F8F6]",
                            mediaClassName: "",
                            cropAreaClassName: "border-2 border-white shadow-[0_0_0_1000px_rgba(243,241,236,0.85)]"
                        }}
                    />
                </div>

                {/* Controls Area */}
                <div className="p-8 space-y-8 bg-white">
                    {/* Zoom Control Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest">
                                Zoom Level
                            </label>
                            <span className="text-[10px] font-bold text-slate-400">
                                {Math.round(zoom * 100)}%
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-300 rounded-full appearance-none cursor-pointer accent-[#1A1A1A]"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full sm:flex-[2] bg-[#1A1A1A] text-[#F3F1EC] font-black uppercase text-[10px] tracking-[0.2em] py-4 px-8 rounded-full hover:bg-black transition-all shadow-xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isSaving ? 'Processing...' : (
                                <>
                                    <Check className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>

                        <div className="flex w-full sm:flex-1 gap-3">
                            <button
                                onClick={onReplace}
                                className="flex-1 flex items-center justify-center gap-2 py-4 px-2 bg-[#F3F1EC] text-[#1A1A1A] font-black uppercase text-[10px] tracking-[0.15em] rounded-full hover:bg-[#e8e6df] transition-all"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                Replace
                            </button>

                            <button
                                onClick={() => { onDelete(); onClose(); }}
                                className="flex-1 flex items-center justify-center gap-2 py-4 px-2 bg-white border border-[#F3F1EC] text-red-500 font-black uppercase text-[10px] tracking-[0.15em] rounded-full hover:bg-red-50 hover:border-red-100 transition-all"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// export const ImageUploadModal = ({ isOpen, imageSrc, onClose, onSave, onDelete, onReplace }: ImageUploadModalProps) => {
//     const [crop, setCrop] = useState({ x: 0, y: 0 });
//     const [zoom, setZoom] = useState(1);
//     const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
//     const [isSaving, setIsSaving] = useState(false);

//     const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
//         setCroppedAreaPixels(croppedAreaPixels);
//     }, []);

//     const handleSave = async () => {
//         if (imageSrc && croppedAreaPixels) {
//             setIsSaving(true);
//             try {
//                 const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//                 onSave(croppedImage);
//                 onClose();
//             } catch (e) {
//                 console.error(e);
//             } finally {
//                 setIsSaving(false);
//             }
//         }
//     };

//     if (!isOpen || !imageSrc) return null;

//     return (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
//                 {/* Header */}
//                 <div className="px-6 py-4 border-b flex items-center justify-between bg-white z-10">
//                     <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                         <ImageIcon className="w-5 h-5 text-blue-600" />
//                         Customize Image
//                     </h2>
//                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                         <X className="w-5 h-5 text-gray-500" />
//                     </button>
//                 </div>

//                 {/* Cropper Body */}
//                 <div className="relative w-full h-[400px] bg-gray-900">
//                     <Cropper
//                         image={imageSrc}
//                         crop={crop}
//                         zoom={zoom}
//                         aspect={1} // Circular/Square aspect ratio
//                         cropShape="round" // Circular mask as requested
//                         showGrid={false}
//                         onCropChange={setCrop}
//                         onCropComplete={onCropComplete}
//                         onZoomChange={setZoom}
//                         classes={{
//                             containerClassName: 'bg-gray-900',
//                             mediaClassName: ''
//                         }}
//                     />
//                 </div>

//                 {/* Footer Controls */}
//                 <div className="p-6 space-y-6">
//                     {/* Zoom Control */}
//                     <div className="flex items-center gap-4">
//                         <ZoomIn className="w-5 h-5 text-gray-500" />
//                         <input
//                             type="range"
//                             value={zoom}
//                             min={1}
//                             max={3}
//                             step={0.1}
//                             aria-labelledby="Zoom"
//                             onChange={(e) => setZoom(Number(e.target.value))}
//                             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                         />
//                     </div>

//                     <div className="flex flex-col sm:flex-row items-center gap-3 border-t pt-6">
//                         {/* Primary Action */}
//                         <button
//                             onClick={handleSave}
//                             disabled={isSaving}
//                             className="w-full sm:flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
//                         >
//                             {isSaving ? 'Saving...' : 'Save Photo'}
//                         </button>

//                         <div className="flex w-full sm:w-auto gap-3">
//                             <button
//                                 onClick={onReplace}
//                                 className="flex-1 sm:flex-none flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
//                             >
//                                 <RefreshCw className="w-4 h-4" />
//                                 Replace
//                             </button>

//                             <button
//                                 onClick={() => { onDelete(); onClose(); }}
//                                 className="flex-1 sm:flex-none flex items-center gap-2 px-4 py-3 bg-white border border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
//                             >
//                                 <Trash2 className="w-4 h-4" />
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
