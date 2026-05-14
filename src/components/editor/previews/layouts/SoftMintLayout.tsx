import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';

import { MapPin, Phone, Mail, Linkedin, Globe, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface SoftMintLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const SoftMintLayout: React.FC<SoftMintLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };


    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mb-4 mt-6 first:mt-2">
            <h2 className="text-black text-lg font-bold border-b border-white pb-1 mb-3">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-[#B2D8D2] font-sans text-[#1a1a1a] p-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-black mb-1">{personalDetails.fullName}</h1>
                <p className="text-xl text-black font-medium mb-4">{personalDetails.jobTitle}</p>

                <ContactInfoRenderer
                    data={data}
                    layout="vertical"
                    className="text-sm text-black space-y-1.5 mt-4"
                    itemClassName="flex items-center gap-2 h-4"
                    linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-black no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none text-black"
                    iconSize={14}
                    iconStyle={{ color: 'black' }}
                />
            </div>

            {/* Experience - Full Width */}
            {sections.filter(s => s.type === 'Experience').map(section => hasContent(section) && (
                <div key={section.id} className="mb-6">
                    <SectionHeader title={section.title} />
                    <div className="space-y-6">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="font-bold text-black text-[15px]">
                                        {item.employer} <span className="mx-1">|</span> {item.location && <span>{item.location}, </span>}<span className="italic font-normal">{item.jobTitle}</span>
                                    </div>
                                    <div className="text-sm text-black shrink-0">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                    </div>
                                </div>
                                {(item.description) && (
                                    <div
                                        className="text-sm text-black leading-relaxed text-justify"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Education - Full Width */}
            {sections.filter(s => s.type === 'Education').map(section => hasContent(section) && (
                <div key={section.id} className="mb-6">
                    <SectionHeader title={section.title} />
                    <div className="space-y-4">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="font-bold text-black text-[15px]">
                                        {item.degree}, <span className="italic font-normal">{item.school}</span>
                                    </div>
                                    <div className="text-sm text-black shrink-0">
                                        {item.location}
                                        {item.location && (item.startDate || item.endDate) && <span>, </span>}
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                    </div>
                                </div>
                                {(item.description) && (
                                    <div
                                        className="text-sm text-black leading-relaxed text-justify mt-1"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Split Columns */}
            <div className="flex gap-12">
                {/* Left Column (Tools/Awards/References etc) */}
                <div className="w-1/2 flex flex-col gap-6">
                    {/* Render generic/custom sections here that usually fit 'Tools' or 'Awards' */}
                    {sections.filter(s => ['Projects', 'Awards', 'Certificates', 'Publications', 'Interests', 'Courses', 'Organisations', 'References'].includes(s.type)).map(section => hasContent(section) && (
                        <div key={section.id}>
                            <SectionHeader title={section.title} />
                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id}>
                                        <div className="font-bold text-black text-sm">
                                            {item.title || item.name || item.project || item.certificate}
                                        </div>
                                        <div className="text-sm text-black">
                                            {[
                                                item.subtitle,
                                                item.subTitle,
                                                item.jobTitle, // For References
                                                item.organization, // For References/Organisations
                                                item.publisher,
                                                item.location,
                                                item.email, // For References
                                                item.phone, // For References
                                                item.date,
                                                [item.startDate, item.endDate].filter(Boolean).join(' – ')
                                            ].filter(s => s && s.toString().trim().length > 0).join(', ')}
                                        </div>
                                        {(item.description || item.additionalInfo) && (
                                            <div
                                                className="text-sm text-black leading-relaxed mt-1"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column (Languages, Skills etc) */}
                <div className="w-1/2 flex flex-col gap-6">
                    {/* Languages */}
                    {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <SectionHeader title={section.title} />
                            <div className="space-y-3">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="text-sm text-black flex items-start gap-2">
                                        <span className="text-black shrink-0 mt-1.5 w-1 h-1 bg-black rounded-full block"></span>
                                        <div className="flex flex-col">
                                            <div>
                                                <span className="font-bold">{item.language}</span>
                                                {item.level && <span className="text-gray-600 ml-1">({item.level})</span>}
                                            </div>
                                            {item.information && (
                                                <div
                                                    className="text-sm text-black leading-relaxed mt-0.5"
                                                    dangerouslySetInnerHTML={{ __html: item.information }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Skills */}
                    {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <SectionHeader title={section.title} />
                            <div className="space-y-2">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="text-sm text-black flex items-start gap-2">
                                        <span className="text-black shrink-0 mt-1.5 w-1 h-1 bg-black rounded-full block"></span>
                                        <div className="flex flex-col">
                                            <div>
                                                <span className="font-bold">{item.skill}</span>
                                                {item.level && <span className="text-gray-600 ml-1">({item.level})</span>}
                                            </div>
                                            {item.information && (
                                                <div
                                                    className="text-sm text-black leading-relaxed mt-0.5"
                                                    dangerouslySetInnerHTML={{ __html: item.information }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Profile moved to bottom right? Reference image shows "Most Proud Of" which is usually a text block. Let's put Profile here if it exists. */}
                    {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <SectionHeader title="MOST PROUD OF" />
                            <div
                                className="text-sm text-black leading-relaxed text-justify"
                                dangerouslySetInnerHTML={{ __html: section.content as string }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Section - Full Width (Edge to Edge) */}
            {sections.filter(s => s.type === 'Custom').map(section => hasContent(section) && (
                <div key={section.id} className="mt-8 mb-6">
                    <SectionHeader title={section.title} />
                    <div className="space-y-6">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="font-bold text-black text-[15px]">
                                        {item.title}
                                        {item.location && <span> | {item.location}</span>}
                                        {item.subTitle && <span className="italic font-normal mx-1"> - {item.subTitle}</span>}
                                    </div>
                                    <div className="text-sm text-black shrink-0">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                    </div>
                                </div>
                                {(item.description) && (
                                    <div
                                        className="text-sm text-black leading-relaxed text-justify"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
};
