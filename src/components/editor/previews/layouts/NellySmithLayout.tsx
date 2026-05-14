import React from 'react';
import { ResumeContent, ResumeSection, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const NellySmithLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const goldColor = '#ceae62';
    const beigeColor = '#e9e4d9';

    const getSection = (type: string) => sections.find((s: ResumeSection) => s.type === type && s.isVisible);

    return (
        <div className="flex flex-col min-h-[1123px] bg-white font-sans text-gray-800 w-full relative">
            {/* Full Width Gold Header Bar */}
            <div
                className="h-52 w-full flex flex-col justify-center px-16 text-right relative z-0"
                style={{ backgroundColor: goldColor }}
            >
                <div className="w-[60%] ml-auto">
                    <h1 className="text-[64px] font-bold text-white leading-[0.9] uppercase font-serif tracking-tight break-words">
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-[22px] font-extrabold text-white uppercase tracking-[0.2em] mt-2 font-sans opacity-95">
                        {personalDetails.jobTitle}
                    </p>
                </div>
            </div>

            <div className="flex flex-1">
                {/* Sidebar (Left) */}
                <div
                    className="w-[33%] flex-shrink-0 flex flex-col min-h-full relative z-10"
                    style={{ backgroundColor: beigeColor }}
                >
                    <div className="px-8 space-y-12">
                        {/* Photo Overlapping Header */}
                        {personalDetails.photo && (
                            <div className="-mt-32 w-full aspect-[4/5] overflow-hidden bg-white shadow-md border-8 border-white relative mx-auto">
                                <img src={personalDetails.photo} alt={personalDetails.fullName} className="w-full h-full object-cover" />
                            </div>
                        )}

                        {/* Contact */}
                        <section className="space-y-6 pt-4 px-2">
                            <h2 className="text-[22px] font-bold uppercase text-gray-900 font-serif tracking-tight">Contact</h2>
                            <ContactInfoRenderer
                                data={data}
                                layout="vertical"
                                className="space-y-4"
                                itemClassName="flex items-center gap-4 h-4"
                                linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-700 no-underline text-[14px] font-medium"
                                textClassName="[overflow-wrap:anywhere] leading-none text-gray-700 text-[14px] font-medium"
                                iconSize={16}
                                iconStyle={{ color: '#374151' }} // gray-700
                            />
                        </section>

                        {/* Skills */}
                        {getSection('Skills') && (
                            <section className="space-y-6 px-2">
                                <h2 className="text-[22px] font-bold uppercase text-gray-900 font-serif tracking-tight">Skills</h2>
                                <ul className="space-y-5">
                                    {(getSection('Skills')?.content as any[]).map((skill, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-700 shrink-0" />
                                            <div className="space-y-1 w-full">
                                                <div className="flex justify-between items-baseline gap-2">
                                                    <p className="text-[15px] font-bold text-gray-800 leading-tight">{skill.skill}</p>
                                                    {skill.level && (
                                                        <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider shrink-0">
                                                            {skill.level}
                                                        </span>
                                                    )}
                                                </div>
                                                {skill.information && (
                                                    <div
                                                        className="text-[13px] text-gray-600 font-medium prose prose-sm max-w-none leading-normal [&>p]:m-0"
                                                        dangerouslySetInnerHTML={{ __html: skill.information }}
                                                    />
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Certifications */}
                        {getSection('Certificates') && (
                            <section className="space-y-6 px-2">
                                <h2 className="text-[22px] font-bold uppercase text-gray-900 font-serif tracking-tight">Certifications</h2>
                                <ul className="space-y-5">
                                    {(getSection('Certificates')?.content as any[]).map((cert, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-700 shrink-0" />
                                            <div className="space-y-1">
                                                <p className="text-[15px] font-bold text-gray-800 leading-tight">{cert.title || cert.name || cert.certificate}</p>
                                                {(cert.description || cert.additionalInfo || cert.information) && (
                                                    <div
                                                        className="text-[13px] text-gray-600 font-medium prose prose-sm max-w-none leading-normal"
                                                        dangerouslySetInnerHTML={{ __html: cert.description || cert.additionalInfo || cert.information }}
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

                {/* Main Content (Right) */}
                <div className="flex-1 flex flex-col bg-white">
                    <div className="p-12 space-y-12">
                        {/* Professional Profile */}
                        {getSection('Profile') && (
                            <section className="space-y-6">
                                <h2 className="text-[24px] font-bold uppercase text-gray-900 font-serif tracking-tight border-b-2 border-gray-100 pb-2">Professional Profile</h2>
                                <div
                                    className="text-[16px] text-gray-700 leading-relaxed font-medium"
                                    dangerouslySetInnerHTML={{ __html: getSection('Profile')?.content as string }}
                                />
                            </section>
                        )}

                        {/* Experience */}
                        {getSection('Experience') && (
                            <section className="space-y-8">
                                <h2 className="text-[24px] font-bold uppercase text-gray-900 font-serif tracking-tight border-b-2 border-gray-100 pb-2">Experience</h2>
                                <div className="space-y-12">
                                    {(getSection('Experience')?.content as any[]).map((exp, idx) => (
                                        <div key={idx} className="space-y-3">
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-baseline">
                                                    <p className="text-[19px] font-black text-gray-900">{exp.jobTitle}</p>
                                                    <p className="text-[15px] font-bold text-gray-500 whitespace-nowrap ml-4">
                                                        {exp.startDate} to {exp.endDate || 'Present'}
                                                    </p>
                                                </div>
                                                <p className="text-[16px] font-bold text-gray-700 uppercase tracking-wide">
                                                    {exp.employer}{exp.location && <span> - {exp.location}</span>}
                                                </p>
                                            </div>
                                            <div
                                                className="text-[15px] text-gray-700 leading-relaxed font-medium prose prose-sm max-w-none
                                                [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-2
                                                [&>ul>li]:text-gray-700"
                                                dangerouslySetInnerHTML={{ __html: exp.description }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {getSection('Education') && (
                            <section className="space-y-8">
                                <h2 className="text-[24px] font-bold uppercase text-gray-900 font-serif tracking-tight border-b-2 border-gray-100 pb-2">Education</h2>
                                <div className="space-y-8">
                                    {(getSection('Education')?.content as any[]).map((edu, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex justify-between items-baseline">
                                                <p className="text-[19px] font-black text-gray-900">{edu.degree}</p>
                                                <p className="text-[15px] font-bold text-gray-500 whitespace-nowrap ml-4">
                                                    {edu.startDate} - {edu.endDate}
                                                </p>
                                            </div>
                                            <p className="text-[17px] font-bold text-gray-700 uppercase tracking-wide">
                                                {edu.school}{edu.location && <span> - {edu.location}</span>}
                                            </p>
                                            {edu.description && (
                                                <div
                                                    className="text-[15px] text-gray-600 mt-2 prose prose-sm max-w-none font-medium italic"
                                                    dangerouslySetInnerHTML={{ __html: edu.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Other sections */}
                        {sections
                            .filter((s: ResumeSection) => s.isVisible && !['Profile', 'Experience', 'Education', 'Skills', 'Certificates'].includes(s.type))
                            .map((section: ResumeSection) => (
                                <section key={section.id} className="space-y-6">
                                    <h2 className="text-[24px] font-bold uppercase text-gray-900 font-serif tracking-tight border-b-2 border-gray-100 pb-2">{section.title}</h2>
                                    <div className="space-y-8 pt-2">
                                        {Array.isArray(section.content) ? (
                                            section.content.map((item: any, idx: number) => (
                                                <div key={idx} className="space-y-2">
                                                    <div className="flex justify-between items-baseline">
                                                        <p className="text-[19px] font-black text-gray-900">
                                                            {item.title || item.name || item.fullName || item.award || item.certificate || item.language || item.project || item.skill}
                                                        </p>
                                                        {(item.startDate || item.date || item.level) && (
                                                            <p className="text-[15px] font-bold text-gray-500 uppercase tracking-wider">
                                                                {item.startDate || item.date || item.level} {item.endDate ? `- ${item.endDate}` : ''}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {(item.subTitle || item.employer || item.organization || item.issuer || item.publisher || item.journal || item.jobTitle) && (
                                                        <p className="text-[16px] font-bold text-gray-600 italic">
                                                            {item.jobTitle && <span>{item.jobTitle}{item.organization && " - "}</span>}
                                                            {item.subTitle || item.employer || item.organization || item.issuer || item.publisher || item.journal}
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
                                                            className="text-[15px] text-gray-700 leading-relaxed font-medium mt-1 prose prose-sm max-w-none"
                                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                        />
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div
                                                className="text-[15px] text-gray-700 leading-relaxed font-medium"
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
        </div>
    );
};
