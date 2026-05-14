import React from 'react';
import { ResumeContent, ResumeSection, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

const ProficiencyDots = ({ level, dark = false }: { level: string; dark?: boolean }) => {
    const levelMap: { [key: string]: number } = {
        'Novice': 1,
        'Beginner': 2,
        'Skillful': 3,
        'Experienced': 4,
        'Expert': 4,
        'Basic': 1,
        'Conversational': 2,
        'Fluent': 3,
        'Native': 4,
        'A1': 1,
        'A2': 1,
        'B1': 2,
        'B2': 2,
        'C1': 3,
        'C2': 4
    };

    const count = levelMap[level] || 3;

    return (
        <div className="flex gap-1.5 pt-1.5 text-[0]">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${i <= count
                        ? (dark ? 'bg-[#b4985f]' : 'bg-white')
                        : (dark ? 'bg-gray-200' : 'bg-white/30')}`}
                />
            ))}
        </div>
    );
};

export const OliverMasonLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const getSection = (type: string) => sections.find((s: ResumeSection) => s.type === type && s.isVisible);

    return (
        <div className="flex min-h-[1123px] bg-white font-sans">
            {/* Left Sidebar */}
            <div className="w-[340px] bg-[#b4985f] text-white flex-shrink-0 flex flex-col p-12">
                <div className="space-y-16">
                    {/* Education */}
                    {getSection('Education') && (
                        <section className="space-y-6">
                            <h2 className="text-[22px] font-bold uppercase tracking-wider">Education</h2>
                            <div className="space-y-8">
                                {(getSection('Education')?.content as any[]).map((edu, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <p className="text-[15px] font-medium opacity-80">{edu.startDate} - {edu.endDate}</p>
                                        <p className="text-[17px] font-bold leading-tight">{edu.school}</p>
                                        {edu.location && <p className="text-[15px] italic opacity-90">{edu.location}</p>}
                                        <p className="text-[16px] font-semibold">{edu.degree}</p>
                                        {edu.description && (
                                            <div
                                                className="text-[14px] opacity-80 mt-1 prose prose-invert prose-sm max-w-none"
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
                        <section className="space-y-6">
                            <h2 className="text-[22px] font-bold uppercase tracking-wider">Skills</h2>
                            <ul className="space-y-5">
                                {(getSection('Skills')?.content as any[]).map((skill, idx) => (
                                    <li key={idx} className="space-y-2">
                                        <div className="flex justify-between items-start gap-3">
                                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                                <span className="text-[16px] font-bold leading-tight">{skill.skill}</span>
                                            </div>
                                            <ProficiencyDots level={skill.level} />
                                        </div>
                                        {skill.information && (
                                            <div
                                                className="text-[13px] opacity-80 pl-4 prose prose-invert prose-sm max-w-none font-normal"
                                                dangerouslySetInnerHTML={{ __html: skill.information }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {getSection('Certificates') && (
                        <section className="space-y-6">
                            <h2 className="text-[22px] font-bold uppercase tracking-wider">Certifications</h2>
                            <ul className="space-y-5">
                                {(getSection('Certificates')?.content as any[]).map((cert, idx) => (
                                    <li key={idx} className="space-y-2">
                                        <div className="flex items-start gap-3 text-[16px] font-bold">
                                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                            <span>{cert.title || cert.name || cert.certificate}</span>
                                        </div>
                                        {(cert.description || cert.additionalInfo || cert.information) && (
                                            <div
                                                className="text-[13px] opacity-70 pl-4 prose prose-invert prose-sm max-w-none font-normal"
                                                dangerouslySetInnerHTML={{ __html: cert.description || cert.additionalInfo || cert.information }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Languages */}
                    {getSection('Languages') && (
                        <section className="space-y-6">
                            <h2 className="text-[22px] font-bold uppercase tracking-wider">Languages</h2>
                            <ul className="space-y-5">
                                {(getSection('Languages')?.content as any[]).map((lang, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[16px] font-medium">
                                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                        <div className="space-y-0.5">
                                            <p className="font-bold">{lang.language}</p>
                                            <p className="text-[14px] opacity-80 font-normal">{lang.level}</p>
                                            {(lang.additionalInfo || lang.information) && (
                                                <div
                                                    className="text-[13px] opacity-70 font-normal prose prose-invert prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: lang.additionalInfo || lang.information }}
                                                />
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-14 py-16 flex flex-col bg-white overflow-hidden">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-[64px] font-black text-[#333333] leading-[1.1] mb-2 uppercase">
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-[28px] font-bold text-gray-700 mb-10">
                        {personalDetails.jobTitle}
                    </p>

                    <div className="space-y-4 mb-12">
                        <h2 className="text-[20px] font-black uppercase tracking-widest text-[#333333] mb-6">Contact</h2>
                        <ContactInfoRenderer
                            data={data}
                            layout="vertical"
                            className="space-y-4"
                            renderItem={(item) => (
                                <div className="flex items-center gap-4 h-8">
                                    <div className="w-8 h-8 rounded-full bg-[#b4985f] flex items-center justify-center shrink-0">
                                        <div className="text-white">
                                            {item.icon}
                                        </div>
                                    </div>
                                    {item.isUrl ? (
                                        <a href={item.value} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-gray-700 leading-none no-underline hover:underline">
                                            {item.value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')}
                                        </a>
                                    ) : (
                                        <span className="text-[15px] font-medium text-gray-700 leading-none">{item.value}</span>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </header>

                <div className="space-y-12">
                    {/* Summary */}
                    {getSection('Profile') && (
                        <section className="space-y-4">
                            <h2 className="text-[20px] font-black uppercase tracking-widest text-[#333333]">Resume Summary</h2>
                            <div className="w-full h-[1px] bg-gray-200" />
                            <div
                                className="text-[16px] text-gray-600 leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: getSection('Profile')?.content as string }}
                            />
                        </section>
                    )}

                    {/* Experience */}
                    {getSection('Experience') && (
                        <section className="space-y-6">
                            <h2 className="text-[20px] font-black uppercase tracking-widest text-[#333333]">Professional Experience</h2>
                            <div className="w-full h-[1px] bg-gray-200" />
                            <div className="space-y-10">
                                {(getSection('Experience')?.content as any[]).map((exp, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <div className="space-y-1">
                                            <p className="text-[15px] font-bold text-gray-400">
                                                {exp.startDate} to {exp.endDate || 'Present'}
                                            </p>
                                            <p className="text-[18px] font-black text-[#333333]">{exp.jobTitle}</p>
                                            <p className="text-[16px] font-bold text-gray-700">
                                                {exp.employer}{exp.location && <span> | {exp.location}</span>}
                                            </p>
                                        </div>
                                        <div
                                            className="text-[15.5px] text-gray-600 leading-relaxed font-medium prose prose-sm max-w-none
                                            [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-2
                                            [&>ul>li]:text-gray-600"
                                            dangerouslySetInnerHTML={{ __html: exp.description }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Other sections */}
                    {sections
                        .filter((s: ResumeSection) => s.isVisible && !['Profile', 'Experience', 'Education', 'Skills', 'Languages', 'Certificates'].includes(s.type))
                        .map((section: ResumeSection) => (
                            <section key={section.id} className="space-y-4">
                                <h2 className="text-[20px] font-black uppercase tracking-widest text-[#333333]">{section.title}</h2>
                                <div className="w-full h-[1px] bg-gray-200" />
                                <div className="space-y-8 pt-2">
                                    {Array.isArray(section.content) ? (
                                        section.content.map((item: any, idx: number) => (
                                            <div key={idx} className="space-y-2">
                                                <div className="flex justify-between items-baseline">
                                                    <p className="text-[17px] font-black text-[#333333]">
                                                        {item.title || item.name || item.fullName || item.award || item.certificate || item.project || item.school}
                                                    </p>
                                                    {(item.startDate || item.date) && (
                                                        <p className="text-[14px] font-bold text-gray-400">
                                                            {item.startDate || item.date} {item.endDate ? `- ${item.endDate}` : ''}
                                                        </p>
                                                    )}
                                                </div>
                                                {(item.jobTitle || item.organization || item.issuer || item.publisher || item.subTitle || item.employer || item.degree) && (
                                                    <p className="text-[15px] font-bold text-gray-700 italic">
                                                        {item.jobTitle && <span>{item.jobTitle}{(item.organization || item.employer || item.issuer || item.publisher) && " - "}</span>}
                                                        {item.organization || item.subTitle || item.employer || item.issuer || item.publisher || item.degree}
                                                        {item.location && <span> | {item.location}</span>}
                                                    </p>
                                                )}
                                                {(item.email || item.phone) && (
                                                    <div className="flex flex-wrap gap-x-4 text-[14px] text-gray-600">
                                                        {item.email && <p>Email: {item.email}</p>}
                                                        {item.phone && <p>Phone: {item.phone}</p>}
                                                    </div>
                                                )}
                                                {(item.description || item.additionalInfo || item.information) && (
                                                    <div
                                                        className="text-[15px] text-gray-600 leading-relaxed font-medium mt-1 prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                    />
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            className="text-[14.5px] text-gray-600 leading-relaxed font-medium"
                                            dangerouslySetInnerHTML={{ __html: section.content as string }}
                                        />
                                    )}
                                </div>
                            </section>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
