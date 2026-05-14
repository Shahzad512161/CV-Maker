'use client';

import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Trash2, Circle } from 'lucide-react';

interface ModeDrawProps {
    onCapture: (signature: string | null) => void;
}

export const ModeDraw = ({ onCapture }: ModeDrawProps) => {
    const padRef = useRef<SignatureCanvas>(null);
    const [penColor, setPenColor] = useState('#000000');
    const [penWidth, setPenWidth] = useState(2);

    const colors = [
        { id: 'black', value: '#000000' },
        { id: 'blue', value: '#003366' },
        { id: 'charcoal', value: '#333333' },
    ];

    const handleClear = () => {
        padRef.current?.clear();
        onCapture(null);
    };

    const handleStrokeEnd = () => {
        if (padRef.current && !padRef.current.isEmpty()) {
            const dataUrl = padRef.current.getTrimmedCanvas().toDataURL('image/png');
            onCapture(dataUrl);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-8">
            {/* Canvas Area */}
            <div className="flex-1 relative bg-white border-2 border-black/5 rounded-3xl overflow-hidden shadow-inner group">
                <SignatureCanvas
                    ref={padRef}
                    penColor={penColor}
                    velocityFilterWeight={0.7}
                    minWidth={penWidth}
                    maxWidth={penWidth + 1}
                    canvasProps={{
                        className: 'w-full h-full min-h-[300px] cursor-crosshair',
                    }}
                    onEnd={handleStrokeEnd}
                    backgroundColor="rgba(0,0,0,0)"
                />

                {/* Visual Guidelines */}
                <div className="absolute inset-x-8 bottom-32 h-[2px] bg-black/[0.03] pointer-events-none" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Sign Above the Line</p>
                </div>

                {/* Floating Tools */}
                <div className="absolute top-6 right-6">
                    <button
                        onClick={handleClear}
                        className="p-3 bg-white border border-black/5 rounded-2xl text-slate-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm hover:shadow-lg active:scale-90"
                        title="Clear Canvas"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Customization Bar */}
            <div className="flex flex-wrap items-center justify-between gap-8 pt-4">
                <div className="flex items-center gap-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pen Color</span>
                    <div className="flex gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setPenColor(color.value)}
                                className={`w-8 h-8 rounded-full border-2 transition-all active:scale-90 ${penColor === color.value ? 'border-black scale-110 shadow-lg' : 'border-transparent'
                                    }`}
                                style={{ backgroundColor: color.value }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-6 flex-1 max-w-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Thickness</span>
                    <input
                        type="range"
                        min="1"
                        max="8"
                        step="0.5"
                        value={penWidth}
                        onChange={(e) => setPenWidth(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-[#F3F1EC] rounded-lg appearance-none cursor-pointer accent-black"
                    />
                </div>
            </div>
        </div>
    );
};
