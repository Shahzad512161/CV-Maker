import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getSocialIcon } from '../utils/social-icons';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template37 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;

    return (
        <div className={`flex-1 p-12 text-[#1a1b3a] text-sm leading-relaxed font-sans`}>
            {/* Header - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex flex-col items-center mb-12">
                    {/* Photo */}
                    {data.personal.photo && (
                        <img
                            src={data.personal.photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-200"
                        />
                    )}

                    <h1 className="text-3xl font-bold text-gray-900 mb-1 text-center capitalize break-words w-full">
                        {data.personal.fullName}
                    </h1>
                    <p className="text-lg text-gray-700 font-medium mb-4 text-center break-words w-full">
                        {data.personal.jobTitle}
                    </p>

                    {/* Contact Row */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600 font-medium mb-3">
                        {data.personal.email && (
                            <div className="flex items-center gap-1.5 min-w-0 max-w-full">
                                <Mail className="w-3.5 h-3.5 fill-gray-900 text-gray-900 flex-shrink-0" />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-1.5 min-w-0 max-w-full">
                                <Phone className="w-3.5 h-3.5 fill-gray-900 text-gray-900 flex-shrink-0" />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-1.5 min-w-0 max-w-full">
                                <MapPin className="w-3.5 h-3.5 fill-gray-900 text-gray-900 flex-shrink-0" />
                                <span className="break-words text-center">{data.personal.address}</span>
                            </div>
                        )}
                    </div>

                    {/* Socials Row */}
                    {data.personal.socials.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600 font-medium">
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="w-3.5 h-3.5 text-gray-900 flex-shrink-0" />
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

                    <div className="text-xs text-gray-900 mb-8 break-words">
                        <p className="font-bold mb-1">{data.recipient.name}</p>
                        <p className="mb-0.5">{data.recipient.company}</p>
                        <p className="max-w-full leading-relaxed text-gray-600">
                            {data.recipient.address}
                        </p>
                    </div>
                </>
            )}

            {/* Body - Flowing content for this page */}
            <div
                className="prose prose-sm max-w-none text-[#1a1b3a] leading-7 text-justify break-words mb-6"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Signature - Only on the LAST page */}
            {isLastPage && (
                <div className="mt-2 text-[#1a1b3a]">
                    <p className="text-inherit mb-2 font-medium">Sincerely,</p>

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
