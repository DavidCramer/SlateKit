import React, { useState, useEffect, useRef, KeyboardEvent, ElementType } from 'react';
import { MdExpandMore, MdCheck } from 'react-icons/md';
import FieldBase from './FieldBase';
import { classConstants } from '../../constants/constants';
import { useApp } from '../../contexts/AppContext'; // Added import

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: ElementType;
  disabled?: boolean;
}

interface SelectProps {
  id: string; 
  label?: string;
  options: SelectOption[];
  value: string | number | null;
  onChange: (selectedValue: string | number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string | null;
  className?: string; 
  buttonClassName?: string; 
  dropdownClassName?: string; 
  optionClassName?: string; 
  labelClassName?: string; 
  errorClassName?: string; 
  required?: boolean;
  htmlForOverride?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error = null,
  className = 'mb-4',
  buttonClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  labelClassName = '',
  errorClassName = '',
  required = false,
  htmlForOverride,
}) => {
  const { appState } = useApp(); // Added hook
  const theme = appState.settings.theme; // Get theme
  const selectThemeClasses = classConstants[theme].select; // Use themed classes

  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

  const selectedOption = options.find(opt => opt.value === value);
  const buttonId = `${id}-button`;
  const errorId = error ? `${id}-error` : undefined;
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  useEffect(() => {
    if (!isOpen) {
      setFocusedOptionIndex(selectedOption ? options.findIndex(opt => opt.value === selectedOption.value) : -1);
    } else {
        optionsRef.current = optionsRef.current.slice(0, options.length);
    }
  }, [isOpen, options, selectedOption]);

  useEffect(() => {
    if (isOpen && focusedOptionIndex >= 0 && optionsRef.current[focusedOptionIndex]) {
      optionsRef.current[focusedOptionIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isOpen, focusedOptionIndex]);

  const handleOptionClick = (option: SelectOption) => {
    if (!option.disabled) {
      onChange(option.value);
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement | HTMLLIElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Enter':
      case ' ': 
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          const currentValIndex = options.findIndex(opt => opt.value === value);
          setFocusedOptionIndex(currentValIndex !== -1 ? currentValIndex : (options.findIndex(opt => !opt.disabled) ?? -1));
        } else {
          if (focusedOptionIndex >= 0 && focusedOptionIndex < options.length) {
            const currentOption = options[focusedOptionIndex];
            if (currentOption && !currentOption.disabled) {
              handleOptionClick(currentOption);
            }
          } else if (options.length > 0 && focusedOptionIndex === -1) { 
            const firstEnabled = options.findIndex(opt => !opt.disabled);
            if (firstEnabled !== -1) handleOptionClick(options[firstEnabled]);
          }
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        setFocusedOptionIndex(prev => {
          let nextIndex = prev + 1;
          while(nextIndex < options.length && options[nextIndex].disabled) {
            nextIndex++;
          }
          return nextIndex >= options.length ? (options.map(o => !o.disabled).lastIndexOf(true)) : nextIndex;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
         setFocusedOptionIndex(prev => {
          let nextIndex = prev - 1;
          while(nextIndex >= 0 && options[nextIndex].disabled) {
            nextIndex--;
          }
          return nextIndex < 0 ? (options.findIndex(o => !o.disabled)) : nextIndex;
        });
        break;
      case 'Home':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        setFocusedOptionIndex(options.findIndex(opt => !opt.disabled) ?? 0);
        break;
      case 'End':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        setFocusedOptionIndex(options.map(opt => !opt.disabled).lastIndexOf(true) ?? options.length - 1);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            if (!isOpen) setIsOpen(true);
            const char = event.key.toLowerCase();
            const currentFocus = focusedOptionIndex === -1 ? -1 : focusedOptionIndex; 
            let matchingIndex = options.findIndex(
                (opt, idx) => idx > currentFocus && !opt.disabled && opt.label.toLowerCase().startsWith(char)
            );
            if (matchingIndex === -1 && currentFocus !== -1) { 
                 matchingIndex = options.findIndex(
                    (opt, idx) => idx < currentFocus && !opt.disabled && opt.label.toLowerCase().startsWith(char)
                );
            }
             if (matchingIndex === -1) { 
                 matchingIndex = options.findIndex(
                    (opt) => !opt.disabled && opt.label.toLowerCase().startsWith(char)
                );
            }
            if (matchingIndex !== -1) {
                setFocusedOptionIndex(matchingIndex);
            }
        }
        break;
    }
  };

  const computedButtonClasses = [
    selectThemeClasses.buttonBase,
    error ? selectThemeClasses.buttonError : '',
    buttonClassName,
  ].filter(Boolean).join(' ');

  const computedDropdownClasses = [
    selectThemeClasses.dropdownUl,
    dropdownClassName,
  ].filter(Boolean).join(' ');

  return (
    <FieldBase
      id={id}
      label={label}
      htmlForOverride={buttonId}
      required={required}
      error={error}
      className={className}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      reserveErrorSpace={true}
    >
      <div className="relative" ref={selectRef}>
        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={computedButtonClasses}
        >
          <span className="flex items-center truncate">
            {selectedOption?.icon && <selectedOption.icon className={selectThemeClasses.optionLeadingIcon} />}
            {selectedOption ? selectedOption.label : <span className={selectThemeClasses.placeholderText}>{placeholder}</span>}
          </span>
          <MdExpandMore className={`${selectThemeClasses.expandIcon} ${isOpen ? selectThemeClasses.expandIconOpenState : ''}`} />
        </button>

        {isOpen && !disabled && (
          <ul
            role="listbox"
            aria-labelledby={label ? (htmlForOverride || id) : buttonId}
            aria-activedescendant={focusedOptionIndex >=0 && options[focusedOptionIndex] ? `${id}-option-${options[focusedOptionIndex].value}` : undefined}
            tabIndex={-1}
            className={computedDropdownClasses}
          >
            {options.length === 0 ? (
              <li className={`${selectThemeClasses.noOptionsLi} ${optionClassName}`}>No options available</li>
            ) : (
              options.map((option, index) => {
                const optionLiClasses = [
                  selectThemeClasses.optionBase,
                  option.disabled ? selectThemeClasses.optionDisabled : selectThemeClasses.optionEnabled,
                  focusedOptionIndex === index && !option.disabled ? selectThemeClasses.optionFocusedEnabled : '',
                  optionClassName,
                ].filter(Boolean).join(' ');

                return (
                  <li
                    key={option.value}
                    id={`${id}-option-${option.value}`}
                    ref={el => { optionsRef.current[index] = el; }}
                    role="option"
                    aria-selected={value === option.value}
                    aria-disabled={option.disabled}
                    tabIndex={-1}
                    onClick={() => handleOptionClick(option)}
                    onMouseEnter={() => !option.disabled && setFocusedOptionIndex(index)}
                    onKeyDown={(e) => { 
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOptionClick(option);
                        }
                    }}
                    className={optionLiClasses}
                  >
                    <span className="flex items-center truncate">
                      {option.icon && <option.icon className={selectThemeClasses.optionLeadingIcon} />}
                      {option.label}
                    </span>
                    {value === option.value && <MdCheck className={selectThemeClasses.optionSelectedCheckIcon} />}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </FieldBase>
  );
};

export default Select;
