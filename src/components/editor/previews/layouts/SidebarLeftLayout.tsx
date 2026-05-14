import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, User, Heart, Award, Link as LinkIcon } from 'lucide-react';
import { ContactInfoRenderer } from '../ContactInfoRenderer';
import { DynamicIcon } from '@/components/common/DynamicIcon';

interface Props {
    data: ResumeContent;
    theme: TemplateTheme;
}

export const SidebarLeftLayout: React.FC<Props> = ({ data, theme }) => {
    const { personalDetails, sections } = data;

    // Define which sections go where based on the reference design
    // Sidebar: Profile, Languages, Interests, Awards
    const sidebarTypes = ['Profile', 'Languages', 'Interests', 'Awards', 'Certificates'];
    const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type) && s.isVisible);

    // Main: Experience, Education, Skills, Projects, Publications
    const mainSections = sections.filter(s => !sidebarTypes.includes(s.type) && s.isVisible);

    const getSectionIcon = (section: any, size: number) => {
        const type = section.type;
        let fallback;
        switch (type) {
            case 'Experience': fallback = <Briefcase size={size} />; break;
            case 'Education': fallback = <GraduationCap size={size} />; break;
            case 'Skills': fallback = <Wrench size={size} />; break;
            case 'Projects': fallback = <Briefcase size={size} />; break;
            case 'Profile': fallback = <User size={size} />; break;
            case 'Languages': fallback = <Globe size={size} />; break;
            case 'Interests': fallback = <Heart size={size} />; break;
            case 'Awards': fallback = <Award size={size} />; break;
            default: fallback = <LinkIcon size={size} />; break;
        }

        return <DynamicIcon name={section.icon} fallback={fallback} size={size} />;
    };

    const getLanguageLevelDots = (level: string) => {
        const normalizedLevel = level.toLowerCase();
        let score = 3; // Default intermediate
        if (normalizedLevel.includes('native') || normalizedLevel.includes('fluent') || normalizedLevel.includes('5')) score = 5;
        else if (normalizedLevel.includes('advanced') || normalizedLevel.includes('4')) score = 4;
        else if (normalizedLevel.includes('intermediate') || normalizedLevel.includes('3')) score = 3;
        else if (normalizedLevel.includes('beginner') || normalizedLevel.includes('elementary') || normalizedLevel.includes('2')) score = 2;
        else if (normalizedLevel.includes('1')) score = 1;

        return (
            <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${i < score ? 'bg-white' : 'bg-white/30'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={`flex w-full h-full min-h-[297mm] ${theme.fontFamily} bg-white shadow-lg`}>
            {/* Sidebar (Left) */}
            <div
                className="w-[35%] text-white p-8 flex flex-col gap-8 shrink-0 print:w-[35%]"
                style={{ backgroundColor: theme.color }}
            >
                {/* Header Info (Name, Title, Photo) */}
                <div className="text-left w-full">
                    <h1 className={`text-3xl font-serif font-bold mb-2 leading-tight [overflow-wrap:anywhere] tracking-wide ${theme.headingStyle}`}>
                        {personalDetails.fullName}
                    </h1>
                    <p className="text-lg font-serif opacity-90 font-medium mb-8 [overflow-wrap:anywhere]">
                        {personalDetails.jobTitle}
                    </p>

                    {personalDetails.photo && (
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-8 shadow-sm">
                            <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="flex flex-col gap-3.5 text-sm opacity-90 text-left w-full">
                        {/* {personalDetails.email && (
                            <div className="flex items-center gap-3 w-full h-4">
                                <Mail size={16} className="shrink-0 opacity-70" />
                                <span className="[overflow-wrap:anywhere] leading-none">{personalDetails.email}</span>
                            </div>
                        )}
                        {personalDetails.phone && (
                            <div className="flex items-center gap-3 w-full h-4">
                                <Phone size={16} className="shrink-0 opacity-70" />
                                <span className="[overflow-wrap:anywhere] leading-none">{personalDetails.phone}</span>
                            </div>
                        )}
                        {personalDetails.location && (
                            <div className="flex items-center gap-3 w-full h-4">
                                <MapPin size={16} className="shrink-0 opacity-70" />
                                <span className="[overflow-wrap:anywhere] leading-none">{personalDetails.location}</span>
                            </div>
                        )} */}

                        {/* Contact Info - FIXED VERSION */}
                        {/* Contact Info - FIXED VERSION WITH REORDERING */}
                        <ContactInfoRenderer
                            data={data}
                            layout="vertical"
                            className="flex flex-col gap-3 text-sm opacity-90 text-left w-full"
                            itemClassName="flex items-center gap-3 w-full min-h-[20px]"
                            linkClassName="underline hover:opacity-100 [overflow-wrap:anywhere] leading-[1] inline-block translate-y-[0.5px] text-white no-underline"
                            textClassName="[overflow-wrap:anywhere] leading-[1] inline-block translate-y-[0.5px]"
                            iconSize={14}
                            iconStyle={{ opacity: 0.7 }}
                        />
                    </div>
                </div>

                {/* Sidebar Sections */}
                <div className="space-y-8 mt-4 w-full">
                    {sidebarSections.map(section => (
                        <div key={section.id} className="w-full">
                            {/* Sidebar Header - Centered in Box (Match Reference) */}
                            <div className="mb-4 bg-black/20 py-2 px-2 rounded-sm text-center">
                                <h3 className={`font-serif font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 [overflow-wrap:anywhere] ${theme.headingStyle}`}>
                                    <span className="flex items-center justify-center">{getSectionIcon(section, 16)}</span>
                                    <span className="flex items-center leading-none">{section.title}</span>
                                </h3>
                            </div>

                            {/* Section Content */}
                            <div className="text-sm opacity-90 leading-relaxed text-left w-full [overflow-wrap:anywhere]">
                                {/* Profile / Custom Strings */}
                                {typeof section.content === 'string' && (
                                    <div dangerouslySetInnerHTML={{ __html: section.content }} className="[overflow-wrap:anywhere]" />
                                )}

                                {/* Languages with Text Level and Description */}
                                {section.type === 'Languages' && Array.isArray(section.content) && (
                                    <div className="space-y-4">
                                        {(section.content as any[]).map((lang: any) => (
                                            <div key={lang.id} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                                <div className="flex justify-between items-baseline mb-1 flex-wrap">
                                                    <span className="font-bold text-lg [overflow-wrap:anywhere]">{lang.language}</span>
                                                    <span className="text-sm opacity-80 font-medium italic shrink-0">{lang.level}</span>
                                                </div>
                                                {lang.information && (
                                                    <div
                                                        className="text-xs opacity-70 leading-relaxed [overflow-wrap:anywhere]"
                                                        dangerouslySetInnerHTML={{ __html: lang.information }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* List Items (Fallthrough for others in Sidebar) */}
                                {Array.isArray(section.content) && section.type !== 'Languages' && (
                                    <ul className="space-y-4">
                                        {(section.content as any[]).map((item: any) => (
                                            <li key={item.id}>
                                                <div className="font-bold [overflow-wrap:anywhere]">{item.certificate || item.name || item.title}</div>
                                                {item.additionalInfo && (
                                                    <div className="text-xs mt-1 opacity-80 [overflow-wrap:anywhere]" dangerouslySetInnerHTML={{ __html: item.additionalInfo }} />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content (Right) */}
            <div className={`flex-1 p-8 md:p-12 ${theme.background}`}>
                <div className={`flex flex-col gap-8 ${theme.sectionSpacing}`}>
                    {mainSections.map(section => (
                        <div key={section.id}>
                            {/* Main Section Header - Light Gray Bar, Serif, Centered */}
                            <div className="bg-gray-100 py-2 px-4 mb-6 relative">
                                <h2 className={`text-lg font-serif font-bold text-gray-800 tracking-widest uppercase flex items-center justify-center gap-3 [overflow-wrap:anywhere] ${theme.headingStyle}`}>
                                    <span className="flex items-center justify-center">{getSectionIcon(section, 20)}</span>
                                    <span className="flex items-center leading-none">{section.title}</span>
                                </h2>
                            </div>

                            {/* Stacked Layout: Experience / Education / Projects / Custom / **Publications** */}
                            {['Experience', 'Education', 'Projects', 'Custom', 'Publications'].includes(section.type) && Array.isArray(section.content) && (
                                <div className="space-y-6">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="group flex flex-col items-start text-left w-full">
                                            {/* 1. Company / University / Title / Publisher (Bold, Serif/Sans mix) */}
                                            <div className="font-bold text-gray-900 text-lg leading-tight w-full flex items-center justify-between">
                                                <span className="[overflow-wrap:anywhere] pr-2">
                                                    {item.employer || item.school || item.title || item.publisher}
                                                </span>
                                                {item.url && (
                                                    <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors ml-2 shrink-0">
                                                        <LinkIcon size={16} />
                                                    </a>
                                                )}
                                            </div>

                                            {/* 2. Job Title / Degree / SubTitle / Publisher (Medium text) */}
                                            {(item.jobTitle || item.degree || item.subTitle || item.publisher) && (
                                                <div className="text-gray-800 font-medium text-base mb-1 w-full [overflow-wrap:anywhere]">
                                                    {item.jobTitle || item.degree || item.subTitle || item.publisher}
                                                </div>
                                            )}

                                            {/* 3. Date | Location (Small, Gray, Distinct Line) */}
                                            <div className="text-sm font-medium text-gray-500 mb-2 w-full uppercase tracking-wide [overflow-wrap:anywhere]">
                                                {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
                                                {item.date}
                                                {item.location && <span className="ml-2">| {item.location}</span>}
                                            </div>

                                            {/* 4. Description */}
                                            {item.description && (
                                                <div
                                                    className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none prose-ul:list-disc prose-li:marker:text-gray-500 w-full [overflow-wrap:anywhere]"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* References Section - Grid with Equal Height */}
                            {section.type === 'References' && Array.isArray(section.content) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(section.content as any[]).map((item: any) => (
                                        <div key={item.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-300 transition-colors h-full flex flex-col">
                                            <div className="font-bold text-gray-900 flex items-center gap-2 mb-1">
                                                <span className="[overflow-wrap:anywhere]">{item.name}</span>
                                                {item.url && (
                                                    <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors shrink-0">
                                                        <LinkIcon size={14} />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="text-gray-700 font-medium text-sm mb-2 [overflow-wrap:anywhere]">{item.jobTitle}</div>
                                            {item.organization && (
                                                <div className="text-gray-600 text-xs uppercase tracking-wide mb-3 [overflow-wrap:anywhere]">{item.organization}</div>
                                            )}

                                            <div className="flex flex-col gap-2 text-sm text-gray-600 mt-auto">
                                                {item.email && (
                                                    <div className="flex items-start gap-2">
                                                        <Mail size={14} className="opacity-70 mt-1 shrink-0" />
                                                        <span className="truncate [overflow-wrap:anywhere]">{item.email}</span>
                                                    </div>
                                                )}
                                                {item.phone && (
                                                    <div className="flex items-start gap-2">
                                                        <Phone size={14} className="opacity-70 mt-1 shrink-0" />
                                                        <span className="[overflow-wrap:anywhere]">{item.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Skills Grid - Fixed Bullet Point */}
                            {section.type === 'Skills' && Array.isArray(section.content) && (
                                <ul className="space-y-2 list-disc pl-5 text-gray-800 leading-relaxed">
                                    {(section.content as any[]).map((item: any) => (
                                        <li key={item.id} className="pl-1">
                                            <span className="font-bold mr-2">{item.skill}</span>
                                            {item.information && (
                                                <span className="text-gray-600 inline-block [overflow-wrap:anywhere]">
                                                    {item.information.replace(/<[^>]*>/g, '')}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Fallback for Custom String Content */}
                            {!['Experience', 'Education', 'Projects', 'Skills', 'References', 'Custom', 'Publications'].includes(section.type) && (
                                <div className="text-gray-700 leading-relaxed [overflow-wrap:anywhere]">
                                    {typeof section.content === 'string' ? (
                                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



// import React from 'react';
// import { ResumeContent, TemplateTheme } from '@/types/resume';
// import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, User, Heart, Award, Link as LinkIcon } from 'lucide-react';
// import { SocialIcon } from '../SocialIcon';

// interface Props {
//     data: ResumeContent;
//     theme: TemplateTheme;
// }

// export const SidebarLeftLayout: React.FC<Props> = ({ data, theme }) => {
//     const { personalDetails, sections } = data;

//     // Define which sections go where based on the reference design
//     // Sidebar: Profile, Languages, Interests, Awards
//     const sidebarTypes = ['Profile', 'Languages', 'Interests', 'Awards', 'Certificates'];
//     const sidebarSections = sections.filter(s => sidebarTypes.includes(s.type) && s.isVisible);

//     // Main: Experience, Education, Skills, Projects, Publications
//     const mainSections = sections.filter(s => !sidebarTypes.includes(s.type) && s.isVisible);

//     const getSectionIcon = (type: string) => {
//         switch (type) {
//             case 'Experience': return <Briefcase size={20} />;
//             case 'Education': return <GraduationCap size={20} />;
//             case 'Skills': return <Wrench size={20} />;
//             case 'Projects': return <Briefcase size={20} />;
//             case 'Profile': return <User size={16} />;
//             case 'Languages': return <Globe size={16} />;
//             case 'Interests': return <Heart size={16} />;
//             case 'Awards': return <Award size={16} />;
//             default: return <LinkIcon size={16} />;
//         }
//     };

//     const getLanguageLevelDots = (level: string) => {
//         const normalizedLevel = level.toLowerCase();
//         let score = 3; // Default intermediate
//         if (normalizedLevel.includes('native') || normalizedLevel.includes('fluent') || normalizedLevel.includes('5')) score = 5;
//         else if (normalizedLevel.includes('advanced') || normalizedLevel.includes('4')) score = 4;
//         else if (normalizedLevel.includes('intermediate') || normalizedLevel.includes('3')) score = 3;
//         else if (normalizedLevel.includes('beginner') || normalizedLevel.includes('elementary') || normalizedLevel.includes('2')) score = 2;
//         else if (normalizedLevel.includes('1')) score = 1;

//         return (
//             <div className="flex gap-1.5">
//                 {[...Array(5)].map((_, i) => (
//                     <div
//                         key={i}
//                         className={`w-2.5 h-2.5 rounded-full ${i < score ? 'bg-white' : 'bg-white/30'}`}
//                     />
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <div className={`flex w-full h-full min-h-[297mm] ${theme.fontFamily} bg-white shadow-lg`}>
//             {/* Sidebar (Left) */}
//             <div
//                 className="w-[35%] text-white p-8 flex flex-col gap-8 shrink-0 print:w-[35%]"
//                 style={{ backgroundColor: theme.color }}
//             >
//                 {/* Header Info (Name, Title, Photo) */}
//                 <div className="text-left w-full">
//                     <h1 className={`text-3xl font-serif font-bold mb-2 leading-tight [overflow-wrap:anywhere] tracking-wide ${theme.headingStyle}`}>
//                         {personalDetails.fullName}
//                     </h1>
//                     <p className="text-lg font-serif opacity-90 font-medium mb-8 [overflow-wrap:anywhere]">
//                         {personalDetails.jobTitle}
//                     </p>

//                     {personalDetails.photo && (
//                         <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-8 shadow-sm">
//                             <img src={personalDetails.photo} alt="Profile" className="w-full h-full object-cover" />
//                         </div>
//                     )}

//                     {/* Contact Info */}
//                     <div className="flex flex-col gap-3.5 text-sm opacity-90 text-left w-full">
//                         {personalDetails.email && (
//                             <div className="flex items-start gap-3 w-full">
//                                 <Mail size={16} className="shrink-0 opacity-70 mt-0.5" />
//                                 <span className="[overflow-wrap:anywhere]">{personalDetails.email}</span>
//                             </div>
//                         )}
//                         {personalDetails.phone && (
//                             <div className="flex items-start gap-3 w-full">
//                                 <Phone size={16} className="shrink-0 opacity-70 mt-0.5" />
//                                 <span className="[overflow-wrap:anywhere]">{personalDetails.phone}</span>
//                             </div>
//                         )}
//                         {personalDetails.location && (
//                             <div className="flex items-start gap-3 w-full">
//                                 <MapPin size={16} className="shrink-0 opacity-70 mt-0.5" />
//                                 <span className="[overflow-wrap:anywhere]">{personalDetails.location}</span>
//                             </div>
//                         )}
//                         {personalDetails.socials.map((social, idx) => {
//                             const displayText = social.value || social.label;
//                             if (!displayText) return null;
//                             return (
//                                 <div key={idx} className="flex items-start gap-3 w-full">
//                                     <SocialIcon label={social.label} size={16} className="shrink-0 opacity-70 mt-0.5" />
//                                     <a href={social.value} target="_blank" rel="noreferrer" className="underline hover:opacity-100 [overflow-wrap:anywhere]">
//                                         {displayText.replace(/^https?:\/\//, '')}
//                                     </a>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Sidebar Sections */}
//                 <div className="space-y-8 mt-4 w-full">
//                     {sidebarSections.map(section => (
//                         <div key={section.id} className="w-full">
//                             {/* Sidebar Header - Centered in Box (Match Reference) */}
//                             <div className="mb-4 bg-black/20 py-2 px-2 rounded-sm text-center">
//                                 <h3 className={`font-serif font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 [overflow-wrap:anywhere] ${theme.headingStyle}`}>
//                                     {getSectionIcon(section.type)}
//                                     {section.title}
//                                 </h3>
//                             </div>

//                             {/* Section Content */}
//                             <div className="text-sm opacity-90 leading-relaxed text-left w-full [overflow-wrap:anywhere]">
//                                 {/* Profile / Custom Strings */}
//                                 {typeof section.content === 'string' && (
//                                     <div dangerouslySetInnerHTML={{ __html: section.content }} className="[overflow-wrap:anywhere]" />
//                                 )}

//                                 {/* Languages with Text Level and Description */}
//                                 {section.type === 'Languages' && Array.isArray(section.content) && (
//                                     <div className="space-y-4">
//                                         {(section.content as any[]).map((lang: any) => (
//                                             <div key={lang.id} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
//                                                 <div className="flex justify-between items-baseline mb-1 flex-wrap">
//                                                     <span className="font-bold text-lg [overflow-wrap:anywhere]">{lang.language}</span>
//                                                     <span className="text-sm opacity-80 font-medium italic shrink-0">{lang.level}</span>
//                                                 </div>
//                                                 {lang.information && (
//                                                     <div
//                                                         className="text-xs opacity-70 leading-relaxed [overflow-wrap:anywhere]"
//                                                         dangerouslySetInnerHTML={{ __html: lang.information }}
//                                                     />
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}

//                                 {/* List Items (Fallthrough for others in Sidebar) */}
//                                 {Array.isArray(section.content) && section.type !== 'Languages' && (
//                                     <ul className="space-y-4">
//                                         {(section.content as any[]).map((item: any) => (
//                                             <li key={item.id}>
//                                                 <div className="font-bold [overflow-wrap:anywhere]">{item.certificate || item.name || item.title}</div>
//                                                 {item.additionalInfo && (
//                                                     <div className="text-xs mt-1 opacity-80 [overflow-wrap:anywhere]" dangerouslySetInnerHTML={{ __html: item.additionalInfo }} />
//                                                 )}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Main Content (Right) */}
//             <div className={`flex-1 p-8 md:p-12 ${theme.background}`}>
//                 <div className={`flex flex-col gap-8 ${theme.sectionSpacing}`}>
//                     {mainSections.map(section => (
//                         <div key={section.id}>
//                             {/* Main Section Header - Light Gray Bar, Serif, Centered */}
//                             <div className="bg-gray-100 py-2 px-4 mb-6 relative">
//                                 <h2 className={`text-lg font-serif font-bold text-gray-800 tracking-widest uppercase flex items-center justify-center gap-3 [overflow-wrap:anywhere] ${theme.headingStyle}`}>
//                                    <span className="flex items-center justify-center">{getSectionIcon(section, 16)}</span>
//                                     <span className="flex items-center leading-none -mt-0.5">{section.title}</span>
//                                 </h2>
//                             </div>

//                             {/* Stacked Layout: Experience / Education / Projects / Custom / **Publications** */}
//                             {['Experience', 'Education', 'Projects', 'Custom', 'Publications'].includes(section.type) && Array.isArray(section.content) && (
//                                 <div className="space-y-6">
//                                     {(section.content as any[]).map((item: any) => (
//                                         <div key={item.id} className="group flex flex-col items-start text-left w-full">
//                                             {/* 1. Company / University / Title / Publisher (Bold, Serif/Sans mix) */}
//                                             <div className="font-bold text-gray-900 text-lg leading-tight w-full flex items-center justify-between">
//                                                 <span className="[overflow-wrap:anywhere] pr-2">
//                                                     {item.employer || item.school || item.title || item.publisher}
//                                                 </span>
//                                                 {item.url && (
//                                                     <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors ml-2 shrink-0">
//                                                         <LinkIcon size={16} />
//                                                     </a>
//                                                 )}
//                                             </div>

//                                             {/* 2. Job Title / Degree / SubTitle / Publisher (Medium text) */}
//                                             {(item.jobTitle || item.degree || item.subTitle || item.publisher) && (
//                                                 <div className="text-gray-800 font-medium text-base mb-1 w-full [overflow-wrap:anywhere]">
//                                                     {item.jobTitle || item.degree || item.subTitle || item.publisher}
//                                                 </div>
//                                             )}

//                                             {/* 3. Date | Location (Small, Gray, Distinct Line) */}
//                                             <div className="text-sm font-medium text-gray-500 mb-2 w-full uppercase tracking-wide [overflow-wrap:anywhere]">
//                                                 {item.startDate} {item.endDate ? `– ${item.endDate}` : ''}
//                                                 {item.date}
//                                                 {item.location && <span className="ml-2">| {item.location}</span>}
//                                             </div>

//                                             {/* 4. Description */}
//                                             {item.description && (
//                                                 <div
//                                                     className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none prose-ul:list-disc prose-li:marker:text-gray-500 w-full [overflow-wrap:anywhere]"
//                                                     dangerouslySetInnerHTML={{ __html: item.description }}
//                                                 />
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* References Section - Grid with Equal Height */}
//                             {section.type === 'References' && Array.isArray(section.content) && (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {(section.content as any[]).map((item: any) => (
//                                         <div key={item.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:border-gray-300 transition-colors h-full flex flex-col">
//                                             <div className="font-bold text-gray-900 flex items-center gap-2 mb-1">
//                                                 <span className="[overflow-wrap:anywhere]">{item.name}</span>
//                                                 {item.url && (
//                                                     <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors shrink-0">
//                                                         <LinkIcon size={14} />
//                                                     </a>
//                                                 )}
//                                             </div>
//                                             <div className="text-gray-700 font-medium text-sm mb-2 [overflow-wrap:anywhere]">{item.jobTitle}</div>
//                                             {item.organization && (
//                                                 <div className="text-gray-600 text-xs uppercase tracking-wide mb-3 [overflow-wrap:anywhere]">{item.organization}</div>
//                                             )}

//                                             <div className="flex flex-col gap-2 text-sm text-gray-600 mt-auto">
//                                                 {item.email && (
//                                                     <div className="flex items-start gap-2">
//                                                         <Mail size={14} className="opacity-70 mt-1 shrink-0" />
//                                                         <span className="truncate [overflow-wrap:anywhere]">{item.email}</span>
//                                                     </div>
//                                                 )}
//                                                 {item.phone && (
//                                                     <div className="flex items-start gap-2">
//                                                         <Phone size={14} className="opacity-70 mt-1 shrink-0" />
//                                                         <span className="[overflow-wrap:anywhere]">{item.phone}</span>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* Skills Grid - Fixed Bullet Point */}
//                             {section.type === 'Skills' && Array.isArray(section.content) && (
//                                 <ul className="space-y-2 list-disc pl-5 text-gray-800 leading-relaxed">
//                                     {(section.content as any[]).map((item: any) => (
//                                         <li key={item.id} className="pl-1">
//                                             <span className="font-bold mr-2">{item.skill}</span>
//                                             {item.information && (
//                                                 <span className="text-gray-600 inline-block [overflow-wrap:anywhere]">
//                                                     {item.information.replace(/<[^>]*>/g, '')}
//                                                 </span>
//                                             )}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}

//                             {/* Fallback for Custom String Content */}
//                             {!['Experience', 'Education', 'Projects', 'Skills', 'References', 'Custom', 'Publications'].includes(section.type) && (
//                                 <div className="text-gray-700 leading-relaxed [overflow-wrap:anywhere]">
//                                     {typeof section.content === 'string' ? (
//                                         <div dangerouslySetInnerHTML={{ __html: section.content }} />
//                                     ) : (
//                                         <div></div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
