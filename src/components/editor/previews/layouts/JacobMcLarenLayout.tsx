import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Globe, Calendar, Flag, User, Briefcase, GraduationCap, Award, Languages, Settings, FileText, BookOpen, Users, Quote, PenTool, Heart, Linkedin } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface JacobMcLarenLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const JacobMcLarenLayout: React.FC<JacobMcLarenLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="border-b-[1.5px] border-black pb-0.5 mb-3 mt-6 w-full">
            <h2 className="text-black text-[16px] font-bold font-serif tracking-widest uppercase">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-serif text-[#1a1a1a] p-12 flex flex-col">
            {/* Header */}
            <header className="flex flex-col items-center text-center mb-6">
                <h1 className="text-[32px] font-bold text-black mb-1 tracking-tight leading-tight">{personalDetails.fullName}</h1>
                {personalDetails.jobTitle && (
                    <p className="text-[18px] text-gray-800 italic font-medium mb-3">{personalDetails.jobTitle}</p>
                )}

                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[14px] text-gray-800 font-sans"
                    itemClassName="flex items-center gap-1.5 h-4"
                    linkClassName="hover:underline [overflow-wrap:anywhere] leading-none"
                    textClassName="[overflow-wrap:anywhere] leading-none text-gray-800"
                    iconSize={14}
                    iconStyle={{ color: 'black' }}
                />
            </header>

            {/* Content Sections */}
            <div className="flex flex-col">
                {sections.filter(s => s.isVisible && hasContent(s)).map(section => {
                    switch (section.type) {
                        case 'Profile':
                        case 'Declaration':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div
                                        className="text-[15px] leading-relaxed text-gray-800"
                                        dangerouslySetInnerHTML={{ __html: section.content as string }}
                                    />
                                </div>
                            );

                        case 'Experience':
                        case 'Education':
                        case 'Projects':
                        case 'Custom':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div className="flex flex-col gap-5">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex flex-col">
                                                <div className="flex justify-between items-start mb-0.5">
                                                    <div className="font-bold text-black text-[16px] uppercase tracking-tight">
                                                        {section.type === 'Education' ? (item.school || item.institution) : (item.employer || item.organization || item.subTitle)}
                                                    </div>
                                                    <div className="text-[14px] font-bold text-gray-800 text-right">
                                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <div className="text-[15px] italic text-gray-700 font-medium">
                                                        {section.type === 'Education' ? item.degree : (item.jobTitle || item.title)}
                                                    </div>
                                                    {item.location && <div className="text-[13px] text-gray-600 font-medium">{item.location}</div>}
                                                </div>
                                                {item.description && (
                                                    <div
                                                        className="text-[14px] leading-relaxed text-gray-800 prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Skills':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div className="flex flex-col gap-2 cursor-pointer">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="text-[15px] leading-relaxed text-gray-800">
                                                <span className="font-bold">{item.skill}</span>
                                                {item.level && <span className="text-gray-700 font-normal ml-1">({item.level})</span>}
                                                {item.information && (
                                                    <span className="text-gray-700 font-normal">
                                                        , {item.information.replace(/<[^>]*>?/gm, '')}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Languages':
                        case 'Awards':
                        case 'Publications':
                        case 'Certificates':
                        case 'Courses':
                        case 'Organisations':
                        case 'Interests':
                        case 'References':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div className="flex flex-col gap-3">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex flex-col">
                                                <div className="flex justify-between items-baseline">
                                                    <div className="font-bold text-black text-[16px] uppercase">
                                                        {item.title || item.award || item.certificate || item.course || item.interest || item.language || item.name}
                                                    </div>
                                                    <div className="text-[14px] font-bold text-gray-800 italic">
                                                        {item.date || item.publisherDate || item.startDate}
                                                    </div>
                                                </div>
                                                {(item.publisher || item.issuer || item.organization || item.institution || item.school || item.jobTitle || item.level) && (
                                                    <div className="text-[14px] italic text-gray-700 font-medium">
                                                        {[item.publisher || item.issuer || item.organization || item.institution || item.school, item.jobTitle, item.level].filter(Boolean).join(' • ')}
                                                    </div>
                                                )}
                                                {(item.description || item.additionalInfo || item.information) && (
                                                    <div
                                                        className="text-[14px] leading-relaxed text-gray-800 mt-1 prose prose-sm max-w-none font-serif"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                    />
                                                )}
                                                {(item.email || item.phone) && (
                                                    <div className="text-[13px] text-gray-600 mt-0.5 font-sans">
                                                        {[item.email, item.phone].filter(Boolean).join(' • ')}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};
