import React, {ElementType, ReactNode} from 'react';

interface HeaderProps {
    title: string | ReactNode;
    icon?: ElementType;
    variant?: 'default' | 'card' | 'main' | 'aside' | 'center';
    headerClassName?: string;
    titleClassName?: string;
    iconClassName?: string;
    titleId?: string;
    headerBaseClass?: string;
    titleBaseClass?: string;
    iconBaseClass?: string;
}

const Header: React.FC<HeaderProps> = ({
    title,
    icon: IconComponent,
    variant = 'default',
    headerClassName = '',
    titleClassName = '',
    iconClassName = '',
    titleId,
    headerBaseClass = '',
    titleBaseClass = '',
    iconBaseClass = '',
}) => {
    const HeadingTag = typeof title === 'string' ? (variant === 'card' ? 'h3' : 'h4') : 'div';

    const effectiveHeaderClassName = [headerBaseClass, headerClassName].filter(Boolean).join(' ');
    const effectiveTitleClassName = [titleBaseClass, titleClassName].filter(Boolean).join(' ');
    const effectiveIconClassName = [iconBaseClass, iconClassName].filter(Boolean).join(' ');

    return (
        <header className={effectiveHeaderClassName}>
            {IconComponent && <IconComponent className={effectiveIconClassName} aria-hidden="true"/>}
            <HeadingTag id={titleId} className={effectiveTitleClassName}>
                {title}
            </HeadingTag>
        </header>
    );
};

export default Header;
