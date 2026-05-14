import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Globe, Calendar, Flag, User, Briefcase, GraduationCap, Award, Languages, Settings, FileText, Link as LinkIcon, Users, BookOpen, Quote, PenTool, Heart } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface IsabelaCamposLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const IsabelaCamposLayout: React.FC<IsabelaCamposLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'Profile': return <User size={20} />;
            case 'Experience': return <Briefcase size={20} />;
            case 'Education': return <GraduationCap size={20} />;
            case 'Certificates': return <Award size={20} />;
            case 'Languages': return <Globe size={20} />;
            case 'Skills': return <Settings size={20} />;
            case 'Projects': return <FileText size={20} />;
            case 'Courses': return <BookOpen size={20} />;
            case 'Awards': return <Award size={20} />;
            case 'Organisations': return <Users size={20} />;
            case 'Publications': return <Quote size={20} />;
            case 'References': return <Users size={20} />;
            case 'Declaration': return <PenTool size={20} />;
            case 'Interests': return <Heart size={20} />;
            default: return <FileText size={20} />;
        }
    };

    const SectionHeader = ({ title, type, noMarginTop }: { title: string, type: string, noMarginTop?: boolean }) => (
        <div className={`flex items-center justify-center gap-3 bg-gray-100 p-2 mb-5 ${noMarginTop ? 'mt-0' : 'mt-10'} w-full h-[38px]`}>
            <span className="text-black shrink-0 flex items-center justify-center">{getIcon(type)}</span>
            <span className="text-black text-[15px] font-bold tracking-widest uppercase text-center flex items-center leading-none">{title}</span>
        </div>
    );

    const sidebarSections = sections.filter(s =>
        s.isVisible && hasContent(s) &&
        ['Languages', 'Skills', 'Interests', 'References'].includes(s.type)
    );

    const mainSections = sections.filter(s =>
        s.isVisible && hasContent(s) &&
        !['Languages', 'Skills', 'Interests', 'References'].includes(s.type)
    );

    return (
        <div className="min-h-[29.7cm] w-full bg-white font-sans text-[#1a1a1a] flex flex-col relative">
            {/* Main Body Split - Starts from top to eliminate whitespace */}
            <div className="flex flex-1 px-12 pt-14 pb-20 gap-14">
                {/* Left Column (Sidebar-ish) */}
                <aside className="w-[35%] flex flex-col gap-10">
                    {/* Name & Title in Sidebar Column */}
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-black mb-2 tracking-tight">{personalDetails.fullName}</h1>
                        {personalDetails.jobTitle && (
                            <p className="text-2xl text-gray-700 font-medium leading-tight">{personalDetails.jobTitle}</p>
                        )}
                    </div>

                    {/* Photo */}
                    {personalDetails.photo && (
                        <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <img src={personalDetails.photo} alt={personalDetails.fullName} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <ContactInfoRenderer
                        data={data}
                        className="flex flex-col gap-4 text-base"
                        itemClassName="flex items-center gap-4"
                        linkClassName="hover:opacity-100 [overflow-wrap:anywhere] leading-none"
                        textClassName="[overflow-wrap:anywhere] leading-snug"
                        iconSize={18}
                        iconStyle={{ color: 'black' }}
                    />

                    {/* Sidebar Sections */}
                    {sidebarSections.map(section => (
                        <div key={section.id} className="flex flex-col">
                            <SectionHeader title={section.title} type={section.type} />
                            <div className="flex flex-col gap-5 px-1">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="flex flex-col gap-1">
                                        <div className="font-bold text-[17px] text-black">
                                            {item.language || item.skill || item.interest || item.certificate || item.course || item.name}
                                        </div>
                                        {(item.jobTitle || item.organization) && (
                                            <div className="text-sm font-medium text-gray-800">
                                                {[item.jobTitle, item.organization].filter(Boolean).join(', ')}
                                            </div>
                                        )}
                                        {(item.email || item.phone) && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                {[item.email, item.phone].filter(Boolean).join(' • ')}
                                            </div>
                                        )}
                                        {item.level && (
                                            <div className="text-sm text-gray-500 font-medium italic">
                                                {item.level}
                                            </div>
                                        )}
                                        {(item.description || item.information || item.additionalInfo || item.issuer) && (
                                            <div
                                                className="text-sm text-gray-700 mt-1 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo || item.issuer }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </aside>

                {/* Right Main Content */}
                <main className="w-[65%] flex flex-col">
                    {mainSections.map((section, idx) => {
                        switch (section.type) {
                            case 'Profile':
                            case 'Declaration':
                                return (
                                    <div key={section.id} className="mb-4">
                                        <SectionHeader title={section.title} type={section.type} noMarginTop={idx === 0} />
                                        <div
                                            className="text-base leading-relaxed text-justify px-1"
                                            dangerouslySetInnerHTML={{ __html: section.content as string }}
                                        />
                                    </div>
                                );

                            case 'References':
                                return (
                                    <div key={section.id} className="mb-4">
                                        <SectionHeader title={section.title} type={section.type} noMarginTop={idx === 0} />
                                        <div className="grid grid-cols-2 gap-x-10 gap-y-8 px-1">
                                            {(section.content as any[]).map((item: any) => (
                                                <div key={item.id} className="flex flex-col gap-1.5">
                                                    <div className="font-bold text-black text-xl leading-tight">
                                                        {item.name}
                                                    </div>
                                                    {(item.jobTitle || item.organization) && (
                                                        <div className="text-[17px] font-semibold text-gray-800">
                                                            {[item.jobTitle, item.organization].filter(Boolean).join(', ')}
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col gap-1 mt-1.5">
                                                        {item.email && (
                                                            <div className="flex items-center gap-2 text-base text-gray-600">
                                                                <Mail size={16} className="text-gray-400" />
                                                                <span>{item.email}</span>
                                                            </div>
                                                        )}
                                                        {item.phone && (
                                                            <div className="flex items-center gap-2 text-base text-gray-600">
                                                                <Phone size={16} className="text-gray-400" />
                                                                <span>{item.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                            case 'Experience':
                            case 'Education':
                            case 'Projects':
                            case 'Custom':
                            case 'Courses':
                            case 'Awards':
                            case 'Organisations':
                            case 'Publications':
                            case 'Certificates':
                                return (
                                    <div key={section.id} className="mb-4">
                                        <SectionHeader title={section.title} type={section.type} noMarginTop={idx === 0} />
                                        <div className="flex flex-col gap-10 px-1">
                                            {(section.content as any[]).map((item: any) => {
                                                let primaryTitle = "";
                                                let secondaryTitle = "";
                                                let richContent = "";

                                                // Section-specific field mapping
                                                switch (section.type) {
                                                    case 'Experience':
                                                        primaryTitle = item.employer;
                                                        secondaryTitle = item.jobTitle;
                                                        richContent = item.description;
                                                        break;
                                                    case 'Education':
                                                        primaryTitle = item.school;
                                                        secondaryTitle = item.degree;
                                                        richContent = item.description;
                                                        break;
                                                    case 'Projects':
                                                        primaryTitle = item.title;
                                                        secondaryTitle = item.subTitle;
                                                        richContent = item.description;
                                                        break;
                                                    case 'Certificates':
                                                        primaryTitle = item.certificate || item.name;
                                                        secondaryTitle = item.issuer;
                                                        richContent = item.additionalInfo || item.description;
                                                        break;
                                                    case 'Publications':
                                                        primaryTitle = item.title;
                                                        secondaryTitle = item.publisher;
                                                        richContent = item.description;
                                                        break;
                                                    case 'Courses':
                                                        primaryTitle = item.course || item.name;
                                                        secondaryTitle = item.institution || item.issuer;
                                                        richContent = item.description;
                                                        break;
                                                    case 'Awards':
                                                        primaryTitle = item.award || item.title;
                                                        secondaryTitle = item.issuer;
                                                        richContent = item.description;
                                                        break;
                                                    case 'Organisations':
                                                        primaryTitle = item.organization || item.name;
                                                        secondaryTitle = item.jobTitle || item.role;
                                                        richContent = item.description;
                                                        break;
                                                    default:
                                                        primaryTitle = item.employer || item.school || item.title || item.name || item.certificate;
                                                        secondaryTitle = item.jobTitle || item.degree || item.subTitle || item.publisher || item.issuer;
                                                        richContent = item.description || item.additionalInfo || item.information;
                                                }

                                                return (
                                                    <div key={item.id} className="flex flex-col gap-2">
                                                        <div className="flex flex-col">
                                                            {primaryTitle && (
                                                                <div className="font-bold text-black text-xl leading-tight">
                                                                    {primaryTitle}
                                                                </div>
                                                            )}
                                                            {secondaryTitle && (
                                                                <div className="text-[17px] font-semibold text-gray-800">
                                                                    {secondaryTitle}
                                                                </div>
                                                            )}
                                                            <div className="text-sm text-gray-500 font-medium">
                                                                {[item.startDate || item.date || item.publisherDate, item.endDate].filter(Boolean).join(' – ')}
                                                                {item.location && <span className="text-gray-400 font-normal"> | {item.location}</span>}
                                                            </div>
                                                        </div>
                                                        {richContent && (
                                                            <div
                                                                className="text-sm leading-relaxed text-gray-700 list-disc ml-0"
                                                                dangerouslySetInnerHTML={{ __html: richContent }}
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );

                            default:
                                return null;
                        }
                    })}
                </main>
            </div>

            {/* Footer */}
            <footer className="h-16 px-12 border-t flex items-center justify-between text-[11px] font-medium text-gray-500 bg-white z-10">
                <div className="uppercase">{personalDetails.fullName}</div>
                <div className="lowercase">{personalDetails.email}</div>
                <div>1 / 1</div>
            </footer>
        </div>
    );
};
