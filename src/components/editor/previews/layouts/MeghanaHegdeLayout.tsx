import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Globe, Calendar, Flag, User, Briefcase, GraduationCap, Award, Languages, Settings, FileText, BookOpen, Users, Quote, PenTool, Heart, Linkedin } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface MeghanaHegdeLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

const MeghanaHegdeLayout: React.FC<MeghanaHegdeLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const primaryColor = theme.primary || '#0f3460';

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="border-b-[2px] pb-1 mb-3 mt-6 w-full" style={{ borderColor: primaryColor }}>
            <h2 className="text-[16px] font-bold font-sans tracking-wide uppercase text-black">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-sans text-[#1a1a1a] p-12 flex flex-col">
            {/* Header */}
            <header className="flex flex-col items-center text-center mb-6">
                <h1 className="text-[34px] font-bold mb-1 tracking-tight leading-tight" style={{ color: primaryColor }}>{personalDetails.fullName}</h1>
                {personalDetails.jobTitle && (
                    <p className="text-[20px] italic font-medium mb-4" style={{ color: primaryColor }}>{personalDetails.jobTitle}</p>
                )}

                <ContactInfoRenderer
                    data={data}
                    showIcons={false}
                    layout="horizontal"
                    className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 text-[13px] text-gray-700 font-medium"
                    itemClassName="flex items-center gap-1.5"
                    linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-700 no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    renderSeparator={() => <span className="text-gray-400">|</span>}
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
                                        className="text-[13.5px] leading-relaxed text-gray-800"
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
                                    <div className="flex flex-col gap-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex flex-col">
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <div className="text-[14px]">
                                                        <span className="font-bold text-black uppercase">{section.type === 'Education' ? (item.school || item.institution) : (item.employer || item.organization || item.subTitle)}</span>
                                                        <span className="text-gray-700 italic">, {section.type === 'Education' ? item.degree : (item.jobTitle || item.title)}</span>
                                                    </div>
                                                    <div className="text-[13px] text-gray-700 font-medium text-right">
                                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                                        {item.location && ` | ${item.location}`}
                                                    </div>
                                                </div>
                                                {item.description && (
                                                    <div
                                                        className="text-[13.5px] leading-relaxed text-gray-800 prose prose-sm max-w-none mt-1"
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
                                    <div className="flex flex-col gap-1.5">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="text-[13.5px] leading-relaxed text-gray-800 flex flex-wrap items-baseline gap-1">
                                                <span className="font-bold whitespace-nowrap">{item.skill}</span>
                                                {item.level && <span className="text-gray-700 font-normal ml-1">({item.level})</span>}
                                                <span className="font-bold">:</span>
                                                {item.information && (
                                                    <span className="text-gray-700">
                                                        {item.information.replace(/<[^>]*>?/gm, '')}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Certificates':
                        case 'Awards':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex items-start gap-2 text-[13.5px]">
                                                <span className="text-black font-bold shrink-0 mt-0.5">•</span>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="font-bold text-gray-800 leading-tight">
                                                        {item.title || item.certificate || item.award}
                                                    </div>
                                                    {(item.issuer || item.organization) && (
                                                        <div className="text-[12px] text-gray-600 italic">
                                                            by {item.issuer || item.organization}
                                                        </div>
                                                    )}
                                                    {(item.description || item.additionalInfo || item.information) && (
                                                        <div
                                                            className="text-[13.5px] text-gray-700 leading-snug mt-1 prose prose-sm max-w-none font-sans"
                                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Languages':
                        case 'Publications':
                        case 'Courses':
                        case 'Organisations':
                        case 'Interests':
                        case 'References':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex flex-col">
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <div className="font-bold text-black text-[14px]">
                                                        {item.title || item.name || item.language || item.interest || item.course}
                                                    </div>
                                                    <div className="text-[12px] font-medium text-gray-600">
                                                        {item.date || item.startDate}
                                                    </div>
                                                </div>
                                                {(item.issuer || item.organization || item.institution || item.school || item.jobTitle || item.level) && (
                                                    <div className="text-[12.5px] italic text-gray-700">
                                                        {[item.issuer || item.organization || item.institution || item.school, item.jobTitle, item.level].filter(Boolean).join(' • ')}
                                                    </div>
                                                )}
                                                {(item.description || item.additionalInfo || item.information) && (
                                                    <div
                                                        className="text-[13.5px] leading-relaxed text-gray-800 mt-1 prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                    />
                                                )}
                                                {(item.email || item.phone) && (
                                                    <div className="text-[12px] text-gray-600 mt-0.5 font-sans">
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
export default MeghanaHegdeLayout;
