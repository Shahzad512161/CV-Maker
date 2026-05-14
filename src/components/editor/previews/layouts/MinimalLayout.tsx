import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const MinimalLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const mainSections = sections.filter(s => s.isVisible);

    return (
        <div className={`w-full h-full min-h-[297mm] ${theme.fontFamily} bg-white shadow-lg p-16 max-w-[210mm] mx-auto`}>

            {/* Minimal Header */}
            <header className="text-center mb-12 border-b pb-8 border-gray-100">
                <h1 className={`text-4xl font-normal text-gray-900 tracking-tight mb-3 ${theme.headingStyle}`}>
                    {personalDetails.fullName}
                </h1>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-light mb-6">
                    {personalDetails.jobTitle}
                </p>

                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400 font-light"
                    itemClassName="flex items-center gap-1.5 h-3"
                    linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none text-gray-400 no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={12}
                    iconStyle={{ color: '#9ca3af' }} // gray-400
                />
            </header>

            {/* Content */}
            <div className={`space-y-10 ${theme.sectionSpacing}`}>
                {mainSections.map(section => (
                    <div key={section.id}>
                        <h2
                            className={`text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 ${theme.headingStyle}`}
                            style={{ color: theme.color }}
                        >
                            {section.title}
                        </h2>

                        {/* List Items (Experience/Education) */}
                        {Array.isArray(section.content) && section.type !== 'Skills' && (
                            <div className="space-y-6">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="grid grid-cols-[1fr_4fr] gap-6">
                                        <div className="text-sm text-gray-400 font-light text-right">
                                            {item.startDate} – {item.endDate || 'Present'}
                                            {item.location && <div className="mt-1 opacity-70">{item.location}</div>}
                                        </div>
                                        <div>
                                            <div className="flex items-baseline justify-between mb-1">
                                                <h3 className="font-semibold text-gray-900">{item.employer || item.school}</h3>
                                            </div>
                                            <div className="text-sm text-gray-600 italic mb-2">{item.jobTitle || item.degree}</div>
                                            {item.description && (
                                                <p className="text-sm text-gray-600 leading-relaxed font-light">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Skills - Simple Clean List */}
                        {section.type === 'Skills' && Array.isArray(section.content) && (
                            <div className="flex flex-wrap gap-x-8 gap-y-2">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="text-sm text-gray-700">
                                        <span className="font-medium">{item.skill}</span>
                                        {item.level && <span className="text-gray-400 text-xs ml-1">({item.level})</span>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Plain Text */}
                        {typeof section.content === 'string' && (
                            <p className="text-sm text-gray-600 leading-7 font-light">{section.content}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
