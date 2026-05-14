import React, { useState, useEffect, useRef } from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { MapPin, Phone, Mail, Linkedin, Globe, Calendar, Flag } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';
import { ContactInfoRenderer } from '../ContactInfoRenderer';

interface AlessandroRicciLayoutProps {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const AlessandroRicciLayout: React.FC<AlessandroRicciLayoutProps> = ({ data, theme }) => {
    const { personalDetails, sections } = data;
    const containerRef = useRef<HTMLDivElement>(null);
    const [pageOffsets, setPageOffsets] = useState<number[]>([]);

    useEffect(() => {
        const calculateBreaks = () => {
            if (!containerRef.current) return;
            const items = containerRef.current.querySelectorAll('.resume-item');
            const pageHeight = 1122; // A4 height in pixels (approx)
            let currentBreaks: number[] = [];

            items.forEach((item) => {
                const element = item as HTMLElement;
                const rect = element.getBoundingClientRect();
                const containerRect = containerRef.current!.getBoundingClientRect();
                const relativeTop = rect.top - containerRect.top;
                const relativeBottom = rect.bottom - containerRect.top;

                const pageNum = Math.floor(relativeTop / pageHeight);
                const endPageNum = Math.floor((relativeBottom - 1) / pageHeight);

                if (pageNum !== endPageNum) {
                    // Item crosses page boundary
                    const padding = (pageNum + 1) * pageHeight - relativeTop;
                    element.style.paddingTop = `${padding}px`;
                    element.style.backgroundColor = 'white';
                } else {
                    element.style.paddingTop = '0px';
                }
            });
        };

        // Run after a short delay to ensure rendering is complete
        const timer = setTimeout(calculateBreaks, 500);
        return () => clearTimeout(timer);
    }, [data]);

    const hasContent = (section: any) => {
        if (!section.content) return false;
        if (Array.isArray(section.content)) return section.content.length > 0;
        return typeof section.content === 'string' && section.content.trim().length > 0;
    };

    // Helper to divide sections into columns based on the reference image logic
    // Reference: Left (Education, Research/Projects), Right (Experience, Certifications, Languages)
    const leftColumnSections = sections.filter(s =>
        ['Education', 'Projects', 'Research'].includes(s.type) ||
        (s.type === 'Custom' && s.title.toLowerCase().includes('research'))
    );
    // If specific sections aren't enough to fill left, we might want to balance, but for now strict mapping:
    // Actually, "Academic Research" -> Projects often. 
    // Let's put Education and Generic Projects on Left. 
    // Experience, Certifications, Languages, Skills on Right.
    // Making sure we don't miss any:
    const rightColumnSections = sections.filter(s =>
        ['Experience', 'Certifications', 'Languages', 'Skills', 'Awards', 'Interests', 'Volunteering', 'References', 'Publications', 'Organisations'].includes(s.type) ||
        (s.type === 'Custom' && !s.title.toLowerCase().includes('research'))
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="border-b-2 border-[#1e293b] mb-4 mt-2 pb-1">
            <h2 className="text-[#1e293b] text-lg font-bold font-serif tracking-in-widest uppercase">{title}</h2>
        </div>
    );

