import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template24 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Red accent color
    const redColor = '#d93025';

    return (
        <div className={`flex-1 text-[#1a1a1a] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12`}>

            {/* Header Section - Centered - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex flex-col items-center mb-12">
                    {/* Name - Red, Sans-serif, Large */}
                    <h1
                        className="text-4xl font-normal mb-2 tracking-wide text-center uppercase break-words max-w-full"
                        style={{ color: redColor }}
                    >
                        {data.personal.fullName}
                    </h1>

                    {/* Job Title */}
                    {data.personal.jobTitle && (
                        <p className="text-lg text-gray-600 mb-4 font-light text-center uppercase tracking-wider break-words max-w-full">
                            {data.personal.jobTitle}
                        </p>
                    )}

                    {/* Contact Info - Horizontal Row with Red Icons */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-gray-700 font-medium">
                        {data.personal.address && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" style={{ color: redColor }} />
                                <span className="break-words">{data.personal.address}</span>
                            </div>
                        )}
                        {data.personal.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" style={{ color: redColor }} />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" style={{ color: redColor }} />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {/* Socials */}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="flex items-center gap-2" style={{ color: redColor }} />
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
                    <div className="flex justify-end mb-10">
                        <p className="text-xs font-bold text-gray-900">{data.date}</p>
                    </div>

                    <div className="text-xs text-gray-900 mb-10 break-words leading-relaxed font-sans">
                        <p className="font-bold mb-1 text-sm">{data.recipient.name}</p>
                        <p className="mb-0.5 font-semibold text-gray-800">{data.recipient.company}</p>
                        <p className="max-w-full text-gray-600">
                            {data.recipient.address}
                        </p>
                    </div>
                </>
            )}

            {/* Body */}
            <div
                className={`prose prose-sm max-w-none mb-6 leading-7 text-justify break-words text-gray-800 font-sans ${!isFirstPage ? 'pt-16' : ''}`}
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
