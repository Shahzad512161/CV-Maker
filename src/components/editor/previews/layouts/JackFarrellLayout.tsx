import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface JackFarrellLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

const JackFarrellLayout: React.FC<JackFarrellLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const SectionHeader = ({ title, index }: { title: string; index: number }) => (
        <div className="mb-8 flex items-center gap-5 border-b border-gray-100 pb-3">
            <div className="w-11 h-11 min-w-[44px] rounded-full border border-black/80 flex items-center justify-center text-center">
                <span className="text-[22px] font-sans font-light text-black/80 leading-none">
                    {index + 1}
                </span>
            </div>
            <h2 className="text-[34px] font-serif tracking-[0.08em] text-black uppercase leading-none">
                {title}
            </h2>
        </div>
    );

    const ProgressBar = ({ level }: { level?: string }) => {
        if (!level || level.toLowerCase().includes('select')) return null;

        const getDots = (lvl: string) => {
            const levelMap: Record<string, number> = {
                'novice': 1, 'beginner': 2, 'skillful': 3, 'experienced': 4, 'expert': 5,
                'a1': 1, 'a2': 2, 'b1': 3, 'b2': 4, 'c1': 5, 'c2': 5,
                'basic': 1, 'conversational': 2, 'fluent': 4, 'native': 5,
                'elementary': 2, 'intermediate': 3, 'advanced': 4
            };
            const count = levelMap[lvl.toLowerCase()] || 3;
            return count;
        };

        const filledDots = getDots(level);

        return (
            <div className="flex gap-1.5 mt-1">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-4 h-4 rounded-full border border-black ${i < filledDots ? 'bg-black' : 'bg-transparent'}`}
                    />
                ))}
            </div>
        );
    };

    const getSectionGridClass = (type: string) => {
        const sideBySideTypes = ['Skills', 'Languages', 'Interests', 'Awards'];
        return sideBySideTypes.includes(type) ? 'col-span-1' : 'col-span-2';
    };

    return (
        <div className="p-14 bg-white min-h-[1123px] selection:bg-black selection:text-white pb-32 font-serif">
            {/* Header */}
            {/* ... (header code remains same) */}
            <header className="mb-12 grid grid-cols-[1fr,200px] gap-8 items-start">
                <div>
                    {personalDetails.fullName && (
                        <h1 className="text-[64px] font-serif leading-[0.9] mb-8 text-black uppercase tracking-tight">
                            {personalDetails.fullName.split(' ').map((part, i) => (
                                <div key={i}>{part}</div>
                            ))}
                        </h1>
                    )}

                    {personalDetails.jobTitle && <div className="text-gray-800 font-bold mb-4 font-sans uppercase tracking-[0.1em] text-[15px]">{personalDetails.jobTitle}</div>}

                    <ContactInfoRenderer
                        data={data}
                        showIcons={false}
                        layout="horizontal"
                        className="grid grid-cols-2 gap-y-2 gap-x-12 text-[13px] text-gray-500 font-sans tracking-tight leading-relaxed"
                        itemClassName="flex items-center"
                        linkClassName="hover:opacity-100 break-all leading-relaxed h-auto py-0 text-gray-500 no-underline"
                        textClassName="leading-relaxed"
                    />
                </div>

                {personalDetails.photo && (
                    <div className="w-[200px] h-[240px] overflow-hidden">
                        <img
                            src={personalDetails.photo}
                            alt={personalDetails.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </header>

            {/* Sections Grid Wrapper */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-12 items-start">
                {sections
                    .filter(s => s.isVisible && (Array.isArray(s.content) ? s.content.length > 0 : s.content))
                    .map((section, idx) => {
                        const header = <SectionHeader title={section.title} index={idx} />;
                        const gridSpan = getSectionGridClass(section.type);

                        switch (section.type) {
                            case 'Profile':
                            case 'Declaration':
                                return (
                                    <div key={section.id} className={gridSpan}>
                                        {header}
                                        <div
                                            className="text-[14px] leading-relaxed text-gray-600 font-sans px-2"
                                            dangerouslySetInnerHTML={{ __html: section.content as string }}
                                        />
                                    </div>
                                );

                            case 'Skills':
                            case 'Languages':
                                return (
                                    <div key={section.id} className={gridSpan}>
                                        {header}
                                        <div className="space-y-6 px-2">
                                            {Array.isArray(section.content) && section.content.map((item) => (
                                                <div key={item.id} className="flex justify-between items-start gap-4">
                                                    <div className="flex-1">
                                                        <div className="text-[14px] font-sans text-black font-bold uppercase tracking-tight">
                                                            {item.skill || item.language || item.name}
                                                        </div>
                                                        {(item.information || item.additionalInfo || item.description) && (
                                                            <div
                                                                className="text-[13px] leading-relaxed text-gray-600 font-sans mt-1"
                                                                dangerouslySetInnerHTML={{ __html: item.information || item.additionalInfo || item.description }}
                                                            />
                                                        )}
                                                    </div>
                                                    <ProgressBar level={item.level} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                            case 'Experience':
                            case 'Education':
                            case 'Projects':
                            case 'Experience':
                            case 'Education':
                            case 'Projects':
                            case 'Courses':
                            case 'Organisations':
                                return (
                                    <div key={section.id} className={gridSpan}>
                                        {header}
                                        <div className="grid grid-cols-2 gap-x-12 gap-y-10 px-2">
                                            {Array.isArray(section.content) && section.content.map((item) => (
                                                <div key={item.id}>
                                                    <div className="font-sans">
                                                        <div className="font-bold text-black text-[14px] uppercase tracking-tight">
                                                            {item.jobTitle || item.degree || item.certificate || item.title || item.course || item.name}
                                                        </div>
                                                        <div className="text-gray-900 font-semibold text-[13px] mt-0.5">
                                                            {item.employer || item.school || item.institution || item.organization || item.subTitle || item.issuer}
                                                        </div>
                                                        {(item.startDate || item.endDate || item.date) && (
                                                            <div className="text-[12px] text-gray-400 font-medium mt-1 mb-3">
                                                                {item.startDate || item.date} {item.endDate ? `— ${item.endDate}` : (item.startDate ? '— Present' : '')}
                                                                {item.location && ` | ${item.location}`}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {(item.description || item.additionalInfo) && (
                                                        <div
                                                            className="text-[13px] leading-relaxed text-gray-600 font-sans"
                                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                            case 'References':
                                return (
                                    <div key={section.id} className={gridSpan}>
                                        {header}
                                        <div className="grid grid-cols-2 gap-12 px-2">
                                            {Array.isArray(section.content) && section.content.map((item: any) => (
                                                <div key={item.id}>
                                                    <div className="text-[14px] font-bold text-black uppercase mb-1 font-sans">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-[13px] text-gray-500 font-semibold mb-2 font-sans">
                                                        {item.jobTitle}{item.organization && ` | ${item.organization}`}
                                                    </div>
                                                    <div className="space-y-0.5 text-[12px] text-gray-400 font-medium font-sans italic">
                                                        {item.email && <div className="truncate">{item.email}</div>}
                                                        {item.phone && <div>{item.phone}</div>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                            default:
                                if (typeof section.content === 'string') {
                                    return (
                                        <div key={section.id} className={gridSpan}>
                                            {header}
                                            <div
                                                className="text-[14px] leading-relaxed text-gray-600 font-sans px-2"
                                                dangerouslySetInnerHTML={{ __html: section.content }}
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <div key={section.id} className={gridSpan}>
                                        {header}
                                        <div className={`${gridSpan === 'col-span-1' ? 'space-y-6' : 'grid grid-cols-2 gap-x-12 gap-y-6'} px-2`}>
                                            {Array.isArray(section.content) && section.content.map((item: any) => {
                                                const title = item.title || item.name || item.award || item.course || item.certificate || item.degree || item.jobTitle;
                                                const sub = item.issuer || item.organization || item.publisher || item.journal || item.level || item.subTitle || item.school || item.employer;
                                                const date = item.date || (item.startDate ? `${item.startDate}${item.endDate ? ` — ${item.endDate}` : ' — Present'}` : '');

                                                return (
                                                    <div key={item.id} className="text-[13px] font-sans">
                                                        <div className="font-bold text-black uppercase mb-1">
                                                            {title}
                                                        </div>
                                                        {(sub || date) && (
                                                            <div className="flex items-center gap-2 text-gray-400 font-medium text-[12px] mb-2 italic">
                                                                {sub}
                                                                {date && (
                                                                    <>
                                                                        <span className="text-gray-200 non-italic">|</span>
                                                                        <span className="not-italic text-gray-400 font-black text-[11px] uppercase tracking-tighter">{date}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                        {(item.description || item.additionalInfo) && (
                                                            <div
                                                                className="text-gray-500 leading-relaxed text-[12.5px]"
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
        </div>
    );
};

export default JackFarrellLayout;
