import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
// Removed Lucide imports for substituted icons to avoid confusion, kept others if needed
import { Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template32 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Elegant minimalist grayscale
    const nameColor = '#333';

    // Custom Solid Icons to ensure perfect "filled" look
    const SolidMail = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M1.5 4.5l10.5 6.75L22.5 4.5H1.5z" />
            <path d="M0 6v12a1.5 1.5 0 001.5 1.5h21a1.5 1.5 0 001.5-1.5V6l-12 7.5L0 6z" />
        </svg>
    );

    const SolidPhone = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.44 2.33.68 3.58.68.55 0 1 .45 1 1V20a1 1 0 01-1 1C10.48 21 2 12.52 2 2.5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.68 3.58a1 1 0 01-.27 1.11l-2.2 2.2z" />
        </svg>
    );

    const SolidMapPin = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        </svg>
    );

    return (
        <div className={`flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12 relative`}>

            {/* Top Decorative Line (Partial) - Only on First Page */}
            {isFirstPage && <div className="absolute top-12 left-12 w-[200px] h-[1px] bg-gray-400"></div>}

            {/* Header Flex - Only on First Page */}
            {isFirstPage && (
                <div className="flex justify-between items-start mb-12 mt-4">

                    {/* Left: Name and Title */}
                    <div className="flex-1 pr-8 min-w-0">
                        <h1 className="text-4xl font-light mb-1 tracking-wide text-gray-800 break-words leading-tight max-w-full" style={{ color: nameColor }}>
                            {data.personal.fullName}
                        </h1>
                        <p className="text-base font-light text-gray-500 mb-0 break-words tracking-wide max-w-full">
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    {/* Right: Contact Info (Icons on Right) */}
                    <div className="flex flex-col items-end gap-1.5 text-[10px] text-gray-500 font-light pt-1">
                        {data.personal.email && (
                            <div className="flex items-center gap-3 justify-end text-black">
                                <span className="break-all text-right text-gray-500">{data.personal.email}</span>
                                <SolidMail />
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-3 justify-end text-black">
                                <span className="break-words text-right text-gray-500">{data.personal.phone}</span>
                                <SolidPhone />
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-3 justify-end text-black">
                                <span className="break-words text-right text-gray-500">{data.personal.address}</span>
                                <SolidMapPin />
                            </div>
                        )}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <span className="break-all">{s.value}</span>
                                    <Icon className="w-3.5 h-3.5 text-right text-black" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Recipient Section - Only on First Page */}
            {isFirstPage && (
                <div className="mb-10 text-xs text-gray-500 break-words leading-relaxed pl-0">
                    <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-400">To</p>
                    <p className="font-bold text-gray-700 text-sm mb-0.5">{data.recipient.name}</p>
                    <p className="mb-0.5 font-medium">{data.recipient.company}</p>
                    <p className="max-w-full text-gray-500">
                        {data.recipient.address}
                    </p>
                </div>
            )}

            {/* Body */}
            <div
                className={`prose prose-sm max-w-none text-justify break-words text-gray-600 font-sans leading-7 font-light mb-6 ${!isFirstPage ? 'pt-16' : ''}`}
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
