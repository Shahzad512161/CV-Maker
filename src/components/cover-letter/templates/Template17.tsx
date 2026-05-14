import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

export const Template17 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    // Image 3: Hannah Singh Gold. 
    // Header text: Black. 
    // Accent Divider line (Top/Bottom): Gray lines.
    // Signature Name: GOLD/Orange.
    const signatureColor = '#d97706'; // Amber/Gold (Tailwind amber-600)

    return (
        <div className="flex-1 text-[#1f1f1f] text-sm leading-relaxed font-serif overflow-hidden flex flex-col p-16 relative animate-in fade-in duration-500">

            {isFirstPage && (
                <>
                    {/* Header: Centered Caps Name */}
                    <div className="flex flex-col items-center mb-8 border-b border-gray-300 pb-8">
                        <h1 className="text-3xl font-bold tracking-widest uppercase mb-2 text-black break-words max-w-full">
                            {data.personal.fullName}
                        </h1>
                    </div>

                    {/* Contact Strip */}
                    <div className="flex justify-center flex-wrap gap-6 text-xs text-gray-600 font-sans tracking-wide mb-12 border-b border-gray-300 pb-4">
                        {data.personal.phone && <span>{data.personal.phone}</span>}
                        {data.personal.phone && data.personal.email && <span>•</span>}
                        {data.personal.email && <span className="break-all">{data.personal.email}</span>}
                        {(data.personal.phone || data.personal.email) && data.personal.address && <span>•</span>}
                        {data.personal.address && <span>{data.personal.address}</span>}
                    </div>

                    {/* Recipients block */}
                    <div className="flex justify-between items-start mb-8 text-sm font-sans text-gray-500">
                        <div className="flex flex-col">
                            <p className="font-bold text-gray-800">{data.recipient.name}</p>
                            <p>{data.recipient.address}</p>
                            <p>{data.recipient.company}</p>
                        </div>
                        <div>
                            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>

                    <div className="mb-6 font-bold text-black font-sans">
                        Dear {data.recipient.name},
                    </div>
                </>
            )}

            {/* Main Content Body */}
            <div className={`flex-1 flex flex-col min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-800 font-sans leading-relaxed mb-6"
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
                                    <div className="w-full border-t mb-3" style={{ borderColor: signatureColor }}></div>
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
