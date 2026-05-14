import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Calendar, Flag, Linkedin, Globe } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const StructureLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const visibleSections = sections.filter(s => s.isVisible);

    const getSkillWidth = (level: string) => {
        const l = level.toLowerCase();
        if (l.includes('beginner') || l.includes('elementary')) return '25%';
        if (l.includes('skillful') || l.includes('intermediate') || l.includes('moderate') || l.includes('conversational')) return '50%';
        if (l.includes('experienced') || l.includes('advanced') || l.includes('fluent') || l.includes('proficient')) return '75%';
        if (l.includes('expert') || l.includes('native')) return '100%';
        return '50%';
    };

    return (
        <div className={`w-full h-full min-h-[297mm] ${theme.fontFamily} bg-white shadow-lg flex flex-col text-[#333]`}>
            {/* Header */}
            <header className="p-10 pb-6 flex justify-between items-start">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-[#1a202c] mb-1">{personalDetails.fullName}</h1>
                    <p className="text-lg text-gray-600 italic mb-6">{personalDetails.jobTitle}</p>

                    {/* Contact Grid */}
                    <ContactInfoRenderer
                        data={data}
                        layout="horizontal"
                        className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm text-gray-600"
                        itemClassName="flex items-center gap-2 h-4"
                        linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-600 no-underline"
                        textClassName="[overflow-wrap:anywhere] leading-none"
                        iconSize={14}
                        iconStyle={{ color: '#1f2937' }} // gray-800
                    />
                </div>

                {/* Photo */}
                {personalDetails.photo && (
                    <div className="ml-8 shrink-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                            <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
            </header>

            {/* Content */}
            <main className="p-10 flex flex-col gap-8">
                {visibleSections.map(section => (
                    <div key={section.id}>
                        {/* Section Header */}
                        <div className="mb-6">
                            <h2 className="bg-[#eff2f6] text-slate-700 py-2 w-full text-center text-sm font-bold uppercase tracking-widest">
                                {section.title}
                            </h2>
                        </div>

                        {/* Section Content */}
                        <div className="space-y-6">

                            {/* 1. Standard Lists (Experience, Education, Projects, Publications, etc.) */}
                            {Array.isArray(section.content) && ['Experience', 'Education', 'Projects', 'Publications', 'Custom'].includes(section.type) && (
                                (section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="flex gap-6">
                                        {/* Left Column: Dates/Location (25%) */}
                                        <div className="w-1/4 pt-1 shrink-0 text-right">
                                            <div className="text-sm font-bold text-gray-500">
                                                {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                {item.date}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {item.location}
                                                {/* For publications, maybe publisher is relevant here or in subtitle? */}
                                            </div>
                                        </div>

                                        {/* Right Column: Content (75%) */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-gray-900 text-base">
                                                    {item.employer || item.school || item.title || item.name}
                                                </h3>
                                                <span className="text-sm text-gray-600 italic">
                                                    {item.jobTitle || item.degree || item.subTitle || item.publisher}
                                                </span>
                                            </div>

                                            {item.description && (
                                                <div
                                                    className="text-sm text-gray-700 leading-relaxed text-justify"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}

                            {/* 2. Skills & Languages (Split Layout for Consistency) */}
                            {/* Note: Reference didn't show skills, but adapting them to the 2-col style */}
                            {(section.type === 'Skills' || section.type === 'Languages') && Array.isArray(section.content) && (
                                <div className="grid grid-cols-1 gap-4 pl-[25%]"> {/* Indent to align with content column */}
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="w-32 font-bold text-sm text-gray-900">{item.skill || item.language}</div>
                                            {(item.level) && (
                                                <div className="flex-1 max-w-xs bg-gray-200 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-slate-600"
                                                        style={{ width: getSkillWidth(item.level) }}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 3. References (Specific Layout) */}
                            {section.type === 'References' && Array.isArray(section.content) && (
                                <div className="pl-[25%] space-y-4">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="text-sm text-gray-700">
                                            <div className="font-bold text-base">{item.name}</div>
                                            <div className="text-gray-600 italic">{item.jobTitle} {item.organization && `at ${item.organization}`}</div>
                                            <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                                                {item.email && <div className="flex items-center gap-1 h-3"><Mail size={12} /><span className="leading-none">{item.email}</span></div>}
                                                {item.phone && <div className="flex items-center gap-1 h-3"><Phone size={12} /><span className="leading-none">{item.phone}</span></div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 4. Common Text Content (Profile) */}
                            {typeof section.content === 'string' && (
                                <div
                                    className="text-sm text-gray-700 leading-relaxed text-justify px-4"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            )}

                            {/* 5. Interests / Certificates (Simple List) */}
                            {['Interests', 'Certificates'].includes(section.type) && Array.isArray(section.content) && (
                                <div className="pl-[25%] space-y-2">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="text-sm text-gray-700">
                                            <span className="font-bold">• {item.name || item.certificate}</span>
                                            {(item.additionalInfo) && (
                                                <span className="text-gray-500 ml-2" dangerouslySetInnerHTML={{ __html: item.additionalInfo }} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};
