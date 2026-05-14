'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, Download, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, Link as LinkIcon, Plus } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import UnderlineExtension from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

// Types
interface CoverLetterData {
    personal: {
        fullName: string;
        jobTitle: string;
        email: string;
        phone: string;
        address: string;
    };
    date: string;
    recipient: {
        name: string;
        company: string;
        address: string;
    };
    body: string;
    signature: {
        name: string;
        place: string;
        date: string;
    };
}

const INITIAL_DATA: CoverLetterData = {
    personal: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        address: ''
    },
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    recipient: {
        name: '',
        company: '',
        address: ''
    },
    body: '<p>Dear _______,</p><p></p><p>Sincerely,</p>',
    signature: {
        name: '',
        place: '',
        date: ''
    }
};

export default function CoverLetterEditorPage() {
    const [data, setData] = useState<CoverLetterData>(INITIAL_DATA);

    // Tiptap Editor
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            UnderlineExtension,
            LinkExtension,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: data.body,
        onUpdate: ({ editor }) => {
            setData(prev => ({ ...prev, body: editor.getHTML() }));
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] p-4 bg-gray-50 rounded-b-lg border border-t-0 border-gray-200',
            },
        },
    });

    const updatePersonal = (field: keyof CoverLetterData['personal'], value: string) => {
        setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
    };

    const updateRecipient = (field: keyof CoverLetterData['recipient'], value: string) => {
        setData(prev => ({ ...prev, recipient: { ...prev.recipient, [field]: value } }));
    };

    const updateSignature = (field: keyof CoverLetterData['signature'], value: string) => {
        setData(prev => ({ ...prev, signature: { ...prev.signature, [field]: value } }));
    };

    return (
        <div className="flex flex-col h-screen bg-[#F3F0EA]">
            {/* Top Navigation */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/cover-letter" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <Link href="/dashboard" className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-md transition-colors">
                            Dashboard
                        </Link>
                        <button className="px-4 py-1.5 text-sm font-bold text-gray-900 bg-white shadow-sm rounded-md">
                            Write
                        </button>
                        <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-md transition-colors">
                            Customize
                        </button>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                        Letter 1
                        <span className="ml-2 text-gray-400">▼</span>
                    </div>
                    <Button className="bg-[#1a1b3a] hover:bg-[#2d2e55] text-white font-bold flex items-center gap-2 h-9 px-4">
                        Download
                        <Download className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            {/* Main Content (Split View) */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Inputs */}
                <div className="w-full lg:w-[45%] xl:w-[40%] overflow-y-auto p-6 md:p-8 space-y-6">

                    {/* Section: Personal Details */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-[#1a1b3a] mb-6">Personal Details</h2>

                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            {/* Inputs */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Full name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your title, first- and last name"
                                        className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        value={data.personal.fullName}
                                        onChange={(e) => updatePersonal('fullName', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Professional title</label>
                                    <input
                                        type="text"
                                        placeholder="Target position or current role"
                                        className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        value={data.personal.jobTitle}
                                        onChange={(e) => updatePersonal('jobTitle', e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Photo Placeholder */}
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 rounded-full bg-[#f4f5f7] flex items-center justify-center border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <div className="text-center">
                                        <span className="text-xs font-bold text-gray-400 block">Photo</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    value={data.personal.email}
                                    onChange={(e) => updatePersonal('email', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone</label>
                                <input
                                    type="tel"
                                    placeholder="Enter Phone"
                                    className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    value={data.personal.phone}
                                    onChange={(e) => updatePersonal('phone', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Location</label>
                                <input
                                    type="text"
                                    placeholder="City, Country"
                                    className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    value={data.personal.address}
                                    onChange={(e) => updatePersonal('address', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Add Details Buttons */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <label className="block text-xs font-bold text-gray-700 mb-3">Add Details</label>
                            <div className="flex flex-wrap gap-2">
                                {['LinkedIn', 'Website', 'Nationality', 'Date of Birth', 'Visa'].map(item => (
                                    <button key={item} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f5f7] hover:bg-gray-200 rounded-md text-xs font-bold text-gray-600 transition-colors">
                                        <Plus className="w-3 h-3" />
                                        {item}
                                    </button>
                                ))}
                                <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 rounded-md text-xs font-bold text-gray-700 transition-colors">
                                    Show More
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section: Date */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-[#1a1b3a] mb-4">Date</h2>
                        <input
                            type="text"
                            className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            value={data.date}
                            onChange={(e) => setData({ ...data, date: e.target.value })}
                        />
                    </div>

                    {/* Section: Recipient Details */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-[#1a1b3a] mb-6">Recipient Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Recipient Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter name of recipient/department"
                                    className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    value={data.recipient.name}
                                    onChange={(e) => updateRecipient('name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Company Name"
                                    className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    value={data.recipient.company}
                                    onChange={(e) => updateRecipient('company', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Address</label>
                                <input
                                    type="text"
                                    placeholder="Enter Company Address"
                                    className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    value={data.recipient.address}
                                    onChange={(e) => updateRecipient('address', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: Body */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-[#1a1b3a] mb-6">Body</h2>

                        {/* Toolbar */}
                        <div className="bg-[#f4f5f7] rounded-t-lg p-2 border-b border-gray-200 flex items-center gap-1 flex-wrap">
                            <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')}>
                                <Bold className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')}>
                                <Italic className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive('underline')}>
                                <Underline className="w-4 h-4" />
                            </ToolbarButton>
                            <div className="w-px h-5 bg-gray-300 mx-1" />
                            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign('left').run()} active={editor?.isActive({ textAlign: 'left' })}>
                                <AlignLeft className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign('center').run()} active={editor?.isActive({ textAlign: 'center' })}>
                                <AlignCenter className="w-4 h-4" />
                            </ToolbarButton>
                            <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign('right').run()} active={editor?.isActive({ textAlign: 'right' })}>
                                <AlignRight className="w-4 h-4" />
                            </ToolbarButton>
                            <div className="w-px h-5 bg-gray-300 mx-1" />
                            <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')}>
                                <List className="w-4 h-4" />
                            </ToolbarButton>
                        </div>

                        {/* Editor Area */}
                        <EditorContent editor={editor} />
                    </div>

                    {/* Section: Signature */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-12">
                        <h2 className="text-xl font-bold text-[#1a1b3a] mb-6">Signature</h2>
                        <button className="flex items-center gap-2 px-6 py-2.5 border border-[#200e32] rounded-lg text-[#200e32] font-bold text-sm hover:bg-gray-50 transition-colors mb-6">
                            <Plus className="w-4 h-4" />
                            Create / Upload
                        </button>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full name</label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    value={data.signature.name}
                                    onChange={(e) => updateSignature('name', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Place</label>
                                    <input
                                        type="text"
                                        placeholder="Enter place"
                                        className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        value={data.signature.place}
                                        onChange={(e) => updateSignature('place', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Date</label>
                                    <input
                                        type="text"
                                        placeholder="Enter date"
                                        className="w-full bg-[#f4f5f7] border-none rounded-lg px-4 py-3 text-sm font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        value={data.signature.date}
                                        onChange={(e) => updateSignature('date', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Panel: Preview */}
                <div className="hidden lg:flex flex-1 bg-[#2e2e48] p-8 items-start justify-center overflow-y-auto">
                    {/* A4 Page */}
                    <div className="bg-white w-[595px] min-h-[842px] shadow-2xl p-12 text-[#1a1b3a] text-sm leading-relaxed scale-[0.85] xl:scale-100 origin-top">
                        {/* Header */}
                        <div className="border-b-2 border-gray-900 pb-6 mb-8 flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">{data.personal.fullName || 'YOUR NAME'}</h1>
                                <p className="text-gray-500 font-medium uppercase tracking-wider text-xs">{data.personal.jobTitle || 'JOB TITLE'}</p>
                            </div>
                            <div className="text-right text-xs text-gray-500 font-medium leading-relaxed">
                                {data.personal.email && <p>{data.personal.email}</p>}
                                {data.personal.phone && <p>{data.personal.phone}</p>}
                                {data.personal.address && <p>{data.personal.address}</p>}
                            </div>
                        </div>

                        {/* Recipient & Date */}
                        <div className="flex justify-between items-start mb-12">
                            <div className="text-xs">
                                <p className="font-bold text-gray-900">{data.recipient.name}</p>
                                <p className="text-gray-600">{data.recipient.company}</p>
                                <p className="text-gray-600 max-w-[200px]">{data.recipient.address}</p>
                            </div>
                            <div className="text-xs font-bold text-gray-900">
                                {data.date}
                            </div>
                        </div>

                        {/* Body */}
                        <div
                            className="prose prose-sm max-w-none mb-12"
                            dangerouslySetInnerHTML={{ __html: data.body }}
                        />

                        {/* Signature */}
                        <div className="mt-12">
                            <p className="mb-4 font-handwriting text-2xl text-blue-900">{data.signature.name || data.personal.fullName}</p>
                            {(data.signature.place || data.signature.date) && (
                                <p className="text-xs text-gray-500">
                                    {data.signature.place}{data.signature.place && data.signature.date && ', '}{data.signature.date}
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

const ToolbarButton = ({ children, onClick, active }: { children: React.ReactNode, onClick: () => void, active?: boolean }) => (
    <button
        onClick={onClick}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-700 ${active ? 'bg-gray-300 text-black' : ''}`}
    >
        {children}
    </button>
);
