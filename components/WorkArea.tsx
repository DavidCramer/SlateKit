
import React, { useState } from 'react';
import { useApp, AppDetails } from '../contexts/AppContext';
import { MdDateRange, MdUpdate, MdInfoOutline, MdTune, MdCloud, MdComputer, MdLightbulb } from 'react-icons/md';
import Input from './elements/Input';
import Textarea from './elements/Textarea';
import Checkbox from './elements/Checkbox';
import ToggleSwitch from './elements/ToggleSwitch';
import Select, { SelectOption } from './elements/Select';

/**
 * WorkArea component for the AppWorkspace.
 * This is the main content area where project-specific information and features are displayed.
 * It consumes AppContext directly to get project information.
 * @returns {React.ReactElement | null} The rendered WorkArea component, or null if no project is loaded.
 */
const WorkArea: React.FC = () => {
  const { appState } = useApp();

  // Demo Form Element States
  const [textInputValue, setTextInputValue] = useState('Hello SlateKit!');
  const [textInputError, setTextInputError] = useState<string | null>(null);
  const [textareaValue, setTextareaValue] = useState('This is a longer piece of text for the textarea component, demonstrating its multi-line capabilities.');
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [toggleSwitchChecked, setToggleSwitchChecked] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number | null>('option2');

  const demoSelectOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1: The Cloud', icon: MdCloud },
    { value: 'option2', label: 'Option 2: On Your Machine', icon: MdComputer },
    { value: 'option3', label: 'Option 3: Brilliant Idea', icon: MdLightbulb },
    { value: 'option4', label: 'Option 4: Disabled Option', disabled: true },
  ];


  if (!appState.currentApp) {
    // This should ideally not happen if WorkArea is only rendered when a project is active,
    // but it's a good safeguard.
    return null;
  }
  
  const project: AppDetails = appState.currentApp;

  /**
   * Formats an ISO date string into a more readable locale-specific string.
   * @param {string} isoString - The ISO date string to format.
   * @returns {string} The formatted date string, or 'N/A' or 'Invalid Date' on error.
   */
  const formatDate = (isoString: string): string => {
    if (!isoString) return 'N/A';
    try {
      return new Date(isoString).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short'});
    } catch (e) {
      console.error("Error formatting date:", e);
      return 'Invalid Date';
    }
  };

  return (
    <main className="flex-grow p-8 overflow-y-auto bg-slate-900" role="main">
      <header className="mb-8">
        <h2 className="text-4xl font-extrabold text-white tracking-tight" id="workarea-title">
          Workspace: <span className="text-sky-400">{project.name}</span>
        </h2>
        <div className="text-sm text-slate-400 mt-2 space-x-4">
          <span className="inline-flex items-center" aria-label={`App ID: ${project.id}`}>
            {/* ID is not typically displayed but available: project.id */}
          </span>
          <span className="inline-flex items-center">
            <MdDateRange className="mr-1.5 text-slate-500" aria-hidden="true" />
            Created: {formatDate(project.dateCreated)}
          </span>
          <span className="inline-flex items-center">
            <MdUpdate className="mr-1.5 text-slate-500" aria-hidden="true" />
            Last Updated: {formatDate(project.lastUpdated)}
          </span>
        </div>
      </header>

      <div className="bg-slate-800 p-6 rounded-xl shadow-xl mb-8">
        <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <MdInfoOutline className="text-sky-400 mr-2" aria-hidden="true" />
            App Overview (ID: {project.id})
        </h3>
        <div className="prose prose-invert max-w-none text-slate-300">
          <p>
            This is the main content area for <strong className="font-semibold text-sky-300">{project.name}</strong>. 
            All project-specific components, data visualizations, and interactive features will be displayed here.
          </p>
          <p>
            Start building your amazing application by adding new components and functionalities related to this project.
            The sidebar provides navigation and global project actions.
          </p>
        </div>
      </div>

      {/* Form Element Showcase */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <MdTune className="text-sky-400 mr-2" aria-hidden="true" />
            Form Element Showcase
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Input Examples */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-slate-200 mb-2 border-b border-slate-700 pb-1">Input Fields</h4>
            <Input
              id="demo-text-input"
              label="Standard Text Input"
              value={textInputValue}
              onChange={(e) => {
                setTextInputValue(e.target.value);
                if (e.target.value.length < 5) {
                  setTextInputError('Value must be at least 5 characters.');
                } else if (e.target.value.toLowerCase().includes('error')) {
                   setTextInputError('Input contains "error", which is not allowed.');
                }
                else {
                  setTextInputError(null);
                }
              }}
              placeholder="Enter some text"
              error={textInputError}
              required
            />
            <Input
              id="demo-disabled-input"
              label="Disabled Text Input"
              value="Cannot change this"
              onChange={() => {}}
              disabled
            />
             <Input
              id="demo-password-input"
              type="password"
              label="Password Input"
              value="secret123"
              onChange={() => {}}
              placeholder="Enter password"
            />
          </div>

          {/* Textarea Example */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-slate-200 mb-2 border-b border-slate-700 pb-1">Textarea</h4>
            <Textarea
              id="demo-textarea"
              label="Message Area"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              placeholder="Enter a long message"
              rows={5}
            />
             <Textarea
              id="demo-textarea-disabled"
              label="Disabled Message Area"
              value="This content is fixed."
              onChange={() => {}}
              rows={3}
              disabled
            />
          </div>

          {/* Checkbox Examples */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-slate-200 mb-2 border-b border-slate-700 pb-1">Checkboxes</h4>
            <Checkbox
              id="demo-checkbox"
              label="Enable Feature X"
              checked={checkboxChecked}
              onChange={setCheckboxChecked}
            />
            <Checkbox
              id="demo-checkbox-disabled"
              label="Disabled Unchecked"
              checked={false}
              onChange={() => {}}
              disabled
            />
            <Checkbox
              id="demo-checkbox-disabled-checked"
              label="Disabled Checked"
              checked={true}
              onChange={() => {}}
              disabled
            />
             <Checkbox
              id="demo-checkbox-error"
              label="Checkbox with Error"
              checked={false}
              onChange={() => {}}
              error="This selection is required."
            />
          </div>

          {/* ToggleSwitch Examples */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-slate-200 mb-2 border-b border-slate-700 pb-1">Toggle Switches</h4>
            <ToggleSwitch
              id="demo-toggle"
              label="Activate Notifications"
              checked={toggleSwitchChecked}
              onChange={setToggleSwitchChecked}
              labelPosition="right"
            />
            <ToggleSwitch
              id="demo-toggle-left"
              label="Dark Mode"
              checked={true}
              onChange={() => {}}
              labelPosition="left"
            />
            <ToggleSwitch
              id="demo-toggle-disabled"
              label="Disabled Toggle (Off)"
              checked={false}
              onChange={() => {}}
              disabled
            />
             <ToggleSwitch
              id="demo-toggle-disabled-checked"
              label="Disabled Toggle (On)"
              checked={true}
              onChange={() => {}}
              disabled
            />
          </div>
          
          {/* Select Examples */}
          <div className="space-y-4 md:col-span-2"> {/* Span across two columns for more space */}
            <h4 className="text-lg font-medium text-slate-200 mb-2 border-b border-slate-700 pb-1">Select Dropdowns</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <Select
                id="demo-select"
                label="Choose Deployment Target"
                options={demoSelectOptions}
                value={selectValue}
                onChange={setSelectValue}
                placeholder="Pick a target..."
                required
              />
              <Select
                id="demo-select-error"
                label="Region (with error)"
                options={[
                  { value: 'us-east', label: 'US East' },
                  { value: 'eu-west', label: 'EU West' },
                ]}
                value={null} // No selection to show error
                onChange={() => {}}
                error="Please select a region."
              />
              <Select
                id="demo-select-disabled"
                label="Disabled Select"
                options={demoSelectOptions}
                value="option1"
                onChange={() => {}}
                disabled
              />
              <Select
                id="demo-select-no-options"
                label="Empty Select"
                options={[]}
                value={null}
                onChange={() => {}}
                placeholder="No items"
              />
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-xs text-slate-500">
        <p>All changes are persisted in local storage. Current project: {project.name} (ID: {project.id}).</p>
      </footer>
    </main>
  );
};

export default WorkArea;
