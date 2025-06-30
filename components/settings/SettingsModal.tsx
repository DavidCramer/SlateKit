import React from 'react';
import {Modal} from '@/components/ui';
import {Layout} from '../ui/layout'; // Import the new Layout
import {MdSettings} from 'react-icons/md';

import {SettingsSchema} from "@/contexts";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({isOpen, onClose}) => {

    const {useSchema} = SettingsSchema;
    const {getSchema} = useSchema();
    const settingsSchema = getSchema();

    //inline-flex items-center p-2 text-xs font-semibold rounded-sm focus:outline-hidden focus:ring-sky-500 focus:ring-2 focus:ring-2 focus:ring-offset-1 transition-all duration-150 ease-in-out disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed bg-transparent hover:bg-slate-700 text-slate-300 hover:text-white shadow-none px-2 py-2 font-normal justify-start w-full justify-start py-2.5! text-white! bg-sky-600!
    if (!isOpen) {
        return null;
    }

    // Define the height classes for the Layout container within the modal
    const layoutHeightClasses = "p-0! mb-0! h-[500px] sm:h-[calc(80vh-100px)] md:h-[calc(70vh-80px)] max-h-[600px] min-h-[400px]";

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <Modal.Header title="Application Settings" icon={MdSettings}/>
            <Modal.Content className={layoutHeightClasses}> {/* Override default padding and margin for Modal.Content */}
                <Layout
                    schema={settingsSchema}
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
