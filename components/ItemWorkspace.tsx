import React from 'react';
import {Button, SidebarLayout} from "@/components/ui";
import {MdInfo, MdLogout} from "react-icons/md";
import {useApp, AppSchema} from '@/contexts';

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
    const {appState: {currentItem}, unloadItem} = useApp();
    const {useSchema} = AppSchema;
    const {getSchema} = useSchema();
    const schema = getSchema();
    if (!currentItem) {
        return null;
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
        <div className="h-screen">
            <SidebarLayout
                schema={schema}
                sidebarTitle={currentItem.name}
                sidebarAriaLabel="App navigation and actions"
                mainAriaLabel={`App workspace`}
                sidebarFooter={<SidebarFooter/>}
            />
        </div>
    );
};

export default ItemWorkspace;
