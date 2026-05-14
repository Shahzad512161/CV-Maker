import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template31 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors
    const headerBg = '#f4f6f8'; // Very light gray-blue
    const nameColor = '#34495e'; // Dark blue-gray
    const accentColor = '#3b82f6'; // Icon color (blue)
    const textColor = '#4b5563'; // Gray-600

    // Hexagon Watermark
    const HexagonWatermark = () => (
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none opacity-[0.03] overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 400 300">
                <defs>
                    <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path d="M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                </defs>
                {/* Random scattered hexagons or a grid */}
                <path d="M350 250 L380 265 L380 295 L350 310 L320 295 L320 265 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M280 200 L310 215 L310 245 L280 260 L250 245 L250 215 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M350 150 L380 165 L380 195 L350 210 L320 195 L320 165 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M200 250 L230 265 L230 295 L200 310 L170 295 L170 265 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Connecting lines */}
                <line x1="320" y1="265" x2="310" y2="245" stroke="currentColor" strokeWidth="1" />
                <line x1="250" y1="215" x2="200" y2="180" stroke="currentColor" strokeWidth="1" />
                <line x1="320" y1="195" x2="310" y2="215" stroke="currentColor" strokeWidth="1" />
            </svg>
        </div>
    );

    return (
        <div className={`flex-1 text-[#1a1a1a] text-sm leading-relaxed font-sans overflow-hidden flex flex-col relative`}>

            {/* Header Section - Full Width Light Background - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-full px-12 py-10 flex justify-between items-start" style={{ backgroundColor: headerBg }}>
                    {/* Left: Name, Title, Recipient */}
                    <div className="flex-1 pr-6 pt-2 min-w-0">
                        <h1 className="text-3xl font-semibold mb-1 tracking-tight break-words max-w-full" style={{ color: nameColor }}>
                            {data.personal.fullName}
                        </h1>
                        <p className="text-base font-medium text-gray-500 mb-10 break-words max-w-full">
                            {data.personal.jobTitle}
                        </p>

                        {/* Recipient Info - Inside Header */}
                        <div className="text-xs text-gray-500 break-words leading-relaxed">
                            <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-400">To:</p>
                            <p className="font-bold text-gray-700 text-sm mb-0.5">{data.recipient.name}</p>
                            <p className="mb-0.5 font-medium">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-500">
                                {data.recipient.address}
                            </p>
                        </div>
                    </div>

                    {/* Right: Contact Grid - Right Aligned with Icons on Right */}
                    <div className="flex flex-col items-end gap-2 text-[11px] text-gray-500 font-medium pt-2">
                        {data.personal.email && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-all text-right">{data.personal.email}</span>
                                <Mail className="w-3.5 h-3.5" style={{ color: nameColor }} />
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-words text-right">{data.personal.phone}</span>
                                <Phone className="w-3.5 h-3.5" style={{ color: nameColor }} />
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-words text-right">{data.personal.address}</span>
                                <MapPin className="w-3.5 h-3.5" style={{ color: nameColor }} />
                            </div>
                        )}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <span className="break-all">{s.value}</span>
                                    <Icon className="w-3.5 h-3.5 text-right" style={{ color: nameColor }} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`p-12 flex-1 relative z-10 ${!isFirstPage ? 'pt-16' : 'pt-8'}`}>
                {/* Body */}
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-600 font-sans leading-7 mb-6"
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
                                    <div className="w-full border-t mb-3" style={{ borderColor: headerBg }}></div>
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

            {/* Watermark - Only on Last Page */}
            {isLastPage && <HexagonWatermark />}
        </div>
    );
};
