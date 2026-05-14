import React from 'react';
import { Check } from 'lucide-react';

export const PricingFeature = ({ text }: { text: string }) => (
    <li className="flex items-start text-gray-300 gap-3">
        <div className="mt-1 min-w-[20px]">
            <Check className="w-5 h-5 text-green-400" />
        </div>
        <span className="text-sm">{text}</span>
    </li>
);
