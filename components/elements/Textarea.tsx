import React, {TextareaHTMLAttributes} from 'react';
import FieldBase from './FieldBase';
import {classConstants} from '../../constants/constants';
import {useApp} from '../../contexts/AppContext'; // Added import

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value' | 'className'> {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string | null;
    className?: string;
    textareaClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

const Textarea: React.FC<TextareaProps> = ({
                                               id,
                                               label,
                                               value,
                                               onChange,
                                               placeholder,
                                               rows = 4,
                                               required = false,
                                               disabled = false,
                                               error = null,
                                               className = 'mb-4',
                                               textareaClassName = '',
                                               labelClassName = '',
                                               errorClassName = '',
                                               ...props
                                           }) => {
    const {appState} = useApp(); // Added hook
    const theme = appState.settings.theme; // Get theme
    const formFieldThemeClasses = classConstants(theme).formField; // Use themed classes

    const errorId = error ? `${id}-error` : undefined;

    const handleChange = (event) => {
        onChange && onChange(event.target.value);
    }

    const computedTextareaClasses = [
        formFieldThemeClasses.base,
        error ? formFieldThemeClasses.error : '',
        textareaClassName,
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
      <textarea
          id={id}
          name={props.name || id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={computedTextareaClasses}
          {...props}
      />
        </FieldBase>
    );
};

export default Textarea;
