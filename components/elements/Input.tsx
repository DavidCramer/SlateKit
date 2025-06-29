import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import FieldBase from './FieldBase';
import { classConstants } from '../../constants/constants';
import { useApp } from '../../contexts/AppContext'; // Added import

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'className'> {
  id: string;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  className?: string; 
  inputClassName?: string; 
  labelClassName?: string; 
  errorClassName?: string; 
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoFocus = false,
  required = false,
  disabled = false,
  error = null,
  className = 'mb-4', 
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  ...props
}) => {
  const { appState } = useApp(); // Added hook
  const theme = appState.settings.theme; // Get theme
  const formFieldThemeClasses = classConstants(theme).formField; // Use themed classes

  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = error ? `${id}-error` : undefined;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const computedInputClasses = [
    formFieldThemeClasses.base,
    error ? formFieldThemeClasses.error : '',
    inputClassName,
  ].filter(Boolean).join(' ');

  return (
    <FieldBase
      id={id}
      label={label}
      required={required}
      error={error}
      className={className}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      reserveErrorSpace={true}
    >
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={props.name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required} 
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={computedInputClasses}
        {...props}
      />
    </FieldBase>
  );
};

export default Input;
