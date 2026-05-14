import React from 'react';
import { ResumeContent, TemplateTheme } from '../../../../types/resume';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface KaneJonesLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

const KaneJonesLayout: React.FC<KaneJonesLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    return (
        <div className="w-full bg-white min-h-[1123px] font-sans text-gray-800 p-0 flex flex-col">
            {/* Header with light purple/pink background */}
            <header className="bg-[#ead4f0] p-10 py-10 rounded-[15px] flex justify-between items-center mx-6 mt-6 shadow-sm border border-black/5">
                <div className="flex-1">
                    <h1 className="text-[40px] font-bold tracking-tight text-[#3b2a5c]">
                        {personalDetails.fullName}
                    </h1>
                </div>
                <ContactInfoRenderer
                    data={data}
                    showIcons={false}
                    layout="horizontal"
                    className="text-right space-y-0.5 text-[12.5px] text-[#3b2a5c] font-bold"
                    itemClassName="flex items-center justify-end gap-1.5 opacity-90 leading-tight"
                    linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none text-[#3b2a5c] no-underline"
                    textClassName="[overflow-wrap:anywhere] leading-none text-[#3b2a5c]"
                    renderSeparator={() => (
                        <span className="text-[#3b2a5c]/40 font-black text-sm leading-none">•</span>
                    )}
                />
            </header>

            <div className="px-14 py-10 space-y-12">
                {/* Job Title / Summary */}
                <div className="space-y-4">
                    <h2 className="text-[18px] font-bold text-gray-800 tracking-wide">
                        {personalDetails.jobTitle}
                    </h2>
                    {sections.find(s => s.type === 'Profile')?.content && (
                        <div
                            className="text-[14px] leading-relaxed text-gray-600 font-medium"
                            dangerouslySetInnerHTML={{ __html: sections.find(s => s.type === 'Profile')?.content as string }}
                        />
                    )}
                </div>

                {/* Main Sections */}
                {sections
                    .filter(s => s.isVisible && s.type !== 'Profile' && (Array.isArray(s.content) ? s.content.length > 0 : s.content))
                    .map((section) => (
                        <section key={section.id} className="space-y-6">
                            <h3 className="text-[36px] font-medium text-gray-400 tracking-tight leading-none">
                                {section.title}
                            </h3>

                            <div className="space-y-8">
                                {Array.isArray(section.content) ? (
                                    section.content.map((item: any) => (
                                        <div key={item.id} className="space-y-2">
                                            {section.type === 'Experience' ? (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-baseline">
                                                        <div className="text-[14.5px] font-bold text-gray-400">
                                                            <span className="text-gray-500">{item.jobTitle}</span> at {item.employer}, {item.location}
                                                        </div>
                                                        <div className="text-[14px] text-gray-400 font-medium">
                                                            {item.startDate} — {item.endDate || 'Present'}
                                                        </div>
                                                    </div>
                                                    {item.description && (
                                                        <div
                                                            className="text-[14px] leading-relaxed text-gray-600 font-medium prose prose-sm max-w-none
                                                            [&>ul]:list-none [&>ul]:space-y-2.5 
                                                            [&>ul>li]:relative [&>ul>li]:pl-4 
                                                            [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-gray-400"
                                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                                        />
                                                    )}
                                                </div>
                                            ) : section.type === 'Education' ? (
                                                <div className="space-y-1.5 text-[14.5px]">
                                                    <div className="text-gray-400 font-bold">
                                                        <span className="text-gray-500">{item.degree}</span>, {item.startDate} — {item.endDate}
                                                    </div>
                                                    <div className="text-gray-800 font-bold">
                                                        {item.school}, {item.location}
                                                    </div>
                                                    {item.description && (
                                                        <div
                                                            className="text-[14px] leading-relaxed text-gray-600 font-medium prose prose-sm max-w-none 
                                                            [&>ul]:list-none [&>ul]:space-y-1 
                                                            [&>ul>li]:relative [&>ul>li]:pl-4 
                                                            [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-gray-400"
                                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                                        />
                                                    )}
                                                </div>
                                            ) : section.type === 'Skills' ? (
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-baseline">
                                                        <div className="text-[14.5px] font-bold text-gray-800">
                                                            {item.skill}
                                                        </div>
                                                        {item.level && (
                                                            <div className="text-[13px] text-gray-400 font-bold uppercase tracking-wider">
                                                                {item.level}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {(item.information || item.description || item.additionalInfo) && (
                                                        <div
                                                            className="text-[14px] leading-relaxed text-gray-600 font-medium prose prose-sm max-w-none 
                                                            [&>ul]:list-none [&>ul]:space-y-1 
                                                            [&>ul>li]:relative [&>ul>li]:pl-4 
                                                            [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-gray-400"
                                                            dangerouslySetInnerHTML={{ __html: item.information || item.description || item.additionalInfo }}
                                                        />
                                                    )}
                                                </div>
                                            ) : section.type === 'Languages' ? (
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-baseline py-0.5">
                                                        <div className="text-[14.5px] font-bold text-gray-800">
                                                            {item.language}
                                                        </div>
                                                        {item.level && (
                                                            <div className="text-[13px] text-gray-400 font-bold uppercase tracking-wider">
                                                                {item.level}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {(item.information || item.description || item.additionalInfo) && (
                                                        <div
                                                            className="text-[14px] leading-relaxed text-gray-600 font-medium prose prose-sm max-w-none 
                                                            [&>ul]:list-none [&>ul]:space-y-1 
                                                            [&>ul>li]:relative [&>ul>li]:pl-4 
                                                            [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-gray-400"
                                                            dangerouslySetInnerHTML={{ __html: item.information || item.description || item.additionalInfo }}
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-baseline">
                                                        <div className="text-[14.5px] font-bold text-gray-800">
                                                            {item.title || item.name || item.award || item.course || item.institution || item.certificate}
                                                            {item.jobTitle && <span className="text-gray-400 font-medium ml-1">, {item.jobTitle}</span>}
                                                            {item.subTitle && <span className="text-gray-400 font-medium ml-1">| {item.subTitle}</span>}
                                                            {item.publisher && <span className="text-gray-400 font-medium ml-1">, {item.publisher}</span>}
                                                            {item.issuer && <span className="text-gray-400 font-medium ml-1">by {item.issuer}</span>}
                                                            {item.organization && <span className="text-gray-400 font-medium ml-1"> {item.jobTitle ? 'at' : 'at'} {item.organization}</span>}
                                                        </div>
                                                        {(item.startDate || item.endDate || item.date) && (
                                                            <div className="text-[14px] text-gray-400 font-medium shrink-0 ml-4">
                                                                {item.startDate || item.date} {item.endDate ? `— ${item.endDate}` : ''}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                        {item.location && (
                                                            <div className="text-[13px] text-gray-400 font-bold uppercase tracking-wider">
                                                                {item.location}
                                                            </div>
                                                        )}
                                                        {item.email && (
                                                            <div className="text-[13px] text-gray-400 font-medium lowercase italic">
                                                                {item.email}
                                                            </div>
                                                        )}
                                                        {item.phone && (
                                                            <div className="text-[13px] text-gray-400 font-medium">
                                                                {item.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {(item.description || item.additionalInfo || item.information) && (
                                                        <div
                                                            className="text-[14px] leading-relaxed text-gray-600 font-medium prose prose-sm max-w-none
                                                            [&>ul]:list-none [&>ul]:space-y-1
                                                            [&>ul>li]:relative [&>ul>li]:pl-4
                                                            [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-gray-400"
                                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div
                                        className="text-[14px] leading-relaxed text-gray-600 font-medium"
                                        dangerouslySetInnerHTML={{ __html: section.content as string }}
                                    />
                                )}
                            </div>
                        </section>
                    ))}
            </div>

            {/* Pagination Footer */}
            <div className="mt-auto px-14 py-12 text-[12px] text-gray-400 border-t border-gray-50 flex items-center gap-2">
                Page 1
            </div>
        </div>
    );
};

export default KaneJonesLayout;
