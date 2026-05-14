'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
    const pathname = usePathname();

    // List of routes where the footer should be visible (same as header)
    const allowedRoutes = ['/', '/templates', '/pricing', '/about'];

    // Check if current path is one of the allowed routes
    const showFooter = allowedRoutes.includes(pathname);

    if (!showFooter) return null;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1A1A1A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#ff5a5f] to-[#e61e4d] rounded-lg flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform duration-200">
                                <Layers className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">ATS CV</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Create professional resumes in minutes. Build a job-winning resume for free with our easy-to-use resume builder.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/templates" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Resume Templates
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Resume Builder
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Resume Examples
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Career Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-gray-400 text-sm">
                                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <a href="mailto:support@ATS CV.com" className="hover:text-white transition-colors">
                                    support@ATS CV.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 text-sm">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>123 Business St, Suite 100<br />San Francisco, CA 94107</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} ATS CV. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
