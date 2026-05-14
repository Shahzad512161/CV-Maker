import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, User, Briefcase, GraduationCap, Lightbulb, Grid, Award, Github, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const ProfessionalSerifLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Helper to get icon for section
    const getSectionIcon = (type: string) => {
        switch (type) {
            case 'Experience': return <Briefcase size={16} />;
            case 'Education': return <GraduationCap size={16} />;
            case 'Skills': return <Lightbulb size={16} />;
            case 'Languages': return <Globe size={16} />;
            case 'Projects': return <Grid size={16} />;
            case 'Awards': return <Award size={16} />;
            default: return <User size={16} />;
        }
    };

    // Split sections into Left and Right columns
    const leftColumnSections = sections.filter(s =>
        s.isVisible && ['Education', 'Skills', 'Languages', 'Certificates', 'Interests', 'Awards'].includes(s.type)
    );

    const rightColumnSections = sections.filter(s =>
        s.isVisible && ['Profile', 'Experience', 'Projects', 'Publications', 'Custom', 'Organisations', 'Courses', 'References'].includes(s.type)
    );

    return (
        <div className="w-full h-full min-h-[297mm] p-10 font-serif text-gray-900 bg-white shadow-lg">
            {/* Header */}
            <header className="flex items-center gap-6 mb-10">
                {personalDetails.photo && (
                    <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 filter grayscale-[20%]">
                        <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-3 flex-wrap border-b border-gray-100 pb-4">
                        <h1 className="text-4xl font-extrabold text-gray-900 leading-none tracking-tight">
                            {personalDetails.fullName}
                        </h1>
                        <p className="text-2xl italic text-gray-600 font-serif leading-none">
                            {personalDetails.jobTitle}
                        </p>
                    </div>

                    <ContactInfoRenderer
                        data={data}
                        layout="horizontal"
                        className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600"
                        itemClassName="flex items-center gap-1.5 hover:text-[#eab308] transition-colors h-4"
                        linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-600 no-underline"
                        textClassName="[overflow-wrap:anywhere] leading-none text-gray-600"
                        iconSize={14}
                        iconStyle={{ color: '#eab308' }}
                    />
                </div>
            </header>

            <div className="flex gap-12 items-start">
                {/* Left Column (Narrower) - Education, Skills, Langs - 38% width matches reference balance */}
                <div className="w-[38%] space-y-10">
                    {leftColumnSections.map(section => (
                        <div key={section.id}>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-[3px] border-[#eab308] pb-1 mb-5 flex items-center gap-2 h-5">
                                <span className="text-gray-900 h-full flex items-center">{getSectionIcon(section.type)}</span>
                                <span className="leading-none">{section.title}</span>
                            </h2>

                            <div className="space-y-6">
                                {/* Education */}
                                {section.type === 'Education' && Array.isArray(section.content) && (
                                    <div className="space-y-6">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="font-bold text-gray-900 leading-tight mb-1 text-base">
                                                    {item.school}
                                                </div>
                                                <div className="italic text-gray-700 text-sm mb-1 font-medium">
                                                    {item.degree}
                                                </div>
                                                <div className="text-gray-500 text-xs mb-2 italic">
                                                    {item.startDate} {item.endDate ? `– ${item.endDate}` : ''} | {item.location}
                                                </div>
                                                {item.description && (
                                                    <div
                                                        className="text-gray-700 text-sm leading-relaxed list-disc pl-4"
                                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Skills */}
                                {section.type === 'Skills' && Array.isArray(section.content) && (
                                    <div className="space-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="text-sm border-b border-gray-100 pb-2 last:border-0">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <span className="font-bold text-gray-900">{item.skill}</span>
                                                    {item.level && <span className="text-gray-500 italic text-xs shrink-0 ml-2">{item.level}</span>}
                                                </div>
                                                {item.information && (
                                                    <div
                                                        className="text-gray-600 leading-relaxed text-xs"
                                                        dangerouslySetInnerHTML={{ __html: item.information }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Languages */}
                                {section.type === 'Languages' && Array.isArray(section.content) && (
                                    <ul className="space-y-2">
                                        {(section.content as any[]).map((item: any) => (
                                            <li key={item.id} className="text-sm border-b border-gray-100 pb-2 last:border-0">
                                                <div className="font-bold text-gray-900">{item.language}</div>
                                                <div className="text-gray-600 italic text-xs">{item.level}</div>
                                                {/* Some implementations use description or information for rich text notes */}
                                                {(item.description || item.information) && (
                                                    <div
                                                        className="text-gray-600 leading-relaxed text-xs mt-1"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.information }}
                                                    />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Generic List for others */}
                                {['Awards', 'Interests', 'Certificates'].includes(section.type) && Array.isArray(section.content) && (
                                    <div className="space-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="font-bold text-gray-900 text-sm">
                                                    {item.title || item.name || item.certificate}
                                                </div>
                                                {item.additionalInfo && (
                                                    <div
                                                        className="text-gray-700 text-xs leading-snug mt-1"
                                                        dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column (Wider) - Experience, Projects - 62% width */}
                <div className="w-[62%] space-y-10">
                    {rightColumnSections.map(section => (
                        <div key={section.id}>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-[3px] border-[#eab308] pb-1 mb-5 flex items-center gap-2 h-5">
                                <span className="text-gray-900 h-full flex items-center">{getSectionIcon(section.type)}</span>
                                <span className="leading-none">{section.title}</span>
                            </h2>

                            <div className="space-y-8">
                                {/* Profile */}
                                {section.type === 'Profile' && typeof section.content === 'string' && (
                                    <div
                                        className="text-gray-800 text-sm leading-relaxed text-justify"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                )}

                                {/* References */}
                                {section.type === 'References' && Array.isArray(section.content) && (
                                    <div className="grid grid-cols-2 gap-6">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="text-sm">
                                                <div className="font-bold text-gray-900 text-base">{item.name}</div>
                                                <div className="text-gray-700 italic">{item.jobTitle}</div>
                                                <div className="text-gray-600 font-medium mb-1">{item.organization}</div>
                                                {item.email && (
                                                    <div className="flex items-center gap-1.5 text-gray-600 text-xs h-3">
                                                        <Mail size={12} className="text-[#eab308]" />
                                                        <span className="leading-none">{item.email}</span>
                                                    </div>
                                                )}
                                                {item.phone && (
                                                    <div className="flex items-center gap-1.5 text-gray-600 text-xs mt-0.5 h-3">
                                                        <Phone size={12} className="text-[#eab308]" />
                                                        <span className="leading-none">{item.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Experience / Projects / etc */}
                                {['Experience', 'Projects', 'Publications', 'Custom', 'Organisations', 'Courses'].includes(section.type) && Array.isArray(section.content) && (
                                    <div className="space-y-7">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                                                    <span className="font-bold text-lg text-gray-900">
                                                        {item.title || item.employer || item.project}
                                                    </span>
                                                    {(item.subTitle || item.jobTitle || item.publisher) && (
                                                        <span className="italic text-gray-600 text-sm">
                                                            , {item.subTitle || item.jobTitle || item.publisher}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="italic text-gray-500 text-xs mb-3 font-medium uppercase tracking-wide">
                                                    {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                    {item.date}
                                                    {item.location ? ` | ${item.location}` : ''}
                                                </div>

                                                {item.description && (
                                                    <div
                                                        className="text-gray-800 text-sm leading-relaxed text-justify list-disc pl-4 space-y-1"
                                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                                    />
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
        </div>
    );
};
