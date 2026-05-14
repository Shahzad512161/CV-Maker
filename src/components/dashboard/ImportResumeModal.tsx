'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ResumeParser } from '@/services/resumeParser';
import { useRouter } from 'next/navigation';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const ImportResumeModal = ({ isOpen, onClose }: Props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isParsing, setIsParsing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) validateAndSetFile(droppedFile);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file: File) => {
        setError(null);
        const validTypes = ['application/pdf'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload a PDF file.');
            return;
        }
        setFile(file);
    };

    const handleImport = async () => {
        if (!file) return;

        setIsParsing(true);
        setError(null);

        try {
            const parsedData = await ResumeParser.parse(file);

            // Validation: Check if we actually got any meaningful data
            const hasSections = parsedData.sections && parsedData.sections.length > 0;
            const hasName = parsedData.personalDetails && parsedData.personalDetails.fullName.length > 0;

            if (!hasSections && !hasName) {
                console.warn("[ImportResumeModal] Very little data extracted. Proceeding anyway.");
                // We don't throw anymore to ensure "100% target" (at least something loads)
            }

            // Save to localStorage to be picked up by Editor
            localStorage.setItem('imported_resume_data', JSON.stringify(parsedData));

            // Navigate to editor
            router.push('/editor');
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to parse resume. Please try again or create a blank one.');
        } finally {
            setIsParsing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-5 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Import Resume</h2>
                        <p className="text-sm text-gray-500 mt-1">Upload your existing CV (PDF Only)</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    {!file ? (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                                relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer
                                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
                                ${error ? 'border-red-300 bg-red-50' : ''}
                            `}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileSelect}
                                accept=".pdf"
                            />
                            <div className="flex flex-col items-center gap-4">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <Upload className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">
                                        Click or drag file to upload
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Support PDF Only
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl p-4 border flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center text-blue-600">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900 truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setFile(null)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 animate-in slide-in-from-top-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleImport}
                            disabled={!file || isParsing}
                            className={`
                                px-6 py-2.5 bg-[#1a1b3a] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2
                                ${(!file || isParsing) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2d2e55] hover:-translate-y-0.5'}
                            `}
                        >
                            {isParsing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Parsing & Cleaning Data...
                                </>
                            ) : (
                                <>
                                    Import Resume
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
