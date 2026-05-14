import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface Props extends LucideProps {
    name?: string;
    fallback: React.ReactNode;
}

export const DynamicIcon: React.FC<Props> = ({ name, fallback, ...props }) => {
    if (!name) return <>{fallback}</>;

    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <>{fallback}</>;

    return <IconComponent {...props} />;
};
