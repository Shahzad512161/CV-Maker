import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, User, Briefcase, GraduationCap, Lightbulb, Grid, Award, Github, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const BorderedSerifLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Helper to get icon for section
    const getSectionIcon = (type: string) => {
        switch (type) {
            case 'Experience': return <Briefcase size={16} />;
            case 'Education': return <GraduationCap size={18} />;
            case 'Skills': return <Lightbulb size={16} />;
            case 'Languages': return <Globe size={16} />;
            case 'Projects': return <Grid size={16} />;
            case 'Awards': return <Award size={16} />;
            case 'Profile': return <User size={16} />;
            default: return <User size={16} />;
        }
    };

    return (
        // Main Container with Gradient Border Effect
        // User requested: "faded effect green on left side and strong green effect on right side"
        <div className="w-full h-full min-h-[297mm] p-8 bg-gradient-to-r from-[#d1e7dd] to-[#14532d] shadow-lg flex flex-col">

            {/* Inner Content - White Paper */}
            <div className="flex-1 bg-white p-12 flex flex-col items-center text-center font-serif text-gray-900 relative shadow-sm">

                {/* Header */}
                <header className="w-full mb-10 text-center">
                    <h1 className="text-4xl font-bold text-[#14532d] mb-2 tracking-wide">
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-xl italic text-gray-600 mb-6 font-serif">
                        {personalDetails.jobTitle}
                    </p>

                    <ContactInfoRenderer
                        data={data}
                        layout="horizontal"
                        className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700 font-medium"
                        itemClassName="flex items-center gap-1.5 h-4"
                        linkClassName="hover:underline leading-none"
                        textClassName="leading-none"
                        iconSize={14}
                        iconStyle={{ color: '#14532d' }} // dark-green
                    />
                </header>

                <div className="w-full space-y-8 flex-1 text-left">
                    {/* Render Sections */}
                    {sections.filter(s => s.isVisible).map(section => (
                        <div key={section.id} className="w-full">

                            {/* Centered Heading with Lines */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-[1px] bg-gray-300 flex-1"></div>
                                <h2 className="text-lg font-bold text-[#1a472a] uppercase tracking-widest flex items-center gap-2 px-2 h-7">
                                    <span className="text-[#1a472a] h-full flex items-center">{getSectionIcon(section.type)}</span>
                                    <span className="leading-none">{section.title}</span>
                                </h2>
                                <div className="h-[1px] bg-gray-300 flex-1"></div>
                            </div>

                            <div className="px-4">
                                {/* Profile / Summary */}
                                {section.type === 'Profile' && typeof section.content === 'string' && (
                                    <div
                                        className="text-gray-800 text-sm leading-relaxed text-center max-w-2xl mx-auto"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                )}

                                {/* Skills - Special Pipe Layout */}
                                {section.type === 'Skills' && Array.isArray(section.content) && (
                                    <div className="space-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="text-sm border-b border-gray-100 pb-2 last:border-0">
                                                <div className="flex flex-wrap items-baseline gap-2">
                                                    <span className="font-bold text-[#14532d]">{item.skill}</span>
                                                    {item.level && <span className="text-gray-500 italic text-sm"> — {item.level}</span>}
                                                </div>
                                                {item.information && (
                                                    <div
                                                        className="text-gray-600 text-sm mt-1"
                                                        dangerouslySetInnerHTML={{ __html: item.information }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Experience / Education / Projects - Left Align with Dates on Right */}
                                {['Experience', 'Education', 'Projects', 'Custom', 'Organisations'].includes(section.type) && Array.isArray(section.content) && (
                                    <div className="space-y-6">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <div>
                                                        <span className="font-bold text-gray-900 text-base block">
                                                            {item.title || item.school || item.employer || item.project}
                                                        </span>
                                                        {(item.subTitle || item.degree || item.jobTitle) && (
                                                            <span className="text-gray-700 italic text-sm">
                                                                {item.subTitle || item.degree || item.jobTitle}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <div className="text-sm text-gray-800 font-medium">
                                                            {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                        </div>
                                                        {item.location && <div className="text-gray-500 text-sm italic">{item.location}</div>}
                                                    </div>
                                                </div>

                                                {item.description && (
                                                    <div
                                                        className="text-gray-700 text-sm leading-relaxed mt-2 text-justify [&_p]:mb-1 [&_p:last-child]:mb-0 [&_blockquote]:m-0 [&_blockquote]:p-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p:empty]:hidden"
                                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Languages & Certificates - Simple List */}
                                {['Languages', 'Certificates'].includes(section.type) && Array.isArray(section.content) && (
                                    <ul className="flex flex-col gap-4 list-none">
                                        {(section.content as any[]).map((item: any) => (
                                            <li key={item.id} className="text-sm text-gray-800 flex items-start gap-2">
                                                {/* Bullet point removed as per user request */}
                                                {section.type === 'Languages' ? (
                                                    <div className="flex-1">
                                                        <span className="font-bold">{item.language}</span>
                                                        {item.level && <span className="text-gray-600 italic"> - {item.level}</span>}
                                                        {(item.description || item.information) && (
                                                            <div
                                                                className="text-gray-600 text-sm mt-1 block w-full [&_p]:mb-1 [&_p:last-child]:mb-0 [&_blockquote]:m-0 [&_blockquote]:p-0 [&_p:empty]:hidden"
                                                                dangerouslySetInnerHTML={{ __html: item.description || item.information }}
                                                            />
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex-1">
                                                        <span className="font-bold text-sm">{item.certificate || item.name}</span>
                                                        {item.additionalInfo && <div className="text-gray-600 text-sm mt-1 block w-full [&_p]:mb-1 [&_p:last-child]:mb-0 [&_blockquote]:m-0 [&_blockquote]:p-0 [&_p:empty]:hidden" dangerouslySetInnerHTML={{ __html: item.additionalInfo }} />}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Generic List */}
                                {['Publications', 'References', 'Awards', 'Interests'].includes(section.type) && Array.isArray(section.content) && (
                                    <div className="space-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="font-bold text-gray-900 text-sm">
                                                    {item.title || item.name || item.publisher}
                                                </div>
                                                {(item.subTitle || item.jobTitle || item.publisher || item.organization) && (
                                                    <div className="text-gray-700 text-sm italic">
                                                        {item.subTitle || item.jobTitle || item.publisher}
                                                        {item.organization && (item.subTitle || item.jobTitle || item.publisher ? ` - ${item.organization}` : item.organization)}
                                                    </div>
                                                )}
                                                {item.date && (
                                                    <div className="text-gray-600 text-xs">
                                                        {item.date}
                                                    </div>
                                                )}
                                                {(item.description || item.additionalInfo) && (
                                                    <div
                                                        className="text-gray-700 text-sm mt-1 [&_p]:mb-1 [&_p:last-child]:mb-0 [&_p:empty]:hidden"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                                    />
                                                )}
                                                {/* For References specifcally */}
                                                {section.type === 'References' && (
                                                    <div className="text-gray-600 text-sm mt-1">
                                                        {item.email} {item.email && item.phone && ' | '} {item.phone}
                                                    </div>
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
