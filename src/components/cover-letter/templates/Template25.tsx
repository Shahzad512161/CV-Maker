import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template25 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    return (
        // Outer Leaf Texture Container
        <div
            className="flex-1 shadow-2xl font-sans overflow-hidden flex flex-col p-8 bg-cover bg-center"
            style={{ backgroundImage: "url('/leaf-texture.png')" }}
        >
            {/* Inner White Sheet */}
            <div className={`bg-white flex-1 w-full h-full shadow-md p-10 flex flex-col ${!isFirstPage ? 'pt-16' : ''}`}>

                {/* Header Section - Centered - Only on Page 1 */}
                {isFirstPage && (
                    <div className="flex flex-col items-center mb-10 w-full">
                        {/* Name - Bold, Sans-serif */}
                        <h1 className="text-3xl font-bold mb-1 tracking-tight text-center break-words max-w-full text-gray-900">
                            {data.personal.fullName}
                        </h1>

                        {/* Title - Italic, Lighter */}
                        <p className="text-lg text-gray-600 mb-6 font-medium italic text-center break-words max-w-full">
                            {data.personal.jobTitle}
                        </p>

                        {/* Contact Info - Horizontal Row */}
                        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11px] text-gray-900 font-semibold uppercase tracking-wide">
                            {data.personal.email && (
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5 flex-shrink-0 text-gray-800" />
                                    <span className="break-all normal-case tracking-normal">{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.phone && (
                                <div className="flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-800" />
                                    <span className="break-words normal-case tracking-normal">{data.personal.phone}</span>
                                </div>
                            )}
                            {data.personal.address && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-800" />
                                    <span className="break-words normal-case tracking-normal">{data.personal.address}</span>
                                </div>
                            )}

                            {/* Socials */}
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="flex items-center gap-1.5" />
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
                            <p className="mb-0.5 font-medium text-gray-800">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-600">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none mb-6 leading-7 text-justify break-words text-gray-800 font-sans"
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
