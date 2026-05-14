import React from 'react';

/**
 * PageLayout provides a standardized A4 container.
 * It handles the distinction between Page 1 and Continuation Pages.
 */
interface PageLayoutProps {
    pageIndex: number;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const PageLayout = ({ pageIndex, children, className = "", style = {} }: PageLayoutProps) => {
    // A4 Dimensions at 96 DPI
    // Width: 210mm (~794px)
    // Height: 297mm (~1123px)

    return (
        <div
            className={`bg-white  overflow-hidden flex flex-col relative animate-in fade-in duration-500 ${className}`}
            style={{
                width: '794px',
                minHeight: '1123px',
                height: '1123px', // Fixed height for each page
                padding: '0', // Templates handle their own padding (p-12/14/16)
                ...style
            }}
        >
            {children}

            {/* Page Numbering - Optional but professional */}
            <div className="absolute bottom-6 right-8 text-[10px] text-gray-300 font-medium pointer-events-none">
                Page {pageIndex + 1}
            </div>
        </div>
    );
};