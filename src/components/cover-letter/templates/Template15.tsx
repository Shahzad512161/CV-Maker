import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

export const Template15 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    // Image 0: Harold Henderson. Simple Black text, blue link?
    const linkColor = '#2563eb'; // Blue for email link

    return (
        <div className="flex-1 text-[#1f1f1f] text-sm leading-relaxed font-serif overflow-hidden flex flex-col p-16 relative animate-in fade-in duration-500">

            {isFirstPage && (
                <>
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-black font-serif break-words max-w-full">
                            {data.personal.fullName}
                        </h1>
                        <div className="text-sm text-black leading-snug">
                            {data.personal.phone && <p>Phone: {data.personal.phone}</p>}
                            {data.personal.email && (
                                <p>
                                    Email: <span style={{ color: linkColor, textDecoration: 'underline' }} className="break-all">{data.personal.email}</span>
                                </p>
                            )}
                            {data.personal.address && <p className="mt-2 text-black whitespace-pre-line">{data.personal.address}</p>}
                            {/* Date usually here in this layout */}
                            <p className="mt-2">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })}</p>
                        </div>
                    </div>

                    {/* Recipient Block */}
                    <div className="mb-8 font-bold text-black text-sm leading-snug break-words">
                        <p>{data.recipient.name}</p>
                        <p className="italic">{data.recipient.company}</p>
                        <p>{data.recipient.address}</p>
                    </div>

                    {/* Greeting */}
                    <div className="mb-4 text-black break-words">
                        Dear {data.recipient.name},
                    </div>
                </>
            )}

            {/* Body */}
            <div className={`flex-1 flex flex-col min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-black font-serif leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                />


                {/* Signature - Standardized */}
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
    );
};
