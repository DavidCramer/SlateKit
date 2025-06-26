import React, { ElementType, ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';
import { classConstants } from '../../constants/constants';

interface PanelProps {
  title?: string; // Title is optional, panel might just be a styled container
  icon?: ElementType;
  children: ReactNode;
  variant?: 'default' | 'card';
  className?: string; // Applied to the main container div
  headerClassName?: string; // Applied to the header element
  titleClassName?: string; // Applied to the title element (h3/h4)
  iconClassName?: string; // Applied to the icon component
  contentClassName?: string; // Applied to the content wrapper div
  titleId?: string; // For ARIA
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
}) => {
  const { appState } = useApp();
  const theme = appState.settings.theme;
  const themePanelClasses = classConstants[theme].panel;

  const containerBaseClass = variant === 'card' ? themePanelClasses.cardContainer : themePanelClasses.defaultContainer;
  const headerBaseClass = variant === 'card' ? themePanelClasses.cardHeader : themePanelClasses.defaultHeader;
  const titleBaseClass = variant === 'card' ? themePanelClasses.cardTitle : themePanelClasses.defaultTitle;
  const iconBaseClass = variant === 'card' ? themePanelClasses.cardIcon : themePanelClasses.defaultIcon;
  const contentBase = variant === 'card' ? themePanelClasses.cardContent : themePanelClasses.defaultContent;

  const HeadingTag = variant === 'card' ? 'h3' : 'h4';

  const effectiveContainerClassName = [containerBaseClass, className].filter(Boolean).join(' ');
  const effectiveHeaderClassName = [headerBaseClass, headerClassName].filter(Boolean).join(' ');
  const effectiveTitleClassName = [titleBaseClass, titleClassName].filter(Boolean).join(' ');
  const effectiveIconClassName = [iconBaseClass, iconClassName].filter(Boolean).join(' ');
  const effectiveContentClassName = [contentBase, contentClassName].filter(Boolean).join(' ');

  return (
    <div className={effectiveContainerClassName}>
      {title && (
        <header className={effectiveHeaderClassName}>
          {IconComponent && <IconComponent className={effectiveIconClassName} aria-hidden="true" />}
          <HeadingTag id={titleId} className={effectiveTitleClassName}>
            {title}
          </HeadingTag>
        </header>
      )}
      <div className={effectiveContentClassName}>{children}</div>
    </div>
  );
};

export default Panel;