    return (
        <div ref={containerRef} className="min-h-[29.7cm] w-full bg-white font-serif text-[#1e293b]">
            {/* Header - Light Blue Background */}
            <header className="bg-[#eef2f6] px-10 py-8 mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-[#1a237e]">{personalDetails.fullName}</h1>
                    <span className="text-xl text-[#3949ab] font-serif">{personalDetails.jobTitle}</span>
                </div>

                <ContactInfoRenderer
                    data={data}
                    layout="horizontal"
                    iconSize={14}
                    showIcons={true}
                    className="flex flex-wrap items-center gap-x-2 text-sm text-gray-700 font-serif leading-relaxed"
                    itemClassName="flex items-center gap-2 whitespace-nowrap h-4"
                    linkClassName="hover:opacity-100"
                    textClassName="leading-none"
                    // Custom mapping for Alessandro template (using | as separator)
                    renderSeparator={() => <span className="text-gray-400">|</span>}
                />
            </header>

            <div className="px-10 pb-10 grid grid-cols-2 gap-10">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Profile */}
                    {sections.filter(s => s.type === 'Profile').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-6 resume-item">
                            <SectionHeader title={section.title} />
                            <div
                                className="text-sm text-gray-800 leading-relaxed text-justify"
                                dangerouslySetInnerHTML={{ __html: section.content as string }}
                            />
                        </div>
                    ))}

                    {/* Education */}
                    {sections.filter(s => s.type === 'Education').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-6">
                            <SectionHeader title={section.title} />
                            <div className="space-y-5">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        <div className="flex flex-col mb-1">
                                            <div className="font-bold text-black text-lg leading-tight">{item.degree}</div>
                                            <div className="text-base text-gray-800 font-medium">{item.school}</div>
                                            <div className="text-sm text-gray-600 italic mt-0.5">
                                                {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                                {item.location && ` | ${item.location}`}
                                            </div>
                                        </div>

                                        {(item.description) && (
                                            <div
                                                className="text-sm text-gray-800 leading-relaxed mt-1 text-justify"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Projects / Research / Custom Research on Left */}
                    {sections.filter(s =>
                        ['Projects', 'Research'].includes(s.type) ||
                        (s.type === 'Custom' && s.title.toLowerCase().includes('research'))
                    ).map(section => hasContent(section) && (
                        <div key={section.id} className="mb-6">
                            <SectionHeader title={section.title} />
                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        <div className="flex flex-col mb-1">
                                            <div className="font-bold text-black text-[16px]">
                                                {item.title || item.name || item.organization || item.project}
                                                {item.subTitle && <span className="text-black font-normal"> - {item.subTitle}</span>}
                                            </div>
                                            <div className="text-sm text-gray-700 italic">
                                                {[item.publisher, item.issuer, item.location, item.jobTitle, item.organization].filter(Boolean).join(' - ')}
                                            </div>
                                            {(item.email || item.phone) && (
                                                <div className="text-sm text-gray-700">
                                                    {[item.email, item.phone].filter(Boolean).join(' | ')}
                                                </div>
                                            )}
                                            <div className="text-sm text-gray-600 italic">
                                                {[item.startDate, item.endDate, item.date].filter(Boolean).join(' – ')}
                                            </div>
                                        </div>
                                        {(item.description || item.information || item.additionalInfo) && (
                                            <div
                                                className="text-sm text-gray-800 leading-relaxed text-justify"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Experience */}
                    {sections.filter(s => s.type === 'Experience').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-6">
                            <SectionHeader title={section.title} />
                            <div className="space-y-6">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        <div className="font-bold text-black text-lg leading-tight mb-0.5">{item.jobTitle}</div>
                                        <div className="text-base text-gray-800 mb-0.5">{item.employer}</div>
                                        <div className="text-sm text-gray-600 italic mb-2">
                                            {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                                            {item.location && ` | ${item.location}`}
                                        </div>

                                        {(item.description) && (
                                            <div
                                                className="text-sm text-gray-800 leading-relaxed text-justify"
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Certifications */}
                    {sections.filter(s => s.type === 'Certificates').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-6">
                            <SectionHeader title={section.title} />
                            <div className="space-y-3">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="flex flex-col resume-item">
                                        <div className="flex justify-between items-baseline">
                                            <span className="font-bold text-black text-lg">{item.certificate || item.name || item.title}</span>
                                            <span className="text-sm text-gray-600 italic">{item.date}</span>
                                        </div>
                                        <div className="text-sm text-gray-700">{item.issuer}</div>
                                        {(item.description || item.additionalInfo || item.information) && (
                                            <div
                                                className="text-sm text-gray-800 leading-relaxed mt-1 text-justify"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.additionalInfo || item.information }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Languages */}
                    {sections.filter(s => s.type === 'Languages').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-6">
                            <SectionHeader title={section.title} />
                            <div className="space-y-2">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="text-sm resume-item">
                                        <div>
                                            <span className="font-bold text-black">{item.language}: </span>
                                            <span className="text-gray-700">{item.level}</span>
                                        </div>
                                        {(item.description || item.information || item.additionalInfo) && (
                                            <div
                                                className="text-sm text-gray-800 leading-relaxed mt-0.5 text-justify"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Skills */}
                    {sections.filter(s => s.type === 'Skills').map(section => hasContent(section) && (
                        <div key={section.id} className="mb-6">
                            <SectionHeader title={section.title} />
                            <div className="flex flex-col gap-3">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="flex flex-col resume-item">
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-bold text-black text-sm">{item.skill}</span>
                                            {item.level && <span className="text-xs text-gray-600">({item.level})</span>}
                                        </div>
                                        {(item.description || item.information || item.additionalInfo) && (
                                            <div
                                                className="text-sm text-gray-800 leading-relaxed mt-0.5 text-justify"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Other Sections on Right (Awards, Interests, etc.) */}
                    {sections.filter(s =>
                        ['Awards', 'Interests', 'Volunteering', 'References', 'Publications', 'Organisations'].includes(s.type) ||
                        (s.type === 'Custom' && !s.title.toLowerCase().includes('research'))
                    ).map(section => hasContent(section) && (
                        <div key={section.id} className="mb-6">
                            <SectionHeader title={section.title} />
                            <div className="space-y-4">
                                {(section.content as any[]).map((item: any) => (
                                    <div key={item.id} className="resume-item">
                                        <div className="flex flex-col mb-1">
                                            <div className="font-bold text-black text-[16px]">
                                                {item.title || item.name || item.organization || item.certificate || item.project || item.publisher}
                                                {item.subTitle && <span className="text-black font-normal"> - {item.subTitle}</span>}
                                            </div>
                                            <div className="text-sm text-gray-700 italic">
                                                {[item.publisher, item.issuer, item.location, item.jobTitle, item.organization].filter(Boolean).join(' - ')}
                                            </div>
                                            {(item.email || item.phone) && (
                                                <div className="text-sm text-gray-700">
                                                    {[item.email, item.phone].filter(Boolean).join(' | ')}
                                                </div>
                                            )}
                                            <div className="text-sm text-gray-600 italic">
                                                {[item.startDate, item.endDate, item.date].filter(Boolean).join(' – ')}
                                            </div>
                                        </div>
                                        {(item.description || item.information || item.additionalInfo) && (
                                            <div
                                                className="text-sm text-gray-800 leading-relaxed text-justify"
                                                dangerouslySetInnerHTML={{ __html: item.description || item.information || item.additionalInfo }}
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
