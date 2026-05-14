import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Template12 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    // Image 1: Ollie Pleasance. Dark text, Blue divider.
    const dividerColor = '#1d4ed8'; // Blue (approx Tailwind blue-700)

    // Header setup
    const names = data.personal.fullName.split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    return (
        <div className="flex-1 text-[#333] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12 relative animate-in fade-in duration-500">

            {isFirstPage && (
                <>
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-4">

                        {/* Left: Name Stacked */}
                        <div className="flex flex-col uppercase tracking-widest text-4xl text-gray-700 leading-none min-w-0 pr-4">
                            <span className="font-bold break-words">{firstName}</span>
                            <span className="font-normal text-gray-700 break-words">{lastName}</span>
                        </div>

                        {/* Right: Contact Stack with Icons */}
                        <div className="flex flex-col items-end text-xs text-gray-600 gap-2 text-right flex-shrink-0">
                            {data.personal.phone && (
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="font-medium">{data.personal.phone}</span>
                                    <Phone size={14} className="text-blue-700" style={{ color: dividerColor }} />
                                </div>
                            )}
                            {data.personal.email && (
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="font-medium underline decoration-gray-300 break-all">{data.personal.email}</span>
                                    <Mail size={14} className="text-blue-700" style={{ color: dividerColor }} />
                                </div>
                            )}
                            {data.personal.address && (
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="font-medium max-w-[200px] break-words">{data.personal.address}</span>
                                    <MapPin size={14} className="text-blue-700" style={{ color: dividerColor }} />
                                </div>
                            )}
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="flex items-center gap-2 justify-end" style={{ color: dividerColor }} />
                                        <span className="break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Blue Divider Line */}
                    <div className="w-full h-2.5 mb-10" style={{ backgroundColor: dividerColor }}></div>

                    {/* Recipient / Date Row */}
                    <div className="flex justify-between items-end mb-12">
                        <div className="text-sm text-gray-500 font-medium">
                            <p className="font-bold text-gray-800 mb-1">To: {data.recipient.name}</p>
                            {data.recipient.company && <p>{data.recipient.company}</p>}
                            {data.recipient.address && <p className="whitespace-pre-line max-w-xs">{data.recipient.address}</p>}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>

                    {/* Greeting */}
                    <div className="mb-6 font-bold text-gray-800 break-words">
                        Dear {data.recipient.name},
                    </div>
                </>
            )}

            {/* Main Content Body */}
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
