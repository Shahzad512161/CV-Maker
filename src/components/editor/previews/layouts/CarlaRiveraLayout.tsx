import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Globe, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const CarlaRiveraLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.isVisible) return false;
        if (typeof section.content === 'string') return section.content.trim().length > 0;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return false;
    };

    return (
        <div className="w-full min-h-[297mm] flex font-sans bg-white relative">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
                    .font-script {
                        font-family: 'Dancing Script', cursive;
                    }
                    .font-montserrat {
                        font-family: 'Montserrat', sans-serif;
                    }
                    @media print {
                        .print-bg-sidebar {
                            background-image: url('/textures/dark_workspace_v4.png') !important;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
                `}
            </style>

            {/* Left Sidebar - Image Background */}
            <div
                className="w-[38%] relative bg-cover bg-center print-bg-sidebar flex flex-col justify-center px-8 text-white min-h-screen"
                style={{
                    backgroundImage: "url('/textures/dark_workspace_v4.png')",
                }}
            >
                {/* Dark Overlay for readability - Reduced opacity */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                <div className="relative z-10 flex flex-col h-full pt-16 pb-8">
                    {/* Name & Contact */}
                    <div className="mb-8">
                        <h1 className="text-6xl font-script mb-2 text-white">
                            {personalDetails.fullName.split(' ')[0]}
                            <br />
                            {personalDetails.fullName.split(' ').slice(1).join(' ')}
                        </h1>

                        {personalDetails.jobTitle && (
                            <p className="text-xl font-montserrat font-light text-gray-200 mt-4 mb-8">
                                {personalDetails.jobTitle}
                            </p>
                        )}
                    </div>

                    <ContactInfoRenderer
                        data={data}
                        className="flex flex-col gap-4 font-montserrat text-sm font-light text-gray-100"
                        itemClassName="flex items-center gap-3 h-5"
                        linkClassName="hover:text-white transition-colors [overflow-wrap:anywhere] leading-none"
                        textClassName="[overflow-wrap:anywhere] leading-none"
                        iconSize={18}
                        renderIcon={(icon: React.ReactNode) => (
                            <span className="w-5 text-gray-300 flex justify-center items-center">
                                {icon}
                            </span>
                        )}
                    />
                </div>
            </div>

            {/* Right Main Content */}
            <div className="flex-1 bg-white p-12 font-montserrat flex flex-col">

                {/* Summary at top of right column */}
                {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                    <div key={section.id} className="mb-12">
                        {typeof section.content === 'string' && (
                            <div
                                className="text-gray-900 text-sm leading-7 text-justify font-medium"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        )}
                    </div>
                ))}

                <div className="space-y-10">
                    {/* Experience, Education, Projects, etc */}
                    {sections.filter(s => !['Profile', 'Skills', 'Languages', 'Interests'].includes(s.type)).map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black border-b-[3px] border-black inline-block mb-6 pb-1">
                                {section.title}
                            </h2>

                            <div className="space-y-6">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="relative">
                                        <div className="font-bold text-black text-[15px]">
                                            {item.employer || item.school || item.title || item.name || item.project || item.certificate}
                                        </div>
                                        <div className="text-sm text-gray-900 mb-1 font-medium">
                                            {[item.jobTitle, item.organization, item.degree, item.publisher, item.role, item.subTitle].filter(Boolean).join(' - ')}
                                        </div>
                                        <div className="text-xs text-gray-800 mb-2 uppercase tracking-wide font-medium">
                                            {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                            {item.date && ` ${item.date}`}
                                            {item.location && ` | ${item.location}`}
                                        </div>
                                        {(item.description || item.information || item.additionalInfo) && (
                                            <div
                                                className="text-gray-900 text-sm leading-relaxed text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                            />
                                        )}
                                        {/* Contact in Ref */}
                                        {(item.email || item.phone) && (
                                            <div className="text-xs text-gray-800 mt-1 italic font-medium">
                                                {[item.email, item.phone].filter(Boolean).join(' • ')}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Languages - Black Chips & Descriptions */}
                    {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black border-b-[3px] border-black inline-block mb-6 pb-1">
                                {section.title}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="break-inside-avoid">
                                        <div className="bg-black text-white px-4 py-2 rounded text-sm font-medium shadow-sm inline-block mb-2">
                                            {item.language}
                                            {item.level && <span className="opacity-80 text-xs ml-2 font-light">| {item.level}</span>}
                                        </div>
                                        {item.information && (
                                            <div
                                                className="text-gray-900 text-sm leading-relaxed text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1"
                                                dangerouslySetInnerHTML={{ __html: item.information }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Skills - Black Chips & Descriptions */}
                    {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black border-b-[3px] border-black inline-block mb-6 pb-1">
                                {section.title}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="break-inside-avoid">
                                        <div className="bg-black text-white px-4 py-2 rounded text-sm font-medium shadow-sm inline-block mb-2">
                                            {item.skill}
                                            {item.level && <span className="opacity-80 text-xs ml-2 font-light">| {item.level}</span>}
                                        </div>
                                        {item.information && (
                                            <div
                                                className="text-gray-900 text-sm leading-relaxed text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1"
                                                dangerouslySetInnerHTML={{ __html: item.information }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* Interests - List with Descriptions */}
                    {sections.filter(s => s.type === 'Interests').map(section => hasContent(section) && (
                        <div key={section.id}>
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black border-b-[3px] border-black inline-block mb-6 pb-1">
                                {section.title}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="break-inside-avoid">
                                        <div className="font-bold text-gray-900 text-[15px] mb-1">
                                            {item.name || item.interest}
                                        </div>
                                        {item.additionalInfo && (
                                            <div
                                                className="text-gray-900 text-sm leading-relaxed text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1"
                                                dangerouslySetInnerHTML={{ __html: item.additionalInfo }}
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
