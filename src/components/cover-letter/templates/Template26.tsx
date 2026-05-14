import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template26 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Teal accent color
    const tealColor = '#2dd4bf'; // A bright teal similar to the image
    const textColor = '#334155'; // Slate-700

    // Component for the Diamond Divider
    const DiamondDivider = () => (
        <div className="flex items-center w-full my-8 opacity-80">
            <div className="w-1.5 h-1.5 bg-black rotate-45 flex-shrink-0"></div>
            <div className="h-px bg-black flex-1 mx-0"></div>
            <div className="w-1.5 h-1.5 bg-black rotate-45 flex-shrink-0"></div>
        </div>
    );

    return (
        <div className={`flex-1 text-[#1a1a1a] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12`}>

            {/* Header - Centered - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-3xl font-medium text-gray-800 mb-1 tracking-wide text-center uppercase break-words max-w-full">
                        {data.personal.fullName}
                    </h1>
                    <p className="text-lg font-medium text-center uppercase tracking-wider mb-6 break-words max-w-full" style={{ color: tealColor }}>
                        {data.personal.jobTitle}
                    </p>

                    {/* Contact Icons Row */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11px] text-gray-500 font-medium">
                        {data.personal.email && (
                            <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tealColor }} />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tealColor }} />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tealColor }} />
                                <span className="break-words">{data.personal.address}</span>
                            </div>
                        )}
                        {/* Socials */}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="flex items-center gap-1.5" style={{ color: tealColor }} />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Recipient Info - Left Aligned - Only on Page 1 */}
            {isFirstPage && (
                <div className="text-xs text-gray-600 mb-2 break-words leading-relaxed">
                    <p className="mb-0.5">To</p>
                    <p className="font-bold text-gray-800 text-sm mb-1">{data.recipient.name}</p>
                    <p className="mb-0.5">{data.recipient.company}</p>
                    <p className="max-w-full">{data.recipient.address}</p>
                </div>
            )}

            {/* Top Divider - Only on Page 1 */}
            {isFirstPage && <DiamondDivider />}

            {/* Body */}
            <div
                className={`prose prose-sm max-w-none text-justify break-words text-gray-600 font-sans leading-7 mb-6 ${!isFirstPage ? 'pt-8' : ''}`}
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Bottom Divider - Only on Last Page */}
            {isLastPage && <DiamondDivider />}


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
                                <div className="w-full border-t mb-3" style={{ borderColor: tealColor }}></div>
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
    );
};
