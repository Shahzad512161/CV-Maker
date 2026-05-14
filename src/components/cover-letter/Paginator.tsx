import React, { useEffect, useState } from 'react';

/**
 * Constants for A4 dimensions at 96 DPI
 */
export const A4_HEIGHT_PX = 1123;
export const A4_WIDTH_PX = 794;

export interface PageData {
    content: string;
    isFirstPage: boolean;
    isLastPage: boolean;
    pageIndex: number;
}

interface PaginatorProps {
    htmlBody: string;
    signatureHtml?: string;
    headerHeight?: number;
    footerHeight?: number;
    bodyWidthFirstPage?: number; // Added to handle sidebars on Page 1
    children: (pages: PageData[]) => React.ReactNode;
}

export const Paginator = ({ htmlBody, signatureHtml = "", headerHeight = 0, footerHeight = 0, bodyWidthFirstPage, children }: PaginatorProps) => {
    const [pages, setPages] = useState<PageData[]>([
        { content: htmlBody, isFirstPage: true, isLastPage: true, pageIndex: 0 }
    ]);

    useEffect(() => {
        const paginate = () => {
            // Create a measurement container
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.left = '-9999px';
            container.style.top = '0';
            // Start with the appropriate width for Page 1
            const effectiveWidth = bodyWidthFirstPage || A4_WIDTH_PX;
            container.style.width = `${effectiveWidth}px`;
            container.className = 'prose prose-sm max-w-none px-12 pb-12';
            container.innerHTML = htmlBody;

            // Append signature
            if (signatureHtml) {
                const sigDiv = document.createElement('div');
                sigDiv.innerHTML = signatureHtml;
                container.appendChild(sigDiv);
            }

            document.body.appendChild(container);

            const resultPages: PageData[] = [];
            let currentPageContent = '';

            // Page 1 available height
            const safetyMargin = 48;
            let currentHeight = headerHeight;
            let maxPageHeight = A4_HEIGHT_PX - safetyMargin - footerHeight;

            let elements = Array.from(container.children);
            let i = 0;

            while (i < elements.length) {
                const child = elements[i];
                const rect = child.getBoundingClientRect();
                const style = window.getComputedStyle(child);
                const marginTop = parseFloat(style.marginTop || '0');
                const marginBottom = parseFloat(style.marginBottom || '0');
                const totalElementHeight = rect.height + marginTop + marginBottom;

                // Check if element fits on current page
                if (currentHeight + totalElementHeight > maxPageHeight && i > 0) {
                    // Push current accumulated content to a new page
                    resultPages.push({
                        content: currentPageContent,
                        isFirstPage: resultPages.length === 0,
                        isLastPage: false,
                        pageIndex: resultPages.length
                    });

                    // Reset for next page (Continuation pages are full width)
                    currentPageContent = '';
                    currentHeight = 0;
                    maxPageHeight = A4_HEIGHT_PX - safetyMargin - footerHeight;

                    // Switch measurement container to full width for remaining elements
                    container.style.width = `${A4_WIDTH_PX}px`;

                    // IMPORTANT: We do NOT increment i here. 
                    // This allows the element that overflowed to be re-measured 
                    // in the next iteration with the new maxPageHeight and width.
                    continue;
                }

                currentPageContent += child.outerHTML;
                currentHeight += totalElementHeight;
                i++;

                // If it's the last element, push the remaining content
                if (i === elements.length) {
                    resultPages.push({
                        content: currentPageContent,
                        isFirstPage: resultPages.length === 0,
                        isLastPage: true,
                        pageIndex: resultPages.length
                    });
                }
            }

            document.body.removeChild(container);

            if (resultPages.length > 0) {
                setPages(resultPages);
            }
        };

        const timer = setTimeout(paginate, 100);
        return () => clearTimeout(timer);
    }, [htmlBody, signatureHtml, headerHeight, footerHeight]);

    return <>{children(pages)}</>;
};
