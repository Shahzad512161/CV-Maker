'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar when route changes
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="flex bg-[#F3F1EC] min-h-screen relative overflow-x-hidden">
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1A1A1A] z-40 px-6 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#F3F1EC] rounded-lg flex items-center justify-center text-[#1A1A1A]">
                        <span className="font-black text-xs uppercase italic">P</span>
                    </div>
                    <span className="text-lg font-black text-[#F3F1EC] tracking-tighter uppercase italic">ATS CV</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-gray-400 hover:text-[#F3F1EC]"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 ml-0 md:ml-72 p-4 pt-20 md:p-12 md:pt-12 bg-gray-50/30 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
