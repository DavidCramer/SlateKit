import React from 'react';
import {Button, Layout} from "@/components/ui";
import {MdInfo, MdLogout} from "react-icons/md";
import {useApp, AppSchema} from '@/contexts';
import SettingsModal from "@/components/settings/SettingsModal.tsx";
import {classConstants} from "@/constants/constants.ts";

/**
 * Props for AppWorkspace component.
 */
interface AppWorkspaceProps {
    onViewSettings: () => void;
}

/**
 * AppWorkspace component.
 * This component is displayed when a project is loaded.
 * It uses Layout to feature a Sidebar on the left for project navigation
 * and actions, and a WorkArea on the right for project-specific content.
 * @param {AppWorkspaceProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered AppWorkspace component, or null if no project is loaded.
 */
const ItemWorkspace: React.FC<AppWorkspaceProps> = ({onViewSettings}) => {
    const {appState: {currentItem,settings: {theme}}, unloadItem} = useApp();
    const {useSchema} = AppSchema;
    const {container} = classConstants(theme).workspace;

    const {getSchema} = useSchema();
    const schema = getSchema();
    if (!currentItem) {
        return null;
    }

    const SidebarFooter = () => {
        return (
            <div>
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
        <div className={`h-screen ${container}`}>
            <Layout
                schema={schema}
                variant={"vertical"}
                sidebarTitle={currentItem.name}
                sidebarAriaLabel="App navigation and actions"
                mainAriaLabel={`App workspace`}
                sidebarFooter={<SidebarFooter/>}
            />
        </div>
    );
};

export default ItemWorkspace;
