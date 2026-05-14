import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface VinceMurrayLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

const VinceMurrayLayout: React.FC<VinceMurrayLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const SegmentedBar = ({ level }: { level?: string }) => {
        if (!level || level.toLowerCase().includes('select')) return null;

        const getSegments = (lvl: string) => {
            const levelMap: Record<string, number> = {
                'novice': 1, 'beginner': 2, 'skillful': 3, 'experienced': 4, 'expert': 5,
                'a1': 1, 'a2': 2, 'b1': 3, 'b2': 4, 'c1': 5, 'c2': 5,
                'basic': 1, 'conversational': 2, 'fluent': 4, 'native': 5,
                'elementary': 2, 'intermediate': 3, 'advanced': 4
            };
            return levelMap[lvl.toLowerCase()] || 3;
        };

        const filledSegments = getSegments(level);

        return (
            <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 w-6 rounded-sm ${i < filledSegments ? 'bg-red-700' : 'bg-gray-200'}`}
                    />
                ))}
            </div>
        );
    };

    const mainSections = sections.filter(s =>
        ['Profile', 'Experience', 'Education', 'Projects', 'Declaration'].includes(s.type) ||
        !['Skills', 'Languages', 'Interests'].includes(s.type)
    );

    const sidebarSections = sections.filter(s =>
        ['Skills', 'Languages', 'Interests'].includes(s.type)
    );

    return (
        <div className="bg-white min-h-[1123px] selection:bg-red-700 selection:text-white pb-20 font-sans text-[#333]">
            {/* Red Header */}
            <header className="bg-[#b91c1c] p-10 pb-14 text-white">
                <div className="flex items-center gap-10 max-w-6xl mx-auto px-4">
                    {personalDetails.photo && (
                        <div className="w-28 h-28 rounded-full border-[3px] border-white/40 overflow-hidden shrink-0 shadow-lg">
                            <img
                                src={personalDetails.photo}
                                alt={personalDetails.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div>
                        <h1 className="text-[56px] font-bold italic tracking-tighter leading-none mb-2 drop-shadow-sm">
                            {personalDetails.fullName}
                        </h1>
                        <p className="text-[13px] uppercase tracking-[0.25em] font-semibold opacity-90">
                            {personalDetails.jobTitle}
                        </p>
                    </div>
                </div>
            </header>

            {/* Contact Info Bar */}
            <div className="bg-white border-b border-gray-100 py-4 px-12 shadow-sm">
                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    className="flex flex-wrap justify-start gap-x-12 gap-y-2 text-[12.5px] text-gray-700 font-medium max-w-6xl mx-auto"
                    itemClassName="flex items-center gap-2 h-4"
                    linkClassName="hover:text-[#b91c1c] transition-colors leading-none text-gray-700 no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none"
                    iconSize={16}
                    iconStyle={{ color: '#b91c1c' }}
                />
            </div>

            {/* Main Content */}
            <div className="p-12 max-w-6xl mx-auto grid grid-cols-[1fr,280px] gap-16">
                {/* Left Column */}
                <div className="space-y-12">
                    {mainSections
                        .filter(s => s.isVisible && (Array.isArray(s.content) ? s.content.length > 0 : s.content))
                        .map((section) => (
                            <section key={section.id}>
                                <h2 className="text-[22px] font-bold text-gray-900 mb-6 uppercase tracking-tight">
                                    {section.title}
                                </h2>

                                {section.type === 'Profile' || section.type === 'Declaration' || typeof section.content === 'string' ? (
                                    <div
                                        className="text-[14.5px] leading-relaxed text-gray-600 list-inside"
                                        dangerouslySetInnerHTML={{ __html: section.content as string }}
                                    />
                                ) : section.type === 'References' ? (
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                        {(section.content as any[]).map((item) => (
                                            <div key={item.id} className="space-y-1">
                                                <h3 className="text-[16px] font-bold text-gray-800 uppercase tracking-tight">
                                                    {item.name}
                                                </h3>
                                                <div className="text-[14px] text-gray-700 font-semibold italic">
                                                    {item.jobTitle}{item.organization && ` , ${item.organization}`}
                                                </div>
                                                <div className="text-[13px] text-gray-400 space-y-0.5 font-medium">
                                                    {item.email && <div className="truncate">{item.email}</div>}
                                                    {item.phone && <div>{item.phone}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {(section.content as any[]).map((item) => (
                                            <div key={item.id}>
                                                <div className="flex justify-between items-baseline mb-2">
                                                    <h3 className="text-[16px] font-bold text-gray-800">
                                                        {item.jobTitle || item.degree || item.certificate || item.title || item.course || item.name}
                                                        <span className="font-normal text-gray-500">
                                                            {(item.employer || item.school || item.institution || item.organization || item.issuer || item.subTitle || item.publisher) && ` , ${item.employer || item.school || item.institution || item.organization || item.issuer || item.subTitle || item.publisher}`}
                                                            {item.location && ` , ${item.location}`}
                                                        </span>
                                                    </h3>
                                                    {(item.startDate || item.endDate || item.date) && (
                                                        <span className="text-[12px] text-gray-400 font-medium">
                                                            {item.startDate || item.date} {item.endDate ? `— ${item.endDate}` : (item.startDate ? '— Present' : '')}
                                                        </span>
                                                    )}
                                                </div>
                                                {(item.description || item.additionalInfo) && (
                                                    <div
                                                        className="text-[14px] leading-relaxed text-gray-600 prose prose-sm max-w-none 
                                                    [&>ul]:list-disc [&>ul]:ml-5 [&>ul]:mt-3 [&>li]:mt-1.5"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        ))}
                </div>

                {/* Right Column (Skills column) */}
                <div className="space-y-12">
                    {sidebarSections
                        .filter(s => s.isVisible && Array.isArray(s.content) && s.content.length > 0)
                        .map((section) => (
                            <section key={section.id}>
                                <h2 className="text-[20px] font-bold text-gray-900 mb-6 uppercase tracking-tight">
                                    {section.title}
                                </h2>
                                <div className="space-y-6">
                                    {(section.content as any[]).map((item) => (
                                        <div key={item.id}>
                                            <div className="text-[14px] font-semibold text-gray-800 mb-2">
                                                {item.skill || item.language || item.name}
                                            </div>
                                            <SegmentedBar level={item.level} />
                                            {(item.information || item.additionalInfo || item.description) && (
                                                <div
                                                    className="text-[11px] text-gray-500 mt-2 leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: item.information || item.additionalInfo || item.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default VinceMurrayLayout;
