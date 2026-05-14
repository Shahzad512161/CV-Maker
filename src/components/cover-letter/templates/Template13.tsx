import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Phone, Mail, MapPin } from 'lucide-react'; // Using Lucide for icon base, styled as pills

export const Template13 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    const badgeBg = '#e0f2f1'; // Light Mint/Teal
    const badgeText = '#0f766e'; // Dark Teal

    return (
        <div className="flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12 relative animate-in fade-in duration-500">

            {isFirstPage && (
                <>
                    {/* Header */}
                    <div className="mb-8 min-w-0">
                        <h1 className="text-4xl font-bold tracking-tight mb-6 text-black break-words max-w-full">
                            {data.personal.fullName}
                        </h1>

                        {/* Contact Badges Row */}
                        <div className="flex flex-wrap gap-3 text-xs font-medium">
                            {data.personal.phone && (
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ backgroundColor: badgeBg, color: badgeText }}>
                                    <Phone size={12} strokeWidth={2.5} />
                                    <span>{data.personal.phone}</span>
                                </div>
                            )}
                            {data.personal.email && (
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ backgroundColor: badgeBg, color: badgeText }}>
                                    <Mail size={12} strokeWidth={2.5} />
                                    <span className="break-all">{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.address && (
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ backgroundColor: badgeBg, color: badgeText }}>
                                    <MapPin size={12} strokeWidth={2.5} />
                                    <span className="break-words max-w-[150px] truncate">{data.personal.address}</span>
                                </div>
                            )}
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ backgroundColor: badgeBg, color: badgeText }} />
                                        <span className="break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recipient + Date Group */}
                    <div className="mb-10 text-gray-500 font-medium text-sm flex flex-col gap-6">
                        <div className="text-right">
                            [{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}]
                        </div>

                        <div className="text-gray-400">
                            {data.recipient.name && <p className="mb-1 text-gray-600">{data.recipient.name}</p>}
                            {data.recipient.address && <p className="mb-1">{data.recipient.address}</p>}
                            {data.recipient.company && <p>{data.recipient.company}</p>}
                        </div>
                    </div>

                    <div className="mb-6 font-bold text-gray-800">
                        Dear {data.recipient.name},
                    </div>
                </>
            )}

            {/* Body Section */}
            <div className={`flex-1 flex flex-col min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-700 font-sans leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                />


                {/* Signature - Standardized */}
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
        </div>
    );
};
