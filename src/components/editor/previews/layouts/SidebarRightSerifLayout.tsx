import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, User, Briefcase, GraduationCap, Lightbulb, Trophy, Award, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const SidebarRightSerifLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Helper to get icon for section
    const getSectionIcon = (type: string, title: string) => {
        switch (type) {
            case 'Experience': return <Briefcase size={18} />;
            case 'Education': return <GraduationCap size={18} />;
            case 'Skills': return <Lightbulb size={18} />;
            case 'Profile': return <User size={18} />;
            case 'Languages': return <Globe size={18} />;
            case 'Awards': return <Trophy size={18} />;
            case 'Certificates': return <Award size={18} />;
            default: return <Briefcase size={18} />; // Fallback
        }
    };

    const mainSections = sections.filter(s =>
        s.isVisible && ['Experience', 'Education', 'Skills', 'Projects', 'Publications', 'Custom', 'Courses'].includes(s.type)
    );

    const sidebarSections = sections.filter(s =>
        s.isVisible && ['Profile', 'Languages', 'Awards', 'Organisations', 'Interests', 'References', 'Certificates'].includes(s.type)
    );

    return (
        <div className="w-full h-full min-h-[297mm] flex font-serif text-gray-900 bg-white shadow-lg">
            {/* LEFT COLUMN (MAIN) - 65% */}
            <div className="w-[65%] p-10 pr-6 space-y-8 bg-white">
                {mainSections.map(section => (
                    <div key={section.id}>
                        {/* Section Header with Icon */}
                        <div className="flex items-center gap-3 mb-4 h-5">
                            <span className="text-gray-900 shrink-0 flex items-center h-full">{getSectionIcon(section.type, section.title)}</span>
                            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 border-b-2 border-transparent leading-none">
                                {section.title}
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="space-y-5">
                            {/* Experience / Education / Projects / Publications / Awards / Organizations / Courses */}
                            {Array.isArray(section.content) && ['Experience', 'Education', 'Projects', 'Publications', 'Awards', 'Organisations', 'Courses'].includes(section.type) && (
                                <div className="space-y-4">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id}>
                                            <div className="font-bold text-lg text-gray-900">
                                                {item.employer || item.school || item.title || item.publisher || item.certificate}
                                            </div>

                                            <div className="italic text-gray-800 font-semibold">
                                                {item.jobTitle || item.degree || item.subTitle || item.publisher}
                                            </div>

                                            <div className="text-gray-600 text-sm mb-2">
                                                {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                {item.location ? ` | ${item.location}` : ''}
                                            </div>

                                            {item.description && (
                                                <div
                                                    className="text-gray-800 text-sm leading-relaxed text-justify list-disc pl-4"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Custom Sections */}
                            {section.type === 'Custom' && Array.isArray(section.content) && (
                                <div className="space-y-4">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id}>
                                            <div className="font-bold text-lg text-gray-900">
                                                {item.title}
                                            </div>

                                            {(item.subTitle) && (
                                                <div className="italic text-gray-800 font-semibold">
                                                    {item.subTitle}
                                                </div>
                                            )}

                                            <div className="text-gray-600 text-sm mb-2">
                                                {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                {item.location ? ` | ${item.location}` : ''}
                                            </div>

                                            {item.description && (
                                                <div
                                                    className="text-gray-800 text-sm leading-relaxed text-justify list-disc pl-4"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Skills (Bullet points for this layout based on reference, or simple list) */}
                            {section.type === 'Skills' && Array.isArray(section.content) && (
                                <ul className="space-y-2 list-disc list-inside">
                                    {(section.content as any[]).map((item: any) => (
                                        <li key={item.id} className="text-sm text-gray-800">
                                            <span className="font-medium">{item.skill}</span>
                                            {item.information && (
                                                <span
                                                    className="ml-2 text-gray-600"
                                                    dangerouslySetInnerHTML={{ __html: item.information }}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT COLUMN (SIDEBAR) - 35% */}
            <div className="w-[35%] p-8 bg-[#d6cbb8] text-gray-900 flex flex-col gap-8">
                {/* Header Block */}
                <div className="text-left mb-2">
                    <h1 className="text-4xl font-bold mb-2 leading-tight">
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-xl italic text-gray-800 mb-6">
                        {personalDetails.jobTitle}
                    </p>

                    {personalDetails.photo && (
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800 mb-6 mx-auto lg:mx-0">
                            <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Contact Info */}
                    <ContactInfoRenderer
                        data={data}
                        layout="vertical"
                        className="flex flex-col gap-3 text-sm"
                        itemClassName="flex items-center gap-2 h-4"
                        linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-900 no-underline"
                        textClassName="[overflow-wrap:anywhere] leading-none"
                        iconSize={14}
                        iconStyle={{ color: '#111827' }} // gray-900
                    />
                </div>

                {/* Sidebar Sections */}
                {sidebarSections.map(section => (
                    <div key={section.id}>
                        <div className="flex items-center gap-2 mb-3 h-5">
                            <span className="shrink-0 flex items-center h-full">{getSectionIcon(section.type, section.title)}</span>
                            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-900 pb-1 w-full leading-none">
                                {section.title}
                            </h3>
                        </div>

                        <div className="text-sm space-y-3">
                            {/* Profile / Summary */}
                            {section.type === 'Profile' && typeof section.content === 'string' && (
                                <div dangerouslySetInnerHTML={{ __html: section.content }} className="leading-relaxed" />
                            )}

                            {/* Languages with Dots */}
                            {section.type === 'Languages' && Array.isArray(section.content) && (
                                <div className="space-y-3">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="flex flex-col">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold">{item.language}</span>
                                            </div>
                                            {/* Dots Representation for Level */}
                                            <div className="flex gap-1 text-gray-800">
                                                {[1, 2, 3, 4, 5].map((dot) => {
                                                    // Simple mapping: Native=5, Fluent=4, Proficient=3, Intermediate=2, Basic=1
                                                    let levelNum = 3;
                                                    const l = (item.level || '').toLowerCase();
                                                    if (l.includes('native')) levelNum = 5;
                                                    else if (l.includes('fluent')) levelNum = 4;
                                                    else if (l.includes('proficient') || l.includes('advanced')) levelNum = 3;
                                                    else if (l.includes('intermediate')) levelNum = 2;
                                                    else if (l.includes('basic') || l.includes('beginner')) levelNum = 1;

                                                    return (
                                                        <div key={dot} className={`w-2 h-2 rounded-full ${dot <= levelNum ? 'bg-gray-900' : 'bg-gray-400'}`}></div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Awards / Interests / General List */}
                            {['Awards', 'Interests', 'Certificates', 'References'].includes(section.type) && Array.isArray(section.content) && (
                                <div className="space-y-3">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id}>
                                            <div className="font-bold">
                                                {item.title || item.name || item.certificate}
                                            </div>
                                            <div className="italic text-xs mb-1">
                                                {item.subTitle || item.publisher || item.organization}
                                            </div>
                                            {item.additionalInfo && (
                                                <div className="text-xs text-gray-800" dangerouslySetInnerHTML={{ __html: item.additionalInfo }} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
