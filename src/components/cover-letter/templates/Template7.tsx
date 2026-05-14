import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';

const SolidMailFixed = ({ color }: { color: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6ZM6.64298 6L12 11.357L17.357 6H6.64298ZM14.529 11.643L19.414 16.528C19.79 16.124 20 15.589 20 15V8.64302L14.529 11.643ZM12 14.186L17.293 19H6.70715L12 14.186ZM9.47102 11.643L4 8.64302V15C4 15.589 4.20998 16.124 4.58579 16.528L9.47102 11.643Z" fill={color} />
    </svg>
);

const SolidPhone = ({ color }: { color: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.93 11.07 22 21 22C21.75 22 22 21.35 22 20.81V17.36C22 16.82 21.56 16.38 21.01 16.38H20.01V15.38Z" fill={color} />
    </svg>
);

const SolidPin = ({ color }: { color: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={color} />
    </svg>
);

export const Template7 = ({ data, pageData }: { data: CoverLetterData; pageData: PageData }) => {
    const { isFirstPage, isLastPage } = pageData;
    // Colors
    const primaryColor = '#2e3d8a'; // Royal Blue / Indigo

    return (
        <div className="flex-1 text-[#1f1f1f] text-sm leading-relaxed font-sans overflow-hidden flex flex-col p-12 relative animate-in fade-in duration-500">

            {isFirstPage && (
                <>
                    {/* Header Section */}
                    <div className="mb-2 min-w-0">
                        <h1 className="text-4xl font-bold tracking-tight mb-2 font-sans break-words max-w-full" style={{ color: primaryColor }}>
                            {data.personal.fullName}
                        </h1>
                        <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 break-words max-w-full">
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    {/* Thick Blue Divider */}
                    <div className="w-full h-1.5 mb-10" style={{ backgroundColor: primaryColor }}></div>
                </>
            )}

            {/* Main Content Grid */}
            <div className={`flex flex-1 gap-8 min-w-0 ${!isFirstPage ? 'pt-16' : ''}`}>

                {/* Left Column: Main Body */}
                <div className="flex-1 flex flex-col min-w-0 pr-8 border-r border-gray-100">

                    {isFirstPage && (
                        <>
                            {/* Recipient */}
                            <div className="mb-8">
                                <p className="font-bold text-black text-sm break-words mb-1">To: {data.recipient.name}</p>
                                <p className="text-xs font-medium text-gray-500 uppercase break-words">{data.recipient.company}</p>
                            </div>

                            {/* Greeting */}
                            <div className="mb-4 text-sm text-black break-words">
                                Dear {data.recipient.name},
                            </div>
                        </>
                    )}

                    {/* Body */}
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
                                        <div className="w-full border-t mb-3" style={{ borderColor: primaryColor }}></div>
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

                {/* Right Column: Contact Info Sidebar */}
                <div className="w-48 flex-shrink-0 pt-0">
                    {isFirstPage && (
                        <div className="flex flex-col gap-4">

                            {/* Email */}
                            {data.personal.email && (
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5"><SolidMailFixed color={primaryColor} /></div>
                                    <p className="text-xs font-medium text-gray-700 break-all">
                                        {data.personal.email}
                                    </p>
                                </div>
                            )}

                            {/* Phone */}
                            {data.personal.phone && (
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5"><SolidPhone color={primaryColor} /></div>
                                    <p className="text-xs font-medium text-gray-700 break-words">
                                        {data.personal.phone}
                                    </p>
                                </div>
                            )}

                            {/* Address */}
                            {data.personal.address && (
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5"><SolidPin color={primaryColor} /></div>
                                    <p className="text-xs font-medium text-gray-700 break-words">
                                        {data.personal.address}
                                    </p>
                                </div>
                            )}

                            {/* Socials */}
                            {data.personal.socials.map(s => {
                                const Icon = getSocialIcon(s.label);
                                return (
                                    <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                        <Icon className="text-gray-400" />
                                        <span className="text-xs font-medium text-gray-700 break-all">{s.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
