'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { TemplateActionModal } from '@/components/common/TemplateActionModal';

const CATEGORIES = [
    { id: 'popular', label: 'Popular' },
    { id: 'simple', label: 'ATS' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' },
];

const TEMPLATES = {
    popular: [1, 8, 5, 7, 6, 4, 9],
    simple: [2, 20, 21, 26, 27, 28, 29, 30],
    modern: [10, 12, 13, 14, 15, 16, 18],
    creative: [3, 11, 17, 19, 22, 23, 24, 25, 31] // Remaining templates
};

export default function TemplatesPage() {
    const [activeCategory, setActiveCategory] = useState('popular');
    const [selectedTemplate, setSelectedTemplate] = useState<{ id: string, name: string, image: string } | null>(null);

    // Handle scroll to update active category
    useEffect(() => {
        const handleScroll = () => {
            const sections = CATEGORIES.map(cat => document.getElementById(cat.id));
            const scrollPosition = window.scrollY + 200; // Offset for header + sticky nav

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveCategory(CATEGORIES[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 180; // Approximate height of main header + sticky nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveCategory(id);
        }
    };

    return (
        <main className="min-h-screen bg-[#F0EEEB] pt-32 sm:pt-40 lg:pt-52 pb-20">
            {/* Page Title & Description */}
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mb-10 sm:mb-16">
                <div className="max-w-4xl">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1a1a1a] mb-6 sm:mb-8 tracking-tighter italic uppercase leading-tight">
                        Free Resume <br className="hidden sm:block" /> Templates
                    </h1>
                    <div className="space-y-4">
                        <p className="text-xl sm:text-2xl text-[#1a1a1a]/80 font-bold leading-tight">
                            ATS-ready designs in your preferred style.
                        </p>
                        <p className="text-base sm:text-lg text-gray-500 font-medium max-w-2xl">
                            Try our free online resume builder and enjoy unlimited PDF downloads.
                            No paywall. No watermarks. No hidden fees. Yes, really 🚀
                        </p>
                    </div>
                </div>
            </div>

            {/* Sticky Category Navigation - Wrapping for better mobile fit */}
            <div className="sticky top-[70px] sm:top-[80px] z-20 w-full flex justify-center mb-16 px-4">
                <div className="w-fit bg-white/80 backdrop-blur-xl border border-black/[0.05] rounded-full shadow-2xl transition-all duration-300">
                    <div className="max-w-full px-2 sm:px-6 py-2 sm:py-3">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => scrollToCategory(category.id)}
                                    className={`text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-[#1a1a1a] text-white shadow-xl scale-105'
                                        : 'text-gray-400 hover:text-[#1a1a1a] hover:bg-gray-100'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Categories */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                {CATEGORIES.map((category) => (
                    <section key={category.id} id={category.id} className="scroll-mt-48">
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1a1a] uppercase tracking-tighter italic">
                                {category.label}
                            </h2>
                            <div className="h-0.5 bg-[#1a1a1a]/5 flex-grow"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {TEMPLATES[category.id as keyof typeof TEMPLATES].map((templateNum) => (
                                <TemplateCard
                                    key={templateNum}
                                    image={`/templates/template${templateNum}.webp`}
                                    name={`${category.label} Template ${templateNum}`}
                                    onClick={() => setSelectedTemplate({
                                        id: `template-${templateNum}`,
                                        name: `${category.label} Template ${templateNum}`,
                                        image: `/templates/template${templateNum}.webp`
                                    })}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
            {/* Template Action Modal */}
            <TemplateActionModal
                isOpen={!!selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
                templateId={selectedTemplate?.id || ''}
                templateName={selectedTemplate?.name || ''}
                templateImage={selectedTemplate?.image || ''}
            />
        </main>
    );
}

// const TemplateCard = ({ image, name }: { image: string, name: string }) => (
//     <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer ring-1 ring-gray-100 items-start flex">
//         <div className="aspect-[210/297] w-full relative overflow-hidden bg-gray-100">
//             <Image
//                 src={image}
//                 alt={name}
//                 fill
//                 className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
//             />

//             {/* Hover Overlay */}
//             <div className="absolute inset-0 bg-[#1a1a1a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[2px]">
//                 <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
//                     Use This Template
//                 </Button>
//                 <p className="text-white/80 text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
//                     Free to use • ATS Friendly
//                 </p>
//             </div>
//         </div>
//     </div>
// );
const TemplateCard = ({ image, name, onClick }: { image: string, name: string, onClick: () => void }) => (
    <div
        className="group relative bg-white rounded-[2rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
        onClick={onClick}
        /* The Corner Fix: Maintains border-radius integrity during scaling */
        style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
    >
        {/* Template Image Container */}
        <div className="aspect-[210/297] relative bg-[#F9F8F6] overflow-hidden rounded-t-[2rem]">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                style={{ willChange: 'transform' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            />

            {/* Premium Hover Overlay: Light tint + Backdrop blur */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-[#1A1A1A]/10 transition-all duration-500 z-10 backdrop-blur-[2px]">
                <div className="bg-[#1A1A1A] text-[#F3F1EC] px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-black hover:scale-105 active:scale-95">
                    Use Template
                </div>

                {/* Secondary Info: Appears softly under the button */}
                <p className="mt-4 text-[#1A1A1A] font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-opacity duration-700 delay-100">
                    ATS Friendly • Free
                </p>
            </div>
        </div>

        {/* Footer: Keep it minimal since the focus is the image */}
        <div className="p-5 bg-white border-t border-[#F3F1EC] flex justify-between items-center relative z-20">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                    Template
                </span>
            </div>

            {/* Tonal Indicator */}
            {/* <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" title="Ready to use" /> */}
        </div>

        {/* Bottom Decorative Interaction Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </div>
);