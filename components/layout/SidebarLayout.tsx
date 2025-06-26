import React, { ReactNode } from 'react';
import { useApp } from '../../contexts/AppContext';
import { classConstants } from '../../constants/constants.ts';

interface SidebarLayoutProps {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
  containerClassName?: string;
  sidebarWrapperClassName?: string;
  mainWrapperClassName?: string;
  sidebarAriaLabel?: string;
  mainAriaLabel?: string;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  sidebarContent,
  mainContent,
  containerClassName = '',
  sidebarWrapperClassName = '',
  mainWrapperClassName = '',
  sidebarAriaLabel = 'Sidebar', // Default ARIA label
  mainAriaLabel = 'Main content', // Default ARIA label
}) => {
  const { appState } = useApp();
  const theme = appState.settings.theme;
  const layoutClasses = classConstants[theme].sidebarLayout;

  return (
    <div className={`${layoutClasses.container} ${containerClassName}`}>
      <aside
        className={`${layoutClasses.sidebar} ${sidebarWrapperClassName}`}
        aria-label={sidebarAriaLabel}
        role="complementary" // Use "navigation" if primarily for navigation links
      >
        {sidebarContent}
      </aside>
      <main
        className={`${layoutClasses.main} ${mainWrapperClassName}`}
        aria-label={mainAriaLabel}
        role="main"
      >
        {mainContent}
      </main>
    </div>
  );
};

export default SidebarLayout;
