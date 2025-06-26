import React, { useState } from 'react';
import { Modal } from '../modal/Modal';
import SettingsModalSidebar, { SettingsCategory } from './SettingsModalSidebar';
import SettingsModalContentArea from './SettingsModalContentArea';
import { SidebarLayout } from '../layout'; // Import the new SidebarLayout
import { MdSettings } from 'react-icons/md';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('appearance');

  if (!isOpen) {
    return null;
  }

  // Define the height classes for the SidebarLayout container within the modal
  const layoutHeightClasses = "h-[500px] sm:h-[calc(80vh-100px)] md:h-[calc(70vh-80px)] max-h-[600px] min-h-[400px]";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <Modal.Header title="Application Settings" icon={MdSettings} />
      <Modal.Content className="!p-0 !mb-0"> {/* Override default padding and margin for Modal.Content */}
        <SidebarLayout
          containerClassName={layoutHeightClasses}
          sidebarContent={
            <SettingsModalSidebar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          }
          mainContent={
            <SettingsModalContentArea activeCategory={activeCategory} />
          }
          sidebarAriaLabel="Settings categories"
          mainAriaLabel="Settings content"
        />
      </Modal.Content>
      {/* Footer can be added here if needed, e.g. for global save/reset buttons */}
      {/* <Modal.Footer actions={[{ label: "Close", onClick: onClose, variant: "secondary" }]} /> */}
    </Modal>
  );
};

export default SettingsModal;
