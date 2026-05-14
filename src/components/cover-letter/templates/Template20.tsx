import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template20 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Beige border color
    const borderColor = '#dfb48c';

    return (
        // Main Container with Thick Border
        <div
            className="flex-1 shadow-2xl font-serif overflow-hidden flex flex-col p-6"
            style={{ backgroundColor: borderColor }}
        >
            {/* White Inner Page */}
            <div className={`bg-white flex-1 p-10 flex flex-col ${!isFirstPage ? 'pt-16' : ''}`}>

                {/* Header Section: Flex Row (Text Left, Photo Right) - Only on Page 1 */}
                {isFirstPage && (
                    <div className="flex justify-between items-start mb-12 border-b border-gray-100 pb-8">

                        {/* Text - Left */}
                        <div className="flex-1 min-w-0 pr-6">
                            {/* Name and Title Row */}
                            <div className="flex flex-wrap items-baseline gap-3 mb-3">
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight break-words">
                                    {data.personal.fullName}
                                </h1>
                                <p className="text-lg text-gray-600 italic break-words">
                                    {data.personal.jobTitle}
                                </p>
                            </div>

                            {/* Contact Info - Horizontal with gold/beige icons */}
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-gray-600">
                                {data.personal.address && (
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: borderColor }} />
                                        <span className="break-words">{data.personal.address}</span>
                                    </div>
                                )}
                                {data.personal.email && (
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: borderColor }} />
                                        <span className="break-all">{data.personal.email}</span>
                                    </div>
                                )}
                                {data.personal.phone && (
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: borderColor }} />
                                        <span className="break-words">{data.personal.phone}</span>
                                    </div>
                                )}
                                {/* Socials */}
                                {data.personal.socials.map(s => {
                                    const Icon = getSocialIcon(s.label);
                                    return (
                                        <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                            <Icon className="flex items-center gap-1.5 min-w-0" style={{ color: borderColor }} />
                                            <span className="break-all">{s.value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Photo - Right */}
                        {data.personal.photo && (
                            <div className="flex-shrink-0">
                                <img
                                    src={data.personal.photo}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover shadow-sm bg-gray-50 border-2 border-white"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-end mb-10">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-10 break-words leading-relaxed font-serif">
                            <p className="font-bold mb-1 text-sm">{data.recipient.name}</p>
                            <p className="mb-0.5 font-medium">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-700">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none mb-6 leading-7 text-justify break-words text-gray-800 font-serif"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Signature - Standardized - Only on the LAST page */}
                {isLastPage && (
                    <div className="mt-2 text-gray-800">
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
