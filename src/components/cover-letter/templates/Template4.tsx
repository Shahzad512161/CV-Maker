import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template4 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors
    const sidebarColor = '#10393b'; // Deep Dark Green/Teal
    const labelColor = '#9ca3af'; // Gray for labels

    return (
        <div className={`flex-1 text-[#1f1f1f] text-sm leading-relaxed font-sans overflow-hidden flex flex-row relative`}>

            {/* Left Green Stripe */}
            <div className="w-[30px] flex-shrink-0 h-full min-h-[842px] absolute left-0 top-0 bottom-0 z-10" style={{ backgroundColor: sidebarColor }}></div>

            {/* Main Content Wrapper - Padded left to avoid stripe */}
            <div className={`flex-1 flex flex-col p-12 pl-16 pt-10 min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>

                {/* Header: Centered Name - Only on Page 1 */}
                {isFirstPage && (
                    <div className="flex flex-col items-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2 font-serif text-center break-words max-w-full">
                            {data.personal.fullName}
                        </h1>
                        <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 text-center break-words max-w-full">
                            {data.personal.jobTitle}
                        </p>
                        {/* Decorative short line below title */}
                        <div className="w-8 h-0.5 bg-gray-200 mt-4"></div>
                    </div>
                )}

                {/* Content Grid */}
                <div className="flex flex-1 gap-10 min-w-0">

                    {/* Left Column: Body */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Recipient - Only on Page 1 */}
                        {isFirstPage && (
                            <div className="mb-8">
                                <p className="font-bold text-gray-900 text-sm break-words">To: {data.recipient.name}</p>
                                <p className="text-sm font-medium text-gray-600 break-words">{data.recipient.company}</p>
                            </div>
                        )}

                        {/* Greeting - Only on Page 1 */}
                        {isFirstPage && (
                            <div className="mb-4 text-sm text-gray-900 break-words">
                                Dear {data.recipient.name},
                            </div>
                        )}

                        {/* Body */}
                        <div
                            className="prose prose-sm max-w-none text-justify break-words text-gray-700 font-sans leading-relaxed mb-6"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />


                        {/* Signature - Standardized - Only on the LAST page */}
                        {isLastPage && (
                            <div className="mt-2 text-gray-700">
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

                    {/* Right Column: Contact Sidebar - Only on Page 1 */}
                    {isFirstPage && (
                        <div className="w-40 flex-shrink-0 pt-0">
                            <div className="flex flex-col gap-6 text-xs">

                                {/* Address (Top usually in this design) */}
                                {data.personal.address && (
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400">ADDRESS</p>
                                        <p className="font-medium text-gray-900 break-words leading-relaxed">
                                            {data.personal.address}
                                        </p>
                                    </div>
                                )}

                                {/* Email */}
                                {data.personal.email && (
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400">EMAIL</p>
                                        <p className="font-medium text-gray-900 break-all underline decoration-gray-300 underline-offset-2">
                                            {data.personal.email}
                                        </p>
                                    </div>
                                )}

                                {/* Phone */}
                                {data.personal.phone && (
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400">PHONE</p>
                                        <p className="font-medium text-gray-900 break-words">
                                            {data.personal.phone}
                                        </p>
                                    </div>
                                )}

                                {/* Socials */}
                                {data.personal.socials.length > 0 && (
                                    <div>
                                        {/* <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400">ONLINE</p> */}
                                        <div className="flex flex-col gap-2">
                                            {data.personal.socials.map(s => {
                                                const Icon = getSocialIcon(s.label);
                                                return (
                                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                                        <Icon className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400" />
                                                        <span className="break-all">{s.value}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
