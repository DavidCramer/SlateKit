import React, {useState} from 'react';
import {MdTune, MdCloud, MdComputer, MdLightbulb, MdInfoOutline} from 'react-icons/md';
import {
    Input,
    Textarea,
    Checkbox,
    ToggleSwitch,
    Select,
    type SelectOption
} from '../components/ui';
import {Panel} from '../components/panels';

/**
 * FormElementShowcase component that demonstrates all form elements
 * This was extracted from WorkArea.tsx to keep demo content separate
 */
const FormElementShowcase: React.FC = () => {
    // Demo Form Element States
    const [textInputValue, setTextInputValue] = useState('Hello SlateKit!');
    const [textInputError, setTextInputError] = useState<string | null>(null);
    const [textareaValue, setTextareaValue] = useState('This is a longer piece of text for the textarea component, demonstrating its multi-line capabilities.');
    const [checkboxChecked, setCheckboxChecked] = useState(true);
    const [toggleSwitchChecked, setToggleSwitchChecked] = useState(false);
    const [selectValue, setSelectValue] = useState<string | number | null>('option2');

    const demoSelectOptions: SelectOption[] = [
        {value: 'option1', label: 'Option 1: The Cloud', icon: MdCloud},
        {value: 'option2', label: 'Option 2: On Your Machine', icon: MdComputer},
        {value: 'option3', label: 'Option 3: Brilliant Idea', icon: MdLightbulb},
        {value: 'option4', label: 'Option 4: Disabled Option', disabled: true},
    ];

    return (
        <>
            <Panel
                variant="card"
                title={`App Overview`}
                icon={MdInfoOutline}
                className="mb-8"
                titleId="app-overview-title"
            >
                <div className="prose prose-invert max-w-none text-slate-300">
                    <p>
                        This is the main content area for <strong
                        className="font-semibold text-sky-300">DEMO</strong>.
                        All project-specific components, data visualizations, and interactive features will be displayed here.
                    </p>
                    <p>
                        Start building your amazing application by adding new components and functionalities related to this project.
                        The sidebar provides navigation and global project actions.
                    </p>
                </div>
            </Panel>
            <Panel variant="card" title="Form Element Showcase" icon={MdTune} titleId="form-elements-title">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                    <Panel variant="default" title="Input Fields" titleId="input-fields-subtitle">
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
                                } else {
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
                            onChange={() => {
                            }}
                            disabled
                        />
                        <Input
                            id="demo-password-input"
                            type="password"
                            label="Password Input"
                            value="secret123"
                            onChange={() => {
                            }}
                            placeholder="Enter password"
                        />
                    </Panel>

                    <Panel variant="default" title="Textarea" titleId="textarea-subtitle">
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
                            onChange={() => {
                            }}
                            rows={3}
                            disabled
                        />
                    </Panel>

                    <Panel variant="default" title="Checkboxes" titleId="checkboxes-subtitle">
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
                            onChange={() => {
                            }}
                            disabled
                        />
                        <Checkbox
                            id="demo-checkbox-disabled-checked"
                            label="Disabled Checked"
                            checked={true}
                            onChange={() => {
                            }}
                            disabled
                        />
                        <Checkbox
                            id="demo-checkbox-error"
                            label="Checkbox with Error"
                            checked={false}
                            onChange={() => {
                            }}
                            error="This selection is required."
                        />
                    </Panel>

                    <Panel variant="default" title="Toggle Switches" titleId="toggles-subtitle">
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
                            onChange={() => {
                            }}
                            labelPosition="left"
                        />
                        <ToggleSwitch
                            id="demo-toggle-disabled"
                            label="Disabled Toggle (Off)"
                            checked={false}
                            onChange={() => {
                            }}
                            disabled
                        />
                        <ToggleSwitch
                            id="demo-toggle-disabled-checked"
                            label="Disabled Toggle (On)"
                            checked={true}
                            onChange={() => {
                            }}
                            disabled
                        />
                    </Panel>

                    <Panel variant="default" title="Select Dropdowns" className="md:col-span-2"
                           titleId="selects-subtitle">
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
                                    {value: 'us-east', label: 'US East'},
                                    {value: 'eu-west', label: 'EU West'},
                                ]}
                                value={null}
                                onChange={() => {
                                }}
                                error="Please select a region."
                            />
                            <Select
                                id="demo-select-disabled"
                                label="Disabled Select"
                                options={demoSelectOptions}
                                value="option1"
                                onChange={() => {
                                }}
                                disabled
                            />
                            <Select
                                id="demo-select-no-options"
                                label="Empty Select"
                                options={[]}
                                value={null}
                                onChange={() => {
                                }}
                                placeholder="No items"
                            />
                        </div>
                    </Panel>
                </div>
            </Panel>
            <footer className="mt-12 text-center text-xs text-slate-500">
                <p>All changes are persisted in local storage.</p>
            </footer>
        </>
    );
};

export default FormElementShowcase;
