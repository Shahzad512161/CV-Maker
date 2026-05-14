import React, { useRef, useEffect, useState, useMemo } from 'react';

interface PaginationWrapperProps {
    children: React.ReactNode;
    pageSize?: 'a4' | 'letter';
    className?: string;
}

const PAGE_DIMENSIONS = {
    a4: {
        width: '210mm',
        height: '297mm',
        pxWidth: 794,
        pxHeight: 1123
    },
    letter: {
        width: '8.5in',
        height: '11in',
        pxWidth: 816,
        pxHeight: 1056
    }
};

export const PaginationWrapper = ({ children, pageSize = 'a4', className = "" }: PaginationWrapperProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState(1);
    const dimensions = PAGE_DIMENSIONS[pageSize];

    useEffect(() => {
        const updatePageCount = () => {
            if (contentRef.current) {
                const totalHeight = contentRef.current.scrollHeight;
                const newPageCount = Math.max(1, Math.ceil(totalHeight / dimensions.pxHeight));
                setPageCount(newPageCount);
            }
        };

        // Update on mount and whenever content changes
        updatePageCount();

        const observer = new MutationObserver(updatePageCount);
        if (contentRef.current) {
            observer.observe(contentRef.current, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }

        return () => observer.disconnect();
    }, [dimensions.pxHeight, children]);

    return (
        <div className={`flex flex-col items-center gap-8 ${className}`}>
            {/* Hidden container to measure content */}
            <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0">
                <div
                    ref={contentRef}
                    style={{ width: dimensions.pxWidth }}
                >
                    {children}
                </div>
            </div>

            {/* Visual Pages */}
            {Array.from({ length: pageCount }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2 group">
                    <div className="flex items-center justify-between w-full px-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Page {index + 1}</span>
                        {index === 0 && <span className="text-blue-500 font-extrabold">{pageSize.toUpperCase()}</span>}
                    </div>

                    <div
                        className=""
                        style={{
                            width: dimensions.pxWidth,
                            height: dimensions.pxHeight,
                        }}
                    >
                        <div
                            style={{
                                transform: `translateY(-${index * dimensions.pxHeight}px)`,
                                width: dimensions.pxWidth
                            }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
