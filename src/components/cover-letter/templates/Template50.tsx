import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

export const Template50 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    // Image 5: Siobhan Simmons - Red Header.
    const headerBg = '#c1393d'; // Faded Red / Crimson (approx from image)

    return (
        <div className="flex-1 text-[#1f1f1f] text-sm leading-relaxed font-sans overflow-hidden flex flex-col relative animate-in fade-in duration-500">

            {isFirstPage && (
                <div className="w-full p-8 pt-10 pb-8 flex flex-col items-center justify-center text-white" style={{ backgroundColor: headerBg }}>
                    <h1 className="text-3xl font-bold tracking-[0.1em] uppercase mb-3 font-serif text-center break-words max-w-full">
                        {data.personal.fullName}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-1 text-[11px] font-medium tracking-wide text-center leading-relaxed opacity-90">
                        {data.personal.phone && <span>{data.personal.phone}</span>}

                        {data.personal.phone && data.personal.email && <span className="mx-1">|</span>}
                        {data.personal.email && <span className="break-all">{data.personal.email}</span>}

                        {(data.personal.phone || data.personal.email) && data.personal.address && <span className="mx-1">|</span>}
                        {data.personal.address && <span className="break-words max-w-[200px]">{data.personal.address}</span>}

                        {data.personal.socials.length > 0 && (data.personal.phone || data.personal.email || data.personal.address) && <span className="mx-1">|</span>}
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
            )}

            {/* Main Content Container */}
            <div className={`flex-1 flex flex-col p-16 pt-12 text-justify min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>

                {isFirstPage && (
                    <>
                        {/* Date */}
                        <div className="w-full flex justify-end mb-10 text-gray-500 font-medium">
                            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>

                        {/* Recipient Block */}
                        <div className="mb-10 text-gray-600 font-medium leading-relaxed">
                            <p className="font-bold text-gray-800 mb-1">{data.recipient.name}</p>
                            {data.recipient.address && <p>{data.recipient.address}</p>}
                            {data.recipient.company && <p>{data.recipient.company}</p>}
                        </div>

                        {/* Greeting */}
                        <div className="mb-6 font-bold text-gray-800 break-words">
                            Dear {data.recipient.name},
                        </div>
                    </>
                )}

                {/* Body Content */}
                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-700 font-sans leading-7 mb-6 w-full min-w-0"
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
                                    <div className="w-full border-t mb-3" style={{ borderColor: headerBg }}></div>
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
        </div>
    );
};
