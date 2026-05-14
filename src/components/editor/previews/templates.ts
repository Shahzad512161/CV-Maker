import { TemplateConfig } from '@/types/resume';

const palettes = {
    navy: '#0f172a',
    charcoal: '#334155',
    royalBlue: '#1e40af',
    teal: '#0f766e',
    emerald: '#047857',
    purple: '#6b21a8',
    rose: '#be123c',
    amber: '#b45309',
    indigo: '#4338ca',
    cyan: '#0e7490',
    sky: '#0284c7',
    gold: '#854d0e',
    maroon: '#7f1d1d',
    forest: '#14532d',
    midnight: '#172554',
    black: '#000000',
    slate: '#475569',
};

const layouts: TemplateConfig['layout'][] = ['SidebarLeft', 'SidebarRight', 'Classic', 'Modern', 'Minimal', 'Structure', 'ClassicSerif', 'SidebarRightSerif', 'ProfessionalSerif', 'LeafyGreen', 'BorderedSerif', 'PastelBlock', 'SignatureModern', 'CarlosSlim', 'CarlaRivera', 'BrianWayne', 'LaraMiller', 'ArjunMehta', 'BrianTWayne', 'MateoVargas', 'SoftMint',];
const fonts = ['font-sans', 'font-serif'];
const styles: ('uppercase' | 'capitalize' | 'normal')[] = ['uppercase', 'capitalize', 'normal'];
const paletteKeys = Object.keys(palettes) as (keyof typeof palettes)[];

