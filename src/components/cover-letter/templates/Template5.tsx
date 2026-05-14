import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

export const Template5 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    const nameColor = '#000000';
    const accentLineColor = '#fcd34d'; // Yellow/Gold from image (Tailwind amber-300 approx)
    const toBadgeBg = '#000000';
    const toBadgeText = '#ffffff';

    return (
        <div className="flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12 relative animate-in fade-in duration-500">

            {isFirstPage && (
                <>
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-6">

                        {/* Left: Name and Title */}
                        <div className="flex-1 pr-8 min-w-0">
                            <h1 className="text-5xl font-bold tracking-tight text-black break-words leading-none mb-3 uppercase" style={{ color: nameColor }}>
                                {data.personal.fullName}
                            </h1>
                            <p className="text-sm font-bold text-black break-words tracking-wide">
                                {data.personal.jobTitle}
                            </p>
                        </div>

                        {/* Right: Contact Info (Text only as per design) */}
                        <div className="flex flex-col items-end gap-1 text-[11px] text-gray-400 font-normal pt-1 flex-shrink-0 text-right">
                            {data.personal.address && (
                                <span className="break-words">{data.personal.address}</span>
                            )}
                            {data.personal.email && (
                                <span className="break-all">{data.personal.email}</span>
                            )}
                            {data.personal.phone && (
                                <span className="break-words">{data.personal.phone}</span>
                            )}
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="break-all" />
                                        <span className="break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Thick Accent Line - Yellow */}
                    <div className="w-full h-1.5 mb-10" style={{ backgroundColor: accentLineColor }}></div>
                </>
            )}

            {/* Main Content */}
            <div className={`flex-1 relative z-10 ${!isFirstPage ? 'pt-16' : ''}`}>
                {isFirstPage && (
                    <>
                        {/* Recipient with "TO" Badge */}
                        <div className="mb-8 flex items-start gap-3">
                            <div className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-sm flex-shrink-0 mt-0.5 uppercase" style={{ backgroundColor: toBadgeBg, color: toBadgeText }}>
                                TO
                            </div>
                            <div className="text-sm text-black font-bold break-words leading-relaxed">
                                <span>{data.recipient.name}</span>
                                {data.recipient.company && <span className="font-normal text-black underline decoration-gray-400 decoration-1 underline-offset-4 decoration-dotted ml-1">{data.recipient.company}</span>}
                            </div>
                        </div>

                        {/* Greeting */}
                        <div className="mb-4 text-sm text-black font-normal break-words">
                            Dear {data.recipient.name},
                        </div>
                    </>
                )}

                {/* Body */}
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-800 font-sans leading-7 font-normal mb-6"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                />


                {/* Signature - Standardized */}
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
