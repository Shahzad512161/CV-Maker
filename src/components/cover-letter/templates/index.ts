
export interface CoverLetterTemplateConfig {
    id: string;
    name: string;
    thumbnail: string;
    theme: {
        color: string;
    }
}

// Generate 50 templates
export const coverLetterTemplates: CoverLetterTemplateConfig[] = Array.from({ length: 50 }, (_, i) => {
    const id = (i + 1).toString();
    return {
        id,
        name: `Template ${id}`,
        thumbnail: `/coverLetterTemplates/cover-letter-${id}.webp`, // Assuming similar naming convention or placeholder
        theme: {
            color: '#1a1b3a' // Default color, can vary if needed
        }
    };
});
