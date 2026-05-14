import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, User, Briefcase, GraduationCap, Lightbulb, Grid, Award, Github, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const PastelBlockLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Helper to get icon for section (optional, referencing style)
    // The reference often doesn't use icons for section headers, but we'll see.
    // Anna Field usually has simple underlined headers.

    return (
        <div className="w-full h-full min-h-[297mm] flex flex-col font-sans text-[#2c3e50] bg-[#e8f3ea]">

            {/* Header - White Background */}
            <header className="bg-white p-10 flex justify-between items-start shrink-0">
                <div className="flex-1 pr-8">
                    <h1 className="text-4xl font-bold text-[#5c8065] mb-2 font-sans tracking-tight">
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-2xl text-gray-400 italic mb-6 font-serif">
                        {personalDetails.jobTitle}
                    </p>

                    <ContactInfoRenderer
                        data={data}
                        layout="vertical"
                        className="text-sm text-gray-600 space-y-1.5 flex flex-col"
                        itemClassName="flex items-center gap-2 h-4"
                        linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-600 no-underline"
                        textClassName="[overflow-wrap:anywhere] leading-none"
                        iconSize={14}
                        iconStyle={{ color: '#5c8065' }}
                    />
                </div>

                {/* Photo */}
                {personalDetails.photo && (
                    <div className="w-40 h-40 bg-gray-100 shrink-0 overflow-hidden">
                        <img
                            src={personalDetails.photo}
                            alt={personalDetails.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </header>

            {/* Body - Pastel Green Background */}
            <main className="flex-1 p-10 pt-8 space-y-8">
                {sections.filter(s => s.isVisible).map(section => (
                    <div key={section.id} className="w-full">
                        {/* Section Header */}
                        <h2 className="text-xl font-bold text-[#5c8065] border-b-2 border-[#5c8065]/30 pb-1 mb-4 uppercase tracking-wide">
                            {section.title}
                        </h2>

                        {/* Profile Section */}
                        {section.type === 'Profile' && typeof section.content === 'string' && (
                            <div
                                className="text-gray-700 text-sm leading-relaxed max-w-4xl"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        )}

                        {/* Experience & Education - Grid Layout */}
                        {['Experience', 'Education', 'Projects', 'Custom', 'Organisations'].includes(section.type) && Array.isArray(section.content) && (
                            <div className="space-y-5">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="group">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <div className="font-bold text-gray-800 text-base">
                                                {item.title || item.school || item.employer || item.project}
                                                {(item.subTitle || item.degree || item.jobTitle) && (
                                                    <span className="font-normal text-gray-600 ml-1 italic">
                                                        , {item.subTitle || item.degree || item.jobTitle}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600 font-medium shrink-0">
                                                {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                {item.location && <span className="mx-1">|</span>}
                                                {item.location}
                                            </div>
                                        </div>
                                        {item.description && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Skills - 2 Column Grid */}
                        {section.type === 'Skills' && Array.isArray(section.content) && (
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="text-sm">
                                        <div className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                                            {/* Optional Emoji or Icon if strictly following reference which sometimes has them */}
                                            {item.skill}
                                            {item.level && <span className="text-gray-500 font-normal text-xs ml-1 bg-[#5c8065]/10 px-1.5 py-0.5 rounded-full whitespace-nowrap">{item.level}</span>}
                                        </div>
                                        {item.information && (
                                            <div
                                                className="text-gray-600 text-xs leading-snug"
                                                dangerouslySetInnerHTML={{ __html: item.information }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Languages - Dot Rating System */}
                        {section.type === 'Languages' && Array.isArray(section.content) && (
                            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                {(section.content as any[]).map((item: any) => {
                                    // Calculate dots based on level string (rough approximation)
                                    // Native/Fluent -> 5, Advanced -> 4, Intermediate -> 3, Beginner -> 1-2
                                    let dots = 3; // Default
                                    const lvl = (item.level || '').toLowerCase().trim();

                                    if (['native', 'fluent', 'c2'].some(l => lvl.includes(l))) {
                                        dots = 5;
                                    } else if (['advanced', 'c1'].some(l => lvl.includes(l))) {
                                        dots = 4;
                                    } else if (['conversational', 'intermediate', 'b1', 'b2'].some(l => lvl.includes(l))) {
                                        dots = 3;
                                    } else if (['elementary', 'a2'].some(l => lvl.includes(l))) {
                                        dots = 2;
                                    } else if (['basic', 'a1', 'beginner'].some(l => lvl.includes(l))) {
                                        dots = 1;
                                    }

                                    return (
                                        <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-300/30 pb-2">
                                            <span className="font-medium text-gray-800">{item.language}</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= dots ? 'bg-[#5c8065]' : 'bg-[#5c8065]/20'}`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Generic List (Awards, Etc) */}
                        {['Certificates', 'Awards', 'Interests', 'Publications', 'References'].includes(section.type) && Array.isArray(section.content) && (
                            <ul className="space-y-3">
                                {(section.content as any[]).map((item: any) => (
                                    <li key={item.id} className="text-sm text-gray-700">
                                        <span className="font-bold text-gray-900 block">
                                            {item.title || item.name || item.certificate || item.publisher}
                                        </span>
                                        {(item.subTitle || item.jobTitle) && (
                                            <span className="block text-xs text-gray-600 mb-1">
                                                {item.subTitle || item.jobTitle}
                                            </span>
                                        )}
                                        {(item.additionalInfo || item.description) && (
                                            <div
                                                className="text-gray-600 text-xs leading-snug [&_p]:mb-1 [&_p:last-child]:mb-0 [&_blockquote]:m-0 [&_blockquote]:p-0 [&_p:empty]:hidden"
                                                dangerouslySetInnerHTML={{ __html: item.additionalInfo || item.description }}
                                            />
                                        )}
                                        {/* References Org Fix */}
                                        {item.organization && <span className="block text-xs text-gray-500 italic">{item.organization}</span>}

                                        {/* Contact Info for References */}
                                        {section.type === 'References' && (
                                            <div className="mt-1 text-xs text-gray-500 flex flex-col gap-0.5">
                                                {item.email && (
                                                    <span className="flex items-center gap-1.5 h-3">
                                                        <Mail size={10} className="text-[#5c8065]" />
                                                        <span className="leading-none">{item.email}</span>
                                                    </span>
                                                )}
                                                {item.phone && (
                                                    <span className="flex items-center gap-1.5 h-3">
                                                        <Phone size={10} className="text-[#5c8065]" />
                                                        <span className="leading-none">{item.phone}</span>
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>
                ))}
            </main>
        </div>
    );
};
