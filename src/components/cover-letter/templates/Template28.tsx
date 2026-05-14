import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template28 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors from the design
    const cardBgColor = '#0d503c'; // Deep green for the contact card
    const accentColor = '#e69b76'; // Peach/Orange for title and lines
    const textColor = '#4b5563'; // Gray-600 for body text
    const nameColor = '#1f2937'; // Gray-800 for name

    // Decorative Multi-colored Divider
    const Divider = () => (
        <div className="flex w-full h-1 my-8">
            <div className="w-1/3 h-full" style={{ backgroundColor: accentColor }}></div>
            <div className="w-1/3 h-full" style={{ backgroundColor: cardBgColor }}></div>
            <div className="w-1/3 h-full" style={{ backgroundColor: accentColor }}></div>
        </div>
    );

    return (
        <div className={`flex-1 text-[#1a1a1a] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12`}>

            {/* Header / Top Section - Split Layout - Only on First Page */}
            {isFirstPage && (
                <div className="flex justify-between items-start gap-8 mb-4">

                    {/* Left Side: Name, Title, Recipient */}
                    <div className="flex-1 flex flex-col pt-2 min-w-0 pr-4">
                        <h1 className="text-4xl font-normal tracking-tight mb-1 break-words leading-tight max-w-full" style={{ color: nameColor }}>
                            {data.personal.fullName}
                        </h1>
                        <p className="text-sm font-medium uppercase tracking-wide mb-10 break-words max-w-full" style={{ color: accentColor }}>
                            {data.personal.jobTitle}
                        </p>

                        {/* Recipient Info - Placed here in the left column per design */}
                        <div className="text-xs text-gray-500 mb-0 break-words leading-relaxed">
                            <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-400">To</p>
                            <p className="font-bold text-gray-700 text-sm mb-0.5">{data.recipient.name}</p>
                            <p className="mb-0.5 font-medium">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-500">
                                {data.recipient.address}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Contact Card */}
                    <div
                        className="w-[220px] rounded-lg p-5 flex flex-col gap-3 font-medium text-[11px] text-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: cardBgColor }}
                    >
                        {data.personal.email && (
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-1.5 rounded text-white flex-shrink-0">
                                    <Mail className="w-3.5 h-3.5" />
                                </div>
                                <span className="break-all leading-tight">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-1.5 rounded text-white flex-shrink-0">
                                    <Phone className="w-3.5 h-3.5" />
                                </div>
                                <span className="break-words leading-tight">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-1.5 rounded text-white flex-shrink-0">
                                    <MapPin className="w-3.5 h-3.5" />
                                </div>
                                <span className="break-words leading-tight">{data.personal.address}</span>
                            </div>
                        )}

                        {/* Socials */}
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
            )}

            {/* Top Divider - Only on First Page */}
            {isFirstPage && <Divider />}

            {/* Body */}
            <div
                className={`prose prose-sm max-w-none text-justify break-words font-sans leading-7 mb-6 ${!isFirstPage ? 'pt-16' : ''}`}
                style={{ color: textColor }}
                dangerouslySetInnerHTML={{ __html: content }}
            />


            {/* Signature - Standardized - Only on the LAST page */}
            {isLastPage && (
                <div className="mt-2" style={{ color: textColor }}>
                    <p className="mb-2 font-bold text-inherit">Sincerely,</p>

                    <div className="w-fit min-w-[200px]">
                        {data.signature.image && (
                            <>
                                <img
                                    src={data.signature.image}
                                    alt="Signature"
                                    className="h-16 object-contain mb-2 block"
                                />
                                <div className="w-full border-t mb-3" style={{ borderColor: accentColor }}></div>
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

            {/* Bottom Divider - Only on Last Page */}
            {isLastPage && <Divider />}

        </div>
    );
};
