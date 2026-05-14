import React from 'react';
import { Section } from '../ui/Section';
import { PenTool, Palette, Download } from 'lucide-react';

const Step = ({ number, title, description, icon: Icon, image }: { number: number, title: string, description: string, icon: any, image: string }) => (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24 mb-16 sm:mb-24 lg:mb-32 last:mb-0 odd:lg:flex-row-reverse group">
        <div className="flex-1 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black text-white font-bold text-xl sm:text-2xl shadow-lg shadow-black/20">
                    {number}
                </span>
                <div className="h-px bg-gray-200 flex-grow max-w-[60px] sm:max-w-[100px]"></div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight">
                {title}
            </h3>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
                {description}
            </p>

            <div className="flex items-center text-blue-600 font-bold group-hover:gap-4 gap-2 transition-all cursor-pointer">
                <span className="border-b-2 border-blue-600/30 group-hover:border-blue-600">Start step {number}</span>
                <Icon className="w-5 h-5 ml-2" />
            </div>
        </div>

        <div className="flex-1 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-3 transform transition-transform duration-700 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 z-0"></div>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-auto rounded-2xl relative z-10 shadow-sm"
                />
            </div>
        </div>
    </div>
);

export const HowItWorks = () => {
    return (
        <Section className="bg-[#f0eeeb] py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] tracking-tight mb-6">
                        How it works
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">
                        Create your perfect resume in three simple steps.
                        <br className="hidden sm:block" />
                        Designed for speed and efficiency.
                    </p>
                </div>

                <div className="space-y-12">
                    <Step
                        number={1}
                        title="Add Content"
                        description="Start with the basics. Our smart editor guides you section by section. Import from LinkedIn or start fresh."
                        icon={PenTool}
                        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
                    />

                    <Step
                        number={2}
                        title="Design With Choice"
                        description="Visualise your career. Switch templates, adjust colors and fonts instantly. No design skills needed."
                        icon={Palette}
                        image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop"
                    />

                    <Step
                        number={3}
                        title="Download & Share PDF"
                        description="Export as a high-quality PDF or share a live link. Your new career journey starts here."
                        icon={Download}
                        image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
                    />
                </div>
            </div>
        </Section>
    );
};
