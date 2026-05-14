'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TemplateActionModal } from '../common/TemplateActionModal';
import { useState } from 'react';

export const Templates = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<{ id: string, name: string, image: string } | null>(null);

    return (
        <section id="templates" className="py-24 bg-[#f0eeeb] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-700 mb-6 tracking-wide">
                    PREMIUM DESIGN
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] tracking-tight mb-8">
                    Templates that get you <span className="text-blue-600">hired</span>
                </h2>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                    Stand out from the crowd with our ATS-optimized, professionally designed templates.
                </p>
            </div>

            <div className="relative z-10">
                <div className="flex overflow-x-auto py-12 gap-8 px-4 sm:px-6 lg:px-8 no-scrollbar snap-x snap-mandatory items-center justify-start md:justify-center">
                    <TemplateCard index={1} name="Modern Professional" image="/templates/template1.webp" onClick={() => setSelectedTemplate({ id: 'template-1', name: 'Modern Professional', image: '/templates/template1.webp' })} />
                    <TemplateCard index={2} name="Creative Director" image="/templates/template2.webp" onClick={() => setSelectedTemplate({ id: 'template-2', name: 'Creative Director', image: '/templates/template2.webp' })} />
                    <TemplateCard index={3} name="Executive Suite" image="/templates/template3.webp" onClick={() => setSelectedTemplate({ id: 'template-3', name: 'Executive Suite', image: '/templates/template3.webp' })} />
                </div>

                <div className="text-center mt-12">
                    <Link href="/dashboard">
                        <Button size="lg" className="bg-[#1a1a1a] text-white hover:bg-black font-bold h-14 px-12 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                            Explore All Templates
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
                <TemplateActionModal
                    isOpen={!!selectedTemplate}
                    onClose={() => setSelectedTemplate(null)}
                    templateId={selectedTemplate?.id || ''}
                    templateName={selectedTemplate?.name || ''}
                    templateImage={selectedTemplate?.image || ''}
                />
            </div>
        </section>
    );
};

// const TemplateCard = ({ index, name, image }: { index: number, name: string, image: string }) => (
//     <div className="flex-none w-[320px] snap-center group perspective-1000 z-0 hover:z-50 relative">
//         <div className="relative bg-white rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] aspect-[210/297] transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5">
//             {/* Resume Preview */}
//             <div className="absolute inset-0 transition-opacity">
//                 <Image
//                     src={image}
//                     alt={name}
//                     fill
//                     className="object-cover object-top"
//                     sizes="(max-width: 768px) 100vw, 320px"
//                 />
//             </div>

//             {/* Hover Content */}
//             <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 text-center backdrop-blur-sm">
//                 <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{name}</h3>
//                 <div className="space-y-3 mb-8 text-left w-full px-4">
//                     <div className="flex items-center text-gray-600 text-sm font-medium">
//                         <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" /> ATS Friendly
//                     </div>
//                     <div className="flex items-center text-gray-600 text-sm font-medium">
//                         <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" /> Professional Layout
//                     </div>
//                     <div className="flex items-center text-gray-600 text-sm font-medium">
//                         <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" /> Easy to customize
//                     </div>
//                 </div>
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-lg">
//                     Use Template
//                 </Button>
//             </div>
//         </div>
//     </div>
// );

const TemplateCard = ({ index, name, image, onClick }: { index: number, name: string, image: string, onClick: () => void }) => (
    <div
        className="flex-none w-[280px] sm:w-[320px] snap-center group relative cursor-pointer"
        onClick={onClick}
        style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
    >
        {/* Main Card Container */}
        <div className="relative bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] aspect-[210/297] transition-all duration-700 transform group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]">

            {/* Resume Preview Image */}
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 320px"
                    style={{ willChange: 'transform' }}
                />
            </div>

            {/* Premium Hover Content (Glassmorphism) */}
            <div className="absolute inset-0 bg-[#F3F1EC]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md z-10">

                {/* Meta Label */}
                <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    CV Template
                </span>

                <h3 className="text-2xl font-black text-[#1A1A1A] mb-6 tracking-tight opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {name}
                </h3>

                {/* Features List */}
                <div className="space-y-3 mb-8 w-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {[
                        "ATS Friendly",
                        "Professional Layout",
                        "Easy to customize"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center justify-center text-[#1A1A1A]/70 text-xs font-bold uppercase tracking-wider">
                            <div className="w-1 h-1 rounded-full bg-[#1A1A1A] mr-2" />
                            {feature}
                        </div>
                    ))}
                </div>

                {/* The "Perfect" Button */}
                <button className="w-full bg-[#1A1A1A] hover:bg-black text-[#F3F1EC] font-black uppercase text-[10px] tracking-[0.2em] h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 flex items-center justify-center gap-2">
                    Use Template
                </button>
            </div>

            {/* Static Footer Label (Visible when NOT hovering) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-white font-black text-sm uppercase tracking-widest drop-shadow-md">
                    {name}
                </p>
            </div>
        </div>

        {/* Shadow floor effect (Visual Depth) */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/[0.05] blur-2xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
);