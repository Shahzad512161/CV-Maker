import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-7">
        <h2 className="text-[22px] font-bold tracking-[0.2em] text-black uppercase mb-2">
            {title}
        </h2>
        <div className="w-10 h-[3px] bg-black" />
    </div>
);

const ProgressBar = ({ level }: { level?: string }) => {
    const getWidth = (lvl?: string) => {
        const l = lvl?.toLowerCase() || '';
        if (l === '' || l.includes('select')) return '0%';

        // Skill levels
        if (l.includes('novice')) return '20%';
        if (l.includes('beginner')) return '40%';
        if (l.includes('skillful')) return '60%';
        if (l.includes('experienced')) return '85%';
        if (l.includes('expert')) return '100%';

        // Language levels
        if (l.includes('basic') || l === 'a1') return '20%';
        if (l === 'a2') return '40%';
        if (l.includes('conversational') || l === 'b1') return '60%';
        if (l === 'b2') return '75%';
        if (l.includes('fluent') || l === 'c1') return '90%';
        if (l.includes('native') || l === 'c2') return '100%';

        return l ? '50%' : '0%';
    };

    const width = getWidth(level);
    if (width === '0%') return null;

    return (
        <div className="w-full h-[4px] bg-gray-100 mt-2">
            <div
                className="h-full bg-black transition-all duration-700"
                style={{ width }}
            />
        </div>
    );
};

