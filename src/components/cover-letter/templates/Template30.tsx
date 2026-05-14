import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template30 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Monochrome / Gray scale
    const nameColor = '#333';
    const textColor = '#555';

    return (
        <div className={`flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12`}>

            {/* Header Section - Split - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex justify-between items-start mb-16">

                    {/* Left Side: Name, Title, Recipient */}
                    <div className="flex-1 pr-8 min-w-0">
                        <h1 className="text-3xl font-normal mb-1 tracking-wide text-gray-800 break-words leading-tight font-serif max-w-full" style={{ color: nameColor }}>
                            {data.personal.fullName}
                        </h1>
                        <p className="text-sm font-medium text-gray-500 mb-10 break-words uppercase tracking-wider max-w-full">
                            {data.personal.jobTitle}
                        </p>

                        {/* Recipient Info */}
                        <div className="text-xs text-gray-500 break-words leading-relaxed">
                            <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-400">To</p>
                            <p className="font-bold text-gray-700 text-sm mb-0.5">{data.recipient.name}</p>
                            <p className="mb-0.5 font-medium">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-500">
                                {data.recipient.address}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Contact Info - Right Aligned */}
                    <div className="flex flex-col items-end gap-1.5 text-[11px] text-gray-500 font-light">
                        {data.personal.email && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-all text-right">{data.personal.email}</span>
                                <Mail className="w-3.5 h-3.5 text-gray-800 fill-gray-800" />
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-words text-right">{data.personal.phone}</span>
                                <Phone className="w-3.5 h-3.5 text-gray-800 fill-gray-800" />
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-3 justify-end">
                                <span className="break-words text-right">{data.personal.address}</span>
                                <MapPin className="w-3.5 h-3.5 text-gray-800 fill-gray-800" />
                            </div>
                        )}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <span className="break-all">{s.value}</span>
                                    <Icon className="w-3.5 h-3.5 text-gray-800 fill-gray-800" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Body */}
            <div
                className={`prose prose-sm max-w-none text-justify break-words text-gray-600 font-serif leading-7 mb-6 ${!isFirstPage ? 'pt-16' : ''}`}
                dangerouslySetInnerHTML={{ __html: content }}
            />


            {/* Signature - Standardized - Only on the LAST page */}
            {isLastPage && (
                <div className="mt-2 text-gray-600">
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
