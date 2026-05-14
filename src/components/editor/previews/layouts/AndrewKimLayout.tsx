import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Globe, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface AndrewKimLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const AndrewKimLayout: React.FC<AndrewKimLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="border-b-2 border-black mb-5 mt-8 pb-1">
            <h2 className="text-black text-lg font-bold font-serif leading-tight">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-serif text-[#1a1a1a] p-[1.5cm] flex flex-col gap-4">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-black mb-1 leading-tight">{personalDetails.fullName}</h1>
                {personalDetails.jobTitle && (
                    <p className="text-xl text-gray-800 font-medium italic mb-6 leading-tight">{personalDetails.jobTitle}</p>
                )}

                <ContactInfoRenderer
                    data={data}
                    className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-gray-700"
                    itemClassName="flex items-center gap-3 py-0.5 h-4"
                    linkClassName="hover:underline [overflow-wrap:anywhere] leading-none"
                    textClassName="leading-none"
                    iconSize={14}
                />
            </header>

            {/* Content Sections */}
            <div className="flex flex-col">
                {sections.filter(s => s.isVisible).map(section => {
                    if (!hasContent(section)) return null;

                    switch (section.type) {
                        case 'Profile':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div
                                        className="text-sm leading-relaxed text-justify"
                                        dangerouslySetInnerHTML={{ __html: section.content as string }}
                                    />
                                </div>
                            );

                        case 'Experience':
                        case 'Education':
                        case 'Projects':
                        case 'Courses':
                        case 'Awards':
                        case 'Organisations':
                        case 'Publications':
                        case 'Custom':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div className="flex flex-col gap-6">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-4">
                                                {/* Left Column: Dates & Location */}
                                                <div className="text-sm flex flex-col gap-1">
                                                    <div className="font-medium text-gray-700 whitespace-pre-wrap">
                                                        {[item.startDate || item.date || item.publisherDate, item.endDate].filter(Boolean).join(' – ')}
                                                    </div>
                                                    <div className="text-gray-500 text-xs italic">
                                                        {item.location || item.publisher}
                                                    </div>
                                                </div>

                                                {/* Right Column: Title & Body */}
                                                <div className="flex flex-col gap-1">
                                                    <div className="font-bold text-black text-base">
                                                        {item.jobTitle || item.degree || item.title || item.course || item.award || item.organization}
                                                    </div>
                                                    <div className="italic text-gray-800 text-sm">
                                                        {item.employer || item.school || item.subTitle || item.issuer || item.publisher}
                                                    </div>
                                                    {item.description && (
                                                        <div
                                                            className="text-sm leading-relaxed mt-1"
                                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Skills':
                        case 'Certificates':
                        case 'Languages':
                        case 'Interests':
                        case 'References':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex flex-col gap-0.5">
                                                <div className="font-bold text-black text-sm flex justify-between items-baseline gap-2">
                                                    <span>{item.skill || item.certificate || item.language || item.name}</span>
                                                    {item.level && (
                                                        <span className="text-[10px] font-normal text-gray-500 uppercase shrink-0">
                                                            {item.level}
                                                        </span>
                                                    )}
                                                </div>
                                                {(item.information || item.issuer || item.additionalInfo || item.jobTitle || item.organization) && (
                                                    <div
                                                        className="text-xs text-gray-600 italic leading-snug"
                                                        dangerouslySetInnerHTML={{ __html: [item.jobTitle, item.organization, item.information || item.issuer || item.additionalInfo].filter(Boolean).join(' • ') }}
                                                    />
                                                )}
                                                {(item.description || item.email || item.phone) && (
                                                    <div
                                                        className="text-xs text-gray-700 leading-snug mt-0.5 whitespace-pre-line"
                                                    >
                                                        {item.description && <div dangerouslySetInnerHTML={{ __html: item.description }} />}
                                                        {item.email && <div>{item.email}</div>}
                                                        {item.phone && <div>{item.phone}</div>}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Declaration':
                            return (
                                <div key={section.id} className="mb-4">
                                    <SectionHeader title={section.title} />
                                    <div
                                        className="text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: section.content as string }}
                                    />
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
