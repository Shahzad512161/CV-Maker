import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, User, Briefcase, GraduationCap, Lightbulb, Grid, Award, Github, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const LeafyGreenLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Helper to get icon for section (Not strictly used in reference headers but good for consistency/fallback)
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

    return (
        <div className="w-full h-full min-h-[297mm] flex font-sans text-gray-900 bg-white shadow-lg overflow-hidden">
            {/* Decorative Left Sidebar */}
            <div className="w-[6%] bg-[#1a3a2a] relative">
                {/* Decorative leafy pattern simulated with CSS gradients or svg if available. Using solid dark green for now as per plan */}
                <div className="absolute inset-0 opacity-40 bg-[url('/textures/leaf-texture.png')] bg-[length:100%_auto] bg-repeat-y bg-top"></div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-10 pl-12 pr-12">

                {/* Header */}
                <header className="flex justify-between items-start mb-10">
                    <div className="flex-1 pr-6">
                        <h1 className="text-5xl font-bold text-gray-900 mb-2 leading-tight">
                            {personalDetails.fullName}
                        </h1>
                        <p className="text-2xl text-gray-700 mb-4 font-normal">
                            {personalDetails.jobTitle}
                        </p>

                        <ContactInfoRenderer
                            data={data}
                            layout="horizontal"
                            className="text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1"
                            itemClassName="flex items-center gap-1.5 h-4"
                            linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-900 no-underline"
                            textClassName="[overflow-wrap:anywhere] leading-none"
                            iconSize={14}
                            iconStyle={{ color: 'rgb(17, 24, 39)' }} // text-gray-900
                        />
                    </div>
                    {personalDetails.photo && (
                        <div className="w-32 h-32 rounded-sm overflow-hidden shrink-0 border border-gray-200">
                            <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </header>

                <div className="space-y-8">
                    {/* Render Sections */}
                    {sections.filter(s => s.isVisible).map(section => (
                        <div key={section.id}>
                            <h2 className="text-lg font-bold text-black border-b-2 border-black pb-1 mb-4 capitalize">
                                {section.title}
                            </h2>

                            <div className="leading-relaxed">
                                {/* Profile / Summary */}
                                {section.type === 'Profile' && typeof section.content === 'string' && (
                                    <div
                                        className="text-gray-800 text-sm opacity-90"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                )}

                                {/* Skills - 2 Column Grid */}
                                {section.type === 'Skills' && Array.isArray(section.content) && (
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="font-bold text-gray-900 text-sm mb-1 flex items-baseline gap-2">
                                                    <span>{item.skill}</span>
                                                    {item.level && <span className="text-gray-500 font-normal text-xs italic">({item.level})</span>}
                                                </div>
                                                {item.information && (
                                                    <div
                                                        className="text-gray-600 text-sm leading-snug"
                                                        dangerouslySetInnerHTML={{ __html: item.information }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Experience / Projects / Custom - Flex with Date Right */}
                                {['Experience', 'Projects', 'Custom', 'Organisations'].includes(section.type) && Array.isArray(section.content) && (
                                    <div className="space-y-6">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <div>
                                                        <span className="font-bold text-gray-900 text-base">
                                                            {item.title || item.employer || item.project}
                                                        </span>
                                                        {(item.subTitle || item.jobTitle) && (
                                                            <span className="text-gray-700 italic ml-1">
                                                                , {item.subTitle || item.jobTitle}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-700 font-medium shrink-0">
                                                        {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                    </div>
                                                </div>

                                                {item.location && <div className="text-gray-500 text-xs mb-2 text-right">{item.location}</div>}

                                                {item.description && (
                                                    <div
                                                        className="text-gray-700 text-sm"
                                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Education - Flex with Date Right */}
                                {section.type === 'Education' && Array.isArray(section.content) && (
                                    <div className="space-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <div className="font-bold text-gray-900 text-base">
                                                        {item.school}
                                                    </div>
                                                    <div className="text-sm text-gray-700 font-medium shrink-0">
                                                        {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                    </div>
                                                </div>
                                                <div className="text-gray-700 italic text-sm mb-1">
                                                    {item.degree}
                                                </div>
                                                {item.location && <div className="text-gray-500 text-xs text-right mb-1">{item.location}</div>}

                                                {item.description && (
                                                    <div
                                                        className="text-gray-700 text-sm"
                                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Languages & Certificates - Inline Lists */}
                                {['Languages', 'Certificates'].includes(section.type) && Array.isArray(section.content) && (
                                    <ul className="flex flex-wrap gap-x-8 gap-y-2 list-none p-0">
                                        {(section.content as any[]).map((item: any) => (
                                            <li key={item.id} className="text-sm text-gray-800">
                                                {section.type === 'Languages' ? (
                                                    <>
                                                        <span className="font-bold">{item.language}</span>
                                                        {item.level && <span className="text-gray-600"> ({item.level})</span>}
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="font-medium">{item.certificate || item.name}</span>
                                                        {item.additionalInfo && <span className="text-gray-600"> - {item.additionalInfo}</span>}
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Publications / References / Generic - Standard Stack */}
                                {['Publications', 'References', 'Awards', 'Interests'].includes(section.type) && Array.isArray(section.content) && (
                                    <div className="space-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="font-bold text-gray-900 text-sm">
                                                    {item.title || item.name || item.publisher}
                                                </div>
                                                {(item.subTitle || item.jobTitle || item.publisher) && (
                                                    <div className="text-gray-700 text-sm italic">
                                                        {item.subTitle || item.jobTitle || item.publisher}
                                                    </div>
                                                )}
                                                {item.date && (
                                                    <div className="text-gray-600 text-xs">
                                                        {item.date}
                                                    </div>
                                                )}
                                                {(item.description || item.additionalInfo) && (
                                                    <div
                                                        className="text-gray-700 text-sm mt-1"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                                    />
                                                )}
                                                {/* For References specifcally */}
                                                {section.type === 'References' && (
                                                    <div className="text-gray-600 text-xs mt-1">
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
