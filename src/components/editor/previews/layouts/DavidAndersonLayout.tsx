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
                        ? (dark ? 'bg-[#2c323f]' : 'bg-white')
                        : (dark ? 'bg-gray-200' : 'bg-white/30')}`}
                />
            ))}
        </div>
    );
};

export const DavidAndersonLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const getSection = (type: string) => sections.find((s: ResumeSection) => s.type === type && s.isVisible);

    return (
        <div className="flex min-h-[1123px] bg-white font-sans text-[#2c323f]">
            {/* Left Sidebar */}
            <div className="w-[280px] bg-[#2c323f] text-white flex-shrink-0 flex flex-col pt-12">
                {/* Profile Photo */}
                {personalDetails.photo && (
                    <div className="px-10 mb-14 flex justify-center">
                        <div className="w-40 h-40 rounded-full border-[6px] border-white/10 overflow-hidden ring-4 ring-white/5">
                            <img
                                src={personalDetails.photo}
                                alt={personalDetails.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Sidebar Sections */}
                <div className="px-10 space-y-14 flex-1 pb-12">
                    {/* Contact */}
                    <section className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-[17px] font-bold uppercase tracking-[0.1em]">Contact</h3>
                            <div className="border-b-2 border-white/20 w-8"></div>
                        </div>
                        <ContactInfoRenderer
                            data={data}
                            showIcons={false}
                            className="space-y-6"
                            itemClassName="space-y-1 h-auto"
                            linkClassName="text-[14px] font-medium break-all text-white no-underline hover:text-white/80"
                            textClassName="text-[14px] font-medium leading-relaxed"
                            // Custom rendering for labels and values
                            renderItem={(item: { id: string; label: string; value: string; icon: React.ReactNode; isUrl: boolean }) => (
                                <div className="space-y-1">
                                    <p className="text-[13px] font-bold text-white/50 uppercase tracking-widest">{item.label}</p>
                                    <div className="flex">
                                        {item.isUrl ? (
                                            <a href={item.value} target="_blank" rel="noreferrer" className="text-[14px] font-medium break-all text-white no-underline hover:text-white/80">
                                                {item.value.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}
                                            </a>
                                        ) : (
                                            <span className="text-[14px] font-medium leading-relaxed">{item.value}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        />
                    </section>

                    {/* Education */}
                    {getSection('Education') && (
                        <section className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-[17px] font-bold uppercase tracking-[0.1em]">Education</h3>
                                <div className="border-b-2 border-white/20 w-8"></div>
                            </div>
                            <div className="space-y-10">
                                {(getSection('Education')?.content as any[]).map((edu, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <p className="text-[13px] font-bold text-white/40 uppercase tracking-widest">
                                            {edu.startDate} - {edu.endDate}
                                        </p>
                                        <div className="space-y-1">
                                            <p className="text-[15px] font-extrabold leading-tight">{edu.degree}</p>
                                            <p className="text-[14px] font-bold text-white/70">
                                                {edu.school}{edu.location && <span className="text-white/40 font-medium"> | {edu.location}</span>}
                                            </p>
                                            {edu.description && (
                                                <div
                                                    className="text-[12.5px] text-white/60 leading-relaxed font-medium mt-1 prose prose-invert prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: edu.description }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Language */}
                    {getSection('Languages') && (
                        <section className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-[17px] font-bold uppercase tracking-[0.1em]">Language</h3>
                                <div className="border-b-2 border-white/20 w-8"></div>
                            </div>
                            <div className="space-y-6">
                                {(getSection('Languages')?.content as any[]).map((lang, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[14px] font-bold tracking-wide">{lang.language}</span>
                                            <ProficiencyDots level={lang.level} />
                                        </div>
                                        {(lang.additionalInfo || lang.information) && (
                                            <div
                                                className="text-[12px] text-white/50 leading-relaxed font-medium mt-1 prose prose-invert prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: lang.additionalInfo || lang.information }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-14 py-16 flex flex-col bg-white">
                {/* Header */}
                <header className="mb-20">
                    <h1 className="text-[54px] font-black text-[#2c323f] leading-[1.05] tracking-tight mb-4">
                        {personalDetails.fullName.split(' ').map((name: string, i: number) => (
                            <React.Fragment key={i}>
                                {name}<br />
                            </React.Fragment>
                        ))}
                    </h1>
                    <p className="text-[18px] font-bold text-[#2c323f] tracking-[0.3em] uppercase opacity-70">
                        {personalDetails.jobTitle}
                    </p>
                </header>

                <div className="space-y-20 flex-1">
                    {/* Profile */}
                    {getSection('Profile') && (
                        <section className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-[20px] font-black uppercase tracking-[0.1em] text-[#2c323f]">Profile</h3>
                                <div className="border-b-[3px] border-gray-300 w-8"></div>
                            </div>
                            <div
                                className="text-[15px] text-gray-500 leading-relaxed font-bold"
                                dangerouslySetInnerHTML={{ __html: getSection('Profile')?.content as string }}
                            />
                        </section>
                    )}

                    {/* Experience */}
                    {getSection('Experience') && (
                        <section className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-[20px] font-black uppercase tracking-[0.1em] text-[#2c323f]">Experience</h3>
                                <div className="border-b-[3px] border-gray-300 w-8"></div>
                            </div>
                            <div className="space-y-12">
                                {(getSection('Experience')?.content as any[]).map((exp, idx) => (
                                    <div key={idx} className="flex gap-10">
                                        <div className="w-[140px] shrink-0 pt-0.5 space-y-1">
                                            <p className="text-[13px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </p>
                                            <p className="text-[14px] font-extrabold text-[#2c323f] opacity-60 leading-snug">
                                                {exp.employer}{exp.location && <span className="opacity-60 font-medium"> | {exp.location}</span>}
                                            </p>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <p className="text-[17px] font-black text-[#2c323f]">{exp.jobTitle}</p>
                                            <div
                                                className="text-[14.5px] text-gray-500 leading-relaxed font-bold prose prose-sm max-w-none
                                                [&>ul]:list-none [&>ul]:space-y-1.5
                                                [&>ul>li]:relative [&>ul>li]:pl-4
                                                [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-gray-300"
                                                dangerouslySetInnerHTML={{ __html: exp.description }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {getSection('Skills') && (
                        <section className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-[20px] font-black uppercase tracking-[0.1em] text-[#2c323f]">Skills</h3>
                                <div className="border-b-[3px] border-gray-300 w-8"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-14 gap-y-8">
                                {(getSection('Skills')?.content as any[]).map((skill, idx) => (
                                    <div key={idx} className="space-y-1.5 min-w-0">
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="text-[15px] font-black text-[#2c323f] tracking-wide">{skill.skill}</span>
                                            <ProficiencyDots level={skill.level} dark />
                                        </div>
                                        {skill.information && (
                                            <div
                                                className="text-[13px] text-gray-500 leading-relaxed font-bold prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: skill.information }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Other sections */}
                    {sections
                        .filter((s: ResumeSection) => s.isVisible && !['Profile', 'Experience', 'Education', 'Skills', 'Languages'].includes(s.type))
                        .map((section: ResumeSection) => (
                            <section key={section.id} className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-[20px] font-black uppercase tracking-[0.1em] text-[#2c323f]">{section.title}</h3>
                                    <div className="border-b-[3px] border-gray-300 w-8"></div>
                                </div>
                                <div className="space-y-10">
                                    {Array.isArray(section.content) ? (
                                        section.content.map((item: any, idx: number) => (
                                            <div key={idx} className="flex gap-10">
                                                <div className="w-[140px] shrink-0 pt-0.5 space-y-1">
                                                    {(item.startDate || item.date) && (
                                                        <p className="text-[13px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                                                            {item.startDate || item.date} {item.endDate ? `- ${item.endDate}` : ''}
                                                        </p>
                                                    )}
                                                    {(item.location || item.issuer) && (
                                                        <p className="text-[14px] font-extrabold text-[#2c323f] opacity-60 leading-snug">{item.location || item.issuer}</p>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <p className="text-[17px] font-black text-[#2c323f]">
                                                        {item.name || item.title || item.award || item.certificate}
                                                        {item.subTitle && <span className="text-gray-400 font-bold ml-1">| {item.subTitle}</span>}
                                                    </p>
                                                    {section.type === 'References' && (
                                                        <div className="space-y-1">
                                                            {(item.jobTitle || item.organization) && (
                                                                <p className="text-[14px] font-bold text-gray-500">
                                                                    {item.jobTitle}{item.organization && (item.jobTitle ? `, ${item.organization}` : item.organization)}
                                                                </p>
                                                            )}
                                                            {(item.email || item.phone) && (
                                                                <p className="text-[13px] text-gray-400 font-medium italic">
                                                                    {item.email}{item.phone && (item.email ? ` • ${item.phone}` : item.phone)}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                    {(item.description || item.additionalInfo || item.information) && (
                                                        <div
                                                            className="text-[14.5px] text-gray-500 leading-relaxed font-bold prose prose-sm max-w-none
                                                            [&>ul]:list-none [&>ul]:space-y-1.5
                                                            [&>ul>li]:relative [&>ul>li]:pl-4
                                                            [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-gray-300"
                                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            className="text-[14.5px] text-gray-500 leading-relaxed font-bold"
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
