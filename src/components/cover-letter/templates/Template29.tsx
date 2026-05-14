import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template29 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors
    const headerBg = '#374151'; // Dark slate gray 
    const contactBg = '#1f2937'; // Darker gray/black
    const accentColor = '#f87171'; // Red/Coral for title

    // Tech Network Watermark SVG
    const TechWatermark = () => (
        <div className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none opacity-5 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="xMidYMax meet">
                {/* Nodes and connections simulating a network graph */}
                <circle cx="100" cy="250" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="200" cy="200" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="300" cy="260" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="400" cy="180" r="12" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="500" cy="240" r="18" stroke="currentColor" strokeWidth="1" fill="none" />

                <line x1="100" y1="235" x2="100" y2="150" stroke="currentColor" strokeWidth="1" />
                <line x1="100" y1="250" x2="190" y2="200" stroke="currentColor" strokeWidth="1" />
                <line x1="200" y1="200" x2="300" y2="240" stroke="currentColor" strokeWidth="1" />
                <line x1="300" y1="260" x2="250" y2="300" stroke="currentColor" strokeWidth="1" />
                <line x1="300" y1="240" x2="400" y2="180" stroke="currentColor" strokeWidth="1" />
                <line x1="400" y1="180" x2="500" y2="222" stroke="currentColor" strokeWidth="1" />
                <line x1="500" y1="240" x2="550" y2="150" stroke="currentColor" strokeWidth="1" />
                <line x1="400" y1="180" x2="400" y2="100" stroke="currentColor" strokeWidth="1" />

                <circle cx="100" cy="150" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="550" cy="150" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
        </div>
    );

    return (
        <div className={`flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col relative text-gray-800`}>

            {/* Header Section - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-full flex flex-col">
                    {/* Top Block: Name and Title */}
                    <div className="px-12 py-10" style={{ backgroundColor: headerBg }}>
                        <h1 className="text-4xl font-normal text-white mb-1 tracking-wide break-words max-w-full">
                            {data.personal.fullName}
                        </h1>
                        <p className="text-lg font-medium tracking-wide break-words max-w-full" style={{ color: accentColor }}>
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    {/* Bottom Block: Contact Info Grid */}
                    <div className="px-12 py-6 text-white text-[11px]" style={{ backgroundColor: contactBg }}>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {data.personal.email && (
                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-[2px] p-0.5 text-gray-900 flex-shrink-0">
                                        <Mail className="w-3 h-3" />
                                    </div>
                                    <span className="break-all font-light tracking-wide">{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.phone && (
                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-[2px] p-0.5 text-gray-900 flex-shrink-0">
                                        <Phone className="w-3 h-3" />
                                    </div>
                                    <span className="break-words font-light tracking-wide">{data.personal.phone}</span>
                                </div>
                            )}
                            {data.personal.address && (
                                <div className="flex items-center gap-3">
                                    <div className="bg-white rounded-[2px] p-0.5 text-gray-900 flex-shrink-0">
                                        <MapPin className="w-3 h-3" />
                                    </div>
                                    <span className="break-words font-light tracking-wide">{data.personal.address}</span>
                                </div>
                            )}
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="flex items-center gap-3" />
                                        <span className="break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={`p-12 flex-1 relative z-10 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <div className="text-xs text-gray-500 mb-10 break-words leading-relaxed font-sans">
                        <p className="mb-0.5 text-[10px] uppercase text-gray-400 font-semibold tracking-wider">To</p>
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
                                    <div className="w-full border-t mb-3" style={{ borderColor: headerBg }}></div>
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

            {/* Bottom Watermark - Only on Last Page */}
            {isLastPage && <TechWatermark />}
        </div>
    );
};
