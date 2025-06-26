import React, {useState} from 'react';
import {useApp} from './contexts/AppContext';
import ItemSelector from './components/ItemSelector.tsx';
import ItemWorkspace from './components/ItemWorkspace.tsx';
import SettingsModal from './components/settings/SettingsModal'; // Updated import

/**
 * The main application.
 * It manages the current view (ItemSelector or ItemWorkspace)
 * and the visibility of the SettingsModal.
 * @returns {React.ReactElement} The rendered App component.
 */
const App: React.FC = () => {
    const {appState} = useApp();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const handleOpenSettingsModal = () => {
        setIsSettingsModalOpen(true);
    };

    const handleCloseSettingsModal = () => {
        setIsSettingsModalOpen(false);
    };

    return (
        <>
            {appState.currentItem ?
                <ItemWorkspace onViewSettings={handleOpenSettingsModal}/>
                :
                <ItemSelector onViewSettings={handleOpenSettingsModal}/>
            }
            <SettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal}/>
        </>
    );
};

export default App;
