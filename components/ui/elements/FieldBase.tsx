import React, { ReactNode } from 'react';
import { classConstants } from '../../../constants/constants';
import { useApp } from '../../../contexts/AppContext'; // Added import

interface FieldBaseProps {
  id: string;
  label?: string;
  htmlForOverride?: string;
  required?: boolean;
  error?: string | null;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  fieldWrapperClassName?: string;
  reserveErrorSpace?: boolean;
}

const FieldBase: React.FC<FieldBaseProps> = ({
  id,
  label,
  htmlForOverride,
  required,
  error,
  children,
  className = '',
  labelClassName = '',
  errorClassName = '',
  fieldWrapperClassName = '',
  reserveErrorSpace = true,
}) => {
  const { appState } = useApp(); // Added hook
  const theme = appState.settings.theme; // Get theme
  const fieldBaseThemeClasses = classConstants(theme).fieldBase; // Use themed classes

  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlForOverride || id}
          className={`${fieldBaseThemeClasses.label} ${labelClassName}`}
        >
          {label}
          {required && <span className={fieldBaseThemeClasses.requiredAsterisk}>*</span>}
        </label>
      )}
      <div className={fieldWrapperClassName}>
        {children}
      </div>
      {error && (
        <p id={errorId} className={`${fieldBaseThemeClasses.errorText} ${errorClassName}`} role="alert">
          {error}
        </p>
      )}
      {!error && reserveErrorSpace && (
        <p className={`${fieldBaseThemeClasses.errorPlaceholder} ${errorClassName}`} aria-hidden="true">
          &nbsp; 
        </p>
      )}
    </div>
  );
};

export default FieldBase;
