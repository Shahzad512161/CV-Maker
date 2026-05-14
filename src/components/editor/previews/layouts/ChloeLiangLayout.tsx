import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { User, Briefcase, GraduationCap, Settings, FileText, Globe, Award, BookOpen, Users, Quote, PenTool, Heart, Languages } from 'lucide-react';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface ChloeLiangLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

const ChloeLiangLayout: React.FC<ChloeLiangLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const goldColor = '#fca311'; // Accentuating gold color from reference

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    const getIcon = (type: string) => {
        const props = { size: 18, style: { color: goldColor } };
        switch (type) {
            case 'Profile': return <User {...props} />;
            case 'Experience': return <Briefcase {...props} />;
            case 'Education': return <GraduationCap {...props} />;
            case 'Skills': return <Settings {...props} />;
            case 'Projects': return <FileText {...props} />;
            case 'Custom': return <PenTool {...props} />;
            case 'Certificates': return <Award {...props} />;
            case 'Awards': return <Award {...props} />;
            case 'Languages': return <Languages {...props} />;
            case 'Interests': return <Heart {...props} />;
            case 'Courses': return <BookOpen {...props} />;
            case 'Organisations': return <Users {...props} />;
            case 'Publications': return <Quote {...props} />;
            case 'References': return <Users {...props} />;
            default: return <FileText {...props} />;
        }
    };

    const SectionHeader = ({ title, type }: { title: string, type: string }) => (
        <div className="flex flex-col mb-4 mt-8">
            <div className="flex items-center gap-2 mb-1 h-6">
                <span className="h-full flex items-center">{getIcon(type)}</span>
                <h2 className="text-[16px] font-extrabold font-sans tracking-wider uppercase text-black leading-none">{title}</h2>
            </div>
            <div className="h-[3px] w-8 bg-[#fca311]" />
        </div>
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-sans text-[#1a1a1a] flex flex-col pt-0">
            {/* Full-width Dark Header */}
            <header className="bg-[#1a1a1a] w-full pt-10 pb-6 px-12 flex flex-col items-start">
                <div className="flex items-baseline gap-4 mb-4">
                    <h1 className="text-[38px] font-black tracking-tight leading-tight uppercase" style={{ color: goldColor }}>
                        {personalDetails.fullName.split(' ')[0]}
                        <span className="ml-2 font-light text-white">{personalDetails.fullName.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    {personalDetails.jobTitle && (
                        <p className="text-[24px] text-gray-300 font-light italic">{personalDetails.jobTitle}</p>
                    )}
                </div>

                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    className="flex flex-wrap justify-start items-center gap-x-6 gap-y-2 text-[12px] text-gray-400 font-medium"
                    itemClassName="flex items-center gap-1.5 h-4"
                    linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={14}
                    renderIcon={(icon: React.ReactNode) => (
                        <span style={{ color: goldColor }} className="h-full flex items-center">
                            {icon}
                        </span>
                    )}
                />
            </header>

            {/* Main Content Area */}
            <div className="px-12 pb-12 flex flex-col">
                {sections.filter(s => s.isVisible && hasContent(s)).map(section => {
                    switch (section.type) {
                        case 'Profile':
                        case 'Declaration':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} type={section.type} />
                                    <div
                                        className="text-[14px] leading-relaxed text-gray-800 font-medium"
                                        dangerouslySetInnerHTML={{ __html: section.content as string }}
                                    />
                                </div>
                            );

                        case 'Experience':
                        case 'Education':
                        case 'Projects':
                        case 'Custom':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} type={section.type} />
                                    <div className="flex flex-col gap-6">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="grid grid-cols-[1fr_200px] gap-8">
                                                <div className="flex flex-col">
                                                    <div className="text-[15px] mb-1">
                                                        <span className="font-extrabold text-[#1a1a1a]">
                                                            {section.type === 'Education' ? (item.school || item.institution) : (item.employer || item.organization || item.title)}
                                                        </span>
                                                        <span className="text-gray-600 italic">
                                                            , {section.type === 'Education' ? item.degree : (item.jobTitle || item.subTitle)}
                                                        </span>
                                                    </div>
                                                    {item.description && (
                                                        <div
                                                            className="text-[13.5px] leading-relaxed text-gray-700 prose prose-sm max-w-none list-disc marker:text-gold"
                                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-end text-right">
                                                    <div className="text-[13px] font-bold" style={{ color: goldColor }}>
                                                        {[item.startDate, item.endDate].filter(Boolean).join(' — ')}
                                                    </div>
                                                    {item.location && <div className="text-[12px] text-gray-500 font-bold uppercase tracking-tighter">{item.location}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Skills':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} type={section.type} />
                                    <div className="grid grid-cols-3 gap-8">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex flex-col gap-1">
                                                <div className="text-[14px] font-extrabold text-black">{item.skill}</div>
                                                {item.level && <div className="text-[12px] text-gray-600 font-bold" style={{ color: goldColor }}>{item.level}</div>}
                                                {item.information && (
                                                    <div className="text-[13.5px] leading-snug text-gray-700">
                                                        • {item.information.replace(/<[^>]*>?/gm, '')}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Certificates':
                        case 'Awards':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} type={section.type} />
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex flex-col">
                                                <div className="font-extrabold text-[14px] text-black uppercase">
                                                    {item.title || item.certificate || item.award}
                                                </div>
                                                <div className="flex justify-between items-baseline">
                                                    <div className="text-[12px] text-gray-600 italic">
                                                        {item.issuer || item.organization}
                                                    </div>
                                                    <div className="text-[12px] font-bold" style={{ color: goldColor }}>
                                                        {item.date}
                                                    </div>
                                                </div>
                                                {(item.description || item.additionalInfo || item.information) && (
                                                    <div
                                                        className="text-[13px] leading-relaxed text-gray-700 mt-1 prose prose-sm max-w-none font-sans"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Languages':
                        case 'Interests':
                        case 'Courses':
                        case 'Organisations':
                        case 'Publications':
                        case 'References':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} type={section.type} />
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="flex flex-col">
                                                <div className="font-extrabold text-[15px] text-black">
                                                    {item.language || item.interest || item.course || item.name || item.title || item.award}
                                                </div>
                                                {(item.level || item.issuer || item.organization || item.institution || item.school || item.publisher || item.jobTitle || item.date) && (
                                                    <div className="text-[13px] text-gray-600 italic">
                                                        {[item.level, item.issuer || item.organization || item.institution || item.school || item.publisher, item.jobTitle, item.date].filter(Boolean).join(' • ')}
                                                    </div>
                                                )}
                                                {(item.description || item.additionalInfo || item.information) && (
                                                    <div
                                                        className="text-[13.5px] leading-relaxed text-gray-700 mt-1"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                    />
                                                )}
                                                {(item.email || item.phone) && (
                                                    <div className="text-[11px] text-gray-500 mt-0.5">
                                                        {[item.email, item.phone].filter(Boolean).join(' • ')}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

// Internal icons to avoid import issues
const Mail = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><rect width="20" height="16" x="2" y="4" rx="2" /></svg>
);
const Phone = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const MapPin = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
export default ChloeLiangLayout;