export const TaylorCookLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const renderLeftColumn = () => {
        const hasSocials = personalDetails.socials && personalDetails.socials.length > 0;
        const hasDetails = personalDetails.location || personalDetails.phone || personalDetails.email || personalDetails.nationality || personalDetails.dob || hasSocials;

        return (
            <div className="space-y-12">
                {/* Details Section */}
                <SectionHeader title="Details" />
                <ContactInfoRenderer
                    data={data}
                    showIcons={false}
                    layout="vertical"
                    className="space-y-5"
                    renderItem={(item) => (
                        <div>
                            <div className="text-[11.5px] font-[900] uppercase tracking-wider text-black mb-0.5">{item.label}</div>
                            {item.isUrl ? (
                                <a href={item.value} target="_blank" rel="noreferrer" className="text-[13px] text-gray-500 leading-relaxed font-sans block truncate hover:underline no-underline">
                                    {item.value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')}
                                </a>
                            ) : (
                                <div className="text-[13px] text-gray-500 leading-relaxed font-sans">
                                    {item.value}
                                </div>
                            )}
                        </div>
                    )}
                />

                {/* Skills/Languages with Progress Bars */}
                {sections.filter(s => ['Skills', 'Languages'].includes(s.type) && s.isVisible && (s.content as any[]).length > 0).map(section => (
                    <div key={section.id}>
                        <SectionHeader title={section.title} />
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="text-[13.5px] text-black font-bold font-sans">
                                        {item.skill || item.language || item.name}
                                    </div>
                                    <ProgressBar level={item.level} />
                                    {(item.information || item.additionalInfo) && (
                                        <div
                                            className="text-[12px] text-gray-500 mt-2 leading-relaxed font-sans prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: item.information || item.additionalInfo }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderRightColumn = () => {
        return (
            <div className="space-y-12">
                {sections.filter(s => !['Skills', 'Languages'].includes(s.type) && s.isVisible && (typeof s.content === 'string' ? s.content.trim() !== '' : (s.content as any[]).length > 0)).map(section => {
                    switch (section.type) {
                        case 'Profile':
                        case 'Declaration':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} />
                                    <div
                                        className="text-[13px] leading-6 text-gray-600 font-sans text-justify"
                                        dangerouslySetInnerHTML={{ __html: section.content as string }}
                                    />
                                </div>
                            );

                        case 'Experience':
                        case 'Education':
                        case 'Projects':
                        case 'Courses':
                        case 'Organisations':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} />
                                    <div className="space-y-10">
                                        {(section.content as any[]).map((item: any) => {
                                            const title = item.jobTitle || item.degree || item.title || item.name;
                                            const sub = item.employer || item.school || item.institution || item.subTitle || item.organization;

                                            return (
                                                <div key={item.id}>
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <h3 className="text-[14px] font-[900] text-black leading-tight uppercase">
                                                            {title}{sub && `, ${sub}`}
                                                        </h3>
                                                        {item.location && (
                                                            <span className="text-[11.5px] text-gray-400 font-black shrink-0 ml-4 uppercase tracking-tighter">
                                                                {item.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {(item.startDate || item.endDate) && (
                                                        <div className="text-[12px] text-gray-400 font-bold mb-3 font-sans">
                                                            {item.startDate} {item.startDate && (item.endDate || 'Present') && '—'} {item.endDate || (item.startDate ? 'Present' : '')}
                                                        </div>
                                                    )}
                                                    {item.description && (
                                                        <div
                                                            className="text-[13px] leading-6 text-gray-500 font-sans"
                                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );

                        case 'References':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} />
                                    <div className="grid grid-cols-2 gap-8">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="text-[13.5px] font-[900] text-black uppercase mb-1">
                                                    {item.name}
                                                </div>
                                                <div className="text-[12px] text-gray-500 font-bold mb-2 font-sans">
                                                    {item.jobTitle}{item.organization && ` | ${item.organization}`}
                                                </div>
                                                <div className="space-y-0.5 text-[12px] text-gray-400 font-medium font-sans">
                                                    {item.email && <div className="truncate">{item.email}</div>}
                                                    {item.phone && <div>{item.phone}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        default:
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} />
                                    <div className="space-y-7">
                                        {(section.content as any[] || []).map((item: any) => {
                                            const sub = item.issuer || item.organization || item.publisher || item.journal || item.level || item.subTitle;
                                            const date = item.date || (item.startDate ? `${item.startDate}${item.endDate ? ` — ${item.endDate}` : ' — Present'}` : '');

                                            return (
                                                <div key={item.id} className="text-[13px]">
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <div className="font-[900] text-black uppercase">
                                                            {item.title || item.name || item.award || item.course || item.certificate}{sub && `, ${sub}`}
                                                        </div>
                                                        {item.location && (
                                                            <span className="text-[11px] text-gray-400 font-black uppercase tracking-tighter">
                                                                {item.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {(sub || date) && (
                                                        <div className="flex items-center gap-2 text-gray-400 italic mb-2 font-bold text-[12px] font-sans">
                                                            {sub}
                                                            {date && (
                                                                <>
                                                                    <span className="text-gray-200 non-italic">|</span>
                                                                    <span className="not-italic text-gray-400 font-black text-[11px] font-sans">{date}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                    {(item.description || item.additionalInfo) && (
                                                        <div
                                                            className="text-gray-500 leading-relaxed text-[12.5px] font-sans"
                                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                    }
                })}
            </div>
        );
    };

    return (
        <div className="p-16 bg-white min-h-[1123px] font-sans selection:bg-black selection:text-white pb-32">
            {/* Header - No Sidebar Background, Clean White */}
            {(personalDetails.fullName || personalDetails.jobTitle) && (
                <header className="mb-14">
                    {personalDetails.fullName && (
                        <h1 className="text-[60px] font-bold text-[#1a1a1a] leading-[1.1] mb-4 uppercase tracking-tight flex flex-col whitespace-pre-line">
                            {personalDetails.fullName.split(' ').map((part, i) => (
                                <span key={i}>{part}</span>
                            ))}
                        </h1>
                    )}
                    {personalDetails.jobTitle && (
                        <div className="text-[15px] text-gray-400 font-medium uppercase tracking-[0.05em] mb-4 font-sans leading-none">
                            {personalDetails.jobTitle}
                        </div>
                    )}
                    {/* Horizontal Line separating Header from Content */}
                    <div className="h-[0.5px] w-full bg-gray-200 mt-14" />
                </header>
            )}

            {/* Content Layout - Multi-column, White Background */}
            <div className="grid grid-cols-[1fr,1.8fr] gap-16 relative min-h-[800px]">
                {/* Vertical Divider Line - Perfectly positioned in the gap */}
                <div className="absolute top-0 bottom-0 left-[35.7%] w-[0.5px] bg-gray-200 -ml-[1px]" />

                {/* Column 1 (Details, Skills, etc) */}
                <div className="pr-4 z-10">
                    {renderLeftColumn()}
                </div>

                {/* Column 2 (Profile, Experience, etc) */}
                <div className="z-10">
                    {renderRightColumn()}
                </div>
            </div>
        </div>
    );
};

export default TaylorCookLayout;
