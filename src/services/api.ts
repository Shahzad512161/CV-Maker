import { ResumeTemplate } from '@/types/resume';

export interface TemplateData {
    id: string;
    name: string;
    thumbnail: string; // Or a component reference logic
    isPremium: boolean;
}

export const fetchResumes = async (): Promise<ResumeTemplate[]> => {
    // Mock data for user's saved resumes
    return [
        {
            id: '1',
            title: 'Software Engineer',
            lastModified: '2023-10-27',
            thumbnail: '/placeholder-resume-1.png',
        },
        {
            id: '2',
            title: 'Product Manager',
            lastModified: '2023-10-25',
            thumbnail: '/placeholder-resume-2.png',
        },
    ];
};

export const fetchTemplates = async (): Promise<TemplateData[]> => {
    // API POINT: Replace this simulation with your actual fetch call
    // const response = await fetch('YOUR_BACKEND_URL/api/templates');
    // return response.json();

    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return 40 mock templates
    return Array.from({ length: 40 }).map((_, i) => ({
        id: `template-${i + 1}`,
        name: `Modern Template ${i + 1}`,
        thumbnail: '',
        isPremium: i % 3 === 0, // Every 3rd template is premium
    }));
};
