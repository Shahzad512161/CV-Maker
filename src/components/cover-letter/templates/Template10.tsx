import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

export const Template10 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    const headerColor = '#004e5a'; // Dark Teal / Cyan

    return (
        <div className="flex-1 text-[#1f1f1f] text-sm leading-relaxed font-serif overflow-hidden flex flex-col p-16 relative animate-in fade-in duration-500">

            {isFirstPage && (
                <div className="flex flex-col items-end mb-16">
                    <h1 className="text-3xl font-bold tracking-[0.1em] mb-2 uppercase text-right break-words max-w-full" style={{ color: headerColor }}>
                        {data.personal.fullName}
                    </h1>

                    <div className="text-xs font-bold text-right leading-relaxed max-w-full" style={{ color: headerColor }}>
                        <p className="break-words">
                            {data.personal.address}
                            {(data.personal.address && (data.personal.phone || data.personal.email)) && ' - '}
                            {data.personal.phone}
                        </p>
                        <p className="break-all underline decoration-1 underline-offset-2">
                            {data.personal.email}
                        </p>
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full justify-end">
                                    <Icon className="break-all mt-0.5" />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className={`flex-1 flex flex-col items-start text-justify min-w-0 w-full ${!isFirstPage ? 'pt-16' : ''}`}>

                {isFirstPage && (
                    <>
                        <div className="mb-6 font-medium text-black text-sm w-full">
                            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>

                        <div className="mb-8 font-medium text-black leading-relaxed w-full min-w-0">
                            <p className="break-words max-w-full">{data.recipient.name}</p>
                            <p className="break-words max-w-full">{data.recipient.company}</p>
                            <p className="break-words whitespace-pre-line max-w-full">{data.recipient.address}</p>
                        </div>

                        <div className="mb-4 font-medium text-black break-words w-full">
                            Dear {data.recipient.name},
                        </div>
                    </>
                )}

                <div
                    className="prose prose-sm max-w-none text-justify break-words text-gray-900 font-serif leading-7 mb-6 w-full min-w-0"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                />

                {isLastPage && (
                    <div className="mt-2 text-gray-900">
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
