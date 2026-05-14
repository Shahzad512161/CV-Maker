import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Linkedin, Globe, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface AnnaFieldLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const AnnaFieldLayout: React.FC<AnnaFieldLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    // Edge-to-edge gray background section header
    const SectionHeader = ({ title }: { title: string }) => (
        <div className="w-full bg-[#f0f0f0] py-1.5 mb-4 mt-6 text-center">
            <h2 className="text-black text-lg font-bold font-serif tracking-wide">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-serif text-[#1a1a1a] p-10">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-black mb-2">{personalDetails.fullName}</h1>
                <p className="text-xl text-gray-700 mb-6">{personalDetails.jobTitle}</p>

                {/* Contact Grid - 2 Columns */}
                <ContactInfoRenderer
                    data={data}
                    className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm text-gray-800 max-w-2xl"
                    itemClassName="flex items-center gap-2 h-4"
                    linkClassName="hover:opacity-100"
                    textClassName="leading-none"
                    iconSize={14}
                    // Wrapping icons in a fixed-width container to match original design
                    renderIcon={(icon: React.ReactNode) => <div className="w-5 flex justify-center">{icon}</div>}
                />
            </header>

            {/* Profile */}
            {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                <div key={section.id} className="mb-6">
                    <SectionHeader title={section.title} />
                    <div
                        className="text-sm text-gray-900 leading-relaxed text-justify"
                        dangerouslySetInnerHTML={{ __html: section.content as string }}
                    />
                </div>
            ))}

            {/* Experience */}
            {sections.filter(s => s.type === 'Experience').map(section => hasContent(section) && (
                <div key={section.id} className="mb-6">
                    <SectionHeader title={section.title} />
                    <div className="space-y-6">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="font-bold text-black text-[15px]">
                                        {item.jobTitle}{item.employer ? `, ${item.employer}` : ''}
                                    </div>
                                    <div className="text-sm text-gray-800 text-right whitespace-nowrap ml-4">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                    </div>
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <div></div> {/* Spacer if needed or content on left */}
                                    <div className="text-xs text-gray-600 text-right italic">{item.location}</div>
                                </div>

                                {(item.description) && (
                                    <div
                                        className="text-sm text-gray-900 leading-relaxed text-justify"
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
                <div key={section.id} className="mb-6">
                    <SectionHeader title={section.title} />
                    <div className="space-y-4">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="font-bold text-black text-[15px]">
                                        {item.degree}{item.school ? `, ${item.school}` : ''}
                                    </div>
                                    <div className="text-sm text-gray-800 text-right whitespace-nowrap ml-4">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600 text-right italic mb-2">{item.location}</div>

                                {(item.description) && (
                                    <div
                                        className="text-sm text-gray-900 leading-relaxed mt-1 text-justify"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Skills - 2 Column Grid */}
            {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                <div key={section.id} className="mb-6">
                    <SectionHeader title={section.title} />
                    <div className="flex flex-col gap-y-2">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id} className="flex flex-col mb-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-black inline-block transform scale-150 mr-1">•</span>
                                    <span className="font-bold text-sm text-black">{item.skill}</span>
                                    {item.level && <span className="text-xs text-gray-600">({item.level})</span>}
                                </div>
                                {item.information && (
                                    <div
                                        className="text-sm text-gray-800 leading-relaxed pl-4 text-justify"
                                        dangerouslySetInnerHTML={{ __html: item.information }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Languages - 2 Column Grid */}
            {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                <div key={section.id} className="mb-6">
                    <SectionHeader title={section.title} />
                    <div className="flex flex-col gap-y-2">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id} className="flex flex-col mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-black inline-block transform scale-150">•</span>
                                    <span className="font-bold text-sm text-black">{item.language}</span>
                                    {item.level && <span className="text-sm text-gray-600">- {item.level}</span>}
                                </div>
                                {(item.description || item.information || item.additionalInfo) && (
                                    <div
                                        className="text-sm text-gray-800 leading-relaxed pl-4 text-justify"
                                        dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Generic Sections (Projects, Custom, etc) */}
            {sections.filter(s => !['Profile', 'Experience', 'Education', 'Skills', 'Languages'].includes(s.type)).map(section => hasContent(section) && (
                <div key={section.id} className="mb-6">
                    <SectionHeader title={section.title} />
                    <div className="space-y-4">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline">
                                    <div className="font-bold text-black text-[15px]">
                                        {item.title || item.name || item.certificate || item.organization}
                                    </div>
                                    <div className="text-sm text-gray-800 text-right whitespace-nowrap ml-4">
                                        {[item.startDate, item.endDate, item.date].filter(Boolean).join(' – ')}
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700 mb-1">
                                    {[item.subTitle, item.publisher, item.issuer, item.location, item.jobTitle, item.organization, item.email, item.phone].filter(Boolean).join(' | ')}
                                </div>
                                {(item.description || item.information || item.additionalInfo) && (
                                    <div
                                        className="text-sm text-gray-900 leading-relaxed text-justify"
                                        dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Footer Email based on reference? "anna@field.com      1/1" */}
            <div className="fixed bottom-8 left-10 right-10 flex justify-between text-xs text-gray-500 font-serif">
                <span>{personalDetails.email}</span>
                <span></span> {/* Page number placeholder if we could do it, but HTML doesn't support generic Print page numbers easily without CSS counters and Paged Media */}
            </div>
        </div>
    );
};
