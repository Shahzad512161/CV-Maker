import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const ClassicLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    return (
        <div className={`w-full h-full min-h-[297mm] p-12 ${theme.fontFamily} bg-white shadow-lg text-gray-900`}>

            {/* Header: Centered Name & Contact */}
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2 tracking-wide text-gray-900 uppercase [overflow-wrap:anywhere] px-4">
                    {personalDetails.fullName}
                </h1>

                {/* Job Title - Added back per user request */}
                {personalDetails.jobTitle && (
                    <p className="text-md font-medium text-gray-600 uppercase tracking-[0.15em] mb-4 [overflow-wrap:anywhere] px-4">
                        {personalDetails.jobTitle}
                    </p>
                )}

                {/* Contact Row - Centered with Icons */}
                {/* Contact Row - Centered with Icons - HONORS REORDERING */}
                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-gray-800 font-medium px-4"
                    itemClassName="flex items-center gap-1.5 max-w-full [overflow-wrap:anywhere] h-4"
                    linkClassName="hover:underline [overflow-wrap:anywhere] leading-none"
                    textClassName="leading-none"
                    iconSize={14}
                />
            </header>

            {/* Content Body */}
            <div className={`space-y-8 ${theme.sectionSpacing}`}>
                {sections.filter(s => s.isVisible).map(section => (
                    <div key={section.id}>
                        {/* Section Header - Nadia Smith Style: Centered, Upper, Border Top & Bottom */}
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-full border-t border-gray-400"></div>
                            <h2 className="px-6 text-center font-bold text-sm tracking-[0.2em] uppercase whitespace-normal [overflow-wrap:anywhere] text-gray-800 shrink-0 max-w-[80%]">
                                {section.title}
                            </h2>
                            <div className="w-full border-t border-gray-400"></div>
                        </div>

                        {/* String Content (Profile / Summary) */}
                        {typeof section.content === 'string' && (
                            <div
                                className="text-gray-800 leading-relaxed text-justify text-sm [overflow-wrap:anywhere]"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        )}

                        {/* Experience / Education / Projects / Publications */}
                        {Array.isArray(section.content) && ['Experience', 'Education', 'Projects', 'Publications', 'Custom'].includes(section.type) && (
                            <div className="space-y-6">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="text-sm">
                                        {/* Line 1: Employer/School (Bold, Upper) ... Date (Right) */}
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1">
                                            <span className="font-bold text-gray-900 uppercase tracking-wide text-base [overflow-wrap:anywhere] min-w-0 pr-4">
                                                {item.employer || item.school || item.title || item.publisher}
                                            </span>
                                            <span className="text-left sm:text-right font-medium text-gray-700 shrink-0 [overflow-wrap:anywhere]">
                                                {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                {item.date}
                                            </span>
                                        </div>

                                        {/* Line 2: Job Title / Degree (Italic) */}
                                        {(item.jobTitle || item.degree || item.subTitle || item.publisher) && (
                                            <div className="italic text-gray-800 font-serif mb-2 [overflow-wrap:anywhere]">
                                                {item.jobTitle || item.degree || item.subTitle || item.publisher}
                                            </div>
                                        )}

                                        {/* Description */}
                                        {item.description && (
                                            <div
                                                className="text-gray-700 leading-relaxed pl-2 [overflow-wrap:anywhere]"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Skills / Languages / Interests */}
                        {['Skills', 'Languages', 'Interests'].includes(section.type) && Array.isArray(section.content) && (
                            <div className="w-full">
                                {/* Check if any item has a description using a simple check on the first few items or just map flexibly */}
                                <ul className="flex flex-col gap-4 items-center">
                                    {(section.content as any[]).map((item: any) => (
                                        <li key={item.id} className={`text-gray-800 font-medium text-sm ${item.information || item.additionalInfo ? 'w-full text-center' : 'inline-flex items-center gap-2'}`}>

                                            {/* Header Part */}
                                            <div className={`flex items-center justify-center gap-2 ${(item.information || item.additionalInfo) ? 'mb-1' : ''}`}>
                                                {/* Only show bullet if it's a simple list item without big description, or keep it consistent? 
                                                   Nadia template is usually clean. Let's use bullet for simple line items only, or if mixed.
                                                */}
                                                {!(item.information || item.additionalInfo) && <div className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0" />}

                                                <span className="[overflow-wrap:anywhere] font-bold text-gray-900">{item.skill || item.language || item.name}</span>

                                                {item.level && (
                                                    <span className="text-gray-500 italic text-xs font-normal">
                                                        ({item.level})
                                                    </span>
                                                )}
                                            </div>

                                            {/* Description Part */}
                                            {(item.information || item.additionalInfo) && (
                                                <div
                                                    className="text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto text-justify [overflow-wrap:anywhere]"
                                                    dangerouslySetInnerHTML={{ __html: item.information || item.additionalInfo }}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* References */}
                        {section.type === 'References' && Array.isArray(section.content) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="border p-4 rounded bg-gray-50">
                                        <div className="font-bold uppercase text-gray-900 mb-1">{item.name}</div>
                                        <div className="italic text-gray-700 mb-2">{item.jobTitle}, {item.organization}</div>
                                        <div className="text-xs text-gray-600">
                                            <div>{item.email}</div>
                                            <div>{item.phone}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Certificates - Added specific block to render Title + Additional Info */}
                        {section.type === 'Certificates' && Array.isArray(section.content) && (
                            <div className="space-y-6">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="text-sm">
                                        {/* Certificate Name */}
                                        <div className="font-bold text-gray-900 uppercase tracking-wide text-base mb-2 [overflow-wrap:anywhere]">
                                            {item.certificate}
                                        </div>

                                        {/* Description / Additional Info */}
                                        {item.additionalInfo && (
                                            <div
                                                className="text-gray-700 leading-relaxed [overflow-wrap:anywhere]"
                                                dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
