import React, {useState, useEffect} from 'react';
import {MdAddCircleOutline} from 'react-icons/md';
import {Modal} from './Modal';
import type {ActionButtonProps} from './Modal';
import Input from '../elements/Input'; // Import the new Input component
import {coreItem} from '../../constants/constants';

/**
 * Props for the CreateItemModal component.
 */
interface CreateItemModalProps {
    /** Whether the modal is currently open. */
    isOpen: boolean;
    /** Callback function to close the modal. */
    onClose: () => void;
    /** Callback function to create a new project with the given name. */
    onCreate: (itemName: string) => void;
}

/**
 * CreateItemModal component.
 * Uses the compound Modal component to render a dialog for entering a new project's name.
 * @param {CreateItemModalProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered modal or null if not open.
 */
const CreateItemModal: React.FC<CreateItemModalProps> = ({isOpen, onClose, onCreate}) => {
    const [itemName, setItemName] = useState('');

    // Reset project name when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setItemName('');
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleCreate = () => {
        if (itemName.trim()) {
            onCreate(itemName.trim());
        }
    };

    const handleItemNameChange = (value:string) => {
        setItemName(value);
    };

    const footerActions: ActionButtonProps[] = [
        {
            label: `Create ${coreItem.singular}`,
            onClick: handleCreate,
            variant: 'primary',
            icon: MdAddCircleOutline,
            disabled: !itemName.trim(),
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
                title={`Create New ${coreItem.singular}`}
            />
            <Modal.Content>
                <Input
                    id="itemName"
                    label={`${coreItem.singular} Name`}
                    value={itemName}
                    onChange={handleItemNameChange}
                    placeholder={`Enter ${coreItem.singularLower} name...`}
                    autoFocus // Delegating autofocus to the Input component
                    required
                    // Add error prop handling here if validation is added
                    // error={itemNameError}
                />
            </Modal.Content>
            <Modal.Footer actions={footerActions}/>
        </Modal>
    );
};

export default CreateItemModal;
