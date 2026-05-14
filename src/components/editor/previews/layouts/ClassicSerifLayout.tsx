import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const ClassicSerifLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    return (
        <div className={`w-full h-full min-h-[297mm] p-12 font-serif bg-white shadow-lg text-gray-900`}>

            {/* Header: Centered Name & Contact */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 capitalize">
                    {personalDetails.fullName}
                </h1>

                {personalDetails.jobTitle && (
                    <p className="text-lg text-gray-700 italic mb-3">
                        {personalDetails.jobTitle}
                    </p>
                )}

                {/* Contact Row */}
                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-gray-700"
                    itemClassName="flex items-center gap-1.5 h-3"
                    linkClassName="hover:underline [overflow-wrap:anywhere] leading-none"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={12}
                />
            </header>

            {/* Content Body */}
            <div className="space-y-6">
                {sections.filter(s => s.isVisible).map(section => (
                    <div key={section.id}>
                        {/* Section Header: Left Aligned, Bold, Bottom Border */}
                        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b-2 border-gray-800 mb-4 pb-1">
                            {section.title}
                        </h2>

                        {/* Content */}
                        <div className="space-y-4">

                            {/* Experience / Education / Projects / Publications / Awards / Organizations / Courses */}
                            {Array.isArray(section.content) && ['Experience', 'Education', 'Projects', 'Publications', 'Awards', 'Organisations', 'Courses'].includes(section.type) && (
                                <div className="space-y-4">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id}>
                                            <div className="flex justify-between items-baseline">
                                                <div className="font-bold text-gray-900 text-base">
                                                    {item.employer || item.school || item.title || item.publisher || item.certificate}
                                                </div>
                                                <div className="text-gray-900 font-medium text-sm shrink-0">
                                                    {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                    {item.date}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-baseline mb-1">
                                                <div className="italic text-gray-800">
                                                    {item.jobTitle || item.degree || item.subTitle || item.publisher}
                                                </div>
                                                <div className="text-gray-600 text-xs italic">
                                                    {item.location}
                                                </div>
                                            </div>

                                            {item.description && (
                                                <div
                                                    className="text-gray-800 text-sm leading-relaxed text-justify ml-4 list-disc"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Custom / Custom Section - Detailed List */}
                            {section.type === 'Custom' && Array.isArray(section.content) && (
                                <div className="space-y-4">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id}>
                                            <div className="flex justify-between items-baseline">
                                                <div className="font-bold text-gray-900 text-base">
                                                    {item.title}
                                                </div>
                                                <div className="text-gray-900 font-medium text-sm shrink-0">
                                                    {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                </div>
                                            </div>

                                            {(item.subTitle || item.location) && (
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <div className="italic text-gray-800">
                                                        {item.subTitle}
                                                    </div>
                                                    <div className="text-gray-600 text-xs italic">
                                                        {item.location}
                                                    </div>
                                                </div>
                                            )}

                                            {item.description && (
                                                <div
                                                    className="text-gray-800 text-sm leading-relaxed text-justify ml-4 list-disc"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Technical Skills - Flexible List to support Descriptions */}
                            {section.type === 'Skills' && Array.isArray(section.content) && (
                                <div className="flex flex-col gap-3">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-gray-800 rounded-full shrink-0"></span>
                                                <span className="font-bold text-gray-900">{item.skill}</span>
                                                {item.level && (
                                                    <span className="text-gray-600 italic text-xs">({item.level})</span>
                                                )}
                                            </div>
                                            {(item.information) && (
                                                <div
                                                    className="ml-5 mt-1 text-gray-700 leading-relaxed text-left"
                                                    dangerouslySetInnerHTML={{ __html: item.information }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Languages - Flexible List (Same as Skills) */}
                            {section.type === 'Languages' && Array.isArray(section.content) && (
                                <div className="flex flex-col gap-3">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-gray-800 rounded-full shrink-0"></span>
                                                <span className="font-bold text-gray-900">{item.language}</span>
                                                {item.level && (
                                                    <span className="text-gray-600 italic text-xs">({item.level})</span>
                                                )}
                                            </div>
                                            {(item.information) && (
                                                <div
                                                    className="ml-5 mt-1 text-gray-700 leading-relaxed text-left"
                                                    dangerouslySetInnerHTML={{ __html: item.information }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Certificates - Detailed List */}
                            {section.type === 'Certificates' && Array.isArray(section.content) && (
                                <div className="flex flex-col gap-3">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-gray-800 rounded-full shrink-0"></span>
                                                <span className="font-bold text-gray-900">{item.certificate}</span>
                                            </div>
                                            {(item.additionalInfo) && (
                                                <div
                                                    className="ml-5 mt-1 text-gray-700 leading-relaxed text-left"
                                                    dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Interests - Detailed List */}
                            {section.type === 'Interests' && Array.isArray(section.content) && (
                                <div className="flex flex-col gap-3">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-gray-800 rounded-full shrink-0"></span>
                                                <span className="font-bold text-gray-900">{item.name}</span>
                                            </div>
                                            {(item.additionalInfo) && (
                                                <div
                                                    className="ml-5 mt-1 text-gray-700 leading-relaxed text-left"
                                                    dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* References */}
                            {section.type === 'References' && Array.isArray(section.content) && (
                                <div className="grid grid-cols-2 gap-6">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="text-sm">
                                            <div className="font-bold text-gray-900">{item.name}</div>
                                            <div className="italic text-gray-700">{item.jobTitle}, {item.organization}</div>
                                            <div className="text-gray-600 mt-1">{item.email}</div>
                                            <div className="text-gray-600">{item.phone}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Common Text Content */}
                            {typeof section.content === 'string' && (
                                <div
                                    className="text-gray-800 text-sm leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
