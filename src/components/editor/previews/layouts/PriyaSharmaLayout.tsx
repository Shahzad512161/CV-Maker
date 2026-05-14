import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Linkedin, Globe, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface PriyaSharmaLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const PriyaSharmaLayout: React.FC<PriyaSharmaLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };


    // Distinctive Section Header: Centered with lines above and below
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="py-1 border-t-2 border-b-2 border-black mb-4 mt-6 text-center">
            <h2 className="text-black text-lg font-bold tracking-wide">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-sans text-[#1a1a1a] p-10">
            {/* Header */}
            <header className="mb-6 border-b-2 border-gray-400 pb-6">
                <h1 className="text-4xl font-extrabold text-black mb-1.5">{personalDetails.fullName}</h1>
                <p className="text-2xl text-gray-800 font-bold mb-4">{personalDetails.jobTitle}</p>

                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600"
                    itemClassName="flex items-center gap-1.5 h-4"
                    linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-600 no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={14}
                    iconStyle={{ color: '#4b5563' }} // gray-600
                />
            </header>

            <div className="flex gap-8">
                {/* Left Column (Main Content) - Approx 60% */}
                <div className="w-[60%] flex flex-col">

                    {/* Profile */}
                    {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-4 resume-item">
                            <SectionHeader title={section.title} />
                            <div
                                className="text-sm text-black leading-relaxed text-justify"
                                dangerouslySetInnerHTML={{ __html: section.content as string }}
                            />
                        </div>
                    ))}

                    {/* Experience */}
                    {sections.filter(s => s.type === 'Experience').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-4">
                            <SectionHeader title={section.title} />
                            <div className="space-y-5">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        <div className="mb-1">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="font-bold text-black text-[15px]">{item.jobTitle}</h3>
                                            </div>
                                            <div className="text-gray-700 font-medium text-sm">
                                                {item.employer}
                                            </div>
                                            <div className="text-xs text-gray-500 italic mt-0.5 mb-2">
                                                {[
                                                    [item.startDate, item.endDate].filter(Boolean).join(' – '),
                                                    item.location
                                                ].filter(Boolean).join(' | ')}
                                            </div>
                                        </div>
                                        {(item.description) && (
                                            <div
                                                className="text-sm text-black leading-relaxed text-justify pl-0"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Custom Sections (Full Width style but in left col) */}
                    {sections.filter(s => s.type === 'Custom').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-4">
                            <SectionHeader title={section.title} />
                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        <div className="font-bold text-black text-sm">
                                            {item.title}
                                            {item.subTitle && <span className="font-normal italic ml-1"> - {item.subTitle}</span>}
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">
                                            {[
                                                [item.startDate, item.endDate].filter(Boolean).join(' – '),
                                                item.location
                                            ].filter(Boolean).join(' | ')}
                                        </div>
                                        {(item.description) && (
                                            <div
                                                className="text-sm text-black leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>

                {/* Right Column (Sidebar) - Approx 40% */}
                <div className="w-[40%] flex flex-col">

                    {/* Skills */}
                    {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-4">
                            <SectionHeader title={section.title} />
                            <div className="space-y-3">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        <div className="font-bold text-sm text-black mb-0.5">
                                            {item.skill}
                                            {item.level && <span className="font-normal text-gray-600 text-xs ml-1">({item.level})</span>}
                                        </div>
                                        {item.information && (
                                            <div
                                                className="text-sm text-black leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.information }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Education */}
                    {sections.filter(s => s.type === 'Education').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-4">
                            <SectionHeader title={section.title} />
                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item border-l-0 pl-0">
                                        <div className="font-bold text-black text-sm">{item.degree}</div>
                                        <div className="text-sm text-gray-800">{item.school}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            {[
                                                [item.startDate, item.endDate].filter(Boolean).join(' – '),
                                                item.location
                                            ].filter(Boolean).join(' | ')}
                                        </div>
                                        {(item.description) && (
                                            <div
                                                className="text-sm text-black leading-relaxed mt-1"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Projects (Specifically requested in right column) */}
                    {sections.filter(s => s.type === 'Projects').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-4">
                            <SectionHeader title={section.title} />
                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        <div className="font-bold text-black text-sm">{item.title}</div>
                                        <div className="text-xs text-gray-500 mb-1">
                                            {[item.subTitle, [item.startDate, item.endDate].filter(Boolean).join(' – ')].filter(Boolean).join(' | ')}
                                        </div>
                                        {(item.description) && (
                                            <div
                                                className="text-sm text-black leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Other Sidebar Sections */}
                    {sections.filter(s => ['Certificates', 'Awards', 'Languages', 'Interests', 'Publications', 'References'].includes(s.type)).map(section => hasContent(section) && (
                        <div key={section.id} className="mb-4">
                            <SectionHeader title={section.title} />
                            <div className="space-y-3">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        {/* Generic render for list items */}
                                        <div className="font-bold text-black text-sm">
                                            {item.title || item.name || item.certificate || item.language || item.interest}
                                            {/* Specifics for languages/skills levels */}
                                            {(item.level) && <span className="font-normal text-gray-600 text-xs ml-1">({item.level})</span>}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {[
                                                item.subtitle,
                                                item.issuer,
                                                item.publisher,
                                                item.organization,
                                                item.jobTitle,
                                                item.email,
                                                item.phone,
                                                item.date,
                                                [item.startDate, item.endDate].filter(Boolean).join(' – ')
                                            ].filter(Boolean).join(', ')}
                                        </div>
                                        {(item.description || item.information || item.additionalInfo) && (
                                            <div
                                                className="text-sm text-black leading-relaxed mt-0.5"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};
