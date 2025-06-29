import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import FieldBase from './FieldBase';
import {classConstants} from '../../constants/constants';
import {useApp} from '../../contexts/AppContext'; // Added import

interface ToggleSwitchProps {
    id: string;
    label?: string;
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    error?: string | null;
    className?: string;
    labelPosition?: 'left' | 'right';
    labelClassName?: string;
    switchClassName?: string;
    errorClassName?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
                                                       id,
                                                       label,
                                                       value,
                                                       onChange,
                                                       disabled = false,
                                                       error = null,
                                                       className = 'mb-4',
                                                       labelPosition = 'right',
                                                       labelClassName = '',
                                                       switchClassName = '',
                                                       errorClassName = '',
                                                   }) => {
    const {appState} = useApp(); // Added hook
    const theme = appState.settings.theme; // Get theme
    const toggleSwitchThemeClasses = classConstants(theme).toggleSwitch; // Use themed classes

    const [isFocused, setIsFocused] = useState(false);
    const errorId = error ? `${id}-error` : undefined;
    const labelTextId = label ? `${id}-labeltext` : undefined;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            onChange(event.target.checked);
        }
    };

    const handleKeyboardInteraction = (event: KeyboardEvent<HTMLButtonElement | HTMLSpanElement>) => {
        if (!disabled && (event.key === ' ' || event.key === 'Enter')) {
            event.preventDefault();
            onChange(!value);
        }
    };

    const switchVisualClasses = [
        toggleSwitchThemeClasses.base,
        value ? toggleSwitchThemeClasses.checked : toggleSwitchThemeClasses.unchecked,
        isFocused && !disabled ? toggleSwitchThemeClasses.focus : '',
        disabled ? toggleSwitchThemeClasses.disabled : '',
        !disabled && !value ? toggleSwitchThemeClasses.enabledUncheckedHover : '',
        error ? toggleSwitchThemeClasses.error : '',
        switchClassName,
    ].filter(Boolean).join(' ');

    const thumbClasses = `${toggleSwitchThemeClasses.thumbBase} ${value ? toggleSwitchThemeClasses.thumbChecked : toggleSwitchThemeClasses.thumbUnchecked}`;

    const computedLabelClasses = [
        toggleSwitchThemeClasses.labelBase,
        disabled ? toggleSwitchThemeClasses.labelDisabled : toggleSwitchThemeClasses.labelEnabled,
        labelClassName,
    ].filter(Boolean).join(' ');

    const switchVisual = (
        <button
            type="button"
            id={id}
            role="switch"
            aria-checked={value}
            aria-labelledby={labelTextId}
            aria-describedby={errorId}
            aria-invalid={!!error}
            onClick={() => !disabled && onChange?.(!value)}
            onKeyDown={handleKeyboardInteraction}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={switchVisualClasses}
        >
            <span className={thumbClasses}/>
            <input
                type="checkbox"
                checked={value}
                onChange={handleChange}
                disabled={disabled}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
            />
        </button>
    );

    const labelElement = label ? (
        <span
            id={labelTextId}
            className={computedLabelClasses}
            onClick={(e) => {
                e.preventDefault();
                if (!disabled) onChange?.(!value);
            }}
            onKeyDown={handleKeyboardInteraction}
            tabIndex={disabled ? -1 : 0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
      {label}
    </span>
    ) : null;

    const errorPaddingClass = label && labelPosition === 'left' ? toggleSwitchThemeClasses.errorPaddingLeftLabel : '';

    return (
        <FieldBase
            id={id}
            error={error}
            className={className}
            errorClassName={`${errorPaddingClass} ${errorClassName}`}
            reserveErrorSpace={true}
        >
            <div className={`flex items-center`}>
                {labelPosition === 'left' && labelElement &&
					<span className={toggleSwitchThemeClasses.labelSpacingLeft}>{labelElement}</span>}
                {switchVisual}
                {labelPosition === 'right' && labelElement &&
					<span className={toggleSwitchThemeClasses.labelSpacingRight}>{labelElement}</span>}
            </div>
        </FieldBase>
    );
};

export default ToggleSwitch;
