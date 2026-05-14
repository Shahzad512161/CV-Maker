import { useState, useEffect, useCallback } from 'react';

/**
 * Constants for A4 dimensions at 96 DPI
 */
const A4_HEIGHT_PX = 1123;
const A4_WIDTH_PX = 794;

interface PaginationResult {
    pages: string[];
    isPaginating: boolean;
}

export const usePagination = (htmlBody: string, headerHeight: number = 0, footerHeight: number = 0) => {
    const [result, setResult] = useState<PaginationResult>({
        pages: [htmlBody],
        isPaginating: false
    });

    const paginate = useCallback(async () => {
        if (!htmlBody) return;
        setResult(prev => ({ ...prev, isPaginating: true }));

        // Create a hidden measurement container
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = `${A4_WIDTH_PX}px`;
        container.className = 'prose prose-sm max-w-none'; // Match template styles
        container.innerHTML = htmlBody;
        document.body.appendChild(container);

        const pages: string[] = [];
        let currentPageContent = '';
        let currentHeight = headerHeight; // Start with header on Page 1
        const maxPageContentHeight = A4_HEIGHT_PX - footerHeight;

        const children = Array.from(container.children);

        for (const child of children) {
            const childHeight = child.getBoundingClientRect().height;
            const style = window.getComputedStyle(child);
            const marginTop = parseFloat(style.marginTop);
            const marginBottom = parseFloat(style.marginBottom);
            const totalElementHeight = childHeight + marginTop + marginBottom;

            if (currentHeight + totalElementHeight > maxPageContentHeight) {
                // Page overflow!
                pages.push(currentPageContent);

                // Reset for next page
                currentPageContent = child.outerHTML;
                currentHeight = totalElementHeight; // Subsequent pages have no header/date etc.
            } else {
                currentPageContent += child.outerHTML;
                currentHeight += totalElementHeight;
            }
        }

        // Add the last page
        if (currentPageContent) {
            pages.push(currentPageContent);
        }

        document.body.removeChild(container);
        setResult({
            pages: pages.length > 0 ? pages : [htmlBody],
            isPaginating: false
        });
    }, [htmlBody, headerHeight, footerHeight]);

    useEffect(() => {
        paginate();
    }, [paginate]);

    return result;
};
