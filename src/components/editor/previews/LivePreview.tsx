import React from 'react';
import { ResumeContent, TemplateTheme } from '@/types/resume';
import { SidebarLeftLayout } from './layouts/SidebarLeftLayout';
import { SidebarRightLayout } from './layouts/SidebarRightLayout';
import { ClassicLayout } from './layouts/ClassicLayout';
import { MinimalLayout } from './layouts/MinimalLayout';
import { ModernHeaderLayout } from './layouts/ModernHeaderLayout';
import { StructureLayout } from './layouts/StructureLayout';
import { ClassicSerifLayout } from './layouts/ClassicSerifLayout';
import { SidebarRightSerifLayout } from './layouts/SidebarRightSerifLayout';
import { ProfessionalSerifLayout } from './layouts/ProfessionalSerifLayout';
import { LeafyGreenLayout } from './layouts/LeafyGreenLayout';
import { BorderedSerifLayout } from './layouts/BorderedSerifLayout';
import { PastelBlockLayout } from './layouts/PastelBlockLayout';
import { SignatureModernLayout } from './layouts/SignatureModernLayout';
import { CarlosSlimLayout } from './layouts/CarlosSlimLayout';
import { CarlaRiveraLayout } from './layouts/CarlaRiveraLayout';
import { BrianWayneLayout } from './layouts/BrianWayneLayout';
import { BlankLayout } from './layouts/BlankLayout';
import { getActiveTemplate } from './templates';
import { LaraMillerLayout } from './layouts/LaraMillerLayout';
import { ArjunMehtaLayout } from './layouts/ArjunMehtaLayout';
import { BrianTWayneLayout } from './layouts/BrianTWayneLayout';
import { MateoVargasLayout } from './layouts/MateoVargasLayout';
import { SoftMintLayout } from './layouts/SoftMintLayout';
import { PriyaSharmaLayout } from './layouts/PriyaSharmaLayout';
import { AnnaFieldLayout } from './layouts/AnnaFieldLayout';
import { AlessandroRicciLayout } from './layouts/AlessandroRicciLayout';
import { AndrewKimLayout } from './layouts/AndrewKimLayout';
import { CatherineBaleLayout } from './layouts/CatherineBaleLayout';
import { IsabelaCamposLayout } from './layouts/IsabelaCamposLayout';
import { AndrewOSullivanLayout } from './layouts/AndrewOSullivanLayout';
import { AndrewOSullivanTealLayout } from './layouts/AndrewOSullivanTealLayout';
import { JacobMcLarenLayout } from './layouts/JacobMcLarenLayout';
import MeghanaHegdeLayout from './layouts/MeghanaHegdeLayout';
import ChloeLiangLayout from './layouts/ChloeLiangLayout';
import HermanWaltonLayout from './layouts/HermanWaltonLayout';
import TaylorCookLayout from './layouts/TaylorCookLayout';
import JackFarrellLayout from './layouts/JackFarrellLayout';
import VinceMurrayLayout from './layouts/VinceMurrayLayout';
import KaneJonesLayout from './layouts/KaneJonesLayout';
import { DavidAndersonLayout } from './layouts/DavidAndersonLayout';
import { OliverMasonLayout } from './layouts/OliverMasonLayout';
import { NellySmithLayout } from './layouts/NellySmithLayout';
import { ProfessionalBlueLayout } from './layouts/ProfessionalBlueLayout';
import { AdaSmithLayout } from './layouts/AdaSmithLayout';

const LAYOUTS: Record<string, React.FC<{ data: ResumeContent; theme: TemplateTheme }>> = {
    SidebarLeft: SidebarLeftLayout,
    SidebarRight: SidebarRightLayout,
    Classic: ClassicLayout,
    Minimal: MinimalLayout,
    Modern: ModernHeaderLayout,
    Structure: StructureLayout,
    ClassicSerif: ClassicSerifLayout,
    SidebarRightSerif: SidebarRightSerifLayout,
    ProfessionalSerif: ProfessionalSerifLayout,
    LeafyGreen: LeafyGreenLayout,
    BorderedSerif: BorderedSerifLayout,
    PastelBlock: PastelBlockLayout,
    SignatureModern: SignatureModernLayout,
    CarlosSlim: CarlosSlimLayout,
    CarlaRivera: CarlaRiveraLayout,
    BrianWayne: BrianWayneLayout,
    LaraMiller: LaraMillerLayout,
    ArjunMehta: ArjunMehtaLayout,
    BrianTWayne: BrianTWayneLayout,
    MateoVargas: MateoVargasLayout,
    SoftMint: SoftMintLayout,
    PriyaSharma: PriyaSharmaLayout,
    AnnaField: AnnaFieldLayout,
    AlessandroRicci: AlessandroRicciLayout,
    AndrewKim: AndrewKimLayout,
    CatherineBale: CatherineBaleLayout,
    IsabelaCampos: IsabelaCamposLayout,
    AndrewOSullivan: AndrewOSullivanLayout,
    AndrewOSullivanTeal: AndrewOSullivanTealLayout,
    JacobMcLaren: JacobMcLarenLayout,
    MeghanaHegde: MeghanaHegdeLayout,
    ChloeLiang: ChloeLiangLayout,
    HermanWalton: HermanWaltonLayout,
    TaylorCook: TaylorCookLayout,
    JackFarrell: JackFarrellLayout,
    VinceMurray: VinceMurrayLayout,
    KaneJones: KaneJonesLayout,
    DavidAnderson: DavidAndersonLayout,
    OliverMason: OliverMasonLayout,
    NellySmith: NellySmithLayout,
};

