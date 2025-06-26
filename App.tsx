import React, { useState, useEffect } from 'react';
import { useProject } from './contexts/ProjectContext';
import ProjectSelector from './components/ProjectSelector';
import ProjectWorkspace from './components/ProjectWorkspace';
import SettingsModal from './components/settings/SettingsModal'; // Updated import

/**
 * The main application component.
 * It manages the current view (ProjectSelector or ProjectWorkspace)
 * and the visibility of the SettingsModal.
 * @returns {React.ReactElement} The rendered App component.
 */
const App: React.FC = () => {
  const { projectState } = useProject();
  const [currentView, setCurrentView] = useState<'projectSelection' | 'projectWorkspace'>(
    projectState.currentProject ? 'projectWorkspace' : 'projectSelection'
  );
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    // This effect ensures that if the project context changes (e.g., project loaded/unloaded),
    // the view transitions appropriately.
    if (projectState.currentProject) {
      setCurrentView('projectWorkspace');
    } else {
      setCurrentView('projectSelection');
    }
  }, [projectState.currentProject]);

  const handleOpenSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  if (projectState.currentProject && currentView === 'projectWorkspace') {
    return (
      <>
        <ProjectWorkspace onViewSettings={handleOpenSettingsModal} />
        <SettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} />
      </>
    );
  }
  
  // Default to ProjectSelector if no project or if view is explicitly projectSelection
  return (
    <>
      <ProjectSelector onViewSettings={handleOpenSettingsModal} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal} />
    </>
  );
};

export default App;