import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List } from 'lucide-react';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
    editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
    if (!editor) return null;

    return (
        <div className="bg-gray-50/50 border-b border-gray-100 p-3 flex items-center gap-1 flex-wrap sticky top-0 z-10 backdrop-blur-xl">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
                <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
                <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
                <Underline className="w-4 h-4" />
            </ToolbarButton>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
                <AlignLeft className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
                <AlignCenter className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
                <AlignRight className="w-4 h-4" />
            </ToolbarButton>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
                <List className="w-4 h-4" />
            </ToolbarButton>
        </div>
    );
};

const ToolbarButton = ({ children, onClick, active }: { children: React.ReactNode, onClick: () => void, active?: boolean }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-600 ${active ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100' : ''}`}
    >
        {children}
    </button>
);
