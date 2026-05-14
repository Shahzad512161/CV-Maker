import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template44 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Teal color from the image estimate
    const tealColor = '#00796b';

    return (
        <div className={`flex-1 p-12 text-[#1a1b3a] text-sm leading-relaxed font-serif overflow-hidden flex flex-col`}>

            {/* Header Section - Centered - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex flex-col items-center mb-16">

                    {/* Name in "joining writing" (Script font) */}
                    <h1
                        className="text-5xl mb-3 text-center font-handwriting break-words w-full"
                        style={{ color: tealColor }}
                    >
                        {data.personal.fullName}
                    </h1>

                    {/* Contact Row */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-700 mt-2">
                        {data.personal.address && (
                            <div className="flex items-center gap-2 min-w-0">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tealColor }} />
                                <span className="break-words text-center">{data.personal.address}</span>
                            </div>
                        )}
                        {data.personal.email && (
                            <div className="flex items-center gap-2 min-w-0">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tealColor }} />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2 min-w-0">
                                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tealColor }} />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}

                        {/* Socials */}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="flex items-center gap-2 min-w-0" style={{ color: tealColor }} />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Date and Recipient - Only on Page 1 */}
            {isFirstPage && (
                <>
                    <div className="flex justify-end mb-12">
                        <p className="text-xs font-bold text-gray-900">{data.date}</p>
                    </div>

                    <div className="text-xs text-gray-900 mb-10 break-words font-bold">
                        <p className="mb-1 text-sm">{data.recipient.name}</p>
                        <p className="mb-0.5">{data.recipient.company}</p>
                        <p className="max-w-full font-normal text-gray-800">
                            {data.recipient.address}
                        </p>
                    </div>
                </>
            )}

            {/* Body */}
            <div
                className="prose prose-sm max-w-none mb-6 leading-7 text-justify break-words text-gray-900 font-serif"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Signature - Only on the LAST page */}
            {isLastPage && (
                <div className="mt-2 text-gray-900">
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
    );
};
