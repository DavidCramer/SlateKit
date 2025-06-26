import React, { useState } from 'react';
import { useApp, AvailableApp } from '../contexts/AppContext';
import CreateItemModal from './modal/CreateItemModal.tsx';
import { MdOutlineWorkspaces, MdChevronRight, MdAddCircle, MdSettings } from 'react-icons/md';
import Button from './elements/Button';
import { List, ListItem } from './list';
import {coreItem} from "../constants/constants.ts";

/**
 * Props for the ItemSelector component.
 */
interface ItemSelectorProps {
  onViewSettings: () => void; // This will now open the SettingsModal
}

/**
 * ItemSelector component.
 * This component is displayed when no item is currently loaded.
 * It allows users to select a item from the list of available items,
 * create a new one, or navigate to global application settings.
 * @param {ItemSelectorProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered ItemSelector component.
 */
const ItemSelector: React.FC<ItemSelectorProps> = ({ onViewSettings }) => {
  const { appState, loadItem } = useApp();

  const { availableApps } = appState;
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles the creation of a new item from the modal.
   * @param {string} itemName - The name of the new item.
   */
  const handleCreateApp = (itemName: string) => {
    if (itemName.trim()) {
      loadItem( itemName.trim() );
      setIsModalOpen(false);
    } else {
      alert(`${coreItem.singular} name cannot be empty.`);
    }
  };

  const itemListItems: ListItem[] = availableApps.map((item: AvailableApp) => ({
    id: item.id,
    content: item.name,
    onClick: () => loadItem(item.name),
    ariaLabel: `Load ${item.name}`,
    suffix: <MdChevronRight className="w-5 h-5" aria-hidden="true" />,
  }));

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4 transition-all duration-500 ease-in-out">
        <main className="w-full flex justify-center" role="main">
          <div className="w-full max-w-md p-8 bg-slate-800 rounded-xl shadow-2xl">
            <div className="flex flex-col items-center mb-6">
              <MdOutlineWorkspaces className="w-16 h-16 text-sky-400 mb-3" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-white" id="select-item-heading">{`Select or Create ${coreItem.singular}`}</h2>
            </div>

            {availableApps.length > 0 ? (
              <>
                <List
                  items={itemListItems}
                  ulClassName="space-y-3"
                  ariaLabelledby="select-item-heading"
                  defaultButtonVariant="item"
                  defaultFullWidthButton={true}
                />
                <div className="mt-6 border-t border-slate-700 pt-6 space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    icon={MdAddCircle}
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Create a new item"
                  >
                    Create New App
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
                  <p className="text-slate-400 text-lg mb-2">No items found.</p>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  icon={MdAddCircle}
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Create your first item"
                >
                  {`Create New ${coreItem.singular}`}
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
          </div>
        </main>
      </div>
      <CreateItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateApp}
      />
    </>
  );
};

export default ItemSelector;
