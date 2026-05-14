import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram, Github } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template27 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Teal accent color from image
    const accentColor = '#5dbecb';
    const textColor = '#555';

    // Decorative Zigzags Pattern
    const ZigzagPattern = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 150"
            preserveAspectRatio="none"
            className={className}
            style={style}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="zigzag" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 20 L20 0 L40 20" fill="none" stroke="#e0e7ea" strokeWidth="2" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zigzag)" />
        </svg>
    );

    // Custom geometric lines component to match the top-right and bottom design closer
    const GeometricLines = () => (
        <div className="absolute right-0 top-0 w-[300px] h-[100px] opacity-60 pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 300 100">
                {Array.from({ length: 10 }).map((_, i) => (
                    <polyline
                        key={i}
                        points={`0,${20 + i * 10} 20,${0 + i * 10} 40,${20 + i * 10} 60,${0 + i * 10} 80,${20 + i * 10} 100,${0 + i * 10} 120,${20 + i * 10} 140,${0 + i * 10} 160,${20 + i * 10} 180,${0 + i * 10} 200,${20 + i * 10} 220,${0 + i * 10} 240,${20 + i * 10} 260,${0 + i * 10} 280,${20 + i * 10} 300,${0 + i * 10}`}
                        fill="none"
                        stroke="#bce3eb"
                        strokeWidth="1.5"
                    />
                ))}
            </svg>
        </div>
    );

    const BottomGeometricLines = () => (
        <div className="absolute bottom-0 left-0 right-0 h-[120px] opacity-40 pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 600 120" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 12 }).map((_, i) => (
                    <polyline
                        key={i}
                        // Simple jagged line path repeated
                        points={`-20,${40 + i * 8} 20,${20 + i * 8} 60,${40 + i * 8} 100,${20 + i * 8} 140,${40 + i * 8} 180,${20 + i * 8} 220,${40 + i * 8} 260,${20 + i * 8} 300,${40 + i * 8} 340,${20 + i * 8} 380,${40 + i * 8} 420,${20 + i * 8} 460,${40 + i * 8} 500,${20 + i * 8} 540,${40 + i * 8} 580,${20 + i * 8} 620,${40 + i * 8}`}
                        fill="none"
                        stroke="#bce3eb"
                        strokeWidth="1.5"
                    />
                ))}
            </svg>
        </div>
    );

    return (
        <div className={`flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col relative`}>

            {/* Top Pattern - Only on First Page */}
            {isFirstPage && <GeometricLines />}

            {/* Header Content - Only on First Page */}
            {isFirstPage && (
                <>
                    <div className="px-12 pt-12 pb-6 relative z-10">
                        <h1 className="text-4xl font-light text-gray-500 mb-1 tracking-wide break-words max-w-full">
                            {data.personal.fullName}
                        </h1>
                        <p className="text-xl font-medium tracking-wide break-words max-w-full" style={{ color: accentColor }}>
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    {/* Blue Contact Bar */}
                    <div className="w-full py-2.5 px-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 relative z-10 text-white text-[11px] font-medium tracking-wide" style={{ backgroundColor: accentColor }}>
                        {data.personal.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                                <span className="break-words">{data.personal.address}</span>
                            </div>
                        )}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="flex items-center gap-2" />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Main Content */}
            <div className={`p-12 flex-1 relative z-10 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Recipient - Only on First Page */}
                {isFirstPage && (
                    <>
                        <div className="text-xs text-gray-500 mb-8 break-words leading-relaxed font-sans">
                            <p className="mb-0.5 italic">To:</p>
                            <p className="font-bold text-gray-700 text-sm mb-0.5">{data.recipient.name}</p>
                            <p className="mb-0.5">{data.recipient.company}</p>
                            <p className="max-w-full text-gray-500">
                                {data.recipient.address}
                            </p>
                        </div>

                        {/* Divider Line */}
                        <div className="w-full h-px mb-8 bg-gradient-to-r from-transparent via-cyan-100 to-transparent"></div>
                    </>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-600 font-sans leading-7 mb-6"
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
                                    <div className="w-full border-t mb-3" style={{ borderColor: accentColor }}></div>
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

            {/* Bottom Pattern - Only on Last Page */}
            {isLastPage && <BottomGeometricLines />}
        </div>
    );
};
