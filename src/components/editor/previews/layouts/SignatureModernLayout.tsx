import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const SignatureModernLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Helper to check if a section has content
    const hasContent = (section: any) => {
        if (!section.isVisible) return false;
        if (typeof section.content === 'string') return section.content.trim().length > 0;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return false;
    };

    return (

        <div className="w-full h-full min-h-[297mm] flex flex-col font-sans text-gray-800 relative print:bg-[#EAECEF]" style={{ backgroundColor: '#EAECEF' }}>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');
                    .font-signature {
                        font-family: 'Sacramento', cursive;
                    }
                `}
            </style>

            {/* Header */}
            <header className="px-12 py-12 flex justify-between items-start">
                <div className="flex-1">
                    <h1 className="text-6xl font-signature text-[#2c3e50] mb-2">
                        {personalDetails.fullName}
                    </h1>
                    {personalDetails.jobTitle && (
                        <p className="text-xl text-gray-600 mb-6 font-medium tracking-wide">
                            {personalDetails.jobTitle}
                        </p>
                    )}

                    <ContactInfoRenderer
                        data={data}
                        layout="vertical"
                        className="flex flex-col gap-2 text-sm text-gray-600 font-medium"
                        itemClassName="flex items-center gap-2 h-4"
                        linkClassName="hover:underline [overflow-wrap:anywhere] leading-none text-gray-600 no-underline"
                        textClassName="[overflow-wrap:anywhere] leading-none"
                        iconSize={14}
                        iconStyle={{ color: '#1f2937' }} // gray-800
                    />
                </div>

                {personalDetails.photo && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-sm shrink-0 ml-8">
                        <img
                            src={personalDetails.photo}
                            alt={personalDetails.fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </header>

            {/* Content */}
            <main className="px-12 pb-12 space-y-8">

                {/* Profile */}
                {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                    <div key={section.id} className="w-full">
                        <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest border-b-4 border-[#2c3e50] w-[60px] mb-4 pb-1">
                            {section.title}
                        </h2>
                        {typeof section.content === 'string' && (
                            <div
                                className="text-gray-700 text-sm leading-relaxed max-w-4xl text-justify"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        )}
                    </div>
                ))}

                {/* Main Sections (Experience, Education usually first) */}
                {sections.filter(s => ['Experience', 'Education'].includes(s.type)).map(section => hasContent(section) && (
                    <div key={section.id} className="w-full">
                        <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest border-b-4 border-[#2c3e50] w-[60px] mb-6 pb-1">
                            {section.title}
                        </h2>
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="grid grid-cols-12 gap-6">
                                    {/* Left: Date & Loc */}
                                    <div className="col-span-3 text-sm">
                                        <div className="font-bold text-gray-700">
                                            {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                        </div>
                                        {item.location && (
                                            <div className="text-gray-500 mt-1">
                                                {item.location}
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Content */}
                                    <div className="col-span-9">
                                        <div className="font-bold text-gray-900 text-base">
                                            {item.title || item.school || item.employer}
                                            {(item.subTitle || item.degree || item.jobTitle) && (
                                                <span className="font-normal text-gray-600 ml-1">
                                                    , {item.subTitle || item.degree || item.jobTitle}
                                                </span>
                                            )}
                                        </div>
                                        {item.description && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Other List Sections (Projects, etc) */}
                {sections.filter(s => ['Projects', 'Custom', 'Organisations'].includes(s.type)).map(section => hasContent(section) && (
                    <div key={section.id} className="w-full">
                        <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest border-b-4 border-[#2c3e50] w-[60px] mb-6 pb-1">
                            {section.title}
                        </h2>
                        <div className="space-y-6">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="grid grid-cols-12 gap-6">
                                    <div className="col-span-3 text-sm">
                                        <div className="font-bold text-gray-700">
                                            {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                        </div>
                                        {item.location && (
                                            <div className="text-gray-500 mt-1">
                                                {item.location}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-9">
                                        <div className="font-bold text-gray-900 text-base">
                                            {item.title || item.project}
                                            {(item.subTitle || item.role) && `, ${item.subTitle || item.role}`}
                                        </div>
                                        {(item.link || item.url) && (
                                            <a href={item.link || item.url} className="text-xs text-blue-600 hover:underline block mb-1">{item.link || item.url}</a>
                                        )}
                                        {item.description && (
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed mt-1"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Languages - Boxed Chips */}
                {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                    <div key={section.id} className="w-full">
                        <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest border-b-4 border-[#2c3e50] w-[60px] mb-4 pb-1">
                            {section.title}
                        </h2>
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="flex flex-col items-start">
                                    <div className="border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg inline-block">
                                        {item.language}
                                        {item.level && <span className="text-gray-400 ml-2 font-normal">| {item.level}</span>}
                                    </div>
                                    {(item.information || item.description) && (
                                        <div
                                            className="text-gray-600 text-sm leading-relaxed mt-2 [&_p]:mb-1 [&_p:last-child]:mb-0 [&_p:empty]:hidden"
                                            dangerouslySetInnerHTML={{ __html: item.information || item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Skills - Bulleted List */}
                {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                    <div key={section.id} className="w-full">
                        <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest border-b-4 border-[#2c3e50] w-[60px] mb-4 pb-1">
                            {section.title}
                        </h2>
                        <div className="space-y-3">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id}>
                                    <div className="font-bold text-gray-900 text-sm flex items-center">
                                        {item.skill}
                                        {item.level && <span className="text-gray-500 font-normal ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">{item.level}</span>}
                                    </div>
                                    {(item.information || item.description) && (
                                        <div
                                            className="text-gray-700 text-sm leading-relaxed mt-1 [&_p]:mb-1 [&_p:last-child]:mb-0"
                                            dangerouslySetInnerHTML={{ __html: item.information || item.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Interests & Others */}
                {sections.filter(s => ['Interests', 'Awards', 'Certificates', 'References', 'Publications'].includes(s.type)).map(section => hasContent(section) && (
                    <div key={section.id} className="w-full">
                        <h2 className="text-lg font-bold text-[#2c3e50] uppercase tracking-widest border-b-4 border-[#2c3e50] w-[60px] mb-4 pb-1">
                            {section.title}
                        </h2>

                        {/* Generic List for all included sections (Interests, Awards, etc) */}
                        <div className="space-y-4">
                            {(section.content as any[]).map((item: any) => (
                                <div key={item.id} className="text-sm">
                                    <div className="font-bold text-gray-900">
                                        {item.title || item.name || item.certificate || item.publisher}
                                    </div>
                                    {(item.subTitle || item.jobTitle || item.organization || item.publisher || item.date) && (
                                        <div className="text-gray-600">
                                            {[
                                                item.subTitle,
                                                item.jobTitle,
                                                item.organization,
                                                item.publisher,
                                                item.date
                                            ].filter(Boolean).join(', ')}
                                        </div>
                                    )}
                                    {item.email && <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 h-3"><Mail size={10} /><span className="leading-none">{item.email}</span></div>}
                                    {item.phone && <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 h-3"><Phone size={10} /><span className="leading-none">{item.phone}</span></div>}
                                    {(item.description || item.additionalInfo) && section.type !== 'References' && (
                                        <div
                                            className="text-gray-600 text-sm mt-1 leading-snug [&_p]:mb-1 [&_p:last-child]:mb-0 [&_p:empty]:hidden"
                                            dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </main>
        </div>
    );
};
