import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template22 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Dark Purple header background
    const headerBg = '#442d48';
    const whiteText = '#ffffff';

    return (
        <div className={`flex-1 text-[#1a1a1a] text-sm leading-relaxed font-serif overflow-hidden flex flex-col`}>

            {/* Header Section - Dark Purple - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-full p-10 flex justify-between items-center" style={{ backgroundColor: headerBg, color: whiteText }}>

                    {/* Text Content - Left */}
                    <div className="flex-1 min-w-0 pr-6">
                        {/* Name and Title Row */}
                        <div className="flex flex-wrap items-baseline gap-3 mb-4 max-w-full">
                            <h1 className="text-3xl font-bold tracking-tight break-words text-white font-serif max-w-full">
                                {data.personal.fullName}
                            </h1>
                            <p className="text-lg text-white/90 italic break-words font-serif font-light max-w-full">
                                {data.personal.jobTitle}
                            </p>
                        </div>

                        {/* Contact Info - Grid/Flex */}
                        <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-white/90">
                            {data.personal.address && (
                                <div className="flex items-center gap-2 min-w-0">
                                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                                    <span className="break-words">{data.personal.address}</span>
                                </div>
                            )}
                            {data.personal.email && (
                                <div className="flex items-center gap-2 min-w-0">
                                    <Mail className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                                    <span className="break-all">{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.phone && (
                                <div className="flex items-center gap-2 min-w-0">
                                    <Phone className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                                    <span className="break-words">{data.personal.phone}</span>
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

                    {/* Photo - Right */}
                    {data.personal.photo && (
                        <div className="flex-shrink-0">
                            <img
                                src={data.personal.photo}
                                alt="Profile"
                                className="w-28 h-28 rounded-full object-cover border-4 border-white/10 shadow-lg"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Main Body - White Content */}
            <div className={`flex-1 p-12 flex flex-col ${!isFirstPage ? 'pt-16' : ''}`}>
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

                {/* Body Content */}
                <div
                    className="prose prose-sm max-w-none mb-6 leading-7 text-justify break-words text-gray-800 font-serif"
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
                                    <div className="w-full border-t mb-3" style={{ borderColor: headerBg }}></div>
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
