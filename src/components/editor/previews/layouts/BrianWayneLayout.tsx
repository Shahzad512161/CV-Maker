
import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import {
    User,
    Phone,
    MapPin,
    Linkedin,
    Globe,
    Briefcase,
    GraduationCap,
    Globe2,
    Award,
    Mail
} from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface BrianWayneLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const BrianWayneLayout: React.FC<BrianWayneLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Helper to check if section has content
    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    // Wavy Line Component using SVG
    const WavySeparator = () => (
        <div className="w-full h-2 my-2 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 1200 10" preserveAspectRatio="none">
                <path d="M0,5 Q5,0 10,5 T20,5 T30,5 T40,5 T50,5 T60,5 T70,5 T80,5 T90,5 T100,5 T110,5 T120,5 T130,5 T140,5 T150,5 T160,5 T170,5 T180,5 T190,5 T200,5 T210,5 T220,5 T230,5 T240,5 T250,5 T260,5 T270,5 T280,5 T290,5 T300,5 T310,5 T320,5 T330,5 T340,5 T350,5 T360,5 T370,5 T380,5 T390,5 T400,5 T410,5 T420,5 T430,5 T440,5 T450,5 T460,5 T470,5 T480,5 T490,5 T500,5 T510,5 T520,5 T530,5 T540,5 T550,5 T560,5 T570,5 T580,5 T590,5 T600,5 T610,5 T620,5 T630,5 T640,5 T650,5 T660,5 T670,5 T680,5 T690,5 T700,5 T710,5 T720,5 T730,5 T740,5 T750,5 T760,5 T770,5 T780,5 T790,5 T800,5 T810,5 T820,5 T830,5 T840,5 T850,5 T860,5 T870,5 T880,5 T890,5 T900,5 T910,5 T920,5 T930,5 T940,5 T950,5 T960,5 T970,5 T980,5 T990,5 T1000,5 T1010,5 T1020,5 T1030,5 T1040,5 T1050,5 T1060,5 T1070,5 T1080,5 T1090,5 T1100,5 T1110,5 T1120,5 T1130,5 T1140,5 T1150,5 T1160,5 T1170,5 T1180,5 T1190,5 T1200,5"
                    fill="none"
                    stroke="#E65A5D"
                    strokeWidth="2" />
            </svg>
        </div>
    );

    // Sidebar Section Header
    const SidebarSectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
        <div className="flex items-center gap-3 mb-4 mt-8 h-5">
            <Icon size={20} className="text-white flex-shrink-0" />
            <h2 className="text-white text-sm font-bold uppercase tracking-wider leading-none">{title}</h2>
        </div>
    );
    // Sidebar Section Header v2 (With wavy line)
    const SidebarSectionHeaderWavy = ({ icon: Icon, title }: { icon: any, title: string }) => (
        <div className="mb-6 mt-8">
            <div className="flex items-center gap-3 mb-1 h-5">
                <Icon size={20} className="text-white flex-shrink-0" />
                <h2 className="text-white text-sm font-bold uppercase tracking-wider leading-none">{title}</h2>
            </div>
            <WavySeparator />
        </div>
    );


    // Main Section Header
    const MainSectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
        <div className="mb-6 mt-8">
            <div className="flex items-center gap-3 mb-1 h-5">
                <Icon size={20} className="text-[#2A3B55] flex-shrink-0" />
                <h2 className="text-[#2A3B55] text-sm font-bold uppercase tracking-wider leading-none">{title}</h2>
            </div>
            <WavySeparator />
        </div>
    );

    return (
        <div className="flex min-h-[29.7cm] w-full bg-white font-sans text-[#2A3B55]">
            {/* Left Sidebar */}
            <div className="w-[38%] bg-[#2A3B55] text-white px-8 py-12 flex flex-col gap-6">

                {/* Header Info */}
                <div>
                    <h1 className="text-4xl font-bold mb-2 leading-tight">
                        {personalDetails.fullName}
                    </h1>
                    <div className="text-lg text-gray-300 font-medium">
                        {personalDetails.jobTitle}
                    </div>
                </div>

                {/* Contact Info */}
                <ContactInfoRenderer
                    data={data}
                    className="space-y-3 mt-4 text-sm font-light"
                    itemClassName="flex items-center gap-3 h-4"
                    linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none"
                    textClassName="leading-none"
                    iconSize={12}
                    renderIcon={(icon: React.ReactNode) => (
                        <div className="bg-[#E65A5D] p-1.5 rounded-sm flex items-center justify-center flex-shrink-0">
                            {icon}
                        </div>
                    )}
                />

                {/* Profile Section in Sidebar */}
                {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SidebarSectionHeaderWavy icon={User} title={section.title} />
                        {typeof section.content === 'string' && (
                            <div
                                className="text-sm font-light leading-relaxed opacity-90 text-justify"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        )}
                    </div>
                ))}

                {/* Education Section in Sidebar */}
                {sections.filter(s => s.type === 'Education').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SidebarSectionHeaderWavy icon={GraduationCap} title={section.title} />
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="font-bold text-white text-[15px] leading-tight mb-1">
                                        {item.degree}
                                    </div>
                                    <div className="text-sm text-gray-300 mb-1">
                                        {item.school}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                        {item.location && ` | ${item.location}`}
                                    </div>
                                    {item.description && (
                                        <div
                                            className="text-sm text-gray-300 mt-2 leading-relaxed opacity-90 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Languages Section in Sidebar */}
                {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SidebarSectionHeaderWavy icon={Globe2} title={section.title} />
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="flex flex-col">
                                    <div className="flex justify-between items-center text-sm mb-1">
                                        <span className="font-medium">{item.language}</span>
                                        <div className="flex gap-1.5">
                                            {/* Reference image shows 5 dots */}
                                            {[1, 2, 3, 4, 5].map((dot) => {
                                                // Simple heuristic mapping text levels to 1-5
                                                let level = 3;
                                                const lowerLevel = (item.level || '').toLowerCase();
                                                if (lowerLevel.includes('native') || lowerLevel.includes('fluent') || lowerLevel.includes('5')) level = 5;
                                                else if (lowerLevel.includes('advanced') || lowerLevel.includes('4')) level = 4;
                                                else if (lowerLevel.includes('intermediate') || lowerLevel.includes('3')) level = 3;
                                                else if (lowerLevel.includes('beginner') || lowerLevel.includes('basic') || lowerLevel.includes('2')) level = 2;
                                                else if (lowerLevel.includes('1')) level = 1;

                                                return (
                                                    <div
                                                        key={dot}
                                                        className={`w-2.5 h-2.5 rounded-full ${dot <= level ? 'bg-[#E65A5D]' : 'bg-[#405470]'}`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {(item.description || item.additionalInfo || item.information) && (
                                        <div
                                            className="text-sm text-gray-300 leading-relaxed opacity-90 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            {/* Right Main Content */}
            <div className="w-[62%] bg-[#FDFBF7] px-10 py-12 relative">

                {/* Professional Experience (and other main sections) */}
                {sections.filter(s => !['Profile', 'Education', 'Languages', 'Skills', 'Reference', 'Awards'].includes(s.type)).map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader icon={Briefcase} title={section.title} />

                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="flex flex-col mb-1">
                                        <div className="text-[15px] font-bold text-[#2A3B55] uppercase">
                                            {item.employer || item.title || item.name || item.project}
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">
                                            {[item.jobTitle, item.organization, item.role, item.publisher].filter(Boolean).join(' - ')}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 mb-2 font-medium">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                        {item.location && ` | ${item.location}`}
                                    </div>

                                    {(item.description || item.information || item.additionalInfo) && (
                                        <div
                                            className="text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Skills Section */}
                {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader icon={Briefcase} title={section.title} />
                        <div className="flex flex-col gap-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="break-inside-avoid">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="bg-[#E65A5D] text-white px-3 py-1.5 rounded-sm text-sm font-medium shadow-sm inline-block">
                                            {item.skill}
                                            {item.level && <span className="opacity-80 text-xs ml-2 font-light">| {item.level}</span>}
                                        </div>
                                    </div>

                                    {item.information && (
                                        <div
                                            className="text-sm text-gray-700 leading-relaxed text-justify mt-1"
                                            dangerouslySetInnerHTML={{ __html: item.information }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Awards Section */}
                {sections.filter(s => s.type === 'Awards').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader icon={Award} title={section.title} />
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="text-[15px] font-bold text-[#2A3B55]">
                                        {item.title || item.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {[item.issuer, item.date].filter(Boolean).join(', ')}
                                    </div>
                                    {item.description && (
                                        <div
                                            className="text-sm text-gray-500 mt-1"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};
