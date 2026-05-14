import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template46 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Dark blue color from the image estimate
    const headerBg = '#1e2f42';

    return (
        <div className={`flex-1 text-[#1a1b3a] text-sm leading-relaxed font-serif overflow-hidden flex flex-col`}>

            {/* Header Section - Full Width Dark Blue - Only on Page 1 */}
            {isFirstPage && (
                <div className="p-12 text-white flex flex-col" style={{ backgroundColor: headerBg }}>
                    {/* Name */}
                    <h1 className="text-4xl font-bold mb-1 tracking-wide break-words w-full font-serif">
                        {data.personal.fullName}
                    </h1>

                    {/* Job Title */}
                    <p className="text-lg text-gray-300 mb-6 font-medium break-words w-full">
                        {data.personal.jobTitle}
                    </p>

                    {/* Contact List - Horizontal Flex / Wrap */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-gray-300">
                        {data.personal.email && (
                            <div className="flex items-center gap-2 min-w-0">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2 min-w-0">
                                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-2 min-w-0">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                                <span className="break-words">{data.personal.address}</span>
                            </div>
                        )}

                        {/* Socials */}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="flex items-center gap-2 min-w-0" />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Main Content Body */}
            <div className={`p-12 flex-1 flex flex-col ${!isFirstPage ? 'pt-16' : 'pt-10'}`}>
                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-end mb-8">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-8 break-words font-serif leading-relaxed">
                            <p className="font-bold mb-1">{data.recipient.name}</p>
                            <p className="mb-0.5 text-gray-800">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-700">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body Text */}
                <div
                    className="prose prose-sm max-w-none mb-6 leading-7 text-justify break-words text-gray-800 font-serif"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Signature Section - Only on the LAST page */}
                {isLastPage && (
                    <div className="mt-auto flex justify-between items-end pt-2">
                        {/* Left: Sincerely */}
                        <div className="pb-4">
                            <p className="text-sm font-medium text-gray-800">Sincerely,</p>
                        </div>

                        {/* Right: Signature Block (Line + Name) */}
                        <div className="flex flex-col items-end min-w-[200px]">
                            {/* Signature Image */}
                            {data.signature.image ? (
                                <img src={data.signature.image} alt="Signature" className="h-16 object-contain mb-1" />
                            ) : (
                                <div className="h-16 w-full mb-1"></div>
                            )}

                            {/* Line */}
                            <div className="w-full h-px bg-gray-400 mb-2"></div>

                            {/* Typed Name */}
                            <p className="text-sm font-bold text-gray-900 break-words text-right w-full font-serif">
                                {data.signature.name || data.personal.fullName}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
