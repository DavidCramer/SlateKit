import React, {ElementType, ReactNode} from 'react';
import {useApp} from '../../contexts/AppContext';

interface PanelProps {
    title?: string | ReactNode; // Title is optional, panel might just be a styled container
    icon?: ElementType;
    children?: ReactNode;
    variant?: 'default' | 'card' | 'main' | 'aside' | 'center';
    className?: string; // Applied to the main container div
    headerClassName?: string; // Applied to the header element
    titleClassName?: string; // Applied to the title element (h3/h4)
    iconClassName?: string; // Applied to the icon component
    contentClassName?: string; // Applied to the content wrapper div
    titleId?: string; // For ARIA
    footer?: string | ReactNode;
}

const Panel: React.FC<PanelProps> = ({
                                         title,
                                         icon: IconComponent,
                                         children,
                                         variant = 'default',
                                         className = '',
                                         headerClassName = '',
                                         titleClassName = '',
                                         iconClassName = '',
                                         contentClassName = '',
                                         titleId,
                                         footer,
                                     }) => {

    const {themeClasses: {panel: {[variant]: themePanelClasses}}} = useApp();


    const containerBaseClass = themePanelClasses.container;
    const headerBaseClass = themePanelClasses.header;
    const titleBaseClass = themePanelClasses.title;
    const iconBaseClass = themePanelClasses.icon;
    const contentBase = themePanelClasses.content;
    const footerBase = themePanelClasses.footer;

    const HeadingTag = typeof title === 'string' ? (variant === 'card' ? 'h3' : 'h4') : 'div';
    const WrapperTag = variant === 'default' || variant === 'card' ? 'div' : variant;

    const effectiveContainerClassName = [containerBaseClass, className].filter(Boolean).join(' ');
    const effectiveHeaderClassName = [headerBaseClass, headerClassName].filter(Boolean).join(' ');
    const effectiveTitleClassName = [titleBaseClass, titleClassName].filter(Boolean).join(' ');
    const effectiveIconClassName = [iconBaseClass, iconClassName].filter(Boolean).join(' ');
    const effectiveContentClassName = [contentBase, contentClassName].filter(Boolean).join(' ');
    const effectiveFooterClassName = [footerBase, contentClassName].filter(Boolean).join(' ');

    // @todo: apply role to the wrapper.
    return (
        <WrapperTag className={`flex flex-col justify-between ${effectiveContainerClassName}`}>
            <div>
                {title && (
                    <header className={effectiveHeaderClassName}>
                        {IconComponent && <IconComponent className={effectiveIconClassName} aria-hidden="true"/>}
                        <HeadingTag id={titleId} className={effectiveTitleClassName}>
                            {title}
                        </HeadingTag>
                    </header>
                )}
                <div className={effectiveContentClassName}>{children}</div>
            </div>
            {footer && <footer className={effectiveFooterClassName}>{footer}</footer>}
        </WrapperTag>
    );
};

export default Panel;
