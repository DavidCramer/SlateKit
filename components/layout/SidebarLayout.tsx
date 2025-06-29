import React, {ReactNode} from 'react';
import {useApp} from '../../contexts/AppContext';
import {classConstants} from '../../constants/constants.ts';
import {Panel} from "@/components/panels";

interface SidebarLayoutProps {
    sidebarContent: ReactNode;
    sidebarHeader?: string | ReactNode;
    sidebarFooter?: ReactNode;
    mainContent: ReactNode;
    mainContentHeading?: string | ReactNode;
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
                                                         sidebarFooter,
                                                         sidebarHeader,
                                                         mainContentHeading
                                                     }) => {
    const {appState} = useApp();
    const theme = appState.settings.theme;
    const layoutClasses = classConstants(theme).sidebarLayout;

    return (
        <div className={`${layoutClasses.container} ${containerClassName}`}>
            <Panel
                variant={'aside'}
                footer={sidebarFooter}
                title={sidebarHeader}
                className={sidebarWrapperClassName}
                aria-label={sidebarAriaLabel}
            >
                {sidebarContent}
            </Panel>
            <Panel
                variant={'main'}
                title={mainContentHeading}
                className={`${layoutClasses.main} ${mainWrapperClassName}`}
                aria-label={mainAriaLabel}
            >
                {mainContent}
            </Panel>
        </div>
    );
};

export default SidebarLayout;
