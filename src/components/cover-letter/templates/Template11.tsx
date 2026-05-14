import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template11 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors
    const bgColor = '#f7f0e7'; // Beige/Cream background
    const textColor = '#111'; // Sharp black/dark gray

    return (
        <div className={`flex-1 text-[#111] text-sm leading-relaxed font-sans overflow-hidden flex flex-col pt-14 relative`} style={{ backgroundColor: bgColor }}>

            {/* White Sidebar Stripe */}
            <div className="absolute top-0 left-0 bottom-0 w-[50px] bg-white z-0"></div>

            {/* Content Wrapper - Padded to avoid sidebar overlap */}
            <div className={`relative z-10 pl-[62px] pr-12 pb-12 flex flex-col flex-1 ${!isFirstPage ? 'pt-16' : ''}`}>

                {/* Header Section - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-between items-end mb-2">

                            {/* Left: Name and Title */}
                            <div className="flex-1 pr-8 min-w-0">
                                <h1 className="text-2xl font-bold tracking-normal text-black break-words leading-tight mb-1 uppercase">
                                    {data.personal.fullName}
                                </h1>
                                <p className="text-sm font-bold text-black break-words">
                                    {data.personal.jobTitle}
                                </p>
                            </div>

                            {/* Right: Contact Info */}
                            <div className="flex flex-col items-end gap-0.5 text-xs text-black font-medium pt-1 flex-shrink-0 text-right">
                                {data.personal.email && (
                                    <span className="break-all">{data.personal.email}</span>
                                )}
                                {data.personal.phone && (
                                    <span className="break-words">{data.personal.phone}</span>
                                )}
                            </div>
                        </div>

                        {/* Horizontal Line */}
                        <div className="w-full h-0.5 bg-black mb-2"></div>

                        {/* Address Line (Small, below separator) */}
                        {data.personal.address && (
                            <p className="text-[10px] text-gray-700 mb-12">
                                {data.personal.address}
                            </p>
                        )}
                    </>
                )}

                {/* Main Content */}
                <div className="flex-1 relative z-10">
                    {/* Recipient Line - Only on Page 1 */}
                    {isFirstPage && (
                        <>
                            <div className="mb-4 text-sm font-bold text-black break-words">
                                To {data.recipient.name}, {data.recipient.company}
                            </div>

                            {/* Date (Large) */}
                            <div className="text-3xl font-normal text-black mb-8 tracking-wide">
                                {new Date().toLocaleDateString('en-GB')}
                            </div>

                            {/* Greeting */}
                            <div className="mb-4 text-sm text-black font-normal">
                                Dear {data.recipient.name},
                            </div>
                        </>
                    )}

                    {/* Body */}
                    <div
                        className="prose prose-sm max-w-none text-justify break-words text-black font-sans leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />


                    {/* Signature - Standardized - Only on the LAST page */}
                    {isLastPage && (
                        <div className="mt-2 text-black">
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
        </div>

    );
};
