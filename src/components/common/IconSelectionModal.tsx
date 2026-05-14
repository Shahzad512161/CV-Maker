import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { X, Search } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (iconName: string) => void;
    currentIcon?: string;
}

// A curated list of icons suitable for resume sections
const ICON_LIST = [
    'User', 'UserCircle', 'Contact', 'BadgeCheck', 'Briefcase', 'Building2', 'GraduationCap',
    'BookOpen', 'School', 'Library', 'Puzzle', 'Brain', 'Cpu', 'Terminal', 'Languages',
    'Globe', 'Globe2', 'Award', 'Trophy', 'Medal', 'Certificate', 'Heart', 'Stethoscope',
    'Coffee', 'Gamepad2', 'Camera', 'Palette', 'Projector', 'Layout', 'FileText', 'FileCode',
    'Book', 'Mic', 'Music', 'Laptop', 'Smartphone', 'MessageSquare', 'Users', 'Users2',
    'Share2', 'Link', 'Mail', 'Phone', 'MapPin', 'Calendar', 'Clock', 'Search', 'Settings',
    'Star', 'Zap', 'Flame', 'Lightbulb', 'Target', 'Compass', 'Flag', 'Rocket', 'Paperclip',
    'Shield', 'Key', 'Lock', 'Unlock', 'CreditCard', 'Wallet', 'Banknote', 'Coins', 'ChartBar',
    'ChartLine', 'PieChart', 'Activity', 'BarChart3', 'Network', 'Workflow', 'Container',
    'Layers', 'Box', 'Package', 'Send', 'Cloud', 'Database', 'HardDrive', 'Server', 'Hash'
];

export const IconSelectionModal: React.FC<Props> = ({ isOpen, onClose, onSelect, currentIcon }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filteredIcons = ICON_LIST.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-xl max-h-[80vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#1a1b3a] tracking-tight uppercase italic">Select Icon</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Choose an icon for your section</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 text-gray-400 hover:text-gray-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search */}
                <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search icons..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-[#1a1b3a] placeholder:text-gray-400"
                        autoFocus
                    />
                </div>

                {/* Icon Grid */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-hide">
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4">
                        {filteredIcons.map((iconName) => {
                            const IconComponent = (LucideIcons as any)[iconName];
                            if (!IconComponent) return null;

                            const isSelected = currentIcon === iconName;

                            return (
                                <button
                                    key={iconName}
                                    onClick={() => {
                                        onSelect(iconName);
                                        onClose();
                                    }}
                                    className={`aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl transition-all ${isSelected
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : 'bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                                        } group active:scale-90`}
                                    title={iconName}
                                >
                                    <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${isSelected ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                                    <span className={`text-[8px] font-black uppercase tracking-tighter truncate w-full px-1 text-center ${isSelected ? 'text-blue-100' : 'text-gray-300 group-hover:text-blue-400'}`}>
                                        {iconName}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {filteredIcons.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-200" />
                            </div>
                            <p className="text-sm font-black text-gray-300 uppercase tracking-widest italic">No icons found</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#1a1b3a] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
