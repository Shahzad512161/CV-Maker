'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Layers, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export const Header = () => {
    const { openModal, user, logout } = useAuth();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // List of routes where the header should be visible
    const allowedRoutes = ['/', '/templates', '/pricing', '/about'];

    // Check if current path is one of the allowed routes
    const showHeader = allowedRoutes.includes(pathname);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);


    if (!showHeader) return null;

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-6'
                }`}>
                <div className={`mx-auto transition-all duration-300 ${scrolled
                    ? 'bg-white/70 backdrop-blur-xl shadow-lg rounded-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border border-white/20'
                    : 'bg-transparent max-w-7xl px-4 sm:px-6 lg:px-8'
                    }`}>
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#ff5a5f] to-[#e61e4d] rounded-lg flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform duration-200">
                                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-[#2d2e55] tracking-tight">ATS CV</span>
                        </Link>

                        {/* Navigation & Actions */}
                        <div className="flex items-center gap-4 lg:gap-8">
                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-8">
                                <Link
                                    href="/templates"
                                    className={`text-gray-500 hover:text-[#2d2e55] text-[15px] transition-colors ${pathname === '/templates' ? 'font-bold' : 'font-medium'
                                        }`}
                                >
                                    Resume Templates
                                </Link>
                                <Link
                                    href="/pricing"
                                    className={`text-gray-500 hover:text-[#2d2e55] text-[15px] transition-colors ${pathname === '/pricing' ? 'font-bold' : 'font-medium'
                                        }`}
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="/about"
                                    className={`text-gray-500 hover:text-[#2d2e55] text-[15px] transition-colors ${pathname === '/about' ? 'font-bold' : 'font-medium'
                                        }`}
                                >
                                    About
                                </Link>
                            </nav>

                            {/* Action Buttons */}
                            <div className="hidden sm:flex items-center gap-3">
                                {user ? (
                                    <button
                                        onClick={logout}
                                        className="text-red-500 font-bold text-[14px] lg:text-[15px] hover:bg-red-50 px-4 lg:px-6 py-2 rounded-lg transition-colors border border-red-500/20 hover:border-red-500/50"
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => openModal('login')}
                                        className="text-[#2d2e55] font-bold text-[14px] lg:text-[15px] hover:bg-black/5 px-4 lg:px-6 py-2 rounded-lg transition-colors border border-[#2d2e55]/20 hover:border-[#2d2e55]/50"
                                    >
                                        Login
                                    </button>
                                )}
                                <Link href="/dashboard">
                                    <Button size="sm" className="bg-[#1a1b3a] hover:bg-[#2d2e55] text-white font-bold rounded-lg px-6 lg:px-8 py-2 text-[14px] lg:text-[15px] shadow-lg hover:shadow-xl transition-all h-auto">
                                        Start now
                                    </Button>
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-[#2d2e55]"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[40] bg-white pt-24 px-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <nav className="flex flex-col gap-6">
                        <Link
                            href="/templates"
                            className={`text-2xl font-bold ${pathname === '/templates' ? 'text-[#2d2e55]' : 'text-gray-500'}`}
                        >
                            Resume Templates
                        </Link>
                        <Link
                            href="/pricing"
                            className={`text-2xl font-bold ${pathname === '/pricing' ? 'text-[#2d2e55]' : 'text-gray-500'}`}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className={`text-2xl font-bold ${pathname === '/about' ? 'text-[#2d2e55]' : 'text-gray-500'}`}
                        >
                            About
                        </Link>

                        <div className="h-px bg-gray-100 my-4" />

                        <div className="flex flex-col gap-4">
                            {user ? (
                                <button
                                    onClick={logout}
                                    className="w-full py-4 text-red-500 font-bold text-xl border border-red-500/20 rounded-xl"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        openModal('login');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full py-4 text-[#2d2e55] font-bold text-xl border border-[#2d2e55]/20 rounded-xl"
                                >
                                    Login
                                </button>
                            )}
                            <Link href="/dashboard" className="w-full">
                                <Button className="w-full py-4 bg-[#1a1b3a] text-white font-bold text-xl rounded-xl">
                                    Start now
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};
