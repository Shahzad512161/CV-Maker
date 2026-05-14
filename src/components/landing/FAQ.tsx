'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        question: "Is ATS CV really free to use?",
        answer: "Yes! You can create your resume, customize it fully, and download it as a PDF completely for free. Our Free plan is generous and designed to help you land your first job without paying a dime."
    },
    {
        question: "What does 'ATS Friendly' mean?",
        answer: "ATS stands for Applicant Tracking System. These are software bots that recruiters use to filter resumes. Our templates are built with clean code and standard formatting specifically to ensure these bots can read your skills and experience correctly, increasing your chances of getting an interview."
    },
    {
        question: "Can I download my resume as a PDF?",
        answer: "Absolutely. Once you are done editing, you can instantly download your resume as a high-quality PDF, which is the industry standard format for job applications."
    },
    {
        question: "How do I remove the watermark?",
        answer: "Good news: We do not add watermarks to your resume, even on the Free plan. We believe your resume should look professional, and branding shouldn't get in the way of your career."
    },
    {
        question: "Can I change my template later?",
        answer: "Yes, you can switch templates at any time with a single click. Your content will automatically adapt to the new layout, so you don't have to re-enter any information."
    },
    {
        question: "Is my personal data safe?",
        answer: "Privacy is our priority. Your data is encrypted and secure. We do not sell your personal information to recruiters or third-party agencies. You remain the owner of your data."
    },
    {
        question: "Do you have tools for cover letters?",
        answer: "Yes, we provide matching cover letter templates that pair perfectly with your resume design, giving your application a cohesive and professional look."
    },
    {
        question: "Can I create multiple resumes?",
        answer: "The Free plan allows you to maintain one active resume. If you need to tailor different resumes for specific job roles (which we highly recommend!), our Basic and Pro+ plans allow you to create and manage multiple versions."
    },
    {
        question: "How do I cancel my subscription?",
        answer: "If you choose to upgrade, you can cancel your subscription easily at any time from your account settings. There are no cancellation fees or hidden hurdles."
    },
    {
        question: "What languages are supported?",
        answer: "Our builder supports all major languages. You can rename section headings (e.g., changing 'Experience' to 'Experiencia') to create a resume in your preferred language."
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes, we have a dedicated support team ready to help you with any technical issues or questions you might have about using the platform."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-[#f0eeeb]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight" style={{ color: '#200e32' }}>
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">
                        Everything you need to know about building your perfect resume.
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-transparent hover:border-gray-200 shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={`text-base sm:text-lg md:text-xl font-bold transition-colors duration-300 ${openIndex === index ? 'text-blue-600' : 'text-[#200e32]'}`}>
                                    {faq.question}
                                </span>
                                <span className={`ml-4 sm:ml-6 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-gray-100 text-gray-600'}`}>
                                    {openIndex === index ? <Minus className="w-4 h-4 sm:w-5 sm:h-5" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-5 sm:px-8 pb-5 sm:pb-8 text-gray-600 text-base sm:text-lg leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
