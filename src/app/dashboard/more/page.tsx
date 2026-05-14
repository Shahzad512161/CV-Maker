'use client';

import React from 'react';
import { LayoutGrid } from 'lucide-react';

export default function MoreDashboardPage() {
    return (
        <div className="min-h-screen bg-[#F3F1EC] pb-20 -m-4 md:-m-12 px-2 md:px-12 pt-0 md:pt-12">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-4 sm:pt-8">
                {/* Header Section */}
                <header className="mb-8 sm:mb-12 text-left max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1b3a] tracking-tight mb-4 text-left">
                        More Tools
                    </h1>
                    <p className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                        Explore additional features and tools to enhance your application.
                    </p>
                </header>

                {/* Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Signature Studio Card */}
                    <div className="group bg-white rounded-[2.5rem] p-8 border border-black/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col items-start text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                            <LayoutGrid className="w-32 h-32 rotate-12" />
                        </div>

                        <div className="w-16 h-16 bg-[#F3F1EC] rounded-2xl flex items-center justify-center text-[#1A1A1A] shadow-lg mb-8 group-hover:scale-110 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all duration-500">
                            <LayoutGrid className="w-8 h-8" />
                        </div>

                        <h2 className="text-2xl font-black text-[#1a1b3a] tracking-tight mb-3">Signature Studio</h2>
                        <p className="text-slate-500 font-medium text-base leading-relaxed mb-8">
                            Create professional digital signatures for your documents. Draw, type with elegant fonts, or upload your handwritten signature.
                        </p>

                        <button
                            onClick={() => window.location.href = '/dashboard/more/signature'}
                            className="mt-auto px-8 py-3 bg-[#1A1A1A] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
