import React, {useState, useEffect} from 'react';
import {useApp} from '../../contexts/AppContext';
import { ToggleSwitch, Input, Button } from '../ui';
import {MdCloudSync, MdLink, MdErrorOutline, MdCheckCircleOutline} from 'react-icons/md';
import {SettingsCategory} from './SettingsModalSidebar';
import {colors} from "@/constants/constants.ts";
import * as RemoteStorageService from '../../services/RemoteStorageService';
import {Panel} from "@/components/panels";

interface SettingsModalContentAreaProps {
    activeCategory: SettingsCategory;
}

const SettingsModalContentArea: React.FC<SettingsModalContentAreaProps> = ({activeCategory}) => {
    const {appState, dispatch} = useApp();
    const {settings, isLoading} = appState;

    const [apiUrlInput, setApiUrlInput] = useState(settings.remoteApiUrl || '');
    const [testConnectionStatus, setTestConnectionStatus] = useState<{
        testing: boolean;
        success: boolean | null;
        message: string;
    }>({testing: false, success: null, message: ''});

    useEffect(() => {
        setApiUrlInput(settings.remoteApiUrl || '');
    }, [settings.remoteApiUrl]);

    const handleRemoteStorageEnabledChange = (enabled: boolean) => {
        dispatch({
            type: 'SET_SETTINGS',
            payload: {remoteStorageEnabled: enabled},
        });
        if (!enabled) { // Clear test status if disabling
            setTestConnectionStatus({testing: false, success: null, message: ''});
        }
    };

    const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiUrlInput(e.target.value);
        // Reset test status if URL changes
        setTestConnectionStatus({testing: false, success: null, message: ''});
    };

    const handleApiUrlBlur = () => {
        if (apiUrlInput.trim() !== settings.remoteApiUrl) {
            dispatch({
                type: 'SET_SETTINGS',
                payload: {remoteApiUrl: apiUrlInput.trim()},
            });
        }
    };

    const handleTestConnection = async () => {
        setTestConnectionStatus({testing: true, success: null, message: 'Testing connection...'});
        const result = await RemoteStorageService.testApiConnection(apiUrlInput.trim(), settings);
        setTestConnectionStatus({testing: false, success: result.ok, message: result.message});
    };

    const renderAppearanceSettings = () => (
        <Panel title={'Appearance'}>
            <div className={'flex gap-2 flex-wrap'}>
                {Object.keys(colors).map(color => (
                    <Button
                        onClick={() => {
                            dispatch({
                                type: 'SET_SETTINGS',
                                payload: {theme: color},
                            });
                        }}
                    >
                        {colors[color]._themeLabel}
                    </Button>
                ))}
            </div>
        </Panel>
    );

    const renderGeneralSettings = () => (
        <Panel
            title={'General'}
        >
            <p className="text-slate-400">
                More application-wide settings will be available here in the future.
            </p>
            {isLoading && (
                <p className="mt-4 text-sm text-sky-300">Application is currently processing data in the background...</p>
            )}
        </Panel>
    );

    const renderRemoteStorageSettings = () => (
        <Panel title={'Remote Storage'}>

            <ToggleSwitch
                id="remote-storage-toggle"
                label="Enable Remote Storage"
                checked={settings.remoteStorageEnabled || false}
                onChange={handleRemoteStorageEnabledChange}
                labelPosition="right"
            />
            <p className="text-sm text-slate-400 pl-12 -mt-2">
                When enabled, project data and settings could be synced with a remote server.
                Local storage may still be used as a cache or for offline access. (Full sync logic TBD)
            </p>

            <Input
                id="remote-api-url"
                label="API Base URL"
                value={apiUrlInput}
                onChange={handleApiUrlChange}
                onBlur={handleApiUrlBlur}
                placeholder="e.g., https://api.example.com/v1/slatekit"
                disabled={!settings.remoteStorageEnabled}
                type="url"
                required={settings.remoteStorageEnabled}
            />

            <div className="flex items-start space-x-3">
                <Button
                    onClick={handleTestConnection}
                    disabled={!settings.remoteStorageEnabled || !apiUrlInput.trim() || testConnectionStatus.testing}
                    icon={testConnectionStatus.testing ? undefined : MdLink}
                >
                    {testConnectionStatus.testing ? 'Testing...' : 'Test Connection'}
                </Button>
                <Button
                    onClick={() => alert('Force Sync feature coming soon!')}
                    disabled={!settings.remoteStorageEnabled || !apiUrlInput.trim()}
                    variant="secondary"
                    icon={MdCloudSync}
                >
                    Force Sync Now (Soon)
                </Button>
            </div>
            {testConnectionStatus.message && (
                <div className={`flex items-center text-sm p-3 ${
                    testConnectionStatus.success === true ? 'bg-green-600/20 text-green-300 border border-green-500/30' :
                        testConnectionStatus.success === false ? 'bg-red-600/20 text-red-300 border border-red-500/30' :
                            'bg-sky-600/20 text-sky-300 border border-sky-500/30' // Neutral for "Testing..."
                }`}>
                    {testConnectionStatus.success === true &&
						<MdCheckCircleOutline className="w-5 h-5 mr-2 shrink-0 text-green-400"/>}
                    {testConnectionStatus.success === false &&
						<MdErrorOutline className="w-5 h-5 mr-2 shrink-0 text-red-400"/>}
                    <p className="grow break-words">{testConnectionStatus.message}</p>
                </div>
            )}
            <p className="text-xs text-slate-500">
                The Remote Storage feature is currently a boilerplate. Full data synchronization is not yet implemented.
            </p>
        </Panel>
    );

    const renderPlaceholderSettings = (title: string) => (
        <section aria-labelledby={`${activeCategory}-settings-heading`}>
            <h2 id={`${activeCategory}-settings-heading`}
                className="text-2xl font-semibold text-white mb-4 border-b border-slate-700 pb-3">
                {title}
            </h2>
            <p className="text-slate-400">
                Settings for {title.toLowerCase()} will be available here soon.
            </p>
        </section>
    );


    const renderContent = () => {
        switch (activeCategory) {
            case 'appearance':
                return renderAppearanceSettings();
            case 'general':
                return renderGeneralSettings();
            case 'remoteStorage':
                return renderRemoteStorageSettings();
            case 'account':
                return renderPlaceholderSettings('Account');
            case 'data':
                return renderPlaceholderSettings('Data Management');
            default:
                return <p className="text-slate-400">Select a category to view settings.</p>;
        }
    };

    return (
        <>
            {renderContent()}
        </>
    );
};

export default SettingsModalContentArea;
