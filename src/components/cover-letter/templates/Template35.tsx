import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template35 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors - Classic muted purple/mauve tint seen in the image
    const lineColor = '#d1d5db'; // Light gray lines
    const nameColor = '#4b5563'; // Dark gray name
    const titleColor = '#6b7280'; // Gray title
    const iconColor = '#583f70'; // Deep muted purple for icons

    // Education Watermark
    const EducationWatermark = () => (
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-[0.03] overflow-hidden z-0">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
                {/* Abstract Book/Pen shapes */}
                <path d="M50 350 L150 250 L250 350 M150 250 V350" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="200" y="50" width="100" height="150" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="300" cy="300" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                <polygon points="100,100 120,50 140,100" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        </div>
    );

    return (
        <div className={`flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12 relative`}>

            {isLastPage && <EducationWatermark />}

            {/* Header Flex - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex justify-between items-start mb-8 relative z-10 pt-4">

                    {/* Left: Name and Title between lines */}
                    <div className="flex-1 pr-12 min-w-0">
                        {/* Top Line */}
                        <div className="w-full h-px bg-gray-200 mb-5 relative">
                            <div className="absolute left-0 top-0 h-full w-24 bg-gray-400"></div>
                        </div>

                        <div className="py-2">
                            <h1 className="text-4xl font-normal tracking-wide text-gray-700 break-words leading-none mb-2 font-serif" style={{ color: nameColor }}>
                                {data.personal.fullName}
                            </h1>
                            <p className="text-base font-light tracking-wider break-words max-w-full font-serif" style={{ color: titleColor }}>
                                {data.personal.jobTitle}
                            </p>
                        </div>

                        {/* Bottom Line */}
                        <div className="w-full h-px bg-gray-200 mt-5 relative">
                            <div className="absolute left-0 top-0 h-full w-24 bg-gray-400"></div>
                        </div>
                    </div>

                    {/* Right: Contact Info (Right Aligned) */}
                    <div className="flex flex-col items-end gap-1.5 text-[10px] text-gray-500 font-normal pt-8 flex-shrink-0">
                        {data.personal.email && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-all text-right">{data.personal.email}</span>
                                <Mail className="w-3.5 h-3.5" style={{ color: iconColor }} />
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-words text-right">{data.personal.phone}</span>
                                <Phone className="w-3.5 h-3.5" style={{ color: iconColor }} />
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-words text-right">{data.personal.address}</span>
                                <MapPin className="w-3.5 h-3.5" style={{ color: iconColor }} />
                            </div>
                        )}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <span className="break-all">{s.value}</span>
                                    <Icon className="w-3.5 h-3.5 text-right" style={{ color: iconColor }} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 relative z-10 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <div className="mb-8 text-xs text-gray-500 break-words leading-relaxed font-serif pl-1">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-400 font-sans">To</p>
                        <p className="font-bold text-gray-700 text-sm mb-0.5 font-sans">{data.recipient.name}</p>
                        <p className="mb-0.5 font-medium font-sans">{data.recipient.company}</p>
                        <p className="max-w-full text-gray-500 font-sans">
                            {data.recipient.address}
                        </p>
                    </div>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-600 font-serif leading-7 font-light mb-6"
                    dangerouslySetInnerHTML={{ __html: content }}
                />


                {/* Signature - Standardized - Only on the LAST page */}
                {isLastPage && (
                    <div className="mt-2 text-gray-600">
                        <p className="mb-2 font-bold text-inherit">Sincerely,</p>

                        <div className="w-fit min-w-[200px]">
                            {data.signature.image && (
                                <>
                                    <img
                                        src={data.signature.image}
                                        alt="Signature"
                                        className="h-16 object-contain mb-2 block"
                                    />
                                    <div className="w-full border-t border-current mb-3" style={{ opacity: 0.5 }}></div>
                                </>
                            )}

                            <p className="font-bold text-base">
                                {data.signature.name || data.personal.fullName}
                            </p>

                            {(data.signature.place || data.signature.date) && (
                                <p className="text-sm text-gray-600 mt-1 font-medium">
                                    {[data.signature.place, data.signature.date].filter(Boolean).join(', ')}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
