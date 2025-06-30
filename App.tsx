import React, {useState} from 'react';
import {useApp, SettingsSchema, AppSchema} from '@/contexts';
import ItemSelector from './components/ItemSelector.tsx';
import ItemWorkspace from './components/ItemWorkspace.tsx';
import SettingsModal from './components/settings/SettingsModal';

/**
 * The main application.
 * It manages the current view (ItemSelector or ItemWorkspace)
 * and the visibility of the SettingsModal.
 * @returns {React.ReactElement} The rendered App component.
 */
const App: React.FC = () => {

    const {appState} = useApp();
    const {SchemaProvider: SettingsProvider} = SettingsSchema;
    const {SchemaProvider: AppProvider} = AppSchema;

    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const handleOpenSettingsModal = () => {
        setIsSettingsModalOpen(true);
    };

    const handleCloseSettingsModal = () => {
        setIsSettingsModalOpen(false);
    };

    return (
        <SettingsProvider>
            {appState.currentItem ?
                <AppProvider>
                    <ItemWorkspace onViewSettings={handleOpenSettingsModal}/>
                </AppProvider>
                :
                <ItemSelector onViewSettings={handleOpenSettingsModal}/>
            }
            <SettingsModal isOpen={isSettingsModalOpen} onClose={handleCloseSettingsModal}/>
        </SettingsProvider>
    );
};

export default App;
