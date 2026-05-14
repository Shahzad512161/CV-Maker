import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Column: Text Content */}
                    <div className="max-w-2xl text-center lg:text-left">
                        <p className="text-[10px] sm:text-sm font-bold text-gray-600 uppercase tracking-[0.2em] mb-4">
                            Free Online Resume Builder
                        </p>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1a1a1a] tracking-tight leading-[1.1] mb-6 sm:mb-8">
                            Create a job-winning resume — 100% free                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 sm:mb-10 font-medium">
                            First resume: <span className="bg-blue-100/80 text-blue-800 px-2 rounded-lg">100% free. </span>
                            <br className="hidden sm:block" />
                            Unlimited downloads.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 mb-12">
                            <Link href="/dashboard" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto bg-[#1a1a1a] text-white hover:bg-black transition-all px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl translate-y-0 hover:-translate-y-1 duration-300">
                                    Create Your CV Now!
                                </button>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="relative w-10 h-10 rounded-full border-2 border-[#f0eeeb] overflow-hidden">
                                        <Image
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`}
                                            alt={`User ${i}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* <span className="text-sm font-bold text-[#1a1a1a] tracking-tight">
                                Trusted by 4.3 million users
                            </span> */}
                        </div>
                    </div>

                    {/* Right Column: Visuals */}
                    <div className="relative z-10 lg:ml-auto">
                        {/* Main Image */}
                        <div className="relative rounded-2xl shadow-2xl bg-white p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="/hero_section_img.webp"
                                alt="CV Preview"
                                width={600}
                                height={800}
                                className="rounded-xl w-full h-auto"
                                priority
                            />
                        </div>

                        {/* Float 1: Profile Card */}
                        <div className="absolute  -left-8 sm:-left-12 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-[240px] animate-fade-in-up animation-delay-500 hidden sm:block">
                            <div className="flex items-start gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew"
                                        alt="Andrew"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#1a1a1a]">Andrew Irwin</h4>
                                    <p className="text-xs text-gray-500 mb-1">Product Manager</p>
                                    <div className="flex text-yellow-400 gap-0.5">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} className="w-3 h-3 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <div className="ml-auto bg-[#ff5a5f] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                                    P
                                </div>
                            </div>
                        </div>

                        {/* Float 2: TikTok Review */}
                        <div className="absolute -bottom-6 -right-4 sm:right-8 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-[260px] animate-fade-in-up animation-delay-1000">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm text-[#1a1a1a] font-medium leading-snug mb-2">
                                        Powerful websites I wish I knew earlier: This one is a LIFESAVER 🤯
                                    </p>
                                    <p className="text-xs text-gray-400">@maedeh.davami | 1.8 million views</p>
                                </div>
                                <div className="flex-shrink-0">
                                    {/* Simple TikTok Icon imitation */}
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-black fill-current" aria-label="TikTok">
                                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
