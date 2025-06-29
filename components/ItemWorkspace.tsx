import React from 'react';
import {useApp} from '../contexts/AppContext';
import Sidebar from './Sidebar';
import WorkArea from './WorkArea';
import {SidebarLayout} from './layout';
import Button from "@/components/elements/Button.tsx";
import {MdInfo, MdLogout, MdWorkspaces} from "react-icons/md"; // Import the new SidebarLayout

/**
 * Props for AppWorkspace component.
 */
interface AppWorkspaceProps {
    onViewSettings: () => void;
}

/**
 * AppWorkspace component.
 * This component is displayed when a project is loaded.
 * It uses SidebarLayout to feature a Sidebar on the left for project navigation
 * and actions, and a WorkArea on the right for project-specific content.
 * @param {AppWorkspaceProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered AppWorkspace component, or null if no project is loaded.
 */
const ItemWorkspace: React.FC<AppWorkspaceProps> = ({onViewSettings}) => {
    const {appState, unloadItem} = useApp();

    if (!appState.currentItem) {
        return null;
    }
    const {currentItem, settings: {theme}} = appState;

    const SidebarHeader = () => {
        return (
            <div className="flex items-center">
                <MdWorkspaces className="w-8 h-8 text-sky-400 mr-2" aria-hidden="true"/>
                <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-700' : 'text-white'} truncate`} title={currentItem.name}>
                    {currentItem.name}
                </h1>
            </div>
        )
    }

    const SidebarFooter = () => {
        return (
            <div>
                <Button
                    variant="link"
                    fullWidth
                    icon={MdInfo}
                    onClick={() => alert('SlateKit v1.0.0 - Your Awesome App Environment!')}
                    aria-label="About SlateKit"
                    className="text-xs text-slate-500 hover:text-slate-400 justify-start py-1! mb-2"
                >
                    About
                </Button>
                <Button
                    variant="danger"
                    fullWidth
                    icon={MdLogout}
                    onClick={unloadItem}
                    aria-label="Close current project"
                >
                    Close App
                </Button>
            </div>
        )
    }

    return (
        <SidebarLayout
            containerClassName="h-screen" // Ensure it takes full screen height
            sidebarContent={<Sidebar onViewSettings={onViewSettings}/>}
            sidebarHeader={<SidebarHeader/>}
            mainContent={<WorkArea/>}
            sidebarAriaLabel="App navigation and actions"
            mainAriaLabel={`App workspace for ${appState.currentItem.name}`}
            sidebarFooter={<SidebarFooter/>}
            mainContentHeading={'Demo'}
        />
    );
};

export default ItemWorkspace;
