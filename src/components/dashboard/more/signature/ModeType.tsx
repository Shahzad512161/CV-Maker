'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Type, Check } from 'lucide-react';
import { toPng } from 'html-to-image';

interface ModeTypeProps {
    onCapture: (signature: string | null) => void;
}

const FONTS = [
    { name: 'Dancing Script', family: "'Dancing Script', cursive" },
    { name: 'Pacifico', family: "'Pacifico', cursive" },
    { name: 'Great Vibes', family: "'Great Vibes', cursive" },
    { name: 'Satisfy', family: "'Satisfy', cursive" },
    { name: 'Alex Brush', family: "'Alex Brush', cursive" },
    { name: 'Homemade Apple', family: "'Homemade Apple', cursive" },
];

export const ModeType = ({ onCapture }: ModeTypeProps) => {
    const [text, setText] = useState('');
    const [selectedFont, setSelectedFont] = useState(FONTS[0]);
    const [color, setColor] = useState('#000000');
    const previewRef = useRef<HTMLDivElement>(null);

    // Load fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Homemade+Apple&family=Pacifico&family=Satisfy&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const captureSignature = async () => {
        if (!text || !previewRef.current) {
            onCapture(null);
            return;
        }

        try {
            // Need a slight delay to ensure font rendering
            await new Promise(r => setTimeout(r, 100));
            const dataUrl = await toPng(previewRef.current, {
                quality: 1,
                pixelRatio: 3,
                backgroundColor: 'transparent',
            });
            onCapture(dataUrl);
        } catch (error) {
            console.error('Error capturing typed signature:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(captureSignature, 400);
        return () => clearTimeout(timer);
    }, [text, selectedFont, color]);

    return (
        <div className="w-full h-full flex flex-col gap-10">
            {/* Input Area */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Type your name</label>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{text.length}/20</span>
                </div>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Type className="w-6 h-6 text-slate-300 group-focus-within:text-black transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value.slice(0, 20))}
                        placeholder="John Doe"
                        className="w-full h-20 bg-white border-2 border-black/5 group-focus-within:border-black rounded-[1.5rem] pl-16 pr-8 text-2xl font-bold placeholder:text-slate-200 outline-none transition-all shadow-sm group-focus-within:shadow-xl"
                    />
                </div>
            </div>

            {/* Work Area with Hidden Capture Target */}
            <div className="flex-1 space-y-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Pick a Style</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FONTS.map((font) => (
                        <button
                            key={font.name}
                            onClick={() => setSelectedFont(font)}
                            className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-center justify-between group ${selectedFont.name === font.name
                                    ? 'bg-black border-black text-white shadow-xl scale-[1.02]'
                                    : 'bg-white border-black/5 text-slate-600 hover:border-black/20'
                                }`}
                        >
                            <span
                                style={{ fontFamily: font.family }}
                                className={`text-2xl truncate ${selectedFont.name === font.name ? 'text-white' : 'text-black'}`}
                            >
                                {text || 'Preview'}
                            </span>
                            {selectedFont.name === font.name && <Check className="w-5 h-5 text-white shrink-0" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hidden capture element to maintain transparency and quality */}
            <div className="absolute -left-[9999px] top-0 overflow-hidden">
                <div
                    ref={previewRef}
                    style={{
                        fontFamily: selectedFont.family,
                        color: color,
                        fontSize: '120px',
                        padding: '40px 80px',
                        display: 'inline-block',
                        lineHeight: 1,
                        whiteSpace: 'nowrap'
                    }}
                >
                    {text}
                </div>
            </div>
        </div>
    );
};
