export interface TemplateTheme {
    color: string;
    fontFamily: string;
    background: string;
    sectionSpacing: string;
    headingStyle: 'uppercase' | 'capitalize' | 'normal';
    primary?: string;
    text?: string;
    accent?: string;
}

export interface TemplateConfig {
    id: string;
    name: string;
    layout: 'Classic' | 'Modern' | 'Sidebar' | 'Minimalist' | 'Structure' | 'ClassicSerif' | 'SidebarRightSerif' | 'ProfessionalSerif' | 'LeafyGreen' | 'BorderedSerif' | 'PastelBlock' | 'SignatureModern' | 'CarlosSlim' | 'CarlaRivera' | 'BrianWayne' | 'SidebarLeft' | 'SidebarRight' | 'Minimal' | 'ArjunMehta' | 'BrianTWayne' | 'MateoVargas' | 'SoftMint' | "LaraMiller" | "PriyaSharma" | "AnnaField" | "AlessandroRicci" | "AndrewKim" | "CatherineBale" | "IsabelaCampos" | "AndrewOSullivan" | "AndrewOSullivanTeal" | "JacobMcLaren" | "MeghanaHegde" | "ChloeLiang" | "HermanWalton" | "TaylorCook" | "JackFarrell" | 'VinceMurray' | 'KaneJones' | 'DavidAnderson' | 'OliverMason' | 'NellySmith' | 'ProfessionalBlue' | 'AdaSmith';
    thumbnail: string;
    theme: TemplateTheme;
}

export interface SocialLink {
    id: string;
    label: string;
    value: string;
    placeholder?: string;
}

export interface PersonalDetails {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    photo?: string;
    dob?: string;
    nationality?: string;
    socials: SocialLink[];
    contactOrder?: string[];
}

export interface ExperienceItem {
    id: string;
    jobTitle: string;
    employer: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    url?: string;
}

export interface EducationItem {
    id: string;
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    url?: string;
}

export interface SkillItem {
    id: string;
    skill: string;
    level: string;
    information?: string;
}

export interface LanguageItem {
    id: string;
    language: string;
    level: string;
    information?: string;
    additionalInfo?: string;
}

export interface CertificateItem {
    id: string;
    title: string;
    certificate?: string;
    issuer: string;
    date: string;
    description?: string;
    additionalInfo?: string;
    url?: string;
}

export interface InterestItem {
    id: string;
    name: string;
    url?: string;
    additionalInfo?: string;
    isVisible?: boolean;
}

export interface ProjectItem {
    id: string;
    title: string;
    subTitle?: string;
    startDate: string;
    endDate: string;
    location?: string;
    description: string;
    url?: string;
}

export interface AwardItem {
    id: string;
    award: string;
    issuer: string;
    date: string;
    description?: string;
}

export interface PublicationItem {
    id: string;
    title: string;
    publisher: string;
    date: string;
    description?: string;
    url?: string;
}

export interface ReferenceItem {
    id: string;
    name: string;
    jobTitle?: string;
    organization?: string;
    email?: string;
    phone?: string;
    url?: string;
}

export interface CustomItem {
    id: string;
    title: string;
    subTitle?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    description: string;
    url?: string;
    isVisible?: boolean;
}

export type SectionType = 'Profile' | 'Experience' | 'Education' | 'Skills' | 'Languages' | 'Certificates' | 'Interests' | 'Projects' | 'Awards' | 'Publications' | 'References' | 'Declaration' | 'Custom' | 'Courses' | 'Organisations';

export interface ResumeSection {
    id: string;
    type: SectionType;
    title: string;
    isVisible: boolean;
    variant?: 'normal' | 'skill';
    icon?: string;
    content: string | ExperienceItem[] | EducationItem[] | SkillItem[] | LanguageItem[] | CertificateItem[] | InterestItem[] | ProjectItem[] | AwardItem[] | PublicationItem[] | ReferenceItem[] | CustomItem[] | any[];
}

export interface ResumeTemplate {
    id: string;
    title: string;
    lastModified: string;
    thumbnail: string;
}

export interface ResumeContent {
    personalDetails: PersonalDetails;
    sections: ResumeSection[];
}
