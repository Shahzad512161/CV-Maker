import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template40 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;

    return (
        <div className={`flex-1 text-[#1a1b3a] text-sm leading-relaxed font-sans flex flex-col`}>
            {/* Header - Split Layout - Only on Page 1 */}
            {isFirstPage && (
                <div className="bg-white p-12 pb-8 flex justify-between items-start">
                    {/* Left Column: Info */}
                    <div className="flex-1 pr-8 min-w-0">
                        <h1 className="text-4xl font-serif font-bold text-[#4A6741] mb-2 tracking-tight break-words">
                            {data.personal.fullName}
                        </h1>
                        <p className="text-xl italic text-[#7CA670] mb-6 font-serif break-words">
                            {data.personal.jobTitle}
                        </p>

                        {/* Contact Info - Vertical List */}
                        <div className="flex flex-col gap-2 text-xs font-medium text-gray-600">
                            {data.personal.address && (
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="flex items-center shrink-0"><MapPin className="w-4 h-4 text-[#4A6741]" /></span>
                                    <span className="break-words leading-snug">{data.personal.address}</span>
                                </div>
                            )}
                            {data.personal.email && (
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="flex items-center shrink-0"><Mail className="w-4 h-4 text-[#4A6741]" /></span>
                                    <span className="break-all leading-snug">{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.phone && (
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="flex items-center shrink-0"><Phone className="w-4 h-4 text-[#4A6741]" /></span>
                                    <span className="break-words leading-snug">{data.personal.phone}</span>
                                </div>
                            )}
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-2 min-w-0 max-w-full">
                                        <span className="flex items-center shrink-0"><Icon className="w-4 h-4 text-[#4A6741]" /></span>
                                        <span className="break-all leading-snug">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Photo */}
                    {data.personal.photo && (
                        <div className="w-40 h-40 flex-shrink-0 bg-gray-100 ml-4">
                            <img
                                src={data.personal.photo}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Main Content Container - Sage Green Background */}
            <div className={`bg-[#ebf2eb] p-12 flex-1 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-end mb-10">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-10 font-medium break-words">
                            <p className="font-bold mb-1 text-black">{data.recipient.name}</p>
                            <p className="mb-0.5 text-gray-800">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-700 leading-relaxed">
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
