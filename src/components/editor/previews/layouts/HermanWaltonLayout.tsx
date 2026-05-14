import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface HermanWaltonLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

const HermanWaltonLayout: React.FC<HermanWaltonLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const primaryColor = theme.primary || '#2563eb';

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="mb-4">
            <div className="h-[2px] w-full" style={{ backgroundColor: primaryColor }} />
            <h2 className="text-[16px] font-black uppercase my-1" style={{ color: primaryColor, letterSpacing: '0.05em' }}>
                {title}
            </h2>
            <div className="h-[2px] w-full" style={{ backgroundColor: primaryColor }} />
        </div>
    );

    return (
        <div className="p-12 bg-white min-h-full font-sans text-black">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-10">
                <div className="flex-1">
                    <h1 className="text-[36px] font-black uppercase leading-tight mb-2" style={{ color: primaryColor }}>
                        {personalDetails.fullName}
                    </h1>
                    <h2 className="text-[20px] font-black uppercase text-black mb-4">
                        {personalDetails.jobTitle}
                    </h2>
                    <ContactInfoRenderer
                        data={data}
                        showIcons={false}
                        layout="horizontal"
                        className="text-[13px] text-gray-600 flex flex-wrap gap-x-3 gap-y-1"
                        itemClassName="flex items-center gap-3 h-4"
                        linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none text-gray-600 no-underline"
                        textClassName="[overflow-wrap:anywhere] leading-none"
                        renderSeparator={() => <span className="text-gray-400 leading-none">|</span>}
                    />
                </div>
                {personalDetails.photo && (
                    <div className="ml-8">
                        <div className="w-32 h-40 border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                            <img
                                src={personalDetails.photo}
                                alt={personalDetails.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-8">
                {sections.map((section: any) => {
                    if (!section.content || (Array.isArray(section.content) && section.content.length === 0)) return null;

                    switch (section.type) {
                        case 'Profile':
                        case 'Declaration':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} />
                                    <div
                                        className="text-[14px] leading-relaxed text-gray-700 font-sans"
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
                                    <SectionHeader title={section.title} />
                                    <div className="space-y-6">
                                        {(section.content as any[]).map((item) => (
                                            <div key={item.id}>
                                                <div className="flex justify-between items-baseline mb-2">
                                                    <div className="text-[15px]">
                                                        <span className="font-extrabold text-black uppercase mr-2">
                                                            {item.jobTitle || item.degree || item.title}
                                                        </span>
                                                        <span className="text-gray-600 italic">
                                                            , {item.employer || item.organization || item.school || item.institution || item.subTitle}
                                                            {item.location && ` | ${item.location}`}
                                                        </span>
                                                    </div>
                                                    <div className="text-[13px] font-extrabold text-black">
                                                        {item.startDate} {item.endDate ? `— ${item.endDate}` : item.date ? item.date : ''}
                                                    </div>
                                                </div>
                                                {item.description && (
                                                    <div
                                                        className="text-[14px] leading-relaxed text-gray-700 prose prose-sm max-w-none ml-4 list-outside"
                                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Skills':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} />
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <span className="font-extrabold text-[14px] text-black uppercase">
                                                        {item.skill || item.name}
                                                    </span>
                                                    {item.level && (
                                                        <span className="text-[12px] text-gray-500 italic">
                                                            {item.level}
                                                        </span>
                                                    )}
                                                </div>
                                                {(item.information || item.description) && (
                                                    <div
                                                        className="text-[13px] text-gray-600 leading-relaxed font-sans"
                                                        dangerouslySetInnerHTML={{ __html: item.information || item.description }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'Certificates':
                        case 'Awards':
                        case 'Languages':
                        case 'Interests':
                        case 'Publications':
                        case 'Courses':
                        case 'Organisations':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} />
                                    <div className="space-y-3">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="text-[14px] leading-relaxed text-gray-700">
                                                <div className="flex items-baseline">
                                                    <span className="font-extrabold mr-2">
                                                        {(item.certificate || item.language || item.title || item.name || item.award || item.course || item.organisation)}:
                                                    </span>
                                                    <span>{item.level || item.issuer || item.organization || item.date}</span>
                                                </div>
                                                {(item.description || item.additionalInfo || item.information) && (
                                                    <div
                                                        className="text-[13.5px] text-gray-600 mt-1 ml-4 list-outside"
                                                        dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );

                        case 'References':
                            return (
                                <div key={section.id}>
                                    <SectionHeader title={section.title} />
                                    <div className="grid grid-cols-2 gap-8">
                                        {(section.content as any[]).map((item: any) => (
                                            <div key={item.id} className="text-[14px]">
                                                <div className="font-extrabold text-black uppercase mb-1">{item.name}</div>
                                                {item.jobTitle && <div className="text-black font-semibold text-[13px] mb-0.5">{item.jobTitle}</div>}
                                                <div className="text-gray-600 italic mb-1">{item.organization}</div>
                                                <div className="text-gray-500">
                                                    {item.email} {item.phone && `| ${item.phone}`}
                                                </div>
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

export default HermanWaltonLayout;
