import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import {
    MapPin,
    Phone,
    Mail,
    Linkedin,
    Globe,
    Calendar,
    Flag,
    ExternalLink
} from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface ArjunMehtaLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const ArjunMehtaLayout: React.FC<ArjunMehtaLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    // Shared Header Component (Centered with double border)
    const SectionHeader = ({ title, className = "" }: { title: string, className?: string }) => (
        <div className={`mb-6 mt-8 flex flex-col items-center ${className}`}>
            <div className="w-full border-t-2 border-black mb-1"></div>
            <h2 className="text-black text-sm font-bold uppercase tracking-widest py-1 text-center">{title}</h2>
            <div className="w-full border-b-2 border-black mt-1"></div>
        </div>
    );

    return (
        <div className="flex min-h-[29.7cm] w-full bg-white font-sans text-[#333333]">
            {/* Left Sidebar - Light Gray */}
            <div className="w-[35%] bg-[#EBEFF2] text-[#374151] px-6 py-10 flex flex-col gap-6">

                {/* Photo & Name Block */}
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl font-bold leading-tight mb-2 text-[#1a202c]">
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-lg text-[#4a5568] font-medium mb-6">
                        {personalDetails.jobTitle}
                    </p>

                    {personalDetails.photo && (
                        <div className="w-48 h-56 overflow-hidden mb-6 shadow-sm bg-white">
                            <img
                                src={personalDetails.photo}
                                alt={personalDetails.fullName}
                                className="w-full h-full object-cover grayscale-[20%]"
                            />
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                {/* Contact Info - HONORS REORDERING */}
                <ContactInfoRenderer
                    data={data}
                    className="flex flex-col gap-3 text-sm font-medium text-[#4a5568] px-2 mb-4"
                    itemClassName="flex items-center gap-3 h-4"
                    linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={16}
                    iconStyle={{ color: '#2d3748' }}
                />

                {/* Profile Section (In Sidebar per design) */}
                {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                    <div key={section.id} className="mt-2">
                        <SectionHeader title={section.title} />
                        <div
                            className="text-sm leading-relaxed text-[#4a5568] text-justify [&_p]:mb-2 font-sans [&_*]:font-sans"
                            dangerouslySetInnerHTML={{ __html: section.content as string }}
                        />
                    </div>
                ))}

                {/* Skills Section (In Sidebar) */}
                {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SectionHeader title={section.title} />
                        <div className="flex flex-wrap gap-2">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="mb-2 w-full">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[#2d3748] block text-sm">{item.skill}</span>
                                        {item.level && <span className="text-xs text-[#718096] italic">{item.level}</span>}
                                    </div>
                                    {item.information && (
                                        <div
                                            className="text-sm text-[#4a5568] mt-0.5 [&_p]:mb-1 font-sans [&_*]:font-sans text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.information }}
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
                        <SectionHeader title={section.title} />
                        <div className="flex flex-col gap-2">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="w-full">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[#2d3748] text-sm">{item.language}</span>
                                        {item.level && <span className="text-xs text-[#718096] italic">{item.level}</span>}
                                    </div>
                                    {item.information && (
                                        <div
                                            className="text-sm text-[#4a5568] mt-0.5 [&_p]:mb-1 font-sans [&_*]:font-sans text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.information }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            {/* Right Main Content - White */}
            <div className="w-[65%] bg-white px-10 py-10">

                {/* Experience */}
                {sections.filter(s => s.type === 'Experience').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <SectionHeader title={section.title} />
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="mb-1">
                                        <div className="font-bold text-[#1a202c] text-[15px]">
                                            {item.jobTitle}
                                        </div>
                                        <div className="text-sm text-[#4a5568] font-medium">
                                            {item.employer}
                                        </div>
                                        <div className="text-sm text-[#718096] italic mb-2">
                                            {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                            {item.location ? ` | ${item.location}` : ''}
                                        </div>
                                    </div>

                                    {(item.description) && (
                                        <div
                                            className="text-sm text-[#2d3748] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-[#4a5568] [&_p]:mb-1 text-justify"
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
                    <div key={section.id} className="mb-8">
                        <SectionHeader title={section.title} />
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="font-bold text-[#1a202c] text-[15px]">
                                        {item.degree}
                                    </div>
                                    <div className="text-sm text-[#4a5568] font-medium">
                                        {item.school}
                                    </div>
                                    <div className="text-sm text-[#718096] italic mb-1">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                        {item.location ? ` | ${item.location}` : ''}
                                    </div>
                                    {(item.description) && (
                                        <div
                                            className="text-sm text-[#2d3748] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify mt-1"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Default for other sections (Projects, Awards, etc) */}
                {sections.filter(s => !['Profile', 'Education', 'Languages', 'Skills', 'Experience'].includes(s.type)).map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <SectionHeader title={section.title} />
                        <div className="space-y-5">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="font-bold text-[#1a202c] text-[15px]">
                                        {item.title || item.name || item.fullName || item.project || item.certificate || item.award || item.school}
                                    </div>
                                    <div className="text-sm text-[#4a5568] mb-1">
                                        {[
                                            item.jobTitle,
                                            item.organization || item.subTitle || item.employer || item.issuer || item.publisher,
                                            item.location,
                                            item.date || [item.startDate, item.endDate].filter(Boolean).join(' – ')
                                        ].filter(Boolean).join(' | ')}
                                    </div>
                                    {(item.email || item.phone) && (
                                        <div className="text-[13px] text-[#718096] flex flex-wrap gap-x-4 mb-2">
                                            {item.email && <span>{item.email}</span>}
                                            {item.phone && <span>{item.phone}</span>}
                                        </div>
                                    )}
                                    {(item.description || item.additionalInfo) && (
                                        <div
                                            className="text-sm text-[#2d3748] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify"
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
