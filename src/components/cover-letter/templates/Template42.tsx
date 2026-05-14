import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template42 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;

    return (
        <div className={`flex-1 text-[#1a1b3a] text-sm leading-relaxed flex font-mono overflow-hidden`}>
            {/* Left Sidebar - White - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-[35%] bg-white p-6 flex flex-col pt-12 border-r border-gray-100 flex-shrink-0">
                    {/* Name - Script Font */}
                    <h1 className="text-4xl mb-4 font-handwriting text-gray-900 leading-[1.2] break-words">
                        {data.personal.fullName}
                    </h1>

                    {/* Title - Mono */}
                    <p className="text-sm font-bold text-gray-700 mb-8 uppercase tracking-tight break-words">
                        {data.personal.jobTitle}
                    </p>

                    {/* Photo - Square */}
                    {data.personal.photo && (
                        <div className="mb-8 bg-gray-100">
                            <img
                                src={data.personal.photo}
                                alt="Profile"
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                    )}

                    {/* Contact Info - Simple Text, No Icons */}
                    <div className="flex flex-col gap-4 text-xs font-bold text-gray-600 mt-2">
                        {data.personal.address && (
                            <div>
                                <p className="text-gray-900 leading-snug break-words">{data.personal.address}</p>
                            </div>
                        )}
                        {data.personal.email && (
                            <p className="text-gray-900 break-all">{data.personal.email}</p>
                        )}
                        {data.personal.phone && (
                            <p className="text-gray-900 break-words">{data.personal.phone}</p>
                        )}

                        {/* Socials - Simple Text */}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="text-gray-900 break-all" />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Right Main Content - Light Grey */}
            <div className={`flex-1 bg-[#f2f2f2] p-8 flex flex-col pt-12 min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="flex justify-end mb-12">
                            <p className="text-xs font-bold text-gray-900">{data.date}</p>
                        </div>

                        <div className="text-xs text-gray-900 mb-12 font-mono break-words">
                            <p className="font-bold mb-1">{data.recipient.name}</p>
                            <p className="mb-1 font-bold">{data.recipient.company}</p>
                            <p className="max-w-full leading-relaxed">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body - Mono */}
                <div
                    className="prose prose-sm max-w-none mb-6 text-gray-800 leading-7 text-justify font-mono break-words"
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
