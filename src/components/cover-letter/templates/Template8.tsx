import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

export const Template8 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    const bgColor = '#18181b'; // Zinc-900 / Near Black
    const accentColor = '#a1a1aa'; // Zinc-400 (light gray for secondary text)

    return (
        <div className="flex-1 text-white text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-14 relative animate-in fade-in duration-500" style={{ backgroundColor: bgColor }}>

            {isFirstPage && (
                <div className="flex flex-col mb-12 min-w-0">
                    <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase break-words max-w-full">
                        {data.personal.fullName}
                    </h1>
                    <p className="text-xl font-normal tracking-[0.05em] uppercase text-gray-300 mb-6 break-words max-w-full">
                        {data.personal.jobTitle}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[11px] font-bold tracking-widest uppercase text-white min-w-0">
                        {data.personal.phone && (
                            <span>{data.personal.phone}</span>
                        )}
                        {data.personal.phone && data.personal.email && <span className="text-gray-500">|</span>}

                        {data.personal.email && (
                            <span>{data.personal.email}</span>
                        )}

                        {(data.personal.phone || data.personal.email) && data.personal.socials.length > 0 && <span className="text-gray-500">|</span>}

                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="text-gray-500" />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className={`flex-1 flex flex-col min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>

                {isFirstPage && (
                    <>
                        <div className="mb-12 text-[10px] font-bold tracking-widest uppercase leading-loose text-gray-300">
                            <p className="break-words">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</p>
                            <p className="break-words text-white mt-4">HIRING MANAGER</p>
                            <p className="break-words text-white">{data.recipient.company.toUpperCase()}</p>
                            <p className="break-words text-white">{data.recipient.address.toUpperCase()}</p>
                        </div>

                        <div className="mb-6 text-xl font-bold uppercase tracking-wide break-words">
                            DEAR {data.recipient.name},
                        </div>
                    </>
                )}

                <div
                    className="prose prose-sm prose-invert max-w-none text-justify break-words text-gray-300 font-sans leading-7 font-normal mb-6"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                />

                {isLastPage && (
                    <div className="mt-2 text-white">
                        <p className="mb-2 font-bold text-inherit">Sincerely,</p>

                        <div className="w-fit min-w-[200px]">
                            {data.signature.image && (
                                <>
                                    <img
                                        src={data.signature.image}
                                        alt="Signature"
                                        className="h-16 object-contain mb-2 block invert"
                                    />
                                    <div className="w-full border-t mb-3" style={{ borderColor: accentColor }}></div>
                                </>
                            )}

                            <p className="font-bold text-base text-inherit">
                                {data.signature.name || data.personal.fullName}
                            </p>

                            {(data.signature.place || data.signature.date) && (
                                <p className="text-sm mt-1 font-medium text-gray-300">
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
