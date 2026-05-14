import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template2 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors
    const topBorderColor = '#1a2b49'; // Deep Navy Blue
    const labelColor = '#9ca3af'; // Gray for labels (Email, Phone)

    return (
        <div className={`flex-1 text-[#1f1f1f] text-sm leading-relaxed font-sans overflow-hidden flex flex-col relative`}>

            {/* Top Navy Border - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-full h-4 relative z-10" style={{ backgroundColor: topBorderColor }}></div>
            )}

            <div className={`p-12 pt-10 flex flex-col flex-1 ${!isFirstPage ? 'pt-16' : ''}`}>

                {/* Header: Name and Title - Only on Page 1 */}
                {isFirstPage && (
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1 break-words">
                            {data.personal.fullName}
                        </h1>
                        <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 break-words">
                            {data.personal.jobTitle}
                        </p>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="flex flex-1 gap-12 min-w-0">

                    {/* Left Column: Main Body */}
                    <div className="flex-1 flex flex-col min-w-0">

                        {/* Recipient - Only on Page 1 */}
                        {isFirstPage && (
                            <div className="mb-8">
                                <p className="font-bold text-gray-900 mb-0.5 text-base break-words">To: {data.recipient.name}</p>
                                <p className="text-xs font-bold tracking-wider uppercase text-gray-500 break-words">{data.recipient.company}</p>
                            </div>
                        )}

                        {/* Subject - Only on Page 1 */}
                        {isFirstPage && (
                            <div className="mb-6 font-bold text-gray-900 text-sm break-words">
                                Re: {data.personal.jobTitle} application
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

                    {/* Right Column: Contact Info Sidebar - Only on Page 1 */}
                    {isFirstPage && (
                        <div className="w-40 flex-shrink-0 pt-16">
                            <div className="flex flex-col gap-6">

                                {/* Email */}
                                {data.personal.email && (
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: labelColor }}>EMAIL</p>
                                        <p className="text-xs font-medium text-gray-900 break-all underline decoration-gray-300 underline-offset-2">
                                            {data.personal.email}
                                        </p>
                                    </div>
                                )}

                                {/* Phone */}
                                {data.personal.phone && (
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: labelColor }}>PHONE</p>
                                        <p className="text-xs font-medium text-gray-900 break-words">
                                            {data.personal.phone}
                                        </p>
                                    </div>
                                )}

                                {/* Address/Location (Optional based on design mostly just showing email/phone but standard to include) */}
                                {data.personal.address && (
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: labelColor }}>LOCATION</p>
                                        <p className="text-xs font-medium text-gray-900 break-words">
                                            {data.personal.address}
                                        </p>
                                    </div>
                                )}

                                {/* Socials */}
                                {data.personal.socials.length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: labelColor }}>SOCIALS</p>
                                        <div className="flex flex-col gap-1">
                                            {data.personal.socials.map(s => {
                                                const Icon = getSocialIcon(s.label);
                                                return (
                                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                                        <Icon className="text-xs font-medium text-gray-900 break-all" />
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
