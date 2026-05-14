import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template39 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;

    return (
        <div className={`flex-1 p-12 text-[#1a1b3a] text-sm leading-relaxed font-mono`}>
            {/* Header - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex flex-col items-center mb-16">
                    {/* Photo */}
                    {data.personal.photo && (
                        <img
                            src={data.personal.photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-6 border border-gray-200"
                        />
                    )}

                    {/* Purple Name */}
                    <h1 className="text-4xl font-bold text-[#4B3B8C] mb-4 text-center tracking-tight break-words w-full">
                        {data.personal.fullName}
                    </h1>

                    {data.personal.jobTitle && (
                        <p className="text-sm text-gray-600 font-medium mb-6 text-center uppercase tracking-widest break-words w-full">
                            {data.personal.jobTitle}
                        </p>
                    )}

                    {/* Contact Row - Minimalist */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-gray-600 mb-2">
                        {data.personal.address && (
                            <div className="flex items-center gap-2 min-w-0 max-w-full">
                                <MapPin className="w-4 h-4 text-[#4B3B8C] flex-shrink-0" />
                                <span className="break-words text-center">{data.personal.address}</span>
                            </div>
                        )}
                        {data.personal.email && (
                            <div className="flex items-center gap-2 min-w-0 max-w-full">
                                <Mail className="w-4 h-4 text-[#4B3B8C] flex-shrink-0" />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2 min-w-0 max-w-full">
                                <Phone className="w-4 h-4 text-[#4B3B8C] flex-shrink-0" />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                    </div>

                    {/* Socials Row */}
                    {data.personal.socials.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-gray-600">
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="flex items-center gap-2 min-w-0 max-w-full text-[#4B3B8C]" />
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
                    <div className="flex justify-end mb-12">
                        <p className="text-xs font-bold text-gray-900">{data.date}</p>
                    </div>

                    <div className="text-xs text-gray-900 mb-12 break-words">
                        <p className="font-bold mb-1">{data.recipient.name}</p>
                        <p className="font-bold mb-1">{data.recipient.company}</p>
                        <p className="max-w-full font-medium text-gray-700">
                            {data.recipient.address}
                        </p>
                    </div>
                </>
            )}

            {/* Body */}
            <div
                className="prose prose-sm max-w-none mb-6 text-[#1a1b3a] leading-8 text-justify font-mono break-words"
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
    );
};