interface Props {
    data: ResumeContent;
    templateId?: string;
}

export const LivePreview = ({ data, templateId }: Props) => {
    // 1. Centralize visibility filtering
    // Filter sections and entries before passing to layouts
    const filteredData: ResumeContent = {
        ...data,
        sections: data.sections
            .filter(s => s.isVisible !== false)
            .map(s => ({
                ...s,
                content: Array.isArray(s.content)
                    ? s.content.filter((item: any) => item.isVisible !== false)
                    : s.content
            })) as any
    };

    // Legacy / Blank Mode: If no templateId is provided, use the original default layout
    if (!templateId) {
        const defaultTheme: TemplateTheme = {
            color: '#111827', // Gray-900 (Black-ish) matching reference header
            fontFamily: 'font-sans',
            background: '#ffffff',
            sectionSpacing: 'gap-8',
            headingStyle: 'uppercase'
        };
        // This layout EXACTLY matches the "Hanzala Tareen" reference image (White BG, Border, Left Text)
        return <BlankLayout data={filteredData} theme={defaultTheme} />;
    }

    // Template Mode: Use the configuration from templates system
    const activeTemplate = getActiveTemplate(templateId);

    // 2. Render the matching layout component with the template's theme
    switch (activeTemplate.layout) {
        case 'SidebarLeft':
            return <SidebarLeftLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'SidebarRight':
            return <SidebarRightLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'Classic':
            return <ClassicLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'Minimal':
            return <MinimalLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'Modern':
            return <ModernHeaderLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'Structure':
            return <StructureLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'ClassicSerif':
            return <ClassicSerifLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'SidebarRightSerif':
            return <SidebarRightSerifLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'ProfessionalSerif':
            return <ProfessionalSerifLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'LeafyGreen':
            return <LeafyGreenLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'BorderedSerif':
            return <BorderedSerifLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'PastelBlock':
            return <PastelBlockLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'SignatureModern':
            return <SignatureModernLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'CarlosSlim':
            return <CarlosSlimLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'CarlaRivera':
            return <CarlaRiveraLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'BrianWayne':
            return <BrianWayneLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'LaraMiller':
            return <LaraMillerLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'ArjunMehta':
            return <ArjunMehtaLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'BrianTWayne':
            return <BrianTWayneLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'MateoVargas':
            return <MateoVargasLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'SoftMint':
            return <SoftMintLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'PriyaSharma':
            return <PriyaSharmaLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'AnnaField':
            return <AnnaFieldLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'AlessandroRicci':
            return <AlessandroRicciLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'AndrewKim':
            return <AndrewKimLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'CatherineBale':
            return <CatherineBaleLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'IsabelaCampos':
            return <IsabelaCamposLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'AndrewOSullivan':
            return <AndrewOSullivanLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'AndrewOSullivanTeal':
            return <AndrewOSullivanTealLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'JacobMcLaren':
            return <JacobMcLarenLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'MeghanaHegde':
            return <MeghanaHegdeLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'ChloeLiang':
            return <ChloeLiangLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'HermanWalton':
            return <HermanWaltonLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'TaylorCook':
            return <TaylorCookLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'JackFarrell':
            return <JackFarrellLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'VinceMurray':
            return <VinceMurrayLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'KaneJones':
            return <KaneJonesLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'DavidAnderson':
            return <DavidAndersonLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'OliverMason':
            return <OliverMasonLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'NellySmith':
            return <NellySmithLayout data={filteredData} theme={activeTemplate.theme} />;

        case 'ProfessionalBlue':
            return <ProfessionalBlueLayout data={filteredData} theme={activeTemplate.theme} />;
        case 'AdaSmith':
            return <AdaSmithLayout data={filteredData} theme={activeTemplate.theme} />;
        default:
            return <SidebarLeftLayout data={filteredData} theme={activeTemplate.theme} />;
    }
};



