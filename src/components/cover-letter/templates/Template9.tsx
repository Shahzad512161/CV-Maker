import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template9 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Exact purple color from the image estimate
    const purpleColor = '#5d2e8e';

    return (
        <div className={`flex-1 p-12 text-[#1a1b3a] text-sm leading-relaxed font-serif overflow-hidden flex flex-col`}>

            {/* Header Section - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex justify-between items-start mb-12">
                    {/* Left Side: Name, Title, Contact */}
                    <div className="flex-1 pr-8 min-w-0">
                        <h1
                            className="text-4xl font-bold mb-2 tracking-tight break-words w-full"
                            style={{ color: purpleColor }}
                        >
                            {data.personal.fullName}
                        </h1>
                        <p
                            className="text-xl mb-6 break-words w-full"
                            style={{ color: purpleColor }}
                        >
                            {data.personal.jobTitle}
                        </p>

                        {/* Contact Grid - 2 Columns */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium" style={{ color: purpleColor }}>
                            {/* Column 1: Address & Phone */}
                            {data.personal.address && (
                                <div className="flex items-start gap-2 min-w-0 col-span-1">
                                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                    <span className="break-words">{data.personal.address}</span>
                                </div>
                            )}
                            {data.personal.email && (
                                <div className="flex items-center gap-2 min-w-0 col-span-1">
                                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="break-all">{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.phone && (
                                <div className="flex items-center gap-2 min-w-0 col-span-1">
                                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="break-words">{data.personal.phone}</span>
                                </div>
                            )}

                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="flex items-center gap-2 min-w-0 col-span-1" />
                                        <span className="break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side: Photo */}
                    {data.personal.photo && (
                        <div className="flex-shrink-0 ml-4">
                            <img
                                src={data.personal.photo}
                                alt="Profile"
                                className="w-28 h-28 rounded-full object-cover shadow-sm bg-gray-50"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Date and Recipient - Only on Page 1 */}
            {isFirstPage && (
                <>
                    <div className="flex justify-end mb-8">
                        <p className="text-xs font-bold" style={{ color: purpleColor }}>{data.date}</p>
                    </div>

                    <div className="text-xs mb-10 break-words" style={{ color: purpleColor }}>
                        <p className="font-bold mb-1 text-sm">{data.recipient.name}</p>
                        <p className="mb-0.5 font-medium">{data.recipient.company}</p>
                        <p className="max-w-full leading-relaxed opacity-90">
                            {data.recipient.address}
                        </p>
                    </div>
                </>
            )}

            {/* Body */}
            <div
                className="prose prose-sm max-w-none mb-6 leading-7 text-justify break-words font-serif"
                style={{ color: purpleColor }}
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Signature - Only on the LAST page */}
            {isLastPage && (
                <div className="mt-2" style={{ color: purpleColor }}>
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
    );
};
