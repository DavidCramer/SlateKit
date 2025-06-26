
import React from 'react';
import { useApp } from '../contexts/AppContext';
import Sidebar from './Sidebar';
import WorkArea from './WorkArea';
import { SidebarLayout } from './layout'; // Import the new SidebarLayout

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
const ItemWorkspace: React.FC<AppWorkspaceProps> = ({ onViewSettings }) => {
  const { appState } = useApp();

  if (!appState.currentApp) {
    return null;
  }

  return (
    <SidebarLayout
      containerClassName="h-screen" // Ensure it takes full screen height
      sidebarContent={<Sidebar onViewSettings={onViewSettings} />}
      mainContent={<WorkArea />}
      sidebarAriaLabel="App navigation and actions"
      mainAriaLabel={`App workspace for ${appState.currentApp.name}`}
    />
  );
};

export default ItemWorkspace;
