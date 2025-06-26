import React from 'react';
import { useApp, AppDetails } from '../contexts/AppContext';
import { MdLogout, MdWorkspaces, MdList, MdSettings, MdInfo } from 'react-icons/md';
import Button from './elements/Button';
import { List, ListItem } from './list';

/**
 * Props for the Sidebar component.
 */
interface SidebarProps {
  onViewSettings: () => void; // This will now open the SettingsModal
}

/**
 * Sidebar component for the AppWorkspace.
 * It displays the project title, navigation links, and action buttons.
 * @param {SidebarProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered Sidebar component, or null if no project is loaded.
 */
const Sidebar: React.FC<SidebarProps> = ({ onViewSettings }) => {
  const { appState, unLoadItem } = useApp();

  if (!appState.currentApp) {
    return null;
  }

  const project: AppDetails = appState.currentApp;
  const { name: projectName } = project;

  const handleNavLinkClick = (featureName: string) => {
    alert(`${featureName} feature coming soon!`);
  };

  const currentPage: string = 'Dashboard'; // Example: Assume 'Dashboard' is active

  const projectNavItems: ListItem[] = [
    {
      id: 'nav-dashboard',
      content: 'Dashboard (Soon)',
      onClick: () => handleNavLinkClick('Dashboard'),
      icon: MdList, // Replace with appropriate icon if available e.g. MdDashboard
      buttonClassName: 'justify-start !py-2',
      isActive: currentPage === 'Dashboard',
    },
    {
      id: 'nav-tasks',
      content: 'Tasks (Soon)',
      onClick: () => handleNavLinkClick('Tasks'),
      icon: MdList, // Replace with MdFormatListBulleted or similar
      buttonClassName: 'justify-start !py-2',
      isActive: currentPage === 'Tasks',
    },
    // Add more project-specific navigation items here
  ];

  const appNavItems: ListItem[] = [
     {
      id: 'nav-app-settings',
      content: 'App Settings',
      onClick: onViewSettings, // This now opens the SettingsModal via App.tsx
      icon: MdSettings,
      buttonClassName: 'justify-start !py-2',
    },
  ];

  return (
    <aside className="w-64 bg-slate-800 p-5 flex flex-col justify-between shadow-lg" role="complementary">
      <div>
        <div className="flex items-center mb-8">
          <MdWorkspaces className="w-8 h-8 text-sky-400 mr-2" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-white truncate" title={projectName}>
            {projectName}
          </h1>
        </div>

        <nav aria-labelledby="project-navigation-heading" className="mb-6">
          <h2 id="project-navigation-heading" className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">App Menu</h2>
          <List
            items={projectNavItems}
            ulClassName="space-y-1"
            defaultButtonVariant="link"
            defaultFullWidthButton={true}
          />
        </nav>

        <nav aria-labelledby="application-navigation-heading">
          <h2 id="application-navigation-heading" className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Application</h2>
          <List
            items={appNavItems}
            ulClassName="space-y-1"
            defaultButtonVariant="link"
            defaultFullWidthButton={true}
          />
        </nav>
      </div>

      <div>
        <Button
            variant="link"
            fullWidth
            icon={MdInfo}
            onClick={() => alert('SlateKit v1.0.0 - Your Awesome App Environment!')}
            aria-label="About SlateKit"
            className="text-xs text-slate-500 hover:text-slate-400 justify-start !py-1 mb-2"
          >
            About
        </Button>
        <Button
          variant="danger"
          fullWidth
          icon={MdLogout}
          onClick={unLoadItem}
          aria-label="Close current project"
        >
          Close App
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
