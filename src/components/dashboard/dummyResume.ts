import { ResumeContent } from '@/types/resume';

export const dummyResume: ResumeContent = {
    personalDetails: {
        fullName: 'Brian T. Wayne',
        jobTitle: 'Business Development Consultant',
        email: 'brian@wayne.com',
        phone: '+1-541-754-3010',
        location: 'California, USA',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        socials: [
            { id: 's1', label: 'LinkedIn', value: 'https://linkedin.com/wayne' },
            { id: 's2', label: 'Website', value: 'https://wayne.com' }
        ]
    },
    sections: [
        {
            id: '1',
            type: 'Profile',
            title: 'Profile',
            isVisible: true,
            content: 'Business development consultant with a passion for helping companies achieve their growth potential. With my MBA degree and extensive experience in strategy, I strive to provide innovative solutions.'
        },
        {
            id: '2',
            type: 'Experience',
            title: 'Work Experience',
            isVisible: true,
            content: [
                {
                    id: 'e1',
                    jobTitle: 'Business Consultant',
                    employer: 'Appleseed Inc.',
                    startDate: '2023',
                    endDate: 'Present',
                    location: 'New York',
                    description: '• Developed and implemented strategic plans resulting in 30% increase in new business.\n• Collaborated with cross-functional teams to drive growth.'
                },
                {
                    id: 'e2',
                    jobTitle: 'Business Development',
                    employer: 'Aexus',
                    startDate: '2018',
                    endDate: '2022',
                    location: 'Los Angeles',
                    description: '• Worked closely with tech companies to provide expert sales outsourcing.\n• Built and managed dedicated sales teams in Europe and Asia.'
                }
            ]
        },
        {
            id: '3',
            type: 'Education',
            title: 'Education',
            isVisible: true,
            content: [
                {
                    id: 'ed1',
                    degree: 'Master of Business Admin',
                    school: 'Harvard Business School',
                    startDate: '2017',
                    endDate: '2018',
                    location: 'Boston',
                    description: ''
                }
            ]
        },
        {
            id: '4',
            type: 'Skills',
            title: 'Skills',
            isVisible: true,
            content: [
                { id: 's1', skill: 'Strategic Planning', level: 'Expert', information: '' },
                { id: 's2', skill: 'Business Analysis', level: 'Expert', information: '' },
                { id: 's3', skill: 'Marketing', level: 'Expert', information: '' },
                { id: 's4', skill: 'Negotiation', level: 'Expert', information: '' }
            ]
        },
        {
            id: '5',
            type: 'Languages',
            title: 'Languages',
            isVisible: true,
            content: [
                { id: 'l1', language: 'English', level: 'Native', information: '' },
                { id: 'l2', language: 'Spanish', level: 'Fluent', information: '' }
            ]
        }
    ]
};
