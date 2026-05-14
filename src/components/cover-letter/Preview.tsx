import React from 'react';
import { CoverLetterData, PageData } from '@/app/cover-letter/editor/types';
import { Paginator } from './Paginator';
import { PageLayout } from './PageLayout';

// Import all templates
import { Template1 } from './templates/Template1';
import { Template2 } from './templates/Template2';
import { Template3 } from './templates/Template3';
import { Template4 } from './templates/Template4';
import { Template5 } from './templates/Template5';
import { Template6 } from './templates/Template6';
import { Template7 } from './templates/Template7';
import { Template8 } from './templates/Template8';
import { Template9 } from './templates/Template9';
import { Template10 } from './templates/Template10';
import { Template11 } from './templates/Template11';
import { Template12 } from './templates/Template12';
import { Template13 } from './templates/Template13';
import { Template14 } from './templates/Template14';
import { Template15 } from './templates/Template15';
import { Template16 } from './templates/Template16';
import { Template17 } from './templates/Template17';
import { Template18 } from './templates/Template18';
import { Template19 } from './templates/Template19';
import { Template20 } from './templates/Template20';
import { Template21 } from './templates/Template21';
import { Template22 } from './templates/Template22';
import { Template23 } from './templates/Template23';
import { Template24 } from './templates/Template24';
import { Template25 } from './templates/Template25';
import { Template26 } from './templates/Template26';
import { Template27 } from './templates/Template27';
import { Template28 } from './templates/Template28';
import { Template29 } from './templates/Template29';
import { Template30 } from './templates/Template30';
import { Template31 } from './templates/Template31';
import { Template32 } from './templates/Template32';
import { Template33 } from './templates/Template33';
import { Template34 } from './templates/Template34';
import { Template35 } from './templates/Template35';
import { Template36 } from './templates/Template36';
import { Template37 } from './templates/Template37';
import { Template38 } from './templates/Template38';
import { Template39 } from './templates/Template39';
import { Template40 } from './templates/Template40';
import { Template41 } from './templates/Template41';
import { Template42 } from './templates/Template42';
import { Template43 } from './templates/Template43';
import { Template44 } from './templates/Template44';
import { Template45 } from './templates/Template45';
import { Template46 } from './templates/Template46';
import { Template47 } from './templates/Template47';
import { Template48 } from './templates/Template48';
import { Template49 } from './templates/Template49';
import { Template50 } from './templates/Template50';

interface PreviewProps {
    data: CoverLetterData;
    templateId: string;
}

const templateMap: Record<string, any> = {
    '1': Template1,
    '2': Template2,
    '3': Template3,
    '4': Template4,
    '5': Template5,
    '6': Template6,
    '7': Template7,
    '8': Template8,
    '9': Template9,
    '10': Template10,
    '11': Template11,
    '12': Template12,
    '13': Template13,
    '14': Template14,
    '15': Template15,
    '16': Template16,
    '17': Template17,
    '18': Template18,
    '19': Template19,
    '20': Template20,
    '21': Template21,
    '22': Template22,
    '23': Template23,
    '24': Template24,
    '25': Template25,
    '26': Template26,
    '27': Template27,
    '28': Template28,
    '29': Template29,
    '30': Template30,
    '31': Template31,
    '32': Template32,
    '33': Template33,
    '34': Template34,
    '35': Template35,
    '36': Template36,
    '37': Template37,
    '38': Template38,
    '39': Template39,
    '40': Template40,
    '41': Template41,
    '42': Template42,
    '43': Template43,
    '44': Template44,
    '45': Template45,
    '46': Template46,
    '47': Template47,
    '48': Template48,
    '49': Template49,
    '50': Template50,
};

export const Preview = ({ data, templateId }: PreviewProps) => {
    // Header heights record to help Paginator estimate Page 1 space
    // Also include bodyWidthFirstPage for templates with sidebars
    const templateSpecs: Record<string, { h: number; w?: number }> = {
        '1': { h: 350 },
        '38': { h: 320, w: 450 }, // Left sidebar w-48
        '39': { h: 320, w: 480 }, // Right sidebar w-40
        '40': { h: 280, w: 480 }, // Right sidebar w-40
        '42': { h: 300, w: 440 }, // Right sidebar w-48
        '49': { h: 280, w: 420 }, // Left sidebar w-[35%]
    };

    const spec = templateSpecs[templateId] || { h: 380 };

    return (
        <div className="flex flex-col items-center">
            <Paginator
                htmlBody={data.body}
                headerHeight={spec.h}
                bodyWidthFirstPage={spec.w}
            >
                {(pages) => (
                    <div className="flex flex-col gap-8 items-center py-8">
                        {pages.map((page, index) => (
                            <PageLayout key={index} pageIndex={index}>
                                {renderTemplate(templateId, data, page)}
                            </PageLayout>
                        ))}
                    </div>
                )}
            </Paginator>
        </div>
    );
};

function renderTemplate(templateId: string, data: CoverLetterData, page: PageData) {
    const TemplateComponent = templateMap[templateId] || Template1;

    // During migration, we check if the component expects pageData.
    // Since we're refactoring all of them, they will all eventually use it.
    // For now, we pass it and the component will either use it or ignore it (if not yet refactored).
    return <TemplateComponent data={data} pageData={page} />;
}
