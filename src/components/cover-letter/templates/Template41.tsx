import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template41 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;

    return (
        <div className={`flex-1 text-[#1a1b3a] text-sm leading-relaxed font-sans flex flex-col p-2`}>
            {/* Main Content with Blue Border (On all pages for consistency) */}
            <div className="flex-1 border-[6px] border-[#3b4d8f] p-10 flex flex-col">
                {/* Header - Only on Page 1 */}
                {isFirstPage && (
                    <div className="flex flex-col items-center mb-12">
                        {/* Photo */}
                        {data.personal.photo && (
                            <div className="mb-6">
                                <img
                                    src={data.personal.photo}
                                    alt="Profile"
                                    className="w-28 h-28 rounded-full object-cover border-4 border-[#3b4d8f]/10 shadow-sm"
                                />
                            </div>
                        )}

                        <h1 className="text-4xl font-serif font-bold text-[#3b4d8f] mb-2 tracking-wide text-center break-words w-full">
                            {data.personal.fullName}
                        </h1>

                        {data.personal.jobTitle && (
                            <p className="text-lg text-gray-600 mb-6 font-medium tracking-wide uppercase text-center break-words w-full">
                                {data.personal.jobTitle}
                            </p>
                        )}

                        {/* Contact Info - Centered Row */}
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-700">
                            {data.personal.address && (
                                <div className="flex items-center gap-2 min-w-0 max-w-full">
                                    <MapPin className="w-4 h-4 text-[#3b4d8f] fill-[#3b4d8f]/10 flex-shrink-0" />
                                    <span className="break-words text-center">{data.personal.address}</span>
                                </div>
                            )}
                            {data.personal.email && (
                                <div className="flex items-center gap-2 min-w-0 max-w-full">
                                    <Mail className="w-4 h-4 text-[#3b4d8f] fill-[#3b4d8f]/10 flex-shrink-0" />
                                    <span className="break-all">{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.phone && (
                                <div className="flex items-center gap-2 min-w-0 max-w-full">
                                    <Phone className="w-4 h-4 text-[#3b4d8f] fill-[#3b4d8f]/10 flex-shrink-0" />
                                    <span className="break-words">{data.personal.phone}</span>
                                </div>
                            )}
                        </div>
                        {/* Socials */}
                        {data.personal.socials.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-700 mt-2">
                                {data.personal.socials.map(s => {
                                    const Icon = getSocialIcon(s.label);
                                    return (
                                        <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                            <Icon className="flex items-center gap-2 min-w-0 max-w-full text-[#3b4d8f]" />
                                            <span className="break-all">{s.value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-end mb-8">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-10 break-words">
                            <p className="font-bold mb-1 text-black text-sm">{data.recipient.name}</p>
                            <p className="mb-0.5 text-gray-800 font-bold">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-600 leading-relaxed font-medium">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none mb-6 text-gray-800 leading-7 text-justify break-words"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Signature - Only on the LAST page */}
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
                                    <div className="w-full border-t mb-3" style={{ opacity: 0.5, borderColor: 'currentColor' }}></div>
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
