import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Template49 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    // Image 4: Siobhan Simmons. Gray Sidebar Left.
    const sidebarBg = '#f3f4f6'; // Tailwind gray-100

    return (
        <div className="flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-row relative animate-in fade-in duration-500">

            {/* Left Sidebar - Conditional rendering for first page */}
            {isFirstPage && (
                <div className="w-[35%] flex-shrink-0 flex flex-col p-10 pt-16 min-h-full" style={{ backgroundColor: sidebarBg }}>

                    {/* Name in Sidebar */}
                    <div className="mb-12">
                        <h1 className="text-3xl font-normal uppercase tracking-widest text-black break-words leading-tight mb-2">
                            {data.personal.fullName.split(' ')[0]}<br />
                            <span className="font-light">{data.personal.fullName.split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6 text-xs text-gray-700">
                        {data.personal.phone && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5"><Phone size={14} className="text-black" /></div>
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.email && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5"><Mail size={14} className="text-black" /></div>
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}
                        {data.personal.address && (
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5"><MapPin size={14} className="text-black" /></div>
                                <span className="break-words">{data.personal.address}</span>
                            </div>
                        )}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="text-black" size={14} />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Right Main Content */}
            <div className={`flex-1 flex flex-col p-12 pt-16 min-w-0 ${!isFirstPage ? 'w-full' : ''}`}>

                {isFirstPage && (
                    <>
                        {/* Date */}
                        <div className="text-right text-xs text-gray-500 mb-12">
                            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>

                        {/* Recipient */}
                        <div className="mb-10 text-sm text-gray-600">
                            <p className="font-bold text-gray-800">{data.recipient.name}</p>
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
                    className="prose prose-sm max-w-none text-justify break-words text-gray-700 font-sans leading-7 mb-6"
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
