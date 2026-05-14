export interface PageData {
    content: string;
    isFirstPage: boolean;
    isLastPage: boolean;
    pageIndex: number;
}

export interface SocialLink {
    id: string;
    label: string; // e.g., 'LinkedIn', 'Website'
    value: string;
    placeholder?: string;
}

export interface CoverLetterData {
    personal: {
        fullName: string;
        jobTitle: string;
        email: string;
        phone: string;
        address: string;
        photo?: string; // Base64 or URL
        socials: SocialLink[];
    };
    date: string;
    recipient: {
        name: string;
        company: string;
        address: string;
    };
    body: string;
    signature: {
        name: string;
        place: string;
        date: string;
        image?: string; // Base64 or URL
    };
}

export const INITIAL_DATA: CoverLetterData = {
    personal: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        address: '',
        socials: []
    },
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    recipient: {
        name: '',
        company: '',
        address: ''
    },
    body: '<p>Dear _______,</p><p></p>',
    signature: {
        name: '',
        place: '',
        date: ''
    }
};
