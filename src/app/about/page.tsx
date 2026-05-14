import React from 'react';
import { Section } from '@/components/ui/Section';
import { Target, Users, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
    const textColor = '#1a1a1a';

    return (
        <main className="min-h-screen bg-[#f0eeeb] pt-24 sm:pt-32 pb-20">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="inline-block py-2 px-4 rounded-full bg-gradient-to-r from-pink-100 to-red-100 text-transparent bg-clip-text font-black mb-6 tracking-[0.2em] text-[10px] sm:text-xs" style={{ backgroundImage: 'linear-gradient(to right, #ff5a5f, #e61e4d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    OUR STORY
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-[1.1]" style={{ color: textColor }}>
                    We're simplifying <br className="hidden sm:block" /> the way you get hired.
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-gray-700 max-w-3xl mx-auto">
                    ATS CV was born from a simple belief: Your resume should open doors, not close them. We're here to democratize professional design.
                </p>
            </div>

            {/* The Problem & Solution */}
            <Section className="bg-white rounded-[2rem] sm:rounded-[2.5rem] mb-16 sm:mb-24 max-w-7xl mx-auto overflow-hidden shadow-sm">
                <div className="grid lg:grid-cols-2">
                    <div className="p-8 sm:p-12 lg:p-20 bg-gradient-to-br from-red-50 to-pink-50 flex flex-col justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 text-red-600">
                            <Clock className="w-7 h-7 sm:w-8 sm:h-8" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: textColor }}>The Challenge</h2>
                        <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-gray-700 font-medium">
                            For years, job seekers have struggled with clunky word processors, fighting with margins and formatting instead of focusing on their achievements. Professional designers are expensive, and online templates are often inflexible or inaccessible.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-medium">
                            The result? Talented candidates get overlooked simply because their resume didn't make the cut or wasn't readable by Applicant Tracking Systems (ATS).
                        </p>
                    </div>
                    <div className="p-8 sm:p-12 lg:p-20 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 text-blue-600">
                            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: textColor }}>Our Solution</h2>
                        <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-gray-700 font-medium">
                            We created a resume builder that combines the aesthetics of high-end design with the intelligence of modern technology. No more formatting nightmares.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Smart content suggestions",
                                "Instant design switching",
                                "ATS-optimized layouts",
                                "Real-time PDF preview"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-lg font-medium text-gray-800">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center mr-3 text-xs font-bold">✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Core Values / Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4" style={{ color: textColor }}>Designed for your success</h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Every feature we build is focused on one goal: getting you hired faster.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <DetailCard
                        icon={Target}
                        title="Precision Engineering"
                        description="Our templates aren't just pretty. They are engineered to guide the recruiter's eye to your most important qualifications instantly."
                        color={textColor}
                        gradient="from-purple-50 to-pink-50"
                        iconBg="from-purple-100 to-pink-100"
                        iconColor="text-purple-600"
                    />
                    <DetailCard
                        icon={ShieldCheck}
                        title="Privacy First"
                        description="Your career data is personal. We don't sell your data to recruiters or third parties. What you create here stays yours."
                        color={textColor}
                        gradient="from-green-50 to-emerald-50"
                        iconBg="from-green-100 to-emerald-100"
                        iconColor="text-green-600"
                    />
                    <DetailCard
                        icon={Users}
                        title="Accessible to All"
                        description="We believe professional career tools shouldn't be a luxury. That's why our core features will always be free and easy to use."
                        color={textColor}
                        gradient="from-blue-50 to-cyan-50"
                        iconBg="from-blue-100 to-cyan-100"
                        iconColor="text-blue-600"
                    />
                </div>
            </div>

            {/* CTA */}
            <Section className="max-w-5xl mx-auto text-center px-4">
                <div className="bg-[#1a1a1a] rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to build your future?</h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Join thousands of professionals who have advanced their careers with ATS CV.
                        </p>
                        <Link href="/dashboard">
                            <button className="bg-gradient-to-r from-[#ff5a5f] to-[#e61e4d] text-white hover:from-[#ff6b70] hover:to-[#f02e54] transition-all px-10 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 duration-200">
                                Build My Resume
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </div>
            </Section>
        </main>
    );
}

const DetailCard = ({
    icon: Icon,
    title,
    description,
    color,
    gradient,
    iconBg,
    iconColor
}: {
    icon: any,
    title: string,
    description: string,
    color: string,
    gradient: string,
    iconBg: string,
    iconColor: string
}) => (
    <div className={`bg-gradient-to-br ${gradient} p-8 sm:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100`}>
        <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${iconBg} rounded-2xl flex items-center justify-center mb-6 sm:mb-8 ${iconColor} group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color }}>{title}</h3>
        <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-medium">
            {description}
        </p>
    </div>
);
