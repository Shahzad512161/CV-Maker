import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Linkedin, Globe, Github, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const CarlosSlimLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.isVisible) return false;
        if (typeof section.content === 'string') return section.content.trim().length > 0;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return false;
    };

    return (
        <div
            className="w-full min-h-[297mm] flex flex-col font-sans text-gray-800 bg-white relative"
            style={{
                borderLeft: '35px solid #B2CED8'
            }}
        >
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap');
                    .font-slab {
                        font-family: 'Roboto Slab', serif;
                    }
                    @media print {
                        .w-full {
                             border-left: 35px solid #B2CED8 !important;
                             -webkit-print-color-adjust: exact;
                        }
                    }
                `}
            </style>

            {/* Main Content */}
            <div className="flex-1 py-12 relative">

                {/* Header */}
                <header className="mb-12 px-12">
                    <h1 className="text-5xl font-slab font-bold text-black mb-2 leading-tight">
                        {personalDetails.fullName}
                    </h1>
                    {personalDetails.jobTitle && (
                        <p className="text-2xl text-gray-700 font-slab mb-6">
                            {personalDetails.jobTitle}
                        </p>
                    )}

                    <ContactInfoRenderer
                        data={data}
                        className="flex flex-col gap-2 text-sm text-gray-600"
                        itemClassName="flex items-center gap-3 h-4"
                        linkClassName="hover:underline [overflow-wrap:anywhere] leading-none"
                        textClassName="[overflow-wrap:anywhere] leading-none"
                        iconSize={16}
                        iconStyle={{ color: '#B2CED8' }}
                    />

                    {/* Summary */}
                    {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                        <div key={section.id} className="mt-8 text-justify">
                            {typeof section.content === 'string' && (
                                <div
                                    className="text-gray-700 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            )}
                        </div>
                    ))}
                </header>

                <div className="space-y-8 pl-[250px] pr-12">
                    {/* Experience & Education */}
                    {sections.filter(s => ['Experience', 'Education'].includes(s.type)).map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-xl font-slab font-bold text-black mb-1">
                                {section.title}
                            </h2>
                            <div className="w-[40px] h-[5px] bg-[#B2CED8] mb-6 print:bg-[#B2CED8]" style={{ backgroundColor: '#B2CED8' }}></div>

                            <div className="space-y-6">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id}>
                                        <div className="font-bold text-black text-base">
                                            {item.employer || item.school}
                                        </div>
                                        <div className="text-gray-800 text-sm mb-1">
                                            {item.jobTitle || item.degree}
                                        </div>
                                        <div className="text-gray-500 text-xs mb-2">
                                            {item.startDate} {item.endDate ? `– ${item.endDate}` : ''} | {item.location}
                                        </div>
                                        {item.description && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Languages */}
                    {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-xl font-slab font-bold text-black mb-1">
                                {section.title}
                            </h2>
                            <div className="w-[40px] h-[5px] bg-[#B2CED8] mb-6 print:bg-[#B2CED8]" style={{ backgroundColor: '#B2CED8' }}></div>

                            <ul className="list-disc pl-5 space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <li key={item.id} className="text-sm text-gray-800">
                                        <div className="font-bold">
                                            {item.language}
                                            {item.level && <span className="text-gray-600 font-normal ml-1">- {item.level}</span>}
                                        </div>
                                        {(item.description || item.information) && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed mt-1"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Interests */}
                    {sections.filter(s => s.type === 'Interests').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-xl font-slab font-bold text-black mb-1">
                                {section.title}
                            </h2>
                            <div className="w-[40px] h-[5px] bg-[#B2CED8] mb-6 print:bg-[#B2CED8]" style={{ backgroundColor: '#B2CED8' }}></div>

                            <ul className="list-disc pl-5 space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <li key={item.id} className="text-sm text-gray-800">
                                        <div className="font-bold">
                                            {item.name || item.interest}
                                        </div>
                                        {(item.description || item.additionalInfo) && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed mt-1"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Skills */}
                    {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-xl font-slab font-bold text-black mb-1">
                                {section.title}
                            </h2>
                            <div className="w-[40px] h-[5px] bg-[#B2CED8] mb-6 print:bg-[#B2CED8]" style={{ backgroundColor: '#B2CED8' }}></div>

                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id}>
                                        <div className="inline-block border border-gray-400 px-3 py-1 text-sm text-gray-700 font-medium mb-1">
                                            {item.skill}
                                            {item.level && <span className="text-gray-400 text-xs ml-1">({item.level})</span>}
                                        </div>
                                        {(item.description || item.information) && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Other Sections */}
                    {sections.filter(s => !['Profile', 'Experience', 'Education', 'Languages', 'Interests', 'Skills'].includes(s.type)).map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-xl font-slab font-bold text-black mb-1">
                                {section.title}
                            </h2>
                            <div className="w-[40px] h-[5px] bg-[#B2CED8] mb-6 print:bg-[#B2CED8]" style={{ backgroundColor: '#B2CED8' }}></div>

                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id}>
                                        <div className="font-bold text-black text-base">
                                            {item.title || item.name || item.project || item.certificate}
                                        </div>
                                        {(item.subTitle || item.role || item.publisher || item.jobTitle || item.organization) && (
                                            <div className="text-sm text-gray-700">
                                                {[item.subTitle, item.role, item.publisher, item.jobTitle, item.organization].filter(Boolean).join(' - ')}
                                            </div>
                                        )}
                                        <div className="text-gray-500 text-xs mb-1">
                                            {[item.startDate, item.endDate].filter(Boolean).join(' - ')}
                                            {item.date && <span>{item.date}</span>}
                                            {item.location && ` | ${item.location}`}
                                        </div>
                                        {(item.email || item.phone) && (
                                            <div className="text-sm text-gray-600 mt-1">
                                                {item.email && <div>{item.email}</div>}
                                                {item.phone && <div>{item.phone}</div>}
                                            </div>
                                        )}
                                        {(item.description || item.additionalInfo) && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};
