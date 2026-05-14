import React from 'react';
import { ResumeContent, ResumeSection, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';
import { MapPin, Phone, Mail, Globe, Linkedin, Github, Calendar, Flag } from 'lucide-react';

interface AndrewOSullivanTealLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const AndrewOSullivanTealLayout: React.FC<AndrewOSullivanTealLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const tealColor = '#1a8073';

    const getSection = (type: string) => sections.find((s: ResumeSection) => s.type === type && s.isVisible);

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mb-4 mt-6">
            <h2 className="text-[20px] font-bold pb-1" style={{ color: tealColor }}>{title}</h2>
            <div className="h-[2px] w-full" style={{ backgroundColor: tealColor }} />
        </div>
    );

    const ProficiencyDots = ({ level }: { level: string }) => {
        const levelMap: { [key: string]: number } = {
            'Novice': 1, 'Beginner': 2, 'Skillful': 3, 'Experienced': 4, 'Expert': 5,
            'Basic': 2, 'Elementary': 2, 'Intermediate': 3, 'Upper Intermediate': 4, 'Advanced': 4, 'Proficient': 5,
            'Conversational': 3, 'Fluent': 4, 'Native': 5,
            'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 5
        };
        const count = levelMap[level] || 0;
        if (count === 0) return null;

        return (
            <div className="flex gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${i <= count ? 'bg-black' : 'bg-gray-200'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-[1123px] w-full bg-white font-sans text-gray-800 p-16 flex flex-col">
            {/* Header */}
            <header className="flex flex-col items-center text-center mb-10">
                <h1
                    className="text-[64px] mb-1 leading-tight font-bold"
                    style={{ color: tealColor, fontFamily: 'var(--font-dancing)' }}
                >
                    {personalDetails.fullName}
                </h1>
                {personalDetails.jobTitle && (
                    <p className="text-[18px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: tealColor }}>
                        {personalDetails.jobTitle}
                    </p>
                )}

                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    iconSize={14}
                    className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[14px] text-gray-700 max-w-[90%] mx-auto"
                    itemClassName="flex items-center gap-2 h-4"
                    linkClassName="hover:opacity-100"
                    textClassName="leading-none"
                    // Pass common style for icons
                    iconStyle={{ color: tealColor }}
                />
            </header>

            {/* Profile */}
            {getSection('Profile') && (
                <section className="mb-4">
                    <SectionHeader title="Profile" />
                    <div
                        className="text-[15px] leading-relaxed text-gray-700 font-normal"
                        dangerouslySetInnerHTML={{ __html: getSection('Profile')?.content as string }}
                    />
                </section>
            )}

            {/* Work Experience */}
            {getSection('Experience') && (
                <section className="mb-4">
                    <SectionHeader title="Work Experience" />
                    <div className="space-y-6 mt-4">
                        {(getSection('Experience')?.content as any[]).map((exp, idx) => (
                            <div key={idx} className="flex gap-8">
                                <div className="w-1/4 pt-1">
                                    <p className="text-[15px] font-bold" style={{ color: tealColor }}>
                                        {exp.startDate} – {exp.endDate || 'Present'}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className="text-[16px] font-bold text-gray-900 leading-tight">
                                            {exp.jobTitle}, <span className="font-normal italic">{exp.employer}</span>
                                        </p>
                                        <p className="text-[13px] font-normal text-gray-500 text-right shrink-0">
                                            {exp.location}
                                        </p>
                                    </div>
                                    <div
                                        className="text-[14.5px] text-gray-700 leading-relaxed font-normal prose prose-sm max-w-none
                                        [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-1"
                                        dangerouslySetInnerHTML={{ __html: exp.description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {getSection('Education') && (
                <section className="mb-4">
                    <SectionHeader title="Education" />
                    <div className="space-y-5 mt-4">
                        {(getSection('Education')?.content as any[]).map((edu, idx) => (
                            <div key={idx} className="flex gap-8">
                                <div className="w-1/4 pt-1">
                                    <p className="text-[15px] font-bold" style={{ color: tealColor }}>
                                        {edu.startDate} – {edu.endDate}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className="text-[16px] font-bold text-gray-900 leading-tight">
                                            {edu.degree}, <span className="font-normal italic text-gray-700">{edu.school}</span>
                                        </p>
                                        <p className="text-[13px] font-normal text-gray-500 text-right shrink-0">
                                            {edu.location}
                                        </p>
                                    </div>
                                    {edu.description && (
                                        <div
                                            className="text-[14.5px] text-gray-600 mt-1"
                                            dangerouslySetInnerHTML={{ __html: edu.description }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {getSection('Skills') && (
                <section className="mb-4">
                    <SectionHeader title="Skills" />
                    <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-4">
                        {(getSection('Skills')?.content as any[]).map((skill, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="flex justify-between items-center mb-1 h-5">
                                    <span className="font-bold text-[15px] text-gray-800 leading-none">{skill.skill}</span>
                                    {skill.level && <ProficiencyDots level={skill.level} />}
                                </div>
                                {skill.information && (
                                    <div
                                        className="text-[13.5px] text-gray-700 leading-relaxed font-normal prose prose-sm max-w-none
                                        [&>p]:m-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-1"
                                        dangerouslySetInnerHTML={{ __html: skill.information }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {getSection('Languages') && (
                <section className="mb-4">
                    <SectionHeader title="Languages" />
                    <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-4">
                        {(getSection('Languages')?.content as any[]).map((lang, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="flex justify-between items-center mb-1 h-5">
                                    <span className="font-bold text-[15px] text-gray-800 leading-none">{lang.language}</span>
                                    {lang.level && <ProficiencyDots level={lang.level} />}
                                </div>
                                {(lang.additionalInfo || lang.information) && (
                                    <div
                                        className="text-[13.5px] text-gray-700 leading-relaxed font-normal prose prose-sm max-w-none
                                        [&>p]:m-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-1"
                                        dangerouslySetInnerHTML={{ __html: lang.additionalInfo || lang.information }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Others (Awards, Projects, etc.) */}
            {sections
                .filter(s => s.isVisible && !['Profile', 'Experience', 'Education', 'Skills', 'Languages'].includes(s.type))
                .map((section) => (
                    <section key={section.id} className="mb-4">
                        <SectionHeader title={section.title} />
                        <div className="space-y-4 mt-4">
                            {(Array.isArray(section.content) ? section.content : []).map((item: any, idx: number) => {
                                const hasDates = item.startDate || item.endDate || item.date;

                                return (
                                    <div key={idx} className={hasDates ? "flex gap-8" : "flex flex-col"}>
                                        {hasDates && (
                                            <div className="w-1/4 pt-1">
                                                <p className="text-[14px] font-bold" style={{ color: tealColor }}>
                                                    {item.startDate && `${item.startDate} – ${item.endDate || 'Present'}`}
                                                    {!item.startDate && item.date}
                                                </p>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <p className="text-[15px] font-bold text-gray-900">
                                                    {item.title || item.name || item.fullName || item.award || item.certificate || item.project || item.school},
                                                    <span className="font-normal italic text-gray-700"> {item.organization || item.issuer || item.subTitle || item.employer || item.degree || item.publisher}</span>
                                                </p>
                                                {item.location && <p className="text-[13px] font-normal text-gray-500">{item.location}</p>}
                                            </div>
                                            {item.jobTitle && (
                                                <p className="text-[14px] italic text-gray-600 mb-1">{item.jobTitle}</p>
                                            )}
                                            {(item.email || item.phone) && (
                                                <div className="text-[13px] text-gray-600 flex flex-wrap gap-x-4 mb-2">
                                                    {item.email && <span>{item.email}</span>}
                                                    {item.phone && <span>{item.phone}</span>}
                                                </div>
                                            )}
                                            {(item.description || item.information || item.additionalInfo) && (
                                                <div
                                                    className="text-[14px] text-gray-700 leading-relaxed font-normal prose prose-sm max-w-none
                                                    [&>p]:m-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-1"
                                                    dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
        </div>
    );
};
