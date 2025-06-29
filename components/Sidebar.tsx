import React from 'react';
import { MdList, MdSettings } from 'react-icons/md';
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
      buttonClassName: 'justify-start py-2!',
      isActive: currentPage === 'Dashboard',
    },
    {
      id: 'nav-tasks',
      content: 'Tasks (Soon)',
      onClick: () => handleNavLinkClick('Tasks'),
      icon: MdList, // Replace with MdFormatListBulleted or similar
      buttonClassName: 'justify-start py-2!',
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
      buttonClassName: 'justify-start py-2!',
    },
  ];

  return (
    <>
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
    </>
  );
};

export default Sidebar;
