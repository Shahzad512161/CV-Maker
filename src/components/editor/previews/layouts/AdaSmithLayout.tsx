import { ResumeContent, ResumeSection, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface AdaSmithLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const AdaSmithLayout: React.FC<AdaSmithLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const copperColor = '#c28e64';

    const getSection = (type: string) => sections.find((s: ResumeSection) => s.type === type && s.isVisible);

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
            <div className="flex gap-1 pt-1.5 ml-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: i <= count ? copperColor : '#e5e7eb' }}
                    />
                ))}
            </div>
        );
    };

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mb-4 mt-8">
            <h2
                className="text-[28px] font-bold pb-2"
                style={{ color: copperColor, fontFamily: 'var(--font-playfair)' }}
            >
                {title}
            </h2>
            <div className="h-[1px] w-full bg-gray-200" />
        </div>
    );

    return (
        <div className="min-h-[1123px] w-full bg-white font-sans text-gray-800 p-16 flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h1
                        className="text-[48px] font-bold leading-tight mb-1"
                        style={{ color: copperColor, fontFamily: 'var(--font-playfair)' }}
                    >
                        {personalDetails.fullName}
                    </h1>
                    {personalDetails.jobTitle && (
                        <p className="text-[20px] font-medium" style={{ color: copperColor }}>
                            {personalDetails.jobTitle}
                        </p>
                    )}
                </div>

                <ContactInfoRenderer
                    data={data}
                    showIcons={false}
                    className="text-right text-[14px] space-y-1"
                    itemClassName=""
                    linkClassName="hover:opacity-100"
                    textClassName=""
                />
            </header>

            {/* Profile */}
            {getSection('Profile') && (
                <section className="mb-4">
                    <div
                        className="text-[15px] leading-relaxed text-gray-700 font-normal prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: getSection('Profile')?.content as string }}
                    />
                </section>
            )}

            {/* Work Experience */}
            {getSection('Experience') && (
                <section>
                    <SectionHeader title="Career Experience" />
                    <div className="space-y-8">
                        {(getSection('Experience')?.content as any[]).map((exp, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-[17px] font-bold" style={{ color: copperColor }}>
                                        {exp.employer}, <span className="font-normal">{exp.location}</span>
                                    </h3>
                                    <p className="text-[14px] font-medium" style={{ color: copperColor }}>
                                        {exp.startDate} – {exp.endDate || 'Present'}
                                    </p>
                                </div>
                                <p className="text-[16px] font-medium italic mb-3" style={{ color: copperColor }}>
                                    {exp.jobTitle}
                                </p>
                                <div
                                    className="text-[14.5px] text-gray-700 leading-relaxed font-normal prose prose-sm max-w-none
                                    [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-1"
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
                    <div className="space-y-6">
                        {(getSection('Education')?.content as any[]).map((edu, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-[17px] font-bold" style={{ color: copperColor }}>
                                        {edu.degree}
                                    </h3>
                                    <p className="text-[14px]" style={{ color: copperColor }}>
                                        {edu.startDate} – {edu.endDate}
                                    </p>
                                </div>
                                <p className="text-[15px] text-gray-700 font-medium">
                                    {edu.school}, {edu.location}
                                </p>
                                {edu.description && (
                                    <div
                                        className="text-[14px] text-gray-600 mt-1 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: edu.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {getSection('Skills') && (
                <section>
                    <SectionHeader title="Technical Proficiencies" />
                    <div className="divide-y divide-gray-100">
                        {(getSection('Skills')?.content as any[]).map((skill, idx) => (
                            <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-start gap-4">
                                <div className="flex-1">
                                    <span className="text-[15px] font-medium text-gray-800">{skill.skill}</span>
                                    {skill.information && (
                                        <span className="text-[14px] text-gray-500 ml-2">
                                            — {skill.information.replace(/<[^>]*>?/gm, '')}
                                        </span>
                                    )}
                                </div>
                                <ProficiencyDots level={skill.level} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {getSection('Languages') && (
                <section>
                    <SectionHeader title="Languages" />
                    <div className="divide-y divide-gray-100">
                        {(getSection('Languages')?.content as any[]).map((lang, idx) => (
                            <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-start gap-4">
                                <div className="flex-1">
                                    <span className="text-[15px] font-medium text-gray-800">{lang.language}</span>
                                    {(lang.information || lang.additionalInfo) && (
                                        <span className="text-[14px] text-gray-500 ml-2">
                                            — {(lang.information || lang.additionalInfo).replace(/<[^>]*>?/gm, '')}
                                        </span>
                                    )}
                                </div>
                                <ProficiencyDots level={lang.level} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Others */}
            {sections
                .filter(s => s.isVisible && !['Profile', 'Experience', 'Education', 'Skills', 'Languages'].includes(s.type))
                .map((section) => (
                    <section key={section.id}>
                        <SectionHeader title={section.title} />
                        <div className="space-y-6">
                            {(Array.isArray(section.content) ? section.content : []).map((item: any, idx: number) => (
                                <div key={idx} className="flex flex-col">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h1 className="text-[17px] font-bold" style={{ color: copperColor }}>
                                            {item.title || item.name || item.fullName || item.award || item.certificate || item.project}
                                            {item.location && <span className="font-normal text-gray-500">, {item.location}</span>}
                                        </h1>
                                        <p className="text-[13.5px]" style={{ color: copperColor }}>
                                            {item.date || (item.startDate && `${item.startDate} – ${item.endDate || 'Present'}`)}
                                        </p>
                                    </div>
                                    {(item.subTitle || item.publisher || item.issuer || item.organization || item.jobTitle) && (
                                        <p className="text-[15px] italic mb-1" style={{ color: copperColor }}>
                                            {[
                                                item.subTitle || item.publisher || item.issuer,
                                                item.jobTitle,
                                                item.organization
                                            ].filter(Boolean).join(', ')}
                                        </p>
                                    )}
                                    {(item.email || item.phone) && (
                                        <div className="text-[14px] text-gray-600 flex flex-wrap gap-x-4 gap-y-1 mb-2">
                                            {item.email && <span className="flex items-center gap-1.5">{item.email}</span>}
                                            {item.phone && <span className="flex items-center gap-1.5">{item.phone}</span>}
                                        </div>
                                    )}
                                    <div
                                        className="text-[14px] text-gray-700 leading-relaxed font-normal prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

            <div className="mt-auto pt-10 text-right text-[12px] text-gray-400" style={{ fontFamily: 'var(--font-playfair)' }}>
                Page 1 | 1
            </div>
        </div>
    );
};
