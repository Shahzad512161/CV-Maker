import React from 'react';
import { ResumeContent } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SocialIcon } from './SocialIcon';

interface RenderContactOptions {
    data: ResumeContent;
    iconSize?: number;
    iconStyle?: React.CSSProperties;
    className?: string;
    itemClassName?: string;
    linkClassName?: string;
    textClassName?: string;
    showIcons?: boolean;
    layout?: 'vertical' | 'horizontal';
    isSidebar?: boolean;
    renderSeparator?: () => React.ReactNode;
    renderIcon?: (icon: React.ReactNode) => React.ReactNode;
    renderItem?: (item: { id: string; label: string; value: string; icon: React.ReactNode; isUrl: boolean }) => React.ReactNode;
}

export const ContactInfoRenderer: React.FC<RenderContactOptions> = ({
    data,
    iconSize = 14,
    iconStyle = {},
    className = "",
    itemClassName = "",
    linkClassName = "underline hover:opacity-100",
    textClassName = "",
    showIcons = true,
    layout = 'vertical',
    isSidebar = false,
    renderSeparator,
    renderIcon,
    renderItem
}) => {
    const { personalDetails } = data;

    const contactItems = [
        { id: 'email', label: 'Email', value: personalDetails.email, icon: <Mail size={iconSize} style={iconStyle} className="opacity-70" />, isUrl: false },
        { id: 'phone', label: 'Phone', value: personalDetails.phone, icon: <Phone size={iconSize} style={iconStyle} className="opacity-70" />, isUrl: false },
        { id: 'location', label: 'Location', value: personalDetails.location, icon: <MapPin size={iconSize} style={iconStyle} className="opacity-70" />, isUrl: false },
        { id: 'dob', label: 'Date of Birth', value: personalDetails.dob, icon: <SocialIcon label="Date of Birth" size={iconSize} style={iconStyle} className="shrink-0 opacity-70" />, isUrl: false },
        { id: 'nationality', label: 'Nationality', value: personalDetails.nationality, icon: <SocialIcon label="Nationality" size={iconSize} style={iconStyle} className="shrink-0 opacity-70" />, isUrl: false },
        ...(personalDetails.socials || []).map(s => ({
            id: s.id,
            label: s.label,
            value: s.value,
            icon: <SocialIcon label={s.label} size={iconSize} style={iconStyle} className="shrink-0 opacity-70" />,
            isUrl: true
        }))
    ];

    const orderedItems = personalDetails.contactOrder
        ? personalDetails.contactOrder.map(id => contactItems.find(item => item.id === id)).filter(Boolean) as any[]
        : contactItems;

    const finalItems = [
        ...orderedItems,
        ...contactItems.filter(item => !orderedItems.find(oi => oi.id === item.id))
    ];

    const itemsToRender = finalItems.filter(item => item.value);

    return (
        <div className={className || (layout === 'horizontal' ? "flex flex-wrap gap-4" : "flex flex-col gap-3")}>
            {itemsToRender.map((item, idx) => {
                if (renderItem) {
                    return (
                        <React.Fragment key={item.id || idx}>
                            {renderItem({
                                id: item.id || String(idx),
                                label: item.label,
                                value: item.value,
                                icon: item.icon,
                                isUrl: item.isUrl
                            })}
                            {renderSeparator && idx < itemsToRender.length - 1 && renderSeparator()}
                        </React.Fragment>
                    );
                }

                const content = item.isUrl ? (
                    <a
                        href={item.value}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClassName}
                    >
                        {item.value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')}
                    </a>
                ) : (
                    <span className={textClassName}>{item.value}</span>
                );

                return (
                    <React.Fragment key={item.id || idx}>
                        <div className={itemClassName || "flex items-center gap-2"}>
                            {showIcons && (
                                <div className="flex-shrink-0 flex items-center justify-center">
                                    {renderIcon ? renderIcon(item.icon) : item.icon}
                                </div>
                            )}
                            {content}
                        </div>
                        {renderSeparator && idx < itemsToRender.length - 1 && renderSeparator()}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
