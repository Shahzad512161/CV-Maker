import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const SidebarRightLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Helper to get icon

    // Filter content
    const sidebarSections = sections.filter(s => ['Skills', 'Languages', 'Interests'].includes(s.type) && s.isVisible);
    const mainSections = sections.filter(s => !['Skills', 'Languages', 'Interests'].includes(s.type) && s.isVisible);

    return (
        <div className={`w-full h-full min-h-[297mm] flex ${theme.fontFamily} bg-white shadow-lg`}>
            {/* Main Content (Left) */}
            <div className={`flex-1 p-8 space-y-6 ${theme.sectionSpacing}`}>
                {/* Header Info (if not in sidebar, but usually header is top or split. Let's put header name here big) */}
                <div className="mb-8">
                    <h1 className={`text-4xl font-bold text-gray-900 mb-2 ${theme.headingStyle}`} style={{ color: theme.color }}>
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">{personalDetails.jobTitle}</p>

                    {/* Summary Inline if available */}
                    {sections.find(s => s.type === 'Profile' && s.isVisible)?.content && (
                        <p className="mt-4 text-gray-700 leading-relaxed text-sm">
                            {sections.find(s => s.type === 'Profile')?.content as string}
                        </p>
                    )}
                </div>

                {/* Main Sections (Experience, Education usually) */}
                {mainSections.filter(s => s.type !== 'Profile').map(section => (
                    <div key={section.id}>
                        <h2
                            className={`text-lg font-bold mb-4 border-b-2 pb-1 ${theme.headingStyle}`}
                            style={{ color: theme.color, borderColor: theme.color }}
                        >
                            {section.title}
                        </h2>

                        {Array.isArray(section.content) && (
                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="relative pl-4 border-l-2 border-gray-100">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-800">{item.jobTitle || item.degree}</h3>
                                            <span className="text-sm text-gray-500 font-medium whitespace-nowrap ml-2">
                                                {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
                                            </span>
                                        </div>
                                        <div className="text-gray-600 font-medium text-sm mb-2">
                                            {item.employer || item.school} {item.location ? `• ${item.location}` : ''}
                                        </div>
                                        {item.description && (
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Custom Text fallback */}
                        {typeof section.content === 'string' && section.type === 'Custom' && (
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Sidebar (Right) */}
            <div className="w-[32%] shrink-0 text-white p-6 overflow-hidden md:p-8" style={{ backgroundColor: theme.color }}>

                {/* Photo */}
                {personalDetails.photo && (
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 mb-6 shadow-sm">
                        <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Contact Info */}
                <ContactInfoRenderer
                    data={data}
                    layout="vertical"
                    className="space-y-3 mb-8 text-sm opacity-90"
                    itemClassName="flex items-center gap-3 h-4"
                    linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-white no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none text-white no-underline"
                    iconSize={16}
                    iconStyle={{ color: 'white' }}
                />

                {/* Sidebar Sections */}
                <div className="space-y-8">
                    {sidebarSections.map(section => (
                        <div key={section.id}>
                            <h2 className={`text-lg font-bold mb-4 text-white/90 border-b border-white/20 pb-2 ${theme.headingStyle}`}>
                                {section.title}
                            </h2>

                            {section.type === 'Skills' && Array.isArray(section.content) && (
                                <div className="flex flex-wrap gap-2">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="bg-white/10 px-3 py-1 rounded text-sm text-white">
                                            {item.skill}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.type === 'Languages' && Array.isArray(section.content) && (
                                <div className="space-y-2">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span>{item.language}</span>
                                            <span className="opacity-70">{item.level}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Fallback for Interests etc */}
                            {!['Skills', 'Languages'].includes(section.type) && Array.isArray(section.content) && (
                                <ul className="list-disc list-inside text-sm space-y-1 opacity-90">
                                    {(section.content as any[]).map((item: any) => (
                                        <li key={item.id}>{item.name || item.text}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
