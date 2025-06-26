
import React, { useState, useEffect } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import ToggleSwitch from '../elements/ToggleSwitch';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { MdDarkMode, MdLightMode, MdCloudSync, MdLink, MdErrorOutline, MdCheckCircleOutline } from 'react-icons/md';
import { SettingsCategory } from './SettingsModalSidebar';
import * as RemoteStorageService from '../../services/RemoteStorageService'; 

interface SettingsModalContentAreaProps {
  activeCategory: SettingsCategory;
}

const SettingsModalContentArea: React.FC<SettingsModalContentAreaProps> = ({ activeCategory }) => {
  const { projectState, dispatch } = useProject();
  const { settings, isLoading } = projectState;

  const [apiUrlInput, setApiUrlInput] = useState(settings.remoteApiUrl || '');
  const [testConnectionStatus, setTestConnectionStatus] = useState<{
    testing: boolean;
    success: boolean | null;
    message: string;
  }>({ testing: false, success: null, message: '' });

  useEffect(() => {
    setApiUrlInput(settings.remoteApiUrl || '');
  }, [settings.remoteApiUrl]);

  const handleThemeChange = (isDarkMode: boolean) => {
    dispatch({
      type: 'SET_SETTINGS',
      payload: { theme: isDarkMode ? 'dark' : 'light' },
    });
  };

  const handleRemoteStorageEnabledChange = (enabled: boolean) => {
    dispatch({
      type: 'SET_SETTINGS',
      payload: { remoteStorageEnabled: enabled },
    });
     if (!enabled) { // Clear test status if disabling
        setTestConnectionStatus({ testing: false, success: null, message: '' });
    }
  };

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrlInput(e.target.value);
    // Reset test status if URL changes
    setTestConnectionStatus({ testing: false, success: null, message: '' });
  };

  const handleApiUrlBlur = () => {
    if (apiUrlInput.trim() !== settings.remoteApiUrl) {
      dispatch({
        type: 'SET_SETTINGS',
        payload: { remoteApiUrl: apiUrlInput.trim() },
      });
    }
  };
  
  const handleTestConnection = async () => {
    setTestConnectionStatus({ testing: true, success: null, message: 'Testing connection...' });
    const result = await RemoteStorageService.testApiConnection(apiUrlInput.trim(), settings);
    setTestConnectionStatus({ testing: false, success: result.ok, message: result.message });
  };

  const renderAppearanceSettings = () => (
    <section aria-labelledby="appearance-settings-heading">
      <h2 id="appearance-settings-heading" className="text-2xl font-semibold text-white mb-6 border-b border-slate-700 pb-3">
        Appearance
      </h2>
      <div className="space-y-4">
        <ToggleSwitch
          id="theme-toggle"
          label={settings.theme === 'dark' ? "Dark Mode Enabled" : "Light Mode Enabled"}
          checked={settings.theme === 'dark'}
          onChange={handleThemeChange}
          labelPosition="right"
          className="max-w-md"
        />
        <div className="flex items-center text-sm text-slate-400 pl-12 max-w-md">
          {settings.theme === 'dark' ? (
            <MdDarkMode className="w-5 h-5 mr-2 text-sky-400 flex-shrink-0" />
          ) : (
            <MdLightMode className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0" />
          )}
          <span>
            Current theme is set to {settings.theme}. 
            (Note: Full visual UI theme application beyond this toggle may require a page refresh or further integration.)
          </span>
        </div>
      </div>
    </section>
  );

  const renderGeneralSettings = () => (
    <section aria-labelledby="general-settings-heading">
      <h2 id="general-settings-heading" className="text-2xl font-semibold text-white mb-4 border-b border-slate-700 pb-3">
        General
      </h2>
      <p className="text-slate-400">
        More application-wide settings will be available here in the future.
      </p>
      {isLoading && (
        <p className="mt-4 text-sm text-sky-300">Application is currently processing data in the background...</p>
      )}
    </section>
  );
  
  const renderRemoteStorageSettings = () => (
    <section aria-labelledby="remote-storage-settings-heading">
      <h2 id="remote-storage-settings-heading" className="text-2xl font-semibold text-white mb-6 border-b border-slate-700 pb-3">
        Remote Storage
      </h2>
      <div className="space-y-6 max-w-xl">
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
          <div className={`flex items-center text-sm p-3 rounded-md ${
            testConnectionStatus.success === true ? 'bg-green-600/20 text-green-300 border border-green-500/30' : 
            testConnectionStatus.success === false ? 'bg-red-600/20 text-red-300 border border-red-500/30' : 
            'bg-sky-600/20 text-sky-300 border border-sky-500/30' // Neutral for "Testing..."
          }`}>
            {testConnectionStatus.success === true && <MdCheckCircleOutline className="w-5 h-5 mr-2 flex-shrink-0 text-green-400" />}
            {testConnectionStatus.success === false && <MdErrorOutline className="w-5 h-5 mr-2 flex-shrink-0 text-red-400" />}
            <p className="flex-grow break-words">{testConnectionStatus.message}</p>
          </div>
        )}
        <p className="text-xs text-slate-500">
          The Remote Storage feature is currently a boilerplate. Full data synchronization is not yet implemented.
        </p>
      </div>
    </section>
  );

  const renderPlaceholderSettings = (title: string) => (
    <section aria-labelledby={`${activeCategory}-settings-heading`}>
      <h2 id={`${activeCategory}-settings-heading`} className="text-2xl font-semibold text-white mb-4 border-b border-slate-700 pb-3">
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
    <div className="space-y-8 p-6 sm:p-8"> {/* Added padding here */}
      {renderContent()}
      <footer className="mt-8 pt-6 border-t border-slate-700 text-xs text-slate-500 text-center">
        <p>Changes to settings are saved automatically to your browser's local storage.</p>
      </footer>
    </div>
  );
};

export default SettingsModalContentArea;
