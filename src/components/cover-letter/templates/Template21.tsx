import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template21 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Sage Green sidebar background
    const sidebarBg = '#b5c6be';
    const textColor = '#1a1a1a';
    const dimText = '#333333';

    return (
        <div className={`flex-1 text-[#1a1a1a] text-sm leading-relaxed font-serif overflow-hidden flex flex-row`}>

            {/* Left Sidebar - Sage Green - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-[38%] p-8 flex flex-col flex-shrink-0" style={{ backgroundColor: sidebarBg }}>
                    {/* Name - Stacked and Bold */}
                    <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2 tracking-tight leading-tight break-words w-full font-serif text-shadow-sm">
                        {data.personal.fullName}
                    </h1>

                    {/* Job Title */}
                    <p className="text-lg text-[#2d3a31] mb-8 font-serif italic leading-tight break-words w-full opacity-90">
                        {data.personal.jobTitle}
                    </p>

                    {/* Contact Info - Vertical with Icons */}
                    <div className="flex flex-col gap-3 text-xs font-semibold text-[#2d3a31]">
                        {data.personal.email && (
                            <div className="flex items-center gap-2 min-w-0">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-[#1a1a1a]" />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2 min-w-0">
                                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-[#1a1a1a]" />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-start gap-2 min-w-0">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#1a1a1a] mt-0.5" />
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

            {/* Right Content - White - Main Body */}
            <div className={`flex-1 p-12 flex flex-col min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-end mb-12">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-10 break-words font-serif leading-relaxed">
                            <p className="font-bold mb-1 text-sm">{data.recipient.name}</p>
                            <p className="mb-0.5 text-gray-800">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-700">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none mb-6 leading-7 text-justify break-words text-gray-800 font-serif"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Signature Section - Only on the LAST page */}
                {isLastPage && (
                    <div className="mt-2 text-gray-800">
                        <p className="text-sm font-medium text-inherit mb-2 font-serif">Sincerely,</p>

                        {/* Signature Block */}
                        <div className="flex flex-col items-start">
                            {/* Signature Image */}
                            {data.signature.image ? (
                                <img src={data.signature.image} alt="Signature" className="h-10 object-contain mb-1" />
                            ) : (
                                <p className="text-sm font-bold text-gray-900 break-words font-serif">
                                    {data.signature.name || data.personal.fullName}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
