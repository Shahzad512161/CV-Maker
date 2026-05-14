import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const BlankLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const mainSections = sections.filter(s => s.isVisible);

    return (
        <div className={`w-full h-full min-h-[297mm] ${theme.fontFamily} bg-white shadow-lg flex flex-col`}>

            {/* Header: White BG, Bottom Border, Left Text, Right Photo */}
            <header className="px-12 py-10 flex items-center justify-between border-b border-gray-200 bg-white">
                <div className="flex-1">
                    <h1
                        className={`text-4xl font-bold mb-2 ${theme.headingStyle}`}
                        style={{ color: theme.color }}
                    >
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-xl text-gray-700 font-medium tracking-wide mb-4 opacity-90">
                        {personalDetails.jobTitle}
                    </p>

                    {/* Contact Grid - HONORS REORDERING */}
                    <ContactInfoRenderer
                        data={data}
                        layout="horizontal"
                        className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600"
                        itemClassName="flex items-center gap-2 h-4"
                        linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none"
                        textClassName="[overflow-wrap:anywhere] leading-none text-gray-600"
                        iconSize={16}
                        iconStyle={{ color: '#6b7280' }} // gray-500
                    />
                </div>

                {/* Photo (Right Side) */}
                {personalDetails.photo && (
                    <div className="ml-8 shrink-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
            </header>

            {/* Content Body */}
            <div className={`p-12 space-y-8 flex-1 ${theme.sectionSpacing}`}>
                {mainSections.map(section => (
                    <div key={section.id} className="relative">
                        {/* Section Header */}
                        <h2
                            className={`text-lg font-bold mb-5 uppercase tracking-wider border-b pb-2 inline-block w-full ${theme.headingStyle}`}
                            style={{ color: theme.color, borderColor: '#e5e7eb' }}
                        >
                            {section.title}
                        </h2>

                        {/* SKILLS & LANGUAGES & INTERESTS (Grid/List hybrid) */}
                        {['Skills', 'Languages', 'Interests'].includes(section.type) && Array.isArray(section.content) && (
                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between py-1">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-baseline gap-3">
                                                    <span className="font-bold text-gray-900 border-b border-gray-100 pb-0.5">
                                                        {item.skill || item.language || item.name}
                                                    </span>
                                                    {item.level && <span className="text-sm text-gray-500 italic">({item.level})</span>}
                                                </div>

                                                {/* Link Icon for Skills/Interests */}
                                                {item.url && (
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                                        title={item.url}
                                                    >
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </div>

                                            {(item.information || item.additionalInfo) && (
                                                <div
                                                    className="text-sm text-gray-700 mt-1 leading-relaxed whitespace-pre-line prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1"
                                                    dangerouslySetInnerHTML={{ __html: item.information || item.additionalInfo }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* MAIN LIST ITEMS (Experience, Education, Projects, etc) */}
                        {!['Skills', 'Languages', 'Interests'].includes(section.type) && Array.isArray(section.content) && (
                            <div className="space-y-6">
                                {(section.content as any[]).map((item: any) => {
                                    // Field Mapping based on Section Type
                                    let title = item.title || item.jobTitle || item.degree || item.certificate || item.name; // Fallback
                                    let subtitle = item.subTitle || item.employer || item.school || item.organization || item.publisher;
                                    let dateText = item.date || '';

                                    if (!dateText && item.startDate) {
                                        dateText = `${item.startDate} ${item.endDate ? `- ${item.endDate}` : ''}`;
                                    }

                                    // Type-specific adjustments for bolding consistency
                                    if (section.type === 'Education') {
                                        title = item.school; // Bold School
                                        subtitle = item.degree; // Italic Degree
                                    } else if (section.type === 'Experience') {
                                        title = item.jobTitle; // Bold Job
                                        subtitle = item.employer; // Italic Employer
                                    } else if (section.type === 'Projects') {
                                        title = item.title;
                                        subtitle = item.subTitle;
                                    }

                                    return (
                                        <div key={item.id} className="flex flex-col gap-1">
                                            {/* Top Row: Title, Link & Date */}
                                            <div className="flex justify-between items-baseline">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                                        {title}
                                                    </h3>
                                                    {item.url && (
                                                        <a
                                                            href={item.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                                            title={item.url}
                                                        >
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-900 font-bold whitespace-nowrap ml-4">
                                                    {dateText}
                                                </div>
                                            </div>

                                            {/* Second Row: Subtitle & Location */}
                                            {(subtitle || item.location) && (
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <div className="text-gray-700 font-medium text-base italic">
                                                        {subtitle}
                                                    </div>
                                                    {item.location && (
                                                        <div className="text-sm text-gray-500 italic ml-4">
                                                            {item.location}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Description */}
                                            {item.description && (
                                                <div
                                                    className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mt-1 prose prose-sm max-w-none prose-ul:list-disc prose-li:ml-4 prose-p:my-1 prose-headings:font-bold"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* String Content (Profile/Custom Text) */}
                        {typeof section.content === 'string' && (
                            <div
                                className="text-gray-700 leading-relaxed prose prose-sm max-w-none text-justify"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
