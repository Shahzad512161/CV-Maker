import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Circle } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template48 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Red color from the image estimate
    const nameColor = '#c4302b';

    return (
        <div className={`flex-1 p-12 text-[#1a1b3a] text-sm leading-relaxed font-serif overflow-hidden flex flex-col`}>

            {/* Header Section - Centered - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex flex-col items-center mb-10">

                    {/* Photo - Centered at Top */}
                    {data.personal.photo && (
                        <div className="mb-6">
                            <img
                                src={data.personal.photo}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover shadow-md"
                            />
                        </div>
                    )}

                    {/* Name - Red, Sans-Serif, Bold */}
                    <h1
                        className="text-3xl font-bold mb-3 tracking-wide break-words text-center font-sans uppercase"
                        style={{ color: nameColor }}
                    >
                        {data.personal.fullName}
                    </h1>

                    {/* Job Title */}
                    {data.personal.jobTitle && (
                        <p className="text-lg text-gray-600 mb-3 font-medium text-center font-sans">
                            {data.personal.jobTitle}
                        </p>
                    )}

                    {/* Contact Row - Single Line with Separators */}
                    <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-xs font-semibold text-gray-700 font-sans">
                        {data.personal.address && (
                            <div className="flex items-center gap-2">
                                <span className="break-words text-center">{data.personal.address}</span>
                                {(data.personal.email || data.personal.phone || data.personal.socials.length > 0) && (
                                    <span className="text-gray-400">•</span>
                                )}
                            </div>
                        )}
                        {data.personal.email && (
                            <div className="flex items-center gap-2">
                                <span className="break-all">{data.personal.email}</span>
                                {(data.personal.phone || data.personal.socials.length > 0) && (
                                    <span className="text-gray-400">•</span>
                                )}
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2">
                                <span className="break-words">{data.personal.phone}</span>
                                {(data.personal.socials.length > 0) && (
                                    <span className="text-gray-400">•</span>
                                )}
                            </div>
                        )}

                        {/* Socials */}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="flex items-center gap-2" />
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
                        <p className="text-xs font-bold text-gray-900 font-sans">{data.date}</p>
                    </div>

                    <div className="text-xs text-gray-900 mb-10 break-words font-sans">
                        <p className="font-bold mb-1 text-sm">{data.recipient.name}</p>
                        <p className="mb-0.5 font-bold text-gray-700">{data.recipient.company}</p>
                        <p className="max-w-full text-gray-600 font-normal">
                            {data.recipient.address}
                        </p>
                    </div>
                </>
            )}

            {/* Body - Serif as per image */}
            <div
                className={`prose prose-sm max-w-none mb-6 leading-7 text-justify break-words text-gray-800 font-serif ${!isFirstPage ? 'pt-16' : ''}`}
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
    );
};
