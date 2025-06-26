
import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import Sidebar from './Sidebar';
import WorkArea from './WorkArea';
import { SidebarLayout } from './layout'; // Import the new SidebarLayout

/**
 * Props for ProjectWorkspace component.
 */
interface ProjectWorkspaceProps {
  onViewSettings: () => void;
}

/**
 * ProjectWorkspace component.
 * This component is displayed when a project is loaded.
 * It uses SidebarLayout to feature a Sidebar on the left for project navigation
 * and actions, and a WorkArea on the right for project-specific content.
 * @param {ProjectWorkspaceProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered ProjectWorkspace component, or null if no project is loaded.
 */
const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ onViewSettings }) => {
  const { projectState } = useProject();

  if (!projectState.currentProject) {
    return null;
  }

  return (
    <SidebarLayout
      containerClassName="h-screen" // Ensure it takes full screen height
      sidebarContent={<Sidebar onViewSettings={onViewSettings} />}
      mainContent={<WorkArea />}
      sidebarAriaLabel="Project navigation and actions"
      mainAriaLabel={`Project workspace for ${projectState.currentProject.name}`}
    />
  );
};

export default ProjectWorkspace;
