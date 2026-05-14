import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template45 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Very dark blue/black from the image
    const sidebarBg = '#0b1120';

    return (
        <div className={`flex-1 text-[#1a1b3a] text-sm leading-relaxed font-mono overflow-hidden flex flex-row`}>

            {/* Left Content - White - Main Body */}
            <div className={`flex-1 p-10 flex flex-col min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="mb-12">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-12 break-words">
                            <p className="font-bold mb-1 text-base">{data.recipient.name}</p>
                            <p className="mb-1 text-gray-800 font-medium">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-600 leading-relaxed">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body - Monospace */}
                <div
                    className="prose prose-sm max-w-none mb-6 text-gray-800 leading-7 text-justify break-words font-mono"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Signature - Only on the LAST page */}
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

            {/* Right Sidebar - Dark - Profile & Contact - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-[38%] p-8 text-gray-300 flex flex-col flex-shrink-0" style={{ backgroundColor: sidebarBg }}>
                    {/* Name */}
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-wide break-words w-full">
                        {data.personal.fullName}
                    </h1>

                    {/* Job Title */}
                    <p className="text-lg text-gray-400 mb-8 break-words w-full">
                        {data.personal.jobTitle}
                    </p>

                    {/* Photo */}
                    {data.personal.photo && (
                        <div className="mb-10">
                            <img
                                src={data.personal.photo}
                                alt="Profile"
                                className="w-32 h-32 object-cover shadow-lg rounded-sm"
                            />
                        </div>
                    )}

                    {/* Contact Info - Vertical */}
                    <div className="flex flex-col gap-4 text-xs font-medium">
                        {data.personal.address && (
                            <div className="flex items-start gap-3 min-w-0">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-white" />
                                <span className="break-words">{data.personal.address}</span>
                            </div>
                        )}
                        {data.personal.email && (
                            <div className="flex items-center gap-3 min-w-0">
                                <Mail className="w-4 h-4 flex-shrink-0 text-white" />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-3 min-w-0">
                                <Phone className="w-4 h-4 flex-shrink-0 text-white" />
                                <span className="break-words">{data.personal.phone}</span>
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
        </div>
    );
};
