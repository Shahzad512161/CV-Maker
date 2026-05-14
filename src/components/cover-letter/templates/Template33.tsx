import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template33 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Branding Colors
    const primaryColor = '#5d4068'; // Muted Purple/Magenta
    const textColor = '#4b5563'; // Gray-600

    // Tech Watermark (Circuit/Network style)
    const TechWatermark = () => (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden z-0">
            <svg width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
                <circle cx="300" cy="400" r="150" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="300" cy="400" r="100" stroke="currentColor" strokeWidth="1" fill="none" />
                <line x1="150" y1="400" x2="450" y2="400" stroke="currentColor" strokeWidth="1" />
                <line x1="300" y1="250" x2="300" y2="550" stroke="currentColor" strokeWidth="1" />
                {/* Random nodes */}
                <circle cx="150" cy="400" r="5" fill="currentColor" />
                <circle cx="450" cy="400" r="5" fill="currentColor" />
                <circle cx="300" cy="250" r="5" fill="currentColor" />
                <circle cx="300" cy="550" r="5" fill="currentColor" />
            </svg>
        </div>
    );

    return (
        <div className={`flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col relative`}>

            {isFirstPage && <TechWatermark />}

            {/* Header Section - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex justify-between items-start mt-12 mb-12 relative z-10">
                    {/* Left Block: Purple Header */}
                    <div className="w-[320px] py-6 px-12 text-white" style={{ backgroundColor: primaryColor }}>
                        <h1 className="text-3xl font-normal mb-1 tracking-wide break-words max-w-full">
                            {data.personal.fullName}
                        </h1>
                        <p className="text-sm font-medium opacity-90 tracking-wide uppercase break-words max-w-full">
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    {/* Right Block: Contact Info (Right Aligned) */}
                    <div className="flex-1 flex flex-col items-end justify-center pr-12 gap-1.5 text-[10px] font-medium pt-2" style={{ color: textColor }}>
                        {data.personal.email && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-all text-right">{data.personal.email}</span>
                                <div className="p-1 rounded bg-gray-100">
                                    <Mail className="w-3 h-3" style={{ color: primaryColor }} />
                                </div>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-words text-right">{data.personal.phone}</span>
                                <div className="p-1 rounded bg-gray-100">
                                    <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                                </div>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-words text-right">{data.personal.address}</span>
                                <div className="p-1 rounded bg-gray-100">
                                    <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                                </div>
                            </div>
                        )}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <span className="break-all">{s.value}</span>
                                    <Icon className="w-3.5 h-3.5 text-right" style={{ color: primaryColor }} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`px-12 flex-1 relative z-10 ${!isFirstPage ? 'pt-16' : 'pb-12'}`}>
                {/* Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <div className="mb-10 text-xs text-gray-500 break-words leading-relaxed">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-400">To</p>
                        <p className="font-bold text-gray-700 text-sm mb-0.5">{data.recipient.name}</p>
                        <p className="mb-0.5 font-medium">{data.recipient.company}</p>
                        <p className="max-w-full text-gray-500">
                            {data.recipient.address}
                        </p>
                    </div>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-600 font-sans leading-7 font-light mb-6"
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
                                    <div className="w-full border-t mb-3" style={{ borderColor: primaryColor }}></div>
                                </>
                            )}

                            <p className="font-bold text-base text-inherit">
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
