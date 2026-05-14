import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import {
    MapPin,
    Phone,
    Mail,
    Linkedin,
    Globe,
    User,
    Briefcase,
    GraduationCap,
    Cpu,
    Award,
    Languages as LanguagesIcon,
    FolderGit2,
    Calendar,
    Flag
} from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface MateoVargasLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const MateoVargasLayout: React.FC<MateoVargasLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };


    const getSectionIcon = (type: string) => {
        switch (type) {
            case 'Profile': return <User size={20} className="shrink-0" />;
            case 'Experience': return <Briefcase size={20} className="shrink-0" />;
            case 'Education': return <GraduationCap size={20} className="shrink-0" />;
            case 'Skills': return <Cpu size={20} className="shrink-0" />;
            case 'Languages': return <LanguagesIcon size={20} className="shrink-0" />;
            case 'Projects': return <FolderGit2 size={20} className="shrink-0" />;
            case 'Awards': return <Award size={20} className="shrink-0" />;
            default: return <Award size={20} className="shrink-0" />;
        }
    };

    const SectionHeader = ({ title, type }: { title: string, type: string }) => (
        <div className="flex items-center gap-3 mb-4 mt-6 first:mt-2 h-6">
            <span className="text-[#333333] h-full flex items-center">{getSectionIcon(type)}</span>
            <h2 className="text-[#333333] text-xl font-bold leading-none">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-sans text-[#333333]">
            {/* Dark Header */}
            <div className="bg-black text-white px-10 py-10">
                <h1 className="text-4xl font-bold mb-2 tracking-tight">
                    {personalDetails.fullName}
                </h1>
                {personalDetails.jobTitle && (
                    <p className="text-xl text-gray-300 font-medium mb-6">
                        {personalDetails.jobTitle}
                    </p>
                )}

                {/* Contact Grid */}
                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    className="grid grid-cols-2 gap-y-2 gap-x-12 text-[15px]"
                    itemClassName="flex items-center gap-3 h-4"
                    linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none text-white no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={16}
                    iconStyle={{ color: '#d1d5db' }} // gray-300
                />
            </div>

            {/* Main Content */}
            <div className="px-10 pb-8 pt-4">

                {/* Profile */}
                {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SectionHeader title={section.title} type="Profile" />
                        <div
                            className="text-[15px] leading-relaxed text-justify text-[#4a5568]"
                            dangerouslySetInnerHTML={{ __html: section.content as string }}
                        />
                    </div>
                ))}

                {/* Experience */}
                {sections.filter(s => s.type === 'Experience').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SectionHeader title={section.title} type="Experience" />
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div>
                                            <span className="font-bold text-black text-[16px]">
                                                {item.jobTitle}
                                            </span>
                                            <span className="text-gray-600 mx-1">,</span>
                                            <span className="text-gray-600">
                                                {item.employer}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 font-medium shrink-0">
                                            {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                        </div>
                                    </div>
                                    {/* Location specific line if needed, or included above? Image shows just date right aligned */}

                                    {(item.description) && (
                                        <div
                                            className="text-[15px] text-[#4a5568] leading-relaxed mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Education */}
                {sections.filter(s => s.type === 'Education').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SectionHeader title={section.title} type="Education" />
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-black text-[16px]">
                                            {item.degree}
                                        </span>
                                        <div className="text-sm text-gray-500 font-medium shrink-0">
                                            {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                        </div>
                                    </div>
                                    <div className="text-[15px] text-gray-700">
                                        {item.school}{item.location ? `, ${item.location}` : ''}
                                    </div>
                                    {(item.description) && (
                                        <div
                                            className="text-[14px] text-gray-600 leading-relaxed mt-1"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Skills */}
                {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SectionHeader title={section.title} type="Skills" />
                        <div className="space-y-2">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="text-[15px] text-[#333333] leading-relaxed flex gap-2">
                                    <span className="font-bold shrink-0">•</span>
                                    <div>
                                        <span className="font-bold text-black">{item.skill}</span>
                                        {item.level && <span className="text-gray-500 font-normal ml-1">- {item.level}</span>}
                                        {item.information && (
                                            <>
                                                <span className="font-bold text-black mr-1">:</span>
                                                <span
                                                    className="text-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: item.information.replace(/<[^>]*>?/gm, '') }}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Generic Sections (Projects, Awards, etc) */}
                {sections.filter(s => !['Profile', 'Education', 'Experience', 'Skills'].includes(s.type)).map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SectionHeader title={section.title} type={section.type} />
                        <div className="space-y-5">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="font-bold text-black text-[16px]">
                                            {item.title || item.name || item.project || item.certificate}
                                        </div>
                                        <div className="text-sm text-gray-500 font-medium shrink-0">
                                            {[
                                                item.date,
                                                [item.startDate, item.endDate].filter(Boolean).join(' – ')
                                            ].filter(Boolean).join(', ')}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1 italic">
                                        {[
                                            item.subtitle,
                                            item.publisher,
                                            item.organization,
                                            item.location
                                        ].filter(Boolean).join(', ')}
                                    </div>
                                    {(item.description || item.additionalInfo) && (
                                        <div
                                            className="text-[15px] text-[#4a5568] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};
