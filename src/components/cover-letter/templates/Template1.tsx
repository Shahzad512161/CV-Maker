import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template1 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;

    return (
        <div className={`flex-1 p-12 text-[#1a1b3a] text-sm leading-relaxed font-serif overflow-hidden flex flex-col`}>

            {/* Header Section - Left Aligned - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex flex-col items-start mb-12">

                    {/* Name */}
                    <h1 className="text-4xl font-bold mb-2 text-gray-900 tracking-tight break-words w-full">
                        {data.personal.fullName}
                    </h1>

                    {/* Job Title */}
                    <p className="text-lg text-gray-600 mb-6 font-medium break-words w-full">
                        {data.personal.jobTitle}
                    </p>

                    {/* Contact List - Vertical with Icons */}
                    <div className="flex flex-col gap-2 text-xs font-semibold text-gray-700">
                        {data.personal.email && (
                            <div className="flex items-center gap-3 min-w-0">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-gray-900" />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-3 min-w-0">
                                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-900" />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-3 min-w-0">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-900" />
                                <span className="break-words">{data.personal.address}</span>
                            </div>
                        )}

                        {/* Socials */}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="flex items-center gap-3 min-w-0" />
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
                    <div className="flex justify-end mb-8">
                        <p className="text-xs font-bold text-gray-900">{data.date}</p>
                    </div>

                    <div className="text-xs text-gray-900 mb-8 break-words font-serif">
                        <p className="font-bold mb-1 text-sm">{data.recipient.name}</p>
                        <p className="mb-0.5 text-gray-700">{data.recipient.company}</p>
                        <p className="max-w-full text-gray-600 leading-relaxed">
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
