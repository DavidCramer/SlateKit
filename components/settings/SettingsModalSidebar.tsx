
import React from 'react';
import { List, ListItem } from '../list';
import { MdPalette, MdTune, MdAccountCircle, MdStorage, MdCloudQueue } from 'react-icons/md';

export type SettingsCategory = 'appearance' | 'general' | 'remoteStorage' | 'account' | 'data';

interface SettingsModalSidebarProps {
  activeCategory: SettingsCategory;
  onSelectCategory: (category: SettingsCategory) => void;
}

const SettingsModalSidebar: React.FC<SettingsModalSidebarProps> = ({ activeCategory, onSelectCategory }) => {
  const navItems: ListItem[] = [
    {
      id: 'settings-appearance',
      content: 'Appearance',
      onClick: () => onSelectCategory('appearance'),
      icon: MdPalette,
      isActive: activeCategory === 'appearance',
      buttonClassName: 'justify-start !py-2.5',
    },
    {
      id: 'settings-general',
      content: 'General',
      onClick: () => onSelectCategory('general'),
      icon: MdTune,
      isActive: activeCategory === 'general',
      buttonClassName: 'justify-start !py-2.5',
    },
    {
      id: 'settings-remote-storage',
      content: 'Remote Storage',
      onClick: () => onSelectCategory('remoteStorage'),
      icon: MdCloudQueue,
      isActive: activeCategory === 'remoteStorage',
      buttonClassName: 'justify-start !py-2.5',
    },
    {
      id: 'settings-account',
      content: 'Account (Soon)',
      onClick: () => { 
        onSelectCategory('account'); 
        alert('Account settings coming soon!');
      },
      icon: MdAccountCircle,
      isActive: activeCategory === 'account',
      buttonClassName: 'justify-start !py-2.5',
      disabled: false, // Set to true to actually disable
    },
     {
      id: 'settings-data',
      content: 'Data Management (Soon)',
      onClick: () => {
        onSelectCategory('data');
        alert('Data management features coming soon!');
      },
      icon: MdStorage,
      isActive: activeCategory === 'data',
      buttonClassName: 'justify-start !py-2.5',
      disabled: false, // Set to true to actually disable
    },
  ];

  return (
    <aside className="w-56 sm:w-60 bg-slate-800 pr-4 sm:pr-5 flex flex-col border-r border-slate-700">
      <nav aria-label="Settings categories">
        <h2 className="sr-only" id="settings-categories-heading">Settings Categories</h2>
        <List
          items={navItems}
          ulClassName="space-y-1"
          defaultButtonVariant="link"
          defaultFullWidthButton={true}
          ariaLabelledby="settings-categories-heading"
        />
      </nav>
    </aside>
  );
};

export default SettingsModalSidebar;
