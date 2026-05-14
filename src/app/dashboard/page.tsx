import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#F3F1EC] pb-20 -m-4 md:-m-12 px-2 md:px-12 pt-0 md:pt-12">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-4 sm:pt-8">
                <header className="mb-8 sm:mb-12 max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1b3a] tracking-tight mb-4 text-left">Start building your resume</h1>
                    <p className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                        Your first resume — 100% free, all design features, unlimited downloads — yes really.
                    </p>
                </header>

                <DashboardGrid />
            </div>
        </div>
    );
};