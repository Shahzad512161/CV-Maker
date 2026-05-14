import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template3 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;

    return (
        <div className={`flex-1 text-[#1a1b3a] text-sm leading-relaxed font-sans flex flex-col`}>
            {/* Header - Full Width Dark Purple - Only on Page 1 */}
            {isFirstPage && (
                <div className="bg-[#581c4d] text-white p-12 flex flex-col items-center justify-center">
                    {/* Photo */}
                    {data.personal.photo && (
                        <img
                            src={data.personal.photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-white/20"
                        />
                    )}

                    <h1 className="text-4xl font-bold mb-2 text-center tracking-tight break-words w-full">
                        {data.personal.fullName}
                    </h1>

                    <p className="text-xl font-medium mb-6 text-center text-white/90 break-words w-full">
                        {data.personal.jobTitle}
                    </p>

                    {/* Contact Row - White Icons/Text */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/80">
                        {data.personal.email && (
                            <div className="flex items-center gap-2 min-w-0 max-w-full">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2 min-w-0 max-w-full">
                                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-2 min-w-0 max-w-full">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="break-words text-center">{data.personal.address}</span>
                            </div>
                        )}
                    </div>

                    {/* Socials Row */}
                    {data.personal.socials.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/80 mt-2">
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="flex items-center gap-2 min-w-0 max-w-full" />
                                        <span className="break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Main Content Container - White Background */}
            <div className={`p-12 flex-1 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-end mb-10">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-10 break-words">
                            <p className="font-bold mb-1">{data.recipient.name}</p>
                            <p className="mb-0.5 text-gray-700">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-600">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none mb-6 text-[#1a1b3a] leading-7 text-justify break-words"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Signature - Only on the LAST page */}
                {isLastPage && (
                    <div className="mt-2 text-[#1a1b3a]">
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
