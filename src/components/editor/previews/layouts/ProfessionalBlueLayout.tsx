import { ResumeContent, ResumeSection, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const ProfessionalBlueLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const blueColor = '#3c5871';
    const bgColor = '#f2f2f2';

    const getSection = (type: string) => sections.find((s: ResumeSection) => s.type === type && s.isVisible);

    return (
        <div className="flex flex-col min-h-[1123px] bg-white font-sans text-gray-800 w-full">
            {/* Main Outer Container with Light Gray Background */}
            <div className="flex-1 px-16 py-16 flex flex-col" style={{ backgroundColor: bgColor }}>

                {/* Header Section */}
                <header className="mb-10">
                    <h1
                        className="text-[52px] font-bold leading-tight mb-2 uppercase font-serif"
                        style={{ color: blueColor }}
                    >
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-[20px] font-bold text-gray-700 mb-6 font-sans">
                        {personalDetails.jobTitle}
                    </p>

                    {/* Inline Contact Info */}
                    <ContactInfoRenderer
                        data={data}
                        showIcons={false}
                        layout="horizontal"
                        className="flex flex-wrap gap-x-4 text-[14px] text-gray-700 font-sans"
                        renderSeparator={() => <span className="opacity-30">|</span>}
                        renderItem={(item) => (
                            <div className="flex gap-2 items-center">
                                <span className="font-bold">{item.label}:</span>
                                {item.isUrl ? (
                                    <a href={item.value} target="_blank" rel="noreferrer" className="hover:underline [overflow-wrap:anywhere] leading-none text-gray-700 no-underline">
                                        {item.value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')}
                                    </a>
                                ) : (
                                    <span className="[overflow-wrap:anywhere] leading-none">{item.value}</span>
                                )}
                            </div>
                        )}
                    />
                </header>

                <div className="space-y-10">
                    {/* Professional Summary */}
                    {getSection('Profile') && (
                        <section className="space-y-4">
                            <h2
                                className="text-[18px] font-bold uppercase tracking-wider font-serif pb-1 border-b-[1px]"
                                style={{ color: blueColor, borderColor: 'rgba(60, 88, 113, 0.2)' }}
                            >
                                Professional Summary
                            </h2>
                            <div
                                className="text-[14.5px] text-gray-700 leading-relaxed font-sans"
                                dangerouslySetInnerHTML={{ __html: getSection('Profile')?.content as string }}
                            />
                        </section>
                    )}

                    {/* Experience */}
                    {getSection('Experience') && (
                        <section className="space-y-6">
                            <h2
                                className="text-[18px] font-bold uppercase tracking-wider font-serif pb-1 border-b-[1px]"
                                style={{ color: blueColor, borderColor: 'rgba(60, 88, 113, 0.2)' }}
                            >
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {(getSection('Experience')?.content as any[]).map((exp, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-baseline">
                                                <p className="text-[16px] font-bold text-gray-800 font-sans">{exp.jobTitle}</p>
                                                <p className="text-[14px] font-bold text-gray-500 font-sans">
                                                    {exp.startDate} to {exp.endDate || 'Present'}
                                                </p>
                                            </div>
                                            <p className="text-[15px] font-bold text-gray-700 font-sans">
                                                {exp.employer}{exp.location && <span> - {exp.location}</span>}
                                            </p>
                                        </div>
                                        <div
                                            className="text-[14px] text-gray-700 leading-relaxed font-sans prose prose-sm max-w-none
                                            [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:space-y-2"
                                            dangerouslySetInnerHTML={{ __html: exp.description }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {getSection('Education') && (
                        <section className="space-y-6">
                            <h2
                                className="text-[18px] font-bold uppercase tracking-wider font-serif pb-1 border-b-[1px]"
                                style={{ color: blueColor, borderColor: 'rgba(60, 88, 113, 0.2)' }}
                            >
                                Education
                            </h2>
                            <div className="space-y-6">
                                {(getSection('Education')?.content as any[]).map((edu, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex justify-between items-baseline">
                                            <p className="text-[16px] font-bold text-gray-800 font-sans">{edu.degree}</p>
                                            <p className="text-[14px] font-bold text-gray-500 font-sans">
                                                {edu.startDate} - {edu.endDate}
                                            </p>
                                        </div>
                                        <p className="text-[15px] font-bold text-gray-700 font-sans">
                                            {edu.school}{edu.location && <span> - {edu.location}</span>}
                                        </p>
                                        {edu.description && (
                                            <div
                                                className="text-[14px] text-gray-600 font-sans mt-1"
                                                dangerouslySetInnerHTML={{ __html: edu.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills - 3 Columns */}
                    {getSection('Skills') && (
                        <section className="space-y-6">
                            <h2
                                className="text-[18px] font-bold uppercase tracking-wider font-serif pb-1 border-b-[1px]"
                                style={{ color: blueColor, borderColor: 'rgba(60, 88, 113, 0.2)' }}
                            >
                                Skills
                            </h2>
                            <div className="grid grid-cols-3 gap-y-3 gap-x-8">
                                {(getSection('Skills')?.content as any[]).map((skill, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[16px] font-semibold text-gray-800 list-none">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                        <div className="flex flex-col">
                                            <span>{skill.skill}</span>
                                            {skill.level && <span className="text-[12px] text-gray-400 uppercase font-bold tracking-wider">{skill.level}</span>}
                                            {skill.information && (
                                                <div
                                                    className="text-[14px] text-gray-600 font-sans mt-2 leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: skill.information }}
                                                />
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications - 2 Columns */}
                    {getSection('Certificates') && (
                        <section className="space-y-6">
                            <h2
                                className="text-[18px] font-bold uppercase tracking-wider font-serif pb-1 border-b-[1px]"
                                style={{ color: blueColor, borderColor: 'rgba(60, 88, 113, 0.2)' }}
                            >
                                Certifications
                            </h2>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {(getSection('Certificates')?.content as any[]).map((cert, idx) => (
                                    <li key={idx} className="flex items-start gap-4 list-none">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-[16px] font-bold text-gray-800 leading-tight">{cert.title || cert.name || cert.certificate}</p>
                                            {(cert.description || cert.additionalInfo || cert.information) && (
                                                <div
                                                    className="text-[14px] text-gray-600 font-sans mt-1 leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: cert.description || cert.additionalInfo || cert.information }}
                                                />
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages & Generic Sections */}
                    {sections
                        .filter((s: ResumeSection) => s.isVisible && !['Profile', 'Experience', 'Education', 'Skills', 'Certificates'].includes(s.type))
                        .map((section: ResumeSection) => (
                            <section key={section.id} className="space-y-6">
                                <h2
                                    className="text-[18px] font-bold uppercase tracking-wider font-serif pb-1 border-b-[1px]"
                                    style={{ color: blueColor, borderColor: 'rgba(60, 88, 113, 0.2)' }}
                                >
                                    {section.title}
                                </h2>
                                <div className="space-y-8">
                                    {Array.isArray(section.content) ? (
                                        section.content.map((item: any, idx: number) => (
                                            <li key={idx} className="flex items-start gap-4 list-none">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                                <div className="space-y-1 flex-1">
                                                    <div className="flex justify-between items-baseline gap-2">
                                                        <p className="text-[16px] font-bold text-gray-800 leading-tight">
                                                            {item.name || item.fullName || item.title || item.language || item.award || item.project || item.school || item.certificate}
                                                        </p>
                                                        <div className="flex items-center gap-3 shrink-0">
                                                            {(item.startDate || item.endDate || item.date) && (
                                                                <span className="text-[13px] font-bold text-gray-400">
                                                                    {item.startDate}{item.startDate && (item.endDate || item.date) ? ' - ' : ''}{item.endDate || item.date}
                                                                </span>
                                                            )}
                                                            {item.level && <span className="text-[12px] text-gray-400 uppercase font-bold tracking-wider">{item.level}</span>}
                                                        </div>
                                                    </div>
                                                    {(item.subTitle || item.employer || item.organization || item.jobTitle || item.location) && (
                                                        <p className="text-[14px] font-bold text-gray-700">
                                                            {item.jobTitle && <span>{item.jobTitle}{item.organization && " - "}</span>}
                                                            {item.organization || item.subTitle || item.employer || item.issuer || item.publisher}
                                                            {item.location && <span>{(item.organization || item.subTitle || item.employer) ? " - " : ""}{item.location}</span>}
                                                        </p>
                                                    )}
                                                    {(item.email || item.phone) && (
                                                        <div className="text-[12px] text-gray-500 font-sans">
                                                            {item.email && <span>{item.email}</span>}
                                                            {item.phone && <span>{item.email && " | "}{item.phone}</span>}
                                                        </div>
                                                    )}
                                                    {(item.description || item.additionalInfo || item.information) && (
                                                        <div
                                                            className="text-[14px] text-gray-600 font-sans mt-1 leading-relaxed"
                                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                        />
                                                    )}
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <div
                                            className="text-[14px] text-gray-700 leading-relaxed font-sans"
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
