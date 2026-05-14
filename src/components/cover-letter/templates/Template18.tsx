import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { getSocialIcon } from '../utils/social-icons';
import { Mail, Phone, MapPin, Linkedin, Globe, Instagram } from 'lucide-react';

interface TemplateProps {
    data: CoverLetterData;
    pageData: PageData;
}

export const Template18 = ({ data, pageData }: TemplateProps) => {
    const { content, isFirstPage, isLastPage, pageIndex } = pageData;
    // Dark background (Deep Purple/Black)
    const bgDark = '#0f0518';
    // Neon Pink text
    const textPink = '#ea4bf0';

    return (
        <div
            className="flex-1 shadow-2xl p-10 text-sm leading-relaxed font-mono overflow-hidden flex flex-row"
            style={{ backgroundColor: bgDark, color: textPink }}
        >
            {/* Left Content - Main Body */}
            <div className={`flex-1 pr-8 flex flex-col min-w-0 border-r border-pink-900/30 ${!isFirstPage ? 'pt-16' : ''}`}>
                {/* Date and Recipient - Only on Page 1 */}
                {isFirstPage && (
                    <>
                        <div className="mb-10">
                            <p className="text-xs font-bold">{data.date}</p>
                        </div>

                        <div className="text-xs mb-10 break-words font-mono">
                            <p className="font-bold mb-1 text-base">{data.recipient.name}</p>
                            <p className="mb-1 opacity-90">{data.recipient.company}</p>
                            <p className="max-w-full opacity-80 leading-relaxed">
                                {data.recipient.address}
                            </p>
                        </div>
                    </>
                )}

                {/* Body - Pink text, justified */}
                <div
                    className="prose prose-sm max-w-none mb-6 leading-7 text-justify break-words font-mono"
                    style={{ color: textPink }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Signature - Standardized - Only on the LAST page */}
                {isLastPage && (
                    <div className="mt-2" style={{ color: textPink }}>
                        <p className="mb-2 font-bold text-inherit">Sincerely,</p>

                        <div className="w-fit min-w-[200px]">
                            {data.signature.image && (
                                <>
                                    <img
                                        src={data.signature.image}
                                        alt="Signature"
                                        className="h-16 object-contain mb-2 block invert opacity-80"
                                    />
                                    <div className="w-full border-t mb-3" style={{ borderColor: textPink, opacity: 0.3 }}></div>
                                </>
                            )}

                            <p className="font-bold text-base text-inherit">
                                {data.signature.name || data.personal.fullName}
                            </p>

                            {(data.signature.place || data.signature.date) && (
                                <p className="text-sm mt-1 font-medium text-inherit opacity-80">
                                    {[data.signature.place, data.signature.date].filter(Boolean).join(', ')}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Sidebar - Profile Info - Only on Page 1 */}
            {isFirstPage && (
                <div className="w-[35%] pl-8 flex flex-col flex-shrink-0">
                    {/* Name - Huge Pink Mono */}
                    <h1 className="text-4xl font-bold mb-2 tracking-tight leading-none break-words w-full" style={{ color: textPink }}>
                        {data.personal.fullName.split(' ')[0]} <br />
                        {data.personal.fullName.split(' ').slice(1).join(' ')}
                    </h1>

                    {/* Job Title */}
                    <p className="text-lg mb-10 break-words w-full opacity-90">
                        {data.personal.jobTitle}
                    </p>

                    {/* Photo */}
                    {data.personal.photo && (
                        <div className="mb-10">
                            <img
                                src={data.personal.photo}
                                alt="Profile"
                                className="w-full aspect-square object-cover grayscale opacity-80"
                            />
                        </div>
                    )}

                    {/* Contact Info - Vertical */}
                    <div className="flex flex-col gap-4 text-xs font-medium opacity-90">
                        {data.personal.address && (
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="break-words font-bold opacity-70">Address</span>
                                <span className="break-words">{data.personal.address}</span>
                            </div>
                        )}
                        {data.personal.phone && (
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="break-words font-bold opacity-70">Phone</span>
                                <span className="break-words">{data.personal.phone}</span>
                            </div>
                        )}
                        {data.personal.email && (
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="break-words font-bold opacity-70">Email</span>
                                <span className="break-all">{data.personal.email}</span>
                            </div>
                        )}

                        {/* Socials */}
                        {data.personal.socials.map(s => {
                            const Icon = getSocialIcon(s.label);
                            return (
                                <div key={s.id} className="flex items-center gap-1.5 min-w-0 max-w-full">
                                    <Icon className="flex flex-col gap-1 min-w-0" />
                                    <span className="break-all">{s.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
