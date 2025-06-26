import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Modal } from './Modal'; 
import type { ActionButtonProps } from './Modal'; 
import Input from '../elements/Input'; // Import the new Input component

/**
 * Props for the CreateProjectModal component.
 */
interface CreateProjectModalProps {
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Callback function to close the modal. */
  onClose: () => void;
  /** Callback function to create a new project with the given name. */
  onCreate: (projectName: string) => void;
}

/**
 * CreateProjectModal component.
 * Uses the compound Modal component to render a dialog for entering a new project's name.
 * @param {CreateProjectModalProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered modal or null if not open.
 */
const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [projectName, setProjectName] = useState('');
  
  // Reset project name when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setProjectName(''); 
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreate(projectName.trim());
    }
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const footerActions: ActionButtonProps[] = [
    {
      label: 'Create Project',
      onClick: handleCreate,
      variant: 'primary',
      icon: MdAddCircleOutline,
      disabled: !projectName.trim(),
    },
    {
      label: 'Cancel',
      // onClick will default to onClose from ModalContext
      // variant will default to 'secondary'
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <Modal.Header
        icon={MdAddCircleOutline}
        title="Create New Project"
      />
      <Modal.Content>
        <Input
          id="projectName"
          label="Project Name"
          value={projectName}
          onChange={handleProjectNameChange}
          placeholder="Enter project name..."
          autoFocus // Delegating autofocus to the Input component
          required
          // Add error prop handling here if validation is added
          // error={projectNameError} 
        />
      </Modal.Content>
      <Modal.Footer actions={footerActions} />
    </Modal>
  );
};

export default CreateProjectModal;