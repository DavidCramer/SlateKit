import React, {ElementType, ReactNode} from 'react';
import {useApp} from '../../contexts/AppContext'; // Added import

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'item' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    icon?: ElementType;
    label?: ElementType | string;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    children: ReactNode; // Button label or content
}

const Button: React.FC<ButtonProps> = ({
                                           variant = 'secondary',
                                           icon: IconComponent,
                                           iconPosition = 'left',
                                           fullWidth = false,
                                           children,
                                           className = '',
                                           label,
                                           ...props
                                       }) => {
    const {themeClasses: {button: buttonThemeClasses}} = useApp(); // Added hook

    let selectedVariantClasses: string;
    let applyDefaultLayout = true;

    switch (variant) {
        case 'primary':
            selectedVariantClasses = buttonThemeClasses.primary;
            break;
        case 'danger':
            selectedVariantClasses = buttonThemeClasses.danger;
            break;
        case 'item':
            selectedVariantClasses = buttonThemeClasses.item;
            applyDefaultLayout = false;
            break;
        case 'link':
            selectedVariantClasses = buttonThemeClasses.link;
            applyDefaultLayout = false;
            break;
        case 'secondary':
        default:
            selectedVariantClasses = buttonThemeClasses.secondary;
            break;
    }

    const computedClasses = [
        buttonThemeClasses.base,
        selectedVariantClasses,
        applyDefaultLayout ? buttonThemeClasses.defaultLayout : '',
        fullWidth ? 'w-full' : '',
        className,
    ].filter(Boolean).join(' ');

    const iconMarkup = IconComponent ? (
        <IconComponent
            className={`${buttonThemeClasses.iconBase} ${iconPosition === 'left' ? buttonThemeClasses.iconMarginLeft : buttonThemeClasses.iconMarginRight}`}
            aria-hidden="true"
        />
    ) : null;

    return (
        <button
            type="button"
            className={computedClasses}
            {...props}
        >
            {iconPosition === 'left' && iconMarkup}
            {children ?? label}
            {iconPosition === 'right' && iconMarkup}
        </button>
    );
};

export default Button;
