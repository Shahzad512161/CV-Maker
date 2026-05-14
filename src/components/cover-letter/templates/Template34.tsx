import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template34 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors
    const nameColor = '#333';
    const titleColor = '#d66d75'; // Soft Red/Coral
    const shapeColor = '#bbb'; // Light Gray block

    // Dental/Medical Watermark (Subtle background)
    const MedicalWatermark = () => (
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-[0.03] overflow-hidden z-0">
            <svg width="100%" height="100%" viewBox="0 0 400 400">
                {/* Abstract "Cross" or "Plus" shapes scattered */}
                <path d="M300 300 h30 v-30 h30 v30 h30 v30 h-30 v30 h-30 v-30 h-30 z" fill="currentColor" />
                <path d="M100 350 h20 v-20 h20 v20 h20 v20 h-20 v20 h-20 v-20 h-20 z" fill="currentColor" />
                <path d="M350 100 h25 v-25 h25 v25 h25 v25 h-25 v25 h-25 v-25 h-25 z" fill="currentColor" />
                <path d="M50 50 h40 v-40 h40 v40 h40 v40 h-40 v40 h-40 v-40 h-40 z" fill="currentColor" />
            </svg>
        </div>
    );

    return (
        <div className={`flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12 relative`}>

            {isLastPage && <MedicalWatermark />}

            {/* Header Section - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex justify-between items-start mb-12 relative z-10">
                    {/* Left Side: Name with Gray Block Accent */}
                    <div className="flex items-start gap-4 flex-1 pr-8 min-w-0">
                        {/* Gray Accent Block */}
                        <div className="w-5 h-16 flex-shrink-0" style={{ backgroundColor: shapeColor }}></div>

                        <div className="pt-0 flex flex-col min-w-0">
                            <h1 className="text-4xl font-normal tracking-wide text-gray-800 break-words leading-none mb-2 font-serif" style={{ color: nameColor }}>
                                {data.personal.fullName}
                            </h1>
                            <p className="text-base font-medium uppercase tracking-wide break-words max-w-full" style={{ color: titleColor }}>
                                {data.personal.jobTitle}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Contact Info (Right Aligned) */}
                    <div className="flex flex-col items-end gap-1.5 text-[10px] text-gray-500 font-normal pt-1 flex-shrink-0">
                        {data.personal.email && (
                            <div className="flex items-center gap-2 justify-end">
                                <span className="break-all text-right">{data.personal.email}</span>
                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2 justify-end">
                                <span className="break-words text-right">{data.personal.phone}</span>
                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-2 justify-end">
                                <span className="break-words text-right">{data.personal.address}</span>
                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                        )}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <span className="break-all">{s.value}</span>
                                    <Icon className="w-3.5 h-3.5 text-right" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 relative z-10 pl-9 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <div className="mb-8 text-xs text-gray-500 break-words leading-relaxed font-serif">
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