// import React from 'react';
// import { ResumeContent, TemplateTheme } from '@/types/resume';
// import { SidebarLeftLayout } from './layouts/SidebarLeftLayout';
// import { SidebarRightLayout } from './layouts/SidebarRightLayout';
// import { ClassicLayout } from './layouts/ClassicLayout';
// import { MinimalLayout } from './layouts/MinimalLayout';
// import { ModernHeaderLayout } from './layouts/ModernHeaderLayout';
// import { StructureLayout } from './layouts/StructureLayout';
// import { ClassicSerifLayout } from './layouts/ClassicSerifLayout';
// import { SidebarRightSerifLayout } from './layouts/SidebarRightSerifLayout';
// import { ProfessionalSerifLayout } from './layouts/ProfessionalSerifLayout';
// import { LeafyGreenLayout } from './layouts/LeafyGreenLayout';
// import { BorderedSerifLayout } from './layouts/BorderedSerifLayout';
// import { PastelBlockLayout } from './layouts/PastelBlockLayout';
// import { SignatureModernLayout } from './layouts/SignatureModernLayout';
// import { CarlosSlimLayout } from './layouts/CarlosSlimLayout';
// import { CarlaRiveraLayout } from './layouts/CarlaRiveraLayout';
// import { BrianWayneLayout } from './layouts/BrianWayneLayout';
// import { BlankLayout } from './layouts/BlankLayout';
// import { getActiveTemplate } from './templates';
// import { LaraMillerLayout } from './layouts/LaraMillerLayout';
// import { ArjunMehtaLayout } from './layouts/ArjunMehtaLayout';
// import { BrianTWayneLayout } from './layouts/BrianTWayneLayout';
// import { MateoVargasLayout } from './layouts/MateoVargasLayout';
// import { SoftMintLayout } from './layouts/SoftMintLayout';
// import { PriyaSharmaLayout } from './layouts/PriyaSharmaLayout';
// import { AnnaFieldLayout } from './layouts/AnnaFieldLayout';
// import { AlessandroRicciLayout } from './layouts/AlessandroRicciLayout';
// import { AndrewKimLayout } from './layouts/AndrewKimLayout';
// import { CatherineBaleLayout } from './layouts/CatherineBaleLayout';
// import { IsabelaCamposLayout } from './layouts/IsabelaCamposLayout';
// import { AndrewOSullivanLayout } from './layouts/AndrewOSullivanLayout';
// import { AndrewOSullivanTealLayout } from './layouts/AndrewOSullivanTealLayout';
// import { JacobMcLarenLayout } from './layouts/JacobMcLarenLayout';
// import MeghanaHegdeLayout from './layouts/MeghanaHegdeLayout';
// import ChloeLiangLayout from './layouts/ChloeLiangLayout';
// import HermanWaltonLayout from './layouts/HermanWaltonLayout';
// import TaylorCookLayout from './layouts/TaylorCookLayout';
// import JackFarrellLayout from './layouts/JackFarrellLayout';
// import VinceMurrayLayout from './layouts/VinceMurrayLayout';
// import KaneJonesLayout from './layouts/KaneJonesLayout';
// import { DavidAndersonLayout } from './layouts/DavidAndersonLayout';
// import { OliverMasonLayout } from './layouts/OliverMasonLayout';
// import { NellySmithLayout } from './layouts/NellySmithLayout';
// import { ProfessionalBlueLayout } from './layouts/ProfessionalBlueLayout';
// import { AdaSmithLayout } from './layouts/AdaSmithLayout';

// const LAYOUTS: Record<string, React.FC<{ data: ResumeContent; theme: TemplateTheme }>> = {
//     SidebarLeft: SidebarLeftLayout,
//     SidebarRight: SidebarRightLayout,
//     Classic: ClassicLayout,
//     Minimal: MinimalLayout,
//     Modern: ModernHeaderLayout,
//     Structure: StructureLayout,
//     ClassicSerif: ClassicSerifLayout,
//     SidebarRightSerif: SidebarRightSerifLayout,
//     ProfessionalSerif: ProfessionalSerifLayout,
//     LeafyGreen: LeafyGreenLayout,
//     BorderedSerif: BorderedSerifLayout,
//     PastelBlock: PastelBlockLayout,
//     SignatureModern: SignatureModernLayout,
//     CarlosSlim: CarlosSlimLayout,
//     CarlaRivera: CarlaRiveraLayout,
//     BrianWayne: BrianWayneLayout,
//     LaraMiller: LaraMillerLayout,
//     ArjunMehta: ArjunMehtaLayout,
//     BrianTWayne: BrianTWayneLayout,
//     MateoVargas: MateoVargasLayout,
//     SoftMint: SoftMintLayout,
//     PriyaSharma: PriyaSharmaLayout,
//     AnnaField: AnnaFieldLayout,
//     AlessandroRicci: AlessandroRicciLayout,
//     AndrewKim: AndrewKimLayout,
//     CatherineBale: CatherineBaleLayout,
//     IsabelaCampos: IsabelaCamposLayout,
//     AndrewOSullivan: AndrewOSullivanLayout,
//     AndrewOSullivanTeal: AndrewOSullivanTealLayout,
//     JacobMcLaren: JacobMcLarenLayout,
//     MeghanaHegde: MeghanaHegdeLayout,
//     ChloeLiang: ChloeLiangLayout,
//     HermanWalton: HermanWaltonLayout,
//     TaylorCook: TaylorCookLayout,
//     JackFarrell: JackFarrellLayout,
//     VinceMurray: VinceMurrayLayout,
//     KaneJones: KaneJonesLayout,
//     DavidAnderson: DavidAndersonLayout,
//     OliverMason: OliverMasonLayout,
//     NellySmith: NellySmithLayout,
// };

