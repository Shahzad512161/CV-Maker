'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
    onClick: () => void;
}

export const AddContentButton = ({ onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="w-full h-14 mt-8 bg-[#1a1b3a] hover:bg-[#2d2e55] text-white rounded-xl shadow-lg shadow-blue-900/10 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 group"
        >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Plus className="w-5 h-5" />
            </div>
            Add New Section
        </button>
    );
};
