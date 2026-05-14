import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template43 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;

    return (
        <div className={`flex-1 p-12 text-[#1a1b3a] text-sm leading-relaxed font-mono overflow-hidden flex flex-col relative border-[16px] border-[#3b4d45]`}>
            {/* Dark Green Border - Simulating the border in the image if it's part of the design, 
                or just using the page border. The image shows a dark border AROUND the white page.
                I will add a border to the main container. Colors picked from image: #3b4d45 (Dark Slate Green) 
            */}

            {/* Header Section - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex justify-between items-start mb-12 border-b border-gray-300 pb-8 border-none">
                    {/* Left Side: Name, Title, Contact */}
                    <div className="flex-1 pr-8 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3 w-full">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight break-words max-w-full">
                                {data.personal.fullName}
                            </h1>
                            <p className="text-lg italic text-gray-600 break-words max-w-full">
                                {data.personal.jobTitle}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5 text-xs text-gray-700 font-medium">
                            {data.personal.address && (
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="break-words">{data.personal.address}</span>
                                </div>
                            )}
                            {data.personal.email && (
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="break-all">{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.phone && (
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="break-words">{data.personal.phone}</span>
                                </div>
                            )}
                            {/* Socials - Simple list */}
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

                    {/* Right Side: Photo */}
                    {data.personal.photo && (
                        <div className="flex-shrink-0 ml-4">
                            <img
                                src={data.personal.photo}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover grayscale opacity-90"
                            />
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

                    <div className="text-xs text-gray-900 mb-8 break-words font-bold">
                        <p className="mb-1">{data.recipient.name}</p>
                        <p className="mb-1">{data.recipient.company}</p>
                        <p className="max-w-full text-gray-800 font-normal">
                            {data.recipient.address}
                        </p>
                    </div>
                </>
            )}

            {/* Body */}
            <div
                className="prose prose-sm max-w-none mb-6 text-gray-900 leading-7 text-justify break-words font-mono"
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
