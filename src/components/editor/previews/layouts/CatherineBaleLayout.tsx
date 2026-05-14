import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Globe, Calendar, Flag, User, Briefcase, GraduationCap, Award, Languages, Settings, FileText, Link as LinkIcon, Users, BookOpen, Quote, PenTool } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface CatherineBaleLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const CatherineBaleLayout: React.FC<CatherineBaleLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    const SkillDots = ({ level }: { level?: string }) => {
        if (!level || level === 'Select skill level' || level.trim() === '') return null;

        const levels: Record<string, number> = {
            'Novice': 1,
            'Beginner': 2,
            'Skillful': 3,
            'Experienced': 4,
            'Expert': 5,
            'Elementary': 1,
            'Limited Working': 2,
            'Professional Working': 3,
            'Full Professional': 4,
            'Native/Bilingual': 5,
            'Intermediate': 3,
            'Advanced': 4
        };
        const count = levels[level] || 3;
        return (
            <div className="flex gap-1 ml-auto shrink-0">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i <= count ? 'bg-black' : 'bg-gray-200'}`}
                    />
                ))}
            </div>
        );
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'Profile': return <User size={18} />;
            case 'Experience': return <Briefcase size={18} />;
            case 'Education': return <GraduationCap size={18} />;
            case 'Certificates': return <Award size={18} />;
            case 'Languages': return <Globe size={18} />;
            case 'Skills': return <Settings size={18} />;
            case 'Projects': return <FileText size={18} />;
            case 'Courses': return <BookOpen size={18} />;
            case 'Awards': return <Award size={18} />;
            case 'Organisations': return <Users size={18} />;
            case 'Publications': return <Quote size={18} />;
            case 'References': return <Users size={18} />;
            case 'Declaration': return <PenTool size={18} />;
            default: return <FileText size={18} />;
        }
    };

    const SectionHeader = ({ title, type }: { title: string, type: string }) => (
        <div className="flex items-center gap-2 border-b border-gray-300 pb-1 mb-4 mt-8 h-6">
            <span className="text-black h-full flex items-center">{getIcon(type)}</span>
            <h2 className="text-black text-lg font-bold font-mono tracking-tight leading-none">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-mono text-[#1a1a1a] p-10 relative">
            {/* Red/Coral Border */}
            <div className="absolute inset-0 border-[15px] border-[#f87171] pointer-events-none" />

            <div className="relative z-10 px-4 py-4">
                {/* Header */}
                <header className="mb-8 font-mono">
                    <div className="flex items-baseline gap-4 mb-4 flex-wrap">
                        <h1 className="text-3xl font-bold text-black tracking-tighter">{personalDetails.fullName}</h1>
                        {personalDetails.jobTitle && (
                            <span className="text-xl text-gray-700 font-medium">{personalDetails.jobTitle}</span>
                        )}
                    </div>

                    <ContactInfoRenderer
                        data={data}
                        className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs"
                        itemClassName="flex items-center gap-2 h-3"
                        linkClassName="text-gray-600 underline hover:opacity-100 [overflow-wrap:anywhere] leading-none"
                        textClassName="text-gray-600 [overflow-wrap:anywhere] leading-none"
                        iconSize={12}
                        iconStyle={{ color: '#f87171' }}
                    />
                </header>

                {/* Content Sections */}
                <div className="flex flex-col">
                    {sections.filter(s => s.isVisible).map(section => {
                        if (!hasContent(section)) return null;

                        switch (section.type) {
                            case 'Profile':
                            case 'Declaration':
                                return (
                                    <div key={section.id} className="mb-2 font-mono">
                                        <SectionHeader title={section.title} type={section.type} />
                                        <div
                                            className="text-sm leading-relaxed text-justify"
                                            dangerouslySetInnerHTML={{ __html: (section.content as string) || '' }}
                                        />
                                    </div>
                                );

                            case 'Experience':
                            case 'Education':
                            case 'Projects':
                            case 'Custom':
                            case 'Courses':
                            case 'Awards':
                            case 'Organisations':
                            case 'Publications':
                                return (
                                    <div key={section.id} className="mb-2 font-mono">
                                        <SectionHeader title={section.title} type={section.type} />
                                        <div className="flex flex-col gap-6">
                                            {(section.content as any[]).map((item: any) => (
                                                <div key={item.id} className="flex flex-col gap-1">
                                                    <div className="flex items-baseline justify-between gap-4">
                                                        <div className="font-bold text-black text-sm">
                                                            {item.jobTitle || item.degree || item.title || item.course || item.award || item.organization}
                                                            <span className="font-normal">, </span>
                                                            <span className="italic font-medium text-gray-700">
                                                                {item.employer || item.school || item.subTitle || item.issuer || item.publisher}
                                                            </span>
                                                        </div>
                                                        <div className="text-[11px] font-bold text-[#f87171] uppercase shrink-0">
                                                            {[item.startDate || item.date || item.publisherDate, item.endDate].filter(Boolean).join(' - ')}
                                                            {item.location && <span className="text-gray-500 font-normal normal-case"> | {item.location}</span>}
                                                        </div>
                                                    </div>
                                                    {item.description && (
                                                        <div
                                                            className="text-xs leading-relaxed text-gray-800"
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
                                    <div key={section.id} className="mb-2 font-mono">
                                        <SectionHeader title={section.title} type={section.type} />
                                        <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                                            {(section.content as any[]).map((item: any) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <span className="text-sm font-medium text-black">{item.skill || item.name}</span>
                                                    <SkillDots level={item.level} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                            case 'Certificates':
                            case 'Languages':
                            case 'Interests':
                                return (
                                    <div key={section.id} className="mb-2 font-mono text-sm">
                                        <SectionHeader title={section.title} type={section.type} />
                                        <div className="flex flex-col gap-3">
                                            {(section.content as any[]).map((item: any) => (
                                                <div key={item.id} className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-black">
                                                            {item.certificate || item.language || item.interest || item.name || item.skill}
                                                        </span>
                                                        {item.level && <span className="text-gray-500 font-medium italic">({item.level})</span>}
                                                    </div>
                                                    {(item.description || item.additionalInfo || item.information || item.issuer) && (
                                                        <div
                                                            className="text-xs text-gray-700 leading-relaxed"
                                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information || item.issuer }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                            case 'References':
                                return (
                                    <div key={section.id} className="mb-2 font-mono">
                                        <SectionHeader title={section.title} type={section.type} />
                                        <div className="grid grid-cols-2 gap-6">
                                            {(section.content as any[]).map((item: any) => (
                                                <div key={item.id} className="flex flex-col gap-0.5 text-xs text-gray-800">
                                                    <div className="font-bold text-black text-sm">{item.name}</div>
                                                    <div className="italic">{item.jobTitle}, {item.organization}</div>
                                                    <div>{item.email}</div>
                                                    <div>{item.phone}</div>
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
        </div>
    );
};