// interface Props {
//     data: ResumeContent;
//     templateId?: string;
// }

// export const LivePreview = ({ data, templateId }: Props) => {
//     // 1. Centralize visibility filtering
//     // Filter sections and entries before passing to layouts
//     const filteredData: ResumeContent = {
//         ...data,
//         sections: data.sections
//             .filter(s => s.isVisible !== false)
//             .map(s => ({
//                 ...s,
//                 content: Array.isArray(s.content)
//                     ? s.content.filter((item: any) => item.isVisible !== false)
//                     : s.content
//             })) as any
//     };

//     // Legacy / Blank Mode: If no templateId is provided, use the original default layout
//     if (!templateId) {
//         const defaultTheme: TemplateTheme = {
//             color: '#111827', // Gray-900 (Black-ish) matching reference header
//             fontFamily: 'font-sans',
//             background: '#ffffff',
//             sectionSpacing: 'gap-8',
//             headingStyle: 'uppercase'
//         };
//         // This layout EXACTLY matches the "Hanzala Tareen" reference image (White BG, Border, Left Text)
//         return <BlankLayout data={filteredData} theme={defaultTheme} />;
//     }

//     // Template Mode: Use the configuration from templates system
//     const activeTemplate = getActiveTemplate(templateId);

//     // 2. Render the matching layout component with the template's theme
//     switch (activeTemplate.layout) {
//         case 'SidebarLeft':
//             return <SidebarLeftLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'SidebarRight':
//             return <SidebarRightLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'Classic':
//             return <ClassicLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'Minimal':
//             return <MinimalLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'Modern':
//             return <ModernHeaderLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'Structure':
//             return <StructureLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'ClassicSerif':
//             return <ClassicSerifLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'SidebarRightSerif':
//             return <SidebarRightSerifLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'ProfessionalSerif':
//             return <ProfessionalSerifLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'LeafyGreen':
//             return <LeafyGreenLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'BorderedSerif':
//             return <BorderedSerifLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'PastelBlock':
//             return <PastelBlockLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'SignatureModern':
//             return <SignatureModernLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'CarlosSlim':
//             return <CarlosSlimLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'CarlaRivera':
//             return <CarlaRiveraLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'BrianWayne':
//             return <BrianWayneLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'LaraMiller':
//             return <LaraMillerLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'ArjunMehta':
//             return <ArjunMehtaLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'BrianTWayne':
//             return <BrianTWayneLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'MateoVargas':
//             return <MateoVargasLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'SoftMint':
//             return <SoftMintLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'PriyaSharma':
//             return <PriyaSharmaLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'AnnaField':
//             return <AnnaFieldLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'AlessandroRicci':
//             return <AlessandroRicciLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'AndrewKim':
//             return <AndrewKimLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'CatherineBale':
//             return <CatherineBaleLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'IsabelaCampos':
//             return <IsabelaCamposLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'AndrewOSullivan':
//             return <AndrewOSullivanLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'AndrewOSullivanTeal':
//             return <AndrewOSullivanTealLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'JacobMcLaren':
//             return <JacobMcLarenLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'MeghanaHegde':
//             return <MeghanaHegdeLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'ChloeLiang':
//             return <ChloeLiangLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'HermanWalton':
//             return <HermanWaltonLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'TaylorCook':
//             return <TaylorCookLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'JackFarrell':
//             return <JackFarrellLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'VinceMurray':
//             return <VinceMurrayLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'KaneJones':
//             return <KaneJonesLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'DavidAnderson':
//             return <DavidAndersonLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'OliverMason':
//             return <OliverMasonLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'NellySmith':
//             return <NellySmithLayout data={filteredData} theme={activeTemplate.theme} />;

//         case 'ProfessionalBlue':
//             return <ProfessionalBlueLayout data={filteredData} theme={activeTemplate.theme} />;
//         case 'AdaSmith':
//             return <AdaSmithLayout data={filteredData} theme={activeTemplate.theme} />;
//         default:
//             return <SidebarLeftLayout data={filteredData} theme={activeTemplate.theme} />;
//     }
// };
