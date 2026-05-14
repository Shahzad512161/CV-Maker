import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import {
    MapPin,
    Phone,
    Mail,
    Linkedin,
    Globe,
    Briefcase,
    GraduationCap,
    Award,
    BookOpen,
    Calendar,
    Flag
} from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';



interface LaraMillerLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const LaraMillerLayout: React.FC<LaraMillerLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };


    // Sidebar Section Header
    const SidebarSectionHeader = ({ title }: { title: string }) => (
        <div className="mb-4 mt-8">
            <h2 className="text-white text-lg font-bold uppercase tracking-wider border-b border-white/20 pb-2">{title}</h2>
        </div>
    );

    // Main Section Header
    const MainSectionHeader = ({ title }: { title: string }) => (
        <div className="mb-6 mt-8">
            <h2 className="text-[#333333] text-lg font-bold uppercase tracking-wider border-b border-gray-300 pb-2">{title}</h2>
        </div>
    );

    // 5-dot renderer for Sidebar (White dots)
    const SidebarDots = ({ level }: { level: string }) => {
        const numericLevel = () => {
            const lowerLevel = (level || '').toLowerCase();
            if (lowerLevel.includes('native') || lowerLevel.includes('fluent') || lowerLevel.includes('bilingual') || lowerLevel.includes('mother') || lowerLevel.includes('expert') || lowerLevel.includes('5') || lowerLevel.includes('c2')) return 5;
            if (lowerLevel.includes('advanced') || lowerLevel.includes('proficient') || lowerLevel.includes('experienced') || lowerLevel.includes('professional') || lowerLevel.includes('4') || lowerLevel.includes('c1')) return 4;
            if (lowerLevel.includes('intermediate') || lowerLevel.includes('conversational') || lowerLevel.includes('competent') || lowerLevel.includes('working') || lowerLevel.includes('3') || lowerLevel.includes('b2') || lowerLevel.includes('b1')) return 3;
            if (lowerLevel.includes('beginner') || lowerLevel.includes('basic') || lowerLevel.includes('elementary') || lowerLevel.includes('limited') || lowerLevel.includes('entry') || lowerLevel.includes('novice') || lowerLevel.includes('2') || lowerLevel.includes('a2') || lowerLevel.includes('a1')) return 2;
            return 1;
        };

        const score = numericLevel();

        return (
            <div className="flex gap-1.5 mt-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                        key={dot}
                        className={`w-2.5 h-2.5 rounded-full ${dot <= score ? 'bg-white' : 'bg-white/30'}`}
                    />
                ))}
            </div>
        );
    };

    // 5-dot renderer for Main Content (Dark/Purple dots)
    const MainDots = ({ level }: { level: string }) => {
        const numericLevel = () => {
            const lowerLevel = (level || '').toLowerCase();
            if (lowerLevel.includes('native') || lowerLevel.includes('fluent') || lowerLevel.includes('bilingual') || lowerLevel.includes('mother') || lowerLevel.includes('expert') || lowerLevel.includes('5') || lowerLevel.includes('c2')) return 5;
            if (lowerLevel.includes('advanced') || lowerLevel.includes('proficient') || lowerLevel.includes('experienced') || lowerLevel.includes('professional') || lowerLevel.includes('4') || lowerLevel.includes('c1')) return 4;
            if (lowerLevel.includes('intermediate') || lowerLevel.includes('conversational') || lowerLevel.includes('competent') || lowerLevel.includes('working') || lowerLevel.includes('3') || lowerLevel.includes('b2') || lowerLevel.includes('b1')) return 3;
            if (lowerLevel.includes('beginner') || lowerLevel.includes('basic') || lowerLevel.includes('elementary') || lowerLevel.includes('limited') || lowerLevel.includes('entry') || lowerLevel.includes('novice') || lowerLevel.includes('2') || lowerLevel.includes('a2') || lowerLevel.includes('a1')) return 2;
            return 1;
        };

        const score = numericLevel();

        return (
            <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                        key={dot}
                        className={`w-2.5 h-2.5 rounded-full ${dot <= score ? 'bg-[#333333]' : 'bg-[#E5E5E5]'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex min-h-[29.7cm] w-full bg-white font-sans text-[#333333]">
            {/* Left Sidebar - Purple */}
            <div className="w-[35%] bg-[#683D56] text-white px-8 py-10 flex flex-col gap-6">

                {/* Photo & Name */}
                <div className="flex flex-col gap-4">
                    {/* Name - Large Sans Serif */}
                    <div>
                        <h1 className="text-3xl font-bold leading-tight mb-1">
                            {personalDetails.fullName}
                        </h1>
                        <p className="text-lg text-white/90 font-medium">
                            {personalDetails.jobTitle}
                        </p>
                    </div>

                    {personalDetails.photo && (
                        <div className="w-32 h-32 overflow-hidden mb-2 rounded-sm bg-white/10 shrink-0">
                            <img
                                src={personalDetails.photo}
                                alt={personalDetails.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <ContactInfoRenderer
                    data={data}
                    className="space-y-3 mt-2 text-sm font-light text-white/90"
                    itemClassName="flex items-center gap-3 h-4"
                    linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none text-white/90 no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={14}
                    iconStyle={{ color: 'white' }}
                />

                {/* Profile Section */}
                {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SidebarSectionHeader title={section.title} />
                        <div
                            className="text-sm font-light leading-relaxed text-white/90 text-justify"
                            dangerouslySetInnerHTML={{ __html: section.content as string }}
                        />
                    </div>
                ))}

                {/* Languages Section */}
                {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                    <div key={section.id}>
                        <SidebarSectionHeader title="LANGUAGES" />
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-medium">{item.language}</div>
                                        {item.level && <SidebarDots level={item.level} />}
                                    </div>
                                    {item.information && (
                                        <div
                                            className="text-sm text-white/80 mt-1 [&_p]:mb-1"
                                            dangerouslySetInnerHTML={{ __html: item.information }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            {/* Right Main Content - White */}
            <div className="w-[65%] bg-white px-10 py-10 relative">

                {/* Experience */}
                {sections.filter(s => s.type === 'Experience').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader title={section.title} />
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="flex flex-col mb-1">
                                        <div className="font-bold text-[#333333] text-[15px]">
                                            {item.employer} {item.location && <span className="font-normal text-gray-600">| {item.location}</span>}
                                            {item.jobTitle && <span className="font-normal text-gray-600">, {item.jobTitle}</span>}
                                        </div>
                                        <div className="text-sm text-gray-500 italic mb-2">
                                            {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                        </div>
                                    </div>

                                    {(item.description) && (
                                        <div
                                            className="text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Education */}
                {sections.filter(s => s.type === 'Education').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader title={section.title} />
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="font-bold text-[#333333] text-[15px]">
                                        {item.degree}
                                    </div>
                                    <div className="text-sm text-[#333333] font-medium mb-1">
                                        {item.school} {item.location && <span className="font-normal text-gray-600">| {item.location}</span>}
                                    </div>
                                    <div className="text-sm text-gray-500 italic mb-2">
                                        {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                    </div>
                                    {(item.description) && (
                                        <div
                                            className="text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Tools / Skills (Custom Render) */}
                {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader title={section.title} />
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="flex justify-between items-start break-inside-avoid">
                                    <div className="flex flex-col">
                                        <div className="font-bold text-[#333333] text-sm">{item.skill}</div>
                                        {item.information && (
                                            <div
                                                className="text-[15px] text-gray-700 leading-relaxed mt-1 [&_p]:mb-1 [&_blockquote]:pl-3 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:italic"
                                                dangerouslySetInnerHTML={{ __html: item.information }}
                                            />
                                        )}
                                    </div>
                                    {item.level && (
                                        <div className="mt-1.5">
                                            <MainDots level={item.level} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Default for other sections (Awards, etc) */}
                {sections.filter(s => !['Profile', 'Education', 'Languages', 'Skills', 'Experience'].includes(s.type)).map(section => hasContent(section) && (
                    <div key={section.id} className="mb-8">
                        <MainSectionHeader title={section.title} />
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="font-bold text-[#333333] text-[15px]">
                                        {item.title || item.name || item.project || item.certificate}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-1">
                                        {[
                                            item.jobTitle,
                                            item.organization,
                                            item.subTitle,
                                            item.publisher,
                                            item.date,
                                            item.email,
                                            item.phone,
                                            item.location,
                                            [item.startDate, item.endDate].filter(Boolean).join(' – ')
                                        ].filter(Boolean).join(' | ')}
                                    </div>
                                    {(item.description || item.additionalInfo) && (
                                        <div
                                            className="text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1 text-justify"
                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div >
    );
};
