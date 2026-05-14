import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const ModernHeaderLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Filter visible sections
    const visibleSections = sections.filter(s => s.isVisible);

    // Split sections Alternating: Even index -> Left, Odd index -> Right
    const leftColumnSections = visibleSections.filter((_, index) => index % 2 === 0);
    const rightColumnSections = visibleSections.filter((_, index) => index % 2 !== 0);

    const getSkillWidth = (level: string) => {
        const l = level.toLowerCase();
        if (l.includes('beginner') || l.includes('elementary')) return '25%';
        if (l.includes('skillful') || l.includes('intermediate') || l.includes('moderate') || l.includes('conversational')) return '50%';
        if (l.includes('experienced') || l.includes('advanced') || l.includes('fluent') || l.includes('proficient')) return '75%';
        if (l.includes('expert') || l.includes('native')) return '100%';
        return '50%';
    };

    const renderSection = (section: any) => {
        return (
            <div key={section.id} className="mb-0">
                {/* Section Header: Block Style */}
                <div className="flex justify-center mb-4">
                    <h2 className="text-base font-bold capitalize text-slate-700 bg-[#eff2f6] py-1.5 px-10 rounded inline-block text-center shadow-sm">
                        {section.title}
                    </h2>
                </div>

                {/* Content Logic */}

                {/* 1. Summary / Profile (String Content) */}
                {typeof section.content === 'string' && (
                    <div
                        className="text-gray-700 text-sm leading-relaxed text-justify hyphens-auto [overflow-wrap:anywhere]"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                )}

                {/* 2. Skills (Name Left - Bar Right) */}
                {section.type === 'Skills' && Array.isArray(section.content) && (
                    <div className="space-y-4">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id} className="text-sm">
                                {/* Header Row: Skill Name (Left) - Bar (Right) */}
                                <div className="flex justify-between items-center mb-1 gap-4">
                                    <span className="font-bold text-base text-gray-900 [overflow-wrap:anywhere]">{item.skill}</span>

                                    {/* Bar aligned to right */}
                                    {item.level && (
                                        <div className="w-24 sm:w-32 bg-gray-200 h-1.5 rounded-full shrink-0 overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: getSkillWidth(item.level),
                                                    backgroundColor: theme.color
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                {(item.information || item.additionalInfo) && (
                                    <div
                                        className="text-gray-600 text-sm leading-relaxed [overflow-wrap:anywhere] text-justify hyphens-auto"
                                        dangerouslySetInnerHTML={{ __html: item.information || item.additionalInfo }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. Standard Lists (Experience, Education, Projects, Custom) */}
                {Array.isArray(section.content) && ['Experience', 'Education', 'Projects', 'Custom'].includes(section.type) && (
                    <div className="space-y-6">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id} className="group">
                                {/* Header Row: Title - Date */}
                                <div className="mb-1">
                                    <div className="flex justify-between items-baseline gap-4">
                                        <h3 className="text-gray-900 font-bold text-base [overflow-wrap:anywhere]">
                                            {item.title || item.jobTitle || item.degree}
                                        </h3>
                                        <span className="shrink-0 text-gray-600 text-sm font-medium">
                                            {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                            {item.date}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm text-gray-600 mt-0.5">
                                        <span className="font-medium [overflow-wrap:anywhere]">
                                            {item.employer || item.school || item.subTitle}
                                            {item.location ? ` | ${item.location}` : ''}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                {item.description && (
                                    <div
                                        className="text-gray-700 text-sm leading-relaxed mt-2 pl-0 [overflow-wrap:anywhere]"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 4. Certificates */}
                {section.type === 'Certificates' && Array.isArray(section.content) && (
                    <div className="space-y-4">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id}>
                                <div className="font-bold text-gray-900 text-sm [overflow-wrap:anywhere]">
                                    • {item.certificate}
                                </div>
                                {item.additionalInfo && (
                                    <div
                                        className="text-xs text-gray-600 leading-relaxed ml-3 [overflow-wrap:anywhere]"
                                        dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 5. Languages (Vertical List) */}
                {section.type === 'Languages' && Array.isArray(section.content) && (
                    <div className="space-y-4">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id} className="border-b border-gray-100 pb-2">
                                <div className="flex justify-between items-center mb-1 gap-4">
                                    <span className="font-bold text-sm text-gray-900 [overflow-wrap:anywhere]">{item.language}</span>

                                    {/* Bar aligned to right */}
                                    {item.level && (
                                        <div className="w-24 sm:w-32 bg-gray-200 h-1.5 rounded-full shrink-0 overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: getSkillWidth(item.level),
                                                    backgroundColor: theme.color
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                                {/* Description */}
                                {(item.information || item.additionalInfo) && (
                                    <div
                                        className="text-gray-600 text-sm leading-relaxed [overflow-wrap:anywhere] text-justify hyphens-auto"
                                        dangerouslySetInnerHTML={{ __html: item.information || item.additionalInfo }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 6. Interests */}
                {section.type === 'Interests' && Array.isArray(section.content) && (
                    <div className="space-y-4">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id} className="text-sm">
                                <span className="font-bold text-gray-900 block mb-1">{item.name}</span>
                                {item.additionalInfo && (
                                    <div
                                        className="text-gray-600 text-sm leading-relaxed [overflow-wrap:anywhere] text-justify hyphens-auto"
                                        dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 7. References */}
                {section.type === 'References' && Array.isArray(section.content) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(section.content as any[]).map((item: any) => (
                            <div key={item.id} className="text-sm">
                                <div className="font-bold text-gray-900">{item.name}</div>
                                <div className="text-xs text-gray-600">{item.jobTitle}, {item.organization}</div>
                                <div className="text-xs text-blue-600 mt-1">{item.email}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`w-full h-full min-h-[297mm] ${theme.fontFamily} bg-white shadow-lg flex flex-col`}>

            {/* Header Banner: Dark Background, Full Width */}
            <header className="px-10 py-16 flex items-center gap-8 text-white" style={{ backgroundColor: theme.color }}>
                {/* Photo (Left) */}
                {personalDetails.photo && (
                    <div className="shrink-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                            <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                {/* Info Text */}
                <div className="flex-1 min-w-0">
                    <h1 className="text-4xl font-bold mb-1 tracking-wide [overflow-wrap:anywhere]">
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-xl font-light tracking-wide mb-4 opacity-90 [overflow-wrap:anywhere]">
                        {personalDetails.jobTitle}
                    </p>

                    {/* Contact Grid - HONORS REORDERING */}
                    <ContactInfoRenderer
                        data={data}
                        layout="horizontal"
                        className="flex flex-wrap gap-y-2 gap-x-6 text-sm font-medium opacity-80"
                        itemClassName="flex items-center gap-2 max-w-full h-4"
                        linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none"
                        textClassName="[overflow-wrap:anywhere] leading-none"
                    />
                </div>
            </header>

            {/* Two-Column Content Body (Equal Split) */}
            <div className={`p-10 grid grid-cols-1 md:grid-cols-2 gap-10 flex-1 items-start ${theme.sectionSpacing}`}>

                {/* Left Column (Even Indexes) */}
                <div className="space-y-8">
                    {leftColumnSections.map(section => renderSection(section))}
                </div>

                {/* Right Column (Odd Indexes) */}
                <div className="space-y-8">
                    {rightColumnSections.map(section => renderSection(section))}
                </div>
            </div>
        </div>
    );
};
