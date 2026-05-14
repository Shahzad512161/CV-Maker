import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import {
    MapPin,
    Phone,
    Mail,
    Linkedin,
    Globe,
    ExternalLink,
    Calendar,
    Flag
} from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface BrianTWayneLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const BrianTWayneLayout: React.FC<BrianTWayneLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    // Sidebar Section Header (White text, lighter border)
    const SidebarSectionHeader = ({ title }: { title: string }) => (
        <div className="mb-4 mt-6">
            <h2 className="text-white text-lg font-serif font-bold border-b border-white/30 pb-1">{title}</h2>
        </div>
    );

    // Main Section Header (Dark text, dark border)
    const MainSectionHeader = ({ title }: { title: string }) => (
        <div className="mb-6 mt-8">
            <h2 className="text-[#333333] text-xl font-serif font-bold border-b-2 border-[#333333] pb-1">{title}</h2>
        </div>
    );

    return (
        <div className="flex min-h-[29.7cm] w-full bg-white font-serif text-[#333333]">
            {/* Left Sidebar - Dark Green */}
            <div className="w-[35%] bg-[#2C3E33] text-white px-8 py-12 flex flex-col gap-6">

                {/* Name & Title Block */}
                <div className="flex flex-col mb-6">
                    <h1 className="text-3xl font-bold leading-tight mb-2 font-serif">
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-lg text-white/90 italic font-serif">
                        {personalDetails.jobTitle}
                    </p>
                </div>

                {/* Contact Info */}
                {/* Contact Info - HONORS REORDERING */}
                <ContactInfoRenderer
                    data={data}
                    className="flex flex-col gap-3 text-sm font-medium text-white/90 mb-4 font-sans"
                    itemClassName="flex items-center gap-3 h-4"
                    linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none text-white/90"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={14}
                    iconStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                />

                {/* Profile Section (In Sidebar) */}
                {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SidebarSectionHeader title={section.title} />
                        <div
                            className="text-sm leading-relaxed text-white/90 text-justify [&_p]:mb-2 font-serif"
                            dangerouslySetInnerHTML={{ __html: section.content as string }}
                        />
                    </div>
                ))}

                {/* Education Section (In Sidebar) */}
                {sections.filter(s => s.type === 'Education').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SidebarSectionHeader title={section.title} />
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="font-bold text-white text-[15px] leading-tight">
                                        {item.degree}
                                    </div>
                                    <div className="text-sm text-white/90 italic mt-0.5">
                                        {item.school}
                                    </div>
                                    <div className="text-xs text-white/70 italic mt-0.5">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                        {item.location ? ` | ${item.location}` : ''}
                                    </div>
                                    {(item.description) && (
                                        <div
                                            className="text-sm text-white/90 leading-relaxed mt-1 [&_p]:mb-1 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Languages Section (In Sidebar) */}
                {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SidebarSectionHeader title={section.title} />
                        <ul className="list-disc pl-5 space-y-1">
                            {(section.content as any[]).map((item: any) => (
                                <li key={item.id} className="text-sm text-white/90 mb-3">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-bold">{item.language}</span>
                                        {item.level && <span className="opacity-80 text-xs italic">({item.level})</span>}
                                    </div>
                                    {item.information && (
                                        <div
                                            className="text-sm text-white/90 mt-1 leading-relaxed [&_p]:mb-0.5 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.information }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

            {/* Right Main Content - White */}
            <div className="w-[65%] bg-white px-10 py-12">

                {/* Experience */}
                {sections.filter(s => s.type === 'Experience').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader title={section.title} />
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="mb-1">
                                        <span className="font-bold text-[#333333] text-[16px]">
                                            {item.jobTitle},
                                        </span>
                                        <span className="text-[#333333] italic ml-1">
                                            {item.employer}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2 font-sans">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                        {item.location ? ` | ${item.location}` : ''}
                                    </div>

                                    {(item.description) && (
                                        <div
                                            className="text-[15px] text-[#333333] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-[#333333] [&_p]:mb-1 text-justify font-serif"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Skills Section (In Main Content) */}
                {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader title={section.title} />
                        <div className="space-y-2">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="text-[15px] text-[#333333] leading-relaxed flex gap-2">
                                    <span className="font-bold shrink-0">•</span>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-bold">{item.skill}</span>
                                            {item.level && <span className="text-sm text-gray-500 italic font-sans">({item.level})</span>}
                                        </div>
                                        {item.information && (
                                            <div
                                                className="text-[15px] text-[#333333] font-serif mt-0.5 text-justify leading-relaxed [&_p]:mb-1"
                                                dangerouslySetInnerHTML={{ __html: item.information }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Awards / Default Generic Section (In Main Content) */}
                {sections.filter(s => !['Profile', 'Education', 'Languages', 'Skills', 'Experience'].includes(s.type)).map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader title={section.title} />
                        <div className="space-y-5">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="font-bold text-[#333333] text-[15px]">
                                        {item.title || item.name || item.project || item.certificate}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1 font-sans italic">
                                        {[
                                            item.subTitle,
                                            item.jobTitle,
                                            item.publisher,
                                            item.date,
                                            item.organization,
                                            item.email,
                                            item.phone,
                                            item.location,
                                            [item.startDate, item.endDate].filter(Boolean).join(' – ')
                                        ].filter(Boolean).join(', ')}
                                    </div>
                                    {(item.description || item.additionalInfo) && (
                                        <div
                                            className="text-[15px] text-[#333333] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify font-serif"
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
