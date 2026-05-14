import React from 'react';

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const FormSection = ({ title, children, className = '' }: FormSectionProps) => {
    return (
        <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
            <div className="px-6 py-4 sm:px-8 sm:py-6 border-b border-gray-50 bg-gray-50/50">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="p-6 sm:p-8">
                {children}
            </div>
        </div>
    );
};