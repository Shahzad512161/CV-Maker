'use client';

import { Layers, FileText, File, Settings, LogOut, X, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export const Sidebar = ({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
    const { openModal, user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname?.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] md:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <div className={`fixed left-0 top-0 h-screen w-72 z-[50] transition-all duration-500 ease-in-out transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                {/* Refined Sidebar with professional dark theme and warm shadows */}
                <aside className="m-4 md:m-6 h-[calc(90vh-2rem)] md:h-[calc(100vh-3rem)] bg-[#1A1A1A] flex flex-col rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 relative overflow-hidden">

                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white md:hidden z-20"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Subtle shine effect */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                    {/* Logo Section */}
                    <div className="p-8 pb-4 relative z-10">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-[#F3F1EC] rounded-xl flex items-center justify-center text-[#1A1A1A] shadow-xl group-hover:scale-110 transition-transform duration-300">
                                <Layers className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-black text-[#F3F1EC] tracking-tighter uppercase italic">ATS CV</span>
                        </Link>
                    </div>

                    {/* Navigation Section */}
                    <nav className="flex-1 px-4 space-y-2 relative z-10 overflow-y-auto no-scrollbar pt-8">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-3 px-6 py-4 font-bold text-sm rounded-2xl transition-all duration-300 group ${isActive('/dashboard')
                                ? 'bg-[#F3F1EC] text-[#1A1A1A] shadow-lg scale-[1.02]'
                                : 'text-gray-400 hover:bg-white/5 hover:text-[#F3F1EC]'
                                }`}
                        >
                            <FileText className={`w-5 h-5 transition-colors ${isActive('/dashboard') ? 'text-[#1A1A1A]' : 'text-gray-500 group-hover:text-[#F3F1EC]'}`} />
                            <span className="tracking-tight">Resume</span>
                        </Link>

                        <Link
                            href="/dashboard/cover-letter"
                            className={`flex items-center gap-3 px-6 py-4 font-bold text-sm rounded-2xl transition-all duration-300 group ${isActive('/dashboard/cover-letter')
                                ? 'bg-[#F3F1EC] text-[#1A1A1A] shadow-lg scale-[1.02]'
                                : 'text-gray-400 hover:bg-white/5 hover:text-[#F3F1EC]'
                                }`}
                        >
                            <File className={`w-5 h-5 transition-colors ${isActive('/dashboard/cover-letter') ? 'text-[#1A1A1A]' : 'text-gray-500 group-hover:text-[#F3F1EC]'}`} />
                            <span className="tracking-tight">Cover Letter</span>
                        </Link>

                        <Link
                            href="/dashboard/more"
                            className={`flex items-center gap-3 px-6 py-4 font-bold text-sm rounded-2xl transition-all duration-300 group ${isActive('/dashboard/more')
                                ? 'bg-[#F3F1EC] text-[#1A1A1A] shadow-lg scale-[1.02]'
                                : 'text-gray-400 hover:bg-white/5 hover:text-[#F3F1EC]'
                                }`}
                        >
                            <LayoutGrid className={`w-5 h-5 transition-colors ${isActive('/dashboard/more') ? 'text-[#1A1A1A]' : 'text-gray-500 group-hover:text-[#F3F1EC]'}`} />
                            <span className="tracking-tight">More</span>
                        </Link>
                    </nav>

                    {/* Bottom Section */}
                    <div className="p-6 space-y-4 relative z-10">
                        {user ? (
                            <div className="pt-4 border-t border-white/10 space-y-1">
                                {/* <Link
                                    href="#"
                                    className="flex items-center gap-3 px-6 py-3 text-gray-500 font-bold text-xs hover:text-[#F3F1EC] transition-colors group"
                                >
                                    <Settings className="w-4 h-4 text-gray-600 group-hover:rotate-45 transition-transform" />
                                    Account Settings
                                </Link> */}
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-6 py-3 text-red-400/80 font-bold text-xs hover:text-red-400 transition-colors group"
                                >
                                    <LogOut className="w-4 h-4 text-red-900/50 group-hover:-translate-x-1 transition-transform" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="pt-2">
                                <Button
                                    onClick={() => openModal('login')}
                                    // 1. Set variant to ghost or outline to avoid default 'primary' blue/white styles
                                    variant="ghost"
                                    // 2. Ensure text-black or text-[#1A1A1A] is explicitly set
                                    className="w-full h-12 bg-[#F3F1EC] hover:bg-white text-[#1A1A1A] font-black uppercase text-xs tracking-widest rounded-2xl border-none shadow-lg transition-all active:scale-95"
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </>
    );
};
