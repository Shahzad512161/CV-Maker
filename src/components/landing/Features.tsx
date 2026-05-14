import React from 'react';
import { Section } from '../ui/Section';
import { ShieldCheck, FileText, Zap } from 'lucide-react';

export const Features = () => {
    return (
        <Section className="bg-[#f0eeeb] py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] tracking-tight mb-6">
                        Everything you need to <span className="text-blue-600">stand out</span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Powerful features to help you build a polished resume in minutes, not hours.
                        Designed for modern job seekers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    <FeatureItem
                        icon={FileText}
                        color="bg-blue-50 text-blue-600"
                        title="1st resume, free forever"
                        description="Create your first professional resume completely for free. No credit card required. Download as PDF instantly."
                    />
                    <FeatureItem
                        icon={ShieldCheck}
                        color="bg-emerald-50 text-emerald-600"
                        title="Privacy & GDPR compliant"
                        description="Your personal data is encrypted and secure. We strictly follow GDPR regulations and never sell your data."
                    />
                    <FeatureItem
                        icon={Zap}
                        color="bg-purple-50 text-purple-600"
                        title="Professional Templates"
                        description="Choose from our collection of ATS-friendly templates designed by HR experts to pass automated screening."
                    />
                </div>
            </div>
        </Section>
    );
};

const FeatureItem = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1">
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6`}>
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed font-medium">{description}</p>
    </div>
);
