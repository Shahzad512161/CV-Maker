import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template14 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Light blue-ish gray background for header
    const headerBg = '#f1f5f9';

    return (
        <div className={`flex-1 text-[#1a1b3a] text-sm leading-relaxed font-serif overflow-hidden flex flex-col`}>

            {/* Header Section - Light Blue Background, Centered - Only on Page 1 */}
            {isFirstPage && (
                <div className="py-10 px-12 flex flex-col items-center" style={{ backgroundColor: headerBg }}>
                    {/* Name */}
                    <h1 className="text-3xl font-bold mb-1 tracking-wide text-gray-900 text-center break-words w-full">
                        {data.personal.fullName}
                    </h1>

                    {/* Job Title */}
                    <p className="text-lg text-gray-700 mb-8 font-medium text-center break-words w-full">
                        {data.personal.jobTitle}
                    </p>

                    {/* Contact Grid - 3 Columns with Icons on Top */}
                    <div className="grid grid-cols-3 gap-4 w-full text-xs font-medium text-gray-800">

                        {/* Column 1: Phone (Left/First if available) */}
                        <div className="flex flex-col items-center text-center gap-1 min-w-0">
                            {data.personal.phone && (
                                <>
                                    <Phone className="w-4 h-4 text-gray-900 mb-1" />
                                    <span className="break-words max-w-full">{data.personal.phone}</span>
                                </>
                            )}
                        </div>

                        {/* Column 2: Address (Center) */}
                        <div className="flex flex-col items-center text-center gap-1 min-w-0">
                            {data.personal.address && (
                                <>
                                    <MapPin className="w-4 h-4 text-gray-900 mb-1" />
                                    <span className="break-words max-w-full">{data.personal.address}</span>
                                </>
                            )}
                        </div>

                        {/* Column 3: Email (Right) */}
                        <div className="flex flex-col items-center text-center gap-1 min-w-0">
                            {data.personal.email && (
                                <>
                                    <Mail className="w-4 h-4 text-gray-900 mb-1" />
                                    <span className="break-all max-w-full">{data.personal.email}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Socials */}
                    {data.personal.socials.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="flex flex-col items-center text-center gap-1 min-w-0" />
                                        <span className="break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Main Content Body */}
            <div className={`p-12 flex-1 flex flex-col ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-end mb-12">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-8 break-words leading-relaxed font-serif">
                            <p className="font-bold mb-1 text-sm">{data.recipient.name}</p>
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

                {/* Signature - Only on the LAST page */}
                {isLastPage && (
                    <div className="mt-2 text-gray-800">
                        <p className="text-sm font-medium text-inherit mb-2">Sincerely,</p>
                        {data.signature.image ? (
                            <div className="mb-2">
                                <img src={data.signature.image} alt="Signature" className="h-12 object-contain" />
                            </div>
                        ) : (
                            <p className="text-sm font-bold text-gray-900 mb-1 break-words">
                                {data.signature.name || data.personal.fullName}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
