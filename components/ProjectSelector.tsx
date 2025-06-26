import React, { useState } from 'react';
import { useProject, AvailableProject } from '../contexts/ProjectContext';
import CreateProjectModal from './modal/CreateProjectModal'; 
import { MdOutlineWorkspaces, MdChevronRight, MdAddCircle, MdSettings } from 'react-icons/md';
import Button from './elements/Button';
import { List, ListItem } from './list';

/**
 * Props for the ProjectSelector component.
 */
interface ProjectSelectorProps {
  onViewSettings: () => void; // This will now open the SettingsModal
}

/**
 * ProjectSelector component.
 * This component is displayed when no project is currently loaded.
 * It allows users to select a project from the list of available projects,
 * create a new one, or navigate to global application settings.
 * @param {ProjectSelectorProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered ProjectSelector component.
 */
const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onViewSettings }) => {
  const { projectState, dispatch } = useProject();
  
  const { availableProjects } = projectState;
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles the click event for a project button.
   * Dispatches the 'LOAD_PROJECT' action with the selected project's name.
   * @param {string} projectName - The name of the project to load.
   */
  const handleLoadProject = (projectName: string) => {
    dispatch({ type: 'LOAD_PROJECT', payload: projectName });
  };

  /**
   * Handles the creation of a new project from the modal.
   * @param {string} projectName - The name of the new project.
   */
  const handleCreateProject = (projectName: string) => {
    if (projectName.trim()) {
      dispatch({ type: 'LOAD_PROJECT', payload: projectName.trim() });
      setIsModalOpen(false);
    } else {
      alert("Project name cannot be empty.");
    }
  };

  const projectListItems: ListItem[] = availableProjects.map((project: AvailableProject) => ({
    id: project.id,
    content: project.name,
    onClick: () => handleLoadProject(project.name),
    ariaLabel: `Load ${project.name}`,
    suffix: <MdChevronRight className="w-5 h-5" aria-hidden="true" />,
  }));

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4 transition-all duration-500 ease-in-out">
        <main className="w-full flex justify-center" role="main">
          <div className="w-full max-w-md p-8 bg-slate-800 rounded-xl shadow-2xl">
            <div className="flex flex-col items-center mb-6">
              <MdOutlineWorkspaces className="w-16 h-16 text-sky-400 mb-3" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-white" id="select-project-heading">Select or Create Project</h2>
              <p className="text-slate-400 mt-1">Choose an existing project or create a new one to get started.</p>
            </div>

            {availableProjects.length > 0 ? (
              <>
                <List
                  items={projectListItems}
                  ulClassName="space-y-3"
                  ariaLabelledby="select-project-heading"
                  defaultButtonVariant="item"
                  defaultFullWidthButton={true}
                />
                <div className="mt-6 border-t border-slate-700 pt-6 space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    icon={MdAddCircle}
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Create a new project"
                  >
                    Create New Project
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    icon={MdSettings}
                    onClick={onViewSettings} // This now opens the SettingsModal via App.tsx
                    aria-label="Open global application settings"
                  >
                    Global Settings
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div>
                  <p className="text-slate-400 text-lg mb-2">No projects found.</p>
                  <p className="text-slate-500 text-sm mb-4">
                    Get started by creating your first project.
                  </p>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  icon={MdAddCircle}
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Create your first project"
                >
                  Create New Project
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  icon={MdSettings}
                  onClick={onViewSettings} // This now opens the SettingsModal via App.tsx
                  aria-label="Open global application settings"
                >
                  Global Settings
                </Button>
              </div>
            )}
            
            <p className="text-xs text-slate-500 mt-6 text-center">
              Projects are saved in your browser's local storage.
            </p>
          </div>
        </main>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
};

export default ProjectSelector;