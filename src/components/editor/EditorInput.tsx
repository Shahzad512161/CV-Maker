import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const EditorInput: React.FC<Props> = ({ label, className, ...props }) => {
    return (
        <div className="group">
            {label && (
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors pl-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    {...props}
                    className={`w-full h-14 bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl px-4 text-base font-medium placeholder:text-gray-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm ${className}`}
                />
            </div>
        </div>
    );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const EditorTextArea: React.FC<TextAreaProps> = ({ label, className, ...props }) => {
    return (
        <div className="group">
            {label && (
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors pl-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <textarea
                    {...props}
                    className={`w-full bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl p-4 text-base font-medium placeholder:text-gray-400 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm min-h-[120px] ${className}`}
                />
            </div>
        </div>
    );
};
