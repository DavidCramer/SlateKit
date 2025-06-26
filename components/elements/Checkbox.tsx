import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { MdCheck } from 'react-icons/md';
import FieldBase from './FieldBase';
import { classConstants } from '../../constants/constants';
import { useProject } from '../../contexts/ProjectContext'; // Added import

interface CheckboxProps {
  id: string;
  label: string; 
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string | null;
  className?: string; 
  labelClassName?: string; 
  checkboxClassName?: string; 
  errorClassName?: string; 
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  error = null,
  className = 'mb-4',
  labelClassName = '',
  checkboxClassName = '',
  errorClassName = '',
}) => {
  const { projectState } = useProject(); // Added hook
  const theme = projectState.settings.theme; // Get theme
  const checkboxThemeClasses = classConstants[theme].checkbox; // Use themed classes

  const [isFocused, setIsFocused] = useState(false);
  const errorId = error ? `${id}-error` : undefined;
  const labelTextId = `${id}-labeltext`;

  const internalHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  const handleLabelKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (!disabled && (event.key === ' ' || event.key === 'Enter')) {
      event.preventDefault();
      onChange(!checked);
    }
  };
  
  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
     if (!disabled && (event.key === ' ' || event.key === 'Enter')) {
      event.preventDefault();
      onChange(!checked);
    }
  };

  const visualCheckboxClasses = [
    checkboxThemeClasses.visualBase,
    checked ? checkboxThemeClasses.checked : checkboxThemeClasses.unchecked,
    isFocused && !disabled ? checkboxThemeClasses.focus : '',
    disabled ? checkboxThemeClasses.disabled : (checked ? checkboxThemeClasses.hoverChecked : checkboxThemeClasses.hoverUnchecked),
    error && !checked ? checkboxThemeClasses.errorUnchecked : '',
    checkboxClassName,
  ].filter(Boolean).join(' ');

  const computedLabelClasses = [
    checkboxThemeClasses.labelBase,
    disabled ? checkboxThemeClasses.labelDisabled : checkboxThemeClasses.labelEnabled,
    labelClassName,
  ].filter(Boolean).join(' ');

  return (
    <FieldBase
      id={id}
      error={error}
      className={className}
      errorClassName={`${checkboxThemeClasses.errorPaddingLeft} ${errorClassName}`} 
      reserveErrorSpace={true}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={internalHandleChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId || labelTextId}
          className="sr-only"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-labelledby={labelTextId}
          onClick={() => !disabled && onChange(!checked)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleButtonKeyDown}
          disabled={disabled}
          className={visualCheckboxClasses}
        >
          {checked && <MdCheck className={checkboxThemeClasses.checkIcon} />}
        </button>
        <span
          id={labelTextId}
          className={computedLabelClasses}
          onClick={(e) => { e.preventDefault(); if(!disabled) onChange(!checked); }}
          onKeyDown={handleLabelKeyDown}
          tabIndex={disabled ? -1 : 0}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {label}
        </span>
      </div>
    </FieldBase>
  );
};

export default Checkbox;