export const templates: TemplateConfig[] = Array.from({ length: 40 }, (_, i) => {
    const id = i + 1;
    const layoutIndex = i % layouts.length;
    const colorIndex = i % paletteKeys.length;
    const fontIndex = i % fonts.length;
    const styleIndex = i % styles.length;

    const colorKey = paletteKeys[colorIndex];

    // Special override to match Reference Image 1 exactly
    if (id === 1) {
        return {
            id: `template-1`,
            name: `Template 1`,
            layout: 'SidebarLeft',
            thumbnail: `/templates/template1.webp`,
            theme: {
                color: '#1a2a44', // Darker navy from reference
                fontFamily: 'font-serif', // Reference uses Serif
                background: '#ffffff',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 2 (Nadia Smith Reference)
    if (id === 2) {
        return {
            id: `template-2`,
            name: `Template 2`,
            layout: 'Classic', // Matches the single-column centered style
            thumbnail: `/templates/template2.webp`,
            theme: {
                color: '#333333', // Charcoal/Black text
                fontFamily: 'font-serif', // Strict Serif
                background: '#ffffff',
                sectionSpacing: 'gap-4',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 3 (Michael Johnson Reference)
    if (id === 3) {
        return {
            id: `template-3`,
            name: `Template 3`,
            layout: 'Modern', // Maps to ModernHeaderLayout
            thumbnail: `/templates/template3.webp`,
            theme: {
                color: '#536575', // Slate Blue/Gray from reference header
                fontFamily: 'font-sans', // Clean Sans-Serif
                background: '#ffffff',
                sectionSpacing: 'gap-6',
                headingStyle: 'capitalize'
            }
        };
    }

    // Special override for Template 4 (Rohan K. Patel Reference)
    if (id === 4) {
        return {
            id: `template-4`,
            name: `Template 4`,
            layout: 'Structure', // Maps to StructureLayout
            thumbnail: `/templates/template4.webp`,
            theme: {
                color: '#475569', // Slate Gray
                fontFamily: 'font-sans',
                background: '#ffffff',
                sectionSpacing: 'gap-8',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 5 (Lee Wang Reference)
    if (id === 5) {
        return {
            id: `template-5`,
            name: `Template 5`,
            layout: 'ClassicSerif', // Maps to ClassicSerifLayout
            thumbnail: `/templates/template5.webp`,
            theme: {
                color: '#000000', // Black
                fontFamily: 'font-serif',
                background: '#ffffff',
                sectionSpacing: 'gap-6',
                headingStyle: 'normal'
            }
        };
    }

    // Special override for Template 6 (Brian T. Wayne Reference)
    if (id === 6) {
        return {
            id: `template-6`,
            name: `Template 6`,
            layout: 'SidebarRightSerif', // Maps to SidebarRightSerifLayout
            thumbnail: `/templates/template6.webp`,
            theme: {
                color: '#000000',
                fontFamily: 'font-serif',
                background: '#d6cbb8', // Beige sidebar color
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 7 (Elio Giordano Reference)
    if (id === 7) {
        return {
            id: `template-7`,
            name: `Template 7`,
            layout: 'ProfessionalSerif', // Maps to ProfessionalSerifLayout
            thumbnail: `/templates/template7.webp`,
            theme: {
                color: '#000000',
                fontFamily: 'font-serif',
                background: '#ffffff',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 8 (Catherine Bale Reference)
    if (id === 8) {
        return {
            id: `template-8`,
            name: `Template 8`,
            layout: 'LeafyGreen', // Maps to LeafyGreenLayout
            thumbnail: `/templates/template8.webp`,
            theme: {
                color: '#000000',
                fontFamily: 'font-sans',
                background: '#ffffff',
                sectionSpacing: 'gap-5',
                headingStyle: 'capitalize'
            }
        };
    }

    // Special override for Template 9 (Aisha Khan Reference)
    if (id === 9) {
        return {
            id: `template-9`,
            name: `Template 9`,
            layout: 'BorderedSerif', // Maps to BorderedSerifLayout
            thumbnail: `/templates/template9.webp`,
            theme: {
                color: '#1a472a',
                fontFamily: 'font-serif',
                background: '#ffffff',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 10 (Anna Field Reference)
    if (id === 10) {
        return {
            id: `template-10`,
            name: `Template 10`,
            layout: 'PastelBlock',
            thumbnail: `/templates/template10.webp`,
            theme: {
                color: '#5c8065', // primary
                fontFamily: 'font-sans', // font
                background: '#ffffff', // background
                sectionSpacing: 'gap-6', // Default, as not specified
                headingStyle: 'capitalize' // Default, as not specified
            }
        };
    }

    // Special override for Template 11 (Clark Watson Reference)
    if (id === 11) {
        return {
            id: `template-11`,
            name: `Template 11`,
            layout: 'SignatureModern',
            thumbnail: `/templates/template11.webp`,
            theme: {
                color: '#2c3e50', // primary (Dark Gray)
                fontFamily: 'font-sans', // Body font
                background: '#EAECEF', // Light Gray (Refined)
                sectionSpacing: 'gap-8',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 12 (Carlos Rivera Reference)
    if (id === 12) {
        return {
            id: `template-12`,
            name: `Template 12`,
            layout: 'CarlosSlim',
            thumbnail: `/templates/template12.webp`,
            theme: {
                color: '#B2CED8',
                fontFamily: 'Roboto Slab',
                background: '#FFFFFF',
                sectionSpacing: 'relaxed',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 13 (Carla Rivera Reference)
    if (id === 13) {
        return {
            id: `template-13`,
            name: `Template 13`,
            layout: 'CarlaRivera',
            thumbnail: `/templates/template13.webp`,
            theme: {
                color: '#000000',
                fontFamily: 'font-sans',
                background: '#ffffff',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 14 (Brian Wayne Reference)
    if (id === 14) {
        return {
            id: `template-14`,
            name: `Brian Wayne`,
            layout: 'BrianWayne',
            thumbnail: `/templates/template14.webp`,
            theme: {
                color: '#2A3B55', // Sidebar background
                fontFamily: 'font-sans',
                background: '#FDFBF7', // Content background
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 15 (Lara Miller Reference)
    if (id === 15) {
        return {
            id: `template-15`,
            name: `Lara Miller`,
            layout: 'LaraMiller',
            thumbnail: `/templates/template15.webp`,
            theme: {
                color: '#683D56', // Plum/Purple
                fontFamily: 'font-sans',
                background: '#FFFFFF',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 16 (Arjun Mehta Reference)
    if (id === 16) {
        return {
            id: `template-16`,
            name: `Arjun Mehta`,
            layout: 'ArjunMehta',
            thumbnail: `/templates/template16.webp`,
            theme: {
                color: '#374151', // Dark Gray text
                fontFamily: 'font-sans',
                background: '#FFFFFF',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 17 (Brian T. Wayne - Green)
    if (id === 17) {
        return {
            id: `template-17`,
            name: `Brian T. Wayne`,
            layout: 'BrianTWayne',
            thumbnail: `/templates/template17.webp`,
            theme: {
                primary: '#2C3E33',
                text: '#333333',
                background: '#ffffff',
                accent: '#2C3E33',
                color: '#2C3E33',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-6',
                headingStyle: 'capitalize'
            }
        };
    }

    // Special override for Template 18 (Mateo Vargas - Black Header)
    if (id === 18) {
        return {
            id: `template-18`,
            name: `Mateo Vargas`,
            layout: 'MateoVargas',
            thumbnail: `/templates/template18.webp`,
            theme: {
                primary: '#000000',
                text: '#333333',
                background: '#ffffff',
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-6',
                headingStyle: 'normal'
            }
        };
    }

    // Special override for Template 19 (Soft Mint - Lara Miller Reference)
    if (id === 19) {
        return {
            id: `template-19`,
            name: `Soft Mint`,
            layout: 'SoftMint',
            thumbnail: `/templates/template19.webp`,
            theme: {
                primary: '#000000',
                text: '#333333',
                background: '#B2D8D2', // Mint Green from reference
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-6',
                headingStyle: 'normal'
            }
        };
    }

    // Special override for Template 20 (Priya Sharma Reference)
    if (id === 20) {
        return {
            id: `template-20`,
            name: `Priya Sharma`,
            layout: 'PriyaSharma',
            thumbnail: `/templates/template20.webp`,
            theme: {
                primary: '#000000',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 21 (Anna Field Reference)
    if (id === 21) {
        return {
            id: `template-21`,
            name: `Anna Field`,
            layout: 'AnnaField',
            thumbnail: `/templates/template21.webp`,
            theme: {
                primary: '#000000',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-6',
                headingStyle: 'normal'
            }
        };
    }

    // Special override for Template 22 (Alessandro Ricci Reference)
    if (id === 22) {
        return {
            id: `template-22`,
            name: `Alessandro Ricci`,
            layout: 'AlessandroRicci',
            thumbnail: `/templates/template22.webp`,
            theme: {
                primary: '#1a237e',
                text: '#1e293b',
                background: '#ffffff',
                accent: '#1a237e',
                color: '#1a237e',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 23 (Andrew Kim Reference)
    if (id === 23) {
        return {
            id: `template-23`,
            name: `Andrew Kim`,
            layout: 'AndrewKim',
            thumbnail: `/templates/template23.webp`,
            theme: {
                primary: '#000000',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-6',
                headingStyle: 'capitalize'
            }
        };
    }

    // Special override for Template 24 (Catherine Bale Reference)
    if (id === 24) {
        return {
            id: `template-24`,
            name: `Catherine Bale`,
            layout: 'CatherineBale',
            thumbnail: `/templates/template24.webp`,
            theme: {
                primary: '#f87171',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#f87171',
                color: '#f87171',
                fontFamily: 'font-mono',
                sectionSpacing: 'gap-8',
                headingStyle: 'capitalize'
            }
        };
    }

    // Special override for Template 25 (Isabela Campos Reference)
    if (id === 25) {
        return {
            id: `template-25`,
            name: `Isabela Campos`,
            layout: 'IsabelaCampos',
            thumbnail: `/templates/template25.webp`,
            theme: {
                primary: '#1a1a1a',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#1a1a1a',
                color: '#1a1a1a',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-8',
                headingStyle: 'capitalize'
            }
        };
    }

    // Special override for Template 26 (Andrew O'Sullivan Reference)
    if (id === 26) {
        return {
            id: `template-26`,
            name: `Andrew O'Sullivan`,
            layout: 'AndrewOSullivan',
            thumbnail: `/templates/template26.webp`,
            theme: {
                primary: '#000000',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 27 (Jacob McLaren Reference)
    if (id === 27) {
        return {
            id: `template-27`,
            name: `Jacob McLaren`,
            layout: 'JacobMcLaren',
            thumbnail: `/templates/template27.webp`,
            theme: {
                primary: '#000000',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 28 (Meghana Hegde Reference)
    if (id === 28) {
        return {
            id: `template-28`,
            name: `Meghana Hegde`,
            layout: 'MeghanaHegde',
            thumbnail: `/templates/template28.webp`,
            theme: {
                primary: '#0f3460',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#0f3460',
                color: '#0f3460',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 29 (Chloe Liang Reference)
    if (id === 29) {
        return {
            id: `template-29`,
            name: `Chloe Liang`,
            layout: 'ChloeLiang',
            thumbnail: `/templates/template29.webp`,
            theme: {
                primary: '#fca311',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#1a1a1a',
                color: '#fca311',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 30 (Herman Walton Reference)
    if (id === 30) {
        return {
            id: `template-30`,
            name: `Herman Walton`,
            layout: 'HermanWalton',
            thumbnail: `/templates/template30.webp`,
            theme: {
                primary: '#2563eb',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#2563eb',
                color: '#2563eb',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }
    // Special override for Template 31 (Taylor Cook Reference)
    if (id === 31) {
        return {
            id: `template-31`,
            name: `Taylor Cook`,
            layout: 'TaylorCook',
            thumbnail: `/templates/template31.webp`,
            theme: {
                primary: '#000000',
                text: '#1a1a1a',
                background: '#ffffff',
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-10',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 32 (Jack Farrell Reference)
    if (id === 32) {
        return {
            id: `template-32`,
            name: `Jack Farrell`,
            layout: 'JackFarrell',
            thumbnail: `/templates/template32.webp`,
            theme: {
                primary: '#000000',
                text: '#4b5563',
                background: '#ffffff',
                accent: '#000000',
                color: '#000000',
                fontFamily: 'font-serif', // Assuming 'Playfair Display' maps to 'font-serif' in Tailwind
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 33 (Vince Murray Reference)
    if (id === 33) {
        return {
            id: `template-33`,
            name: `Vince Murray`,
            layout: 'VinceMurray',
            thumbnail: `/templates/template33.webp`,
            theme: {
                primary: '#b91c1c',
                text: '#333333',
                background: '#ffffff',
                accent: '#b91c1c',
                color: '#b91c1c',
                fontFamily: 'font-sans', // Assuming 'Inter' maps to 'font-sans' in Tailwind
                sectionSpacing: 'gap-6',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 34 (Kane Jones Reference)
    if (id === 34) {
        return {
            id: `template-34`,
            name: `Kane Jones`,
            layout: 'KaneJones',
            thumbnail: `/templates/template34.webp`,
            theme: {
                primary: '#e9d5ff', // Light purple background for header
                text: '#1f2937',
                background: '#ffffff',
                accent: '#7c3aed', // Purple accent for icons/dots
                color: '#7c3aed',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-8',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 35 (David Anderson Reference)
    if (id === 35) {
        return {
            id: `template-35`,
            name: `David Anderson`,
            layout: 'DavidAnderson',
            thumbnail: `/templates/template35.webp`,
            theme: {
                primary: '#2c323f', // Dark sidebar
                text: '#1f2937',
                background: '#ffffff',
                accent: '#2c323f',
                color: '#2c323f',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-8',
                headingStyle: 'normal'
            }
        };
    }

    // Special override for Template 36 (Oliver Mason Reference)
    if (id === 36) {
        return {
            id: `template-36`,
            name: `Oliver Mason`,
            layout: 'OliverMason',
            thumbnail: `/templates/template36.webp`,
            theme: {
                primary: '#b4985f', // Gold sidebar
                text: '#333333',
                background: '#ffffff',
                accent: '#b4985f',
                color: '#b4985f',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-10',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 37 (Nelly Smith Reference)
    if (id === 37) {
        return {
            id: `template-37`,
            name: `Nelly Smith`,
            layout: 'NellySmith',
            thumbnail: `/templates/template37.webp`,
            theme: {
                primary: '#ceae62', // Gold header
                text: '#333333',
                background: '#ffffff',
                accent: '#e9e4d9', // Beige sidebar
                color: '#ceae62',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-10',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 38 (Professional Blue Reference)
    if (id === 38) {
        return {
            id: `template-38`,
            name: `Professional Blue`,
            layout: 'ProfessionalBlue',
            thumbnail: `/templates/template38.webp`,
            theme: {
                primary: '#3c5871', // Dark blue/gray for headings
                text: '#444444',
                background: '#f3f3f3', // Light gray background
                accent: '#3c5871',
                color: '#3c5871',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-8',
                headingStyle: 'uppercase'
            }
        };
    }

    // Special override for Template 39 (Andrew O'Sullivan Reference)
    if (id === 39) {
        return {
            id: `template-39`,
            name: `Andrew O'Sullivan`,
            layout: 'AndrewOSullivanTeal',
            thumbnail: `/templates/template39.webp`,
            theme: {
                primary: '#1a8073', // Teal/Dark Green
                text: '#333333',
                background: '#ffffff',
                accent: '#1a8073',
                color: '#1a8073',
                fontFamily: 'font-sans',
                sectionSpacing: 'gap-8',
                headingStyle: 'normal'
            }
        };
    }

    // Special override for Template 40 (Ada Smith Reference)
    if (id === 40) {
        return {
            id: `template-40`,
            name: `Ada Smith`,
            layout: 'AdaSmith',
            thumbnail: `/templates/template40.webp`,
            theme: {
                primary: '#c28e64', // Copper/Brown
                secondary: '#333333',
                text: '#333333',
                background: '#ffffff',
                accent: '#c28e64',
                color: '#c28e64',
                fontFamily: 'font-serif',
                sectionSpacing: 'gap-8',
                headingStyle: 'normal'
            }
        };
    }

    return {
        id: `template-${id}`,
        name: `Template ${id}`,
        layout: layouts[layoutIndex],
        thumbnail: `/templates/template${id}.webp`,
        theme: {
            color: palettes[colorKey],
            fontFamily: fonts[fontIndex],
            background: '#ffffff',
            sectionSpacing: 'gap-6',
            headingStyle: styles[styleIndex]
        }
    };
});

// Helper to get template
export const getActiveTemplate = (id: string | null) => {
    if (!id) return templates[0];
    // Strip prefix if exists to handle both formats
    const numericId = id.replace('template-', '');
    return templates.find(t => t.id === id || t.id === `template-${numericId}`) || templates[0];
};
