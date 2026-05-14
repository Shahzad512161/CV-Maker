import React from 'react';
import { ResumeContent, ResumeSection, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';
import { MapPin, Phone, Mail, Globe, Linkedin, Github } from 'lucide-react';

interface AndrewOSullivanLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const AndrewOSullivanLayout: React.FC<AndrewOSullivanLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const accentColor = theme.primary || '#000000';

    const getSection = (type: string) => sections.find((s: ResumeSection) => s.type === type && s.isVisible);

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mb-4 mt-8 border-b-2 border-black">
            <h2 className="text-[18px] font-bold uppercase tracking-wider pb-1">{title}</h2>
        </div>
    );

    return (
        <div className="min-h-[1123px] w-full bg-white font-sans text-gray-900 p-16 flex flex-col">
            {/* Header */}
            <header className="flex flex-col items-center text-center mb-10">
                <h1 className="text-[42px] font-bold mb-1 leading-tight uppercase tracking-tight">
                    {personalDetails.fullName}
                </h1>
                {personalDetails.jobTitle && (
                    <p className="text-[18px] font-medium italic text-gray-700 mb-4">
                        {personalDetails.jobTitle}
                    </p>
                )}

                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    iconSize={12}
                    className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-gray-600"
                    itemClassName="flex items-center gap-1.5 h-3"
                    linkClassName="hover:opacity-100"
                    textClassName="leading-none"
                />
            </header>

            {/* Profile */}
            {getSection('Profile') && (
                <section>
                    <SectionHeader title="Profile" />
                    <div
                        className="text-[14.5px] leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: getSection('Profile')?.content as string }}
                    />
                </section>
            )}

            {/* Experience */}
            {getSection('Experience') && (
                <section>
                    <SectionHeader title="Professional Experience" />
                    <div className="space-y-6">
                        {(getSection('Experience')?.content as any[]).map((exp, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-[16px] font-bold">{exp.jobTitle}</h3>
                                    <span className="text-[14px] font-bold">
                                        {exp.startDate} – {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2 text-gray-700 italic">
                                    <span className="text-[14.5px] font-medium">{exp.employer}</span>
                                    <span className="text-[13px] font-normal">{exp.location}</span>
                                </div>
                                <div
                                    className="text-[14.5px] leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: exp.description }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {getSection('Education') && (
                <section>
                    <SectionHeader title="Education" />
                    <div className="space-y-5">
                        {(getSection('Education')?.content as any[]).map((edu, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-[16px] font-bold">{edu.degree}</h3>
                                    <span className="text-[14px] font-bold">
                                        {edu.startDate} – {edu.endDate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline text-gray-700 italic">
                                    <span className="text-[14.5px] font-medium">{edu.school}</span>
                                    <span className="text-[13px] font-normal">{edu.location}</span>
                                </div>
                                {edu.description && (
                                    <div
                                        className="text-[14.5px] mt-2 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: edu.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills & Languages in two columns if both exist */}
            <div className="grid grid-cols-2 gap-12">
                {getSection('Skills') && (
                    <section>
                        <SectionHeader title="Skills" />
                        <ul className="list-disc ml-4 space-y-1">
                            {(getSection('Skills')?.content as any[]).map((skill, idx) => (
                                <li key={idx} className="text-[14.5px]">
                                    <span className="font-bold">{skill.skill}</span>
                                    {skill.level && <span className="text-gray-600"> — {skill.level}</span>}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                {getSection('Languages') && (
                    <section>
                        <SectionHeader title="Languages" />
                        <div className="space-y-2">
                            {(getSection('Languages')?.content as any[]).map((lang, idx) => (
                                <div key={idx} className="flex justify-between items-center text-[14.5px]">
                                    <span className="font-bold">{lang.language}</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((dot) => (
                                            <div
                                                key={dot}
                                                className={`w-2 h-2 rounded-full ${dot <= 4 ? 'bg-black' : 'bg-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Others */}
            {sections
                .filter(s => s.isVisible && !['Profile', 'Experience', 'Education', 'Skills', 'Languages'].includes(s.type))
                .map((section) => (
                    <section key={section.id}>
                        <SectionHeader title={section.title} />
                        <div className="space-y-4">
                            {(Array.isArray(section.content) ? section.content : []).map((item: any, idx: number) => (
                                <div key={idx} className="flex flex-col">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[15px] font-bold">
                                            {item.title || item.name || item.fullName || item.award || item.certificate || item.project || item.school}
                                            {item.location && <span className="font-normal text-gray-500">, {item.location}</span>}
                                        </h3>
                                        <span className="text-[13px] font-medium text-gray-700">{item.date || (item.startDate && `${item.startDate} – ${item.endDate || 'Present'}`)}</span>
                                    </div>
                                    {(item.jobTitle || item.organization || item.issuer || item.publisher || item.subTitle) && (
                                        <p className="text-[14px] italic text-gray-600 mb-1">
                                            {[
                                                item.jobTitle,
                                                item.organization || item.issuer || item.publisher || item.subTitle
                                            ].filter(Boolean).join(', ')}
                                        </p>
                                    )}
                                    {(item.email || item.phone) && (
                                        <div className="text-[13px] text-gray-600 flex flex-wrap gap-x-4 mb-2">
                                            {item.email && <span>{item.email}</span>}
                                            {item.phone && <span>{item.phone}</span>}
                                        </div>
                                    )}
                                    <div
                                        className="text-[14px] leading-relaxed prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
        </div>
    );
};
