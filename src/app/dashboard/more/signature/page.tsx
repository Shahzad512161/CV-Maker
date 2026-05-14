'use client';

import React, { useState } from 'react';
import { ArrowLeft, Edit3, Trash2, Download, Save, Check, Type, PenTool, Upload as UploadIcon, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { SignatureStudio } from '@/components/dashboard/more/signature/SignatureStudio';

export default function SignatureStudioPage() {
    return (
        <div className="min-h-screen bg-[#F3F1EC] pb-20 -m-4 md:-m-12 px-2 md:px-12 pt-0 md:pt-12">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-4 sm:pt-8">
                {/* Header Section */}
                <header className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <Link
                            href="/dashboard/more"
                            className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-black mb-6 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to More
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1b3a] tracking-tight mb-4 text-left">
                            Signature Studio
                        </h1>
                        <p className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                            Design a signature that represents you perfectly. Use it across all your resumes and cover letters.
                        </p>
                    </div>
                </header>

                {/* Signature Studio Main Component */}
                <SignatureStudio />
            </div>
        </div>
    );
}
