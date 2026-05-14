'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, List, Link as LinkIcon } from 'lucide-react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}

export const RichTextEditor = ({ value, onChange, label, placeholder }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Type here...',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[150px] p-4 max-w-none',
            },
        },
        immediatelyRender: false, // Recommended for Next.js to avoid hydration mismatch
    });

    // Sync content if value changes externally (optional, but good practice)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            // Only update if difference to avoid cursor jumps
            if (editor.getText() === '' && value === '') return;
            // editor.commands.setContent(value); // Can cause cursor jumps, use with caution
        }
    }, [value, editor]);

    if (!mounted || !editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>}

            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center gap-1 flex-wrap">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600 font-bold' : ''}`}
                        type="button"
                    >
                        <Bold className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600 italic' : ''}`}
                        type="button"
                    >
                        <Italic className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600 underline' : ''}`}
                        type="button"
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-4 bg-gray-300 mx-1"></div>

                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : ''}`}
                        type="button"
                    >
                        <List className="w-4 h-4" />
                    </button>

                    <button
                        onClick={setLink}
                        className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`}
                        type="button"
                    >
                        <LinkIcon className="w-4 h-4" />
                    </button>

                    <div className="w-px h-4 bg-gray-300 mx-1"></div>

                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-blue-600' : ''}`}
                        type="button"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-blue-600' : ''}`}
                        type="button"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`p-1.5 rounded text-gray-600 hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-blue-600' : ''}`}
                        type="button"
                    >
                        <AlignRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-4 py-2">
                    <EditorContent editor={editor} />
                </div>
            </div>


        </div>
    );
};
