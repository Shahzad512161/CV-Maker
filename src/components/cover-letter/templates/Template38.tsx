import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template38 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Colors
    const bgColor = '#fffbf2'; // Cream/Off-white
    const accentColor = '#8b5a2b'; // Brown/Copper/Bronze
    const textColor = '#1f1f1f'; // Dark gray/black

    return (
        <div className={`flex-1 text-[#1f1f1f] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12 relative`} style={{ backgroundColor: bgColor }}>

            {/* Header Section - Only on Page 1 */}
            {isFirstPage && (
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 pr-6 pt-4 min-w-0">
                        <h1 className="text-5xl font-bold tracking-wider mb-2 font-serif uppercase leading-none break-words max-w-full" style={{ color: accentColor }}>
                            {data.personal.fullName}
                        </h1>
                        <p className="text-lg font-bold tracking-widest uppercase mb-1 break-words max-w-full" style={{ color: accentColor }}>
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    {/* Profile Image (Circle) */}
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-200 flex items-center justify-center shrink-0">
                        {data.personal.photo ? (
                            <img src={data.personal.photo} alt={data.personal.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl text-gray-400 font-serif font-bold">
                                {data.personal.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Divider Line - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-full h-1 mb-12" style={{ backgroundColor: accentColor }}></div>
            )}

            {/* Two Column Layout */}
            <div className={`flex flex-1 gap-12 ${!isFirstPage ? 'pt-16' : ''}`}>

                {/* Left Column (Meta Info) - Only on Page 1 */}
                {isFirstPage && (
                    <div className="w-48 flex-shrink-0 flex flex-col gap-8 text-xs">

                        {/* Date */}
                        <div>
                            <p className="font-bold text-black mb-1">Date</p>
                            <p className="text-gray-700">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>

                        {/* Personal Contact (Sender) */}
                        <div>
                            <p className="font-bold text-black mb-2">From</p>
                            {data.personal.email && <p className="text-gray-700 mb-1 break-all">{data.personal.email}</p>}
                            {data.personal.phone && <p className="text-gray-700 mb-1">{data.personal.phone}</p>}
                            {data.personal.address && <p className="text-gray-700 mb-1">{data.personal.address}</p>}
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="text-gray-700 mb-1 break-all" />
                                        <span className="break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Recipient Info */}
                        <div>
                            <p className="font-bold text-black mb-2">To</p>
                            <p className="font-bold text-gray-800">{data.recipient.name}</p>
                            <p className="text-gray-700">{data.recipient.company}</p>
                            <p className="text-gray-700 mt-1">{data.recipient.address}</p>
                        </div>
                    </div>
                )}

                {/* Right Column (Body) */}
                <div className="flex-1">
                    {/* Greeting - Only on Page 1 */}
                    {isFirstPage && (
                        <div className="mb-6 text-sm text-black font-medium">
                            Dear {data.recipient.name},
                        </div>
                    )}

                    {/* Body */}
                    <div
                        className="prose prose-sm max-w-none text-justify break-words text-gray-800 font-sans leading-relaxed mb-6"
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
                                        <div className="w-full border-t mb-3" style={{ borderColor: accentColor }}></div>
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
