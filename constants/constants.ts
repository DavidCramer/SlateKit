// constants/constants.ts
import {makeComponentTemplates} from '../templates/componentTemplate';

/**
 * Core Item identifier. This is the core config items the app creates.
 * The items ar core things, like `Project`, `notebook`, `plugin`. Whatever it is the main thing is.
 */
export const coreItem = {
    singular: 'Notebook',
    singularLower: 'notebook',
    plural: 'Notebooks',
    pluralLower: 'notebooks'
}

interface ColorTheme {
    [string: string]: ColorScheme;
}

export interface ColorScheme {
    _themeLabel: string;
    text: string;
    textAlt: string;
    textEmphasis: string;
    textHover: string;
    textMuted: string;
    textMutedAlt: string;
    textInverted: string;
    textDanger: string;
    textPrimary: string;
    textPrimaryEmphasis: string;
    bg: string;
    bgAlt: string;
    bgComponent: string;
    bgComponentHover: string;
    bgComponentAltHover: string;
    bgMuted: string;
    bgMutedHover: string;
    bgPrimary: string;
    bgPrimaryHover: string;
    bgDanger: string;
    bgDangerHover: string;
    bgBackdrop: string;
    bgInverted: string;
    bgGradientFrom: string;
    bgGradientTo: string;
    border: string;
    borderAlt: string;
    borderHover: string;
    borderPrimary: string;
    borderPrimaryHover: string;
    borderFocus: string;
    borderError: string;
    borderErrorFocus: string;
    ring: string;
    ringError: string;
    ringOffset: string;
    ringOffsetAlt: string;
    placeholder: string;
}

export interface SizeScheme {
    // Panel Card sizing
    panelCard: {
        padding: string;
        borderRadius: string;
        shadow: string;
        headerPadding: string;
        headerMargin: string;
        contentMargin: string;
    };

    // Button sizing
    button: {
        padding: string;
        fontSize: string;
        borderRadius: string;
        iconSize: string;
        iconMargin: string;
        focusRing: string;
        focusRingOffset: string;
        linkPadding: string;
    };

    // Form field sizing
    formField: {
        padding: string;
        borderRadius: string;
        focusRing: string;
        fontSize: string;
        labelFontSize: string;
        errorFontSize: string;
        errorMarginTop: string;
    };

    // Toggle switch sizing
    toggleSwitch: {
        dimensions: string;
        thumbSize: string;
        thumbTranslate: string;
        borderWidth: string;
        focusRing: string;
        focusRingOffset: string;
        labelFontSize: string;
        labelSpacing: string;
        errorPadding: string;
    };

    // Checkbox sizing
    checkbox: {
        size: string;
        borderRadius: string;
        marginRight: string;
        iconSize: string;
        focusRing: string;
        focusRingOffset: string;
        labelFontSize: string;
        errorPadding: string;
    };

    // Select sizing
    select: {
        padding: string;
        borderRadius: string;
        focusRing: string;
        fontSize: string;
        iconSize: string;
        dropdownMarginTop: string;
        dropdownMaxHeight: string;
        optionPadding: string;
        optionFontSize: string;
        optionIconSize: string;
        optionIconMargin: string;
    };

    // Modal sizing
    modal: {
        padding: string;
        borderRadius: string;
        shadow: string;
        maxWidth: string;
        headerMargin: string;
        contentMargin: string;
        titleFontSize: string;
        iconSize: string;
        iconMargin: string;
        closeButtonPadding: string;
        footerSpacing: string;
    };

    // Front panel sizing
    frontPanel: {
        padding: string;
        maxWidth: string;
        contentPadding: string;
        borderRadius: string;
        shadow: string;
        iconSize: string;
        iconMargin: string;
        titleFontSize: string;
    };

    // Sidebar layout sizing
    sidebarLayout: {
        sidebarMinWidth: string;
        sidebarPadding: string;
        mainPadding: string;
    };

    // Panel sizing variations
    panel: {
        default: {
            headerPadding: string;
            headerMargin: string;
            titleFontSize: string;
            iconSize: string;
            iconMargin: string;
            contentSpacing: string;
        };
        aside: {
            width: string;
            padding: string;
            headerPadding: string;
            headerMargin: string;
            titleFontSize: string;
            iconSize: string;
            iconMargin: string;
            contentSpacing: string;
        };
        card: {
            padding: string;
            margin: string;
            borderRadius: string;
            shadow: string;
            headerPadding: string;
            headerMargin: string;
            titleFontSize: string;
            iconSize: string;
            iconMargin: string;
        };
        main: {
            padding: string;
            headerMargin: string;
            titleFontSize: string;
            iconSize: string;
            iconMargin: string;
        };
    };
}

/**
 * Holds the reusable colors based on theme.
 * These are Tailwind CSS class strings, organized by theme, to promote
 * consistency and ease of maintenance.
 */
export const colors: ColorTheme = {
    dark: <ColorScheme>{
        _themeLabel: 'Dark (default)',
        // Text
        text: 'text-slate-300',
        textAlt: 'text-slate-200',
        textEmphasis: 'text-white',
        textHover: 'hover:text-white',
        textMuted: 'text-slate-400',
        textMutedAlt: 'text-slate-500',
        textInverted: 'text-white',
        textDanger: 'text-red-400',
        textPrimary: 'text-sky-400',
        textPrimaryEmphasis: 'text-sky-600',

        // Background
        bg: 'bg-slate-900',
        bgAlt: 'bg-slate-800',
        bgComponent: 'bg-slate-700',
        bgComponentHover: 'hover:bg-slate-600',
        bgComponentAltHover: 'hover:bg-slate-700',
        bgMuted: 'bg-slate-600',
        bgMutedHover: 'hover:bg-slate-500',
        bgPrimary: 'bg-sky-600',
        bgPrimaryHover: 'hover:bg-sky-500',
        bgDanger: 'bg-rose-500',
        bgDangerHover: 'hover:bg-rose-600',
        bgBackdrop: 'bg-slate-900/50',
        bgInverted: 'bg-white',
        bgGradientFrom: 'bg-slate-900',
        bgGradientTo: 'bg-slate-400',

        // Border
        border: 'border-slate-600',
        borderAlt: 'border-slate-700',
        borderHover: 'hover:border-slate-500',
        borderPrimary: 'border-sky-600',
        borderPrimaryHover: 'hover:border-sky-500',
        borderFocus: 'border-sky-500',
        borderError: 'border-red-500',
        borderErrorFocus: 'border-red-500',

        // Ring
        ring: 'ring-sky-500',
        ringError: 'ring-red-500',
        ringOffset: 'ring-offset-slate-900',
        ringOffsetAlt: 'ring-offset-slate-800',

        // Placeholder
        placeholder: 'placeholder-slate-400',
    },
    light: <ColorScheme>{
        _themeLabel: 'Light (default)',
        // Text
        text: 'text-slate-800',
        textAlt: 'text-slate-700',
        textEmphasis: 'text-black',
        textHover: 'hover:text-black',
        textMuted: 'text-slate-500',
        textMutedAlt: 'text-slate-400',
        textInverted: 'text-white',
        textDanger: 'text-red-600',
        textPrimary: 'text-sky-600',
        textPrimaryEmphasis: 'text-sky-800',

        // Background
        bg: 'bg-white',
        bgAlt: 'bg-slate-100',
        bgComponent: 'bg-slate-200',
        bgComponentHover: 'hover:bg-slate-300',
        bgComponentAltHover: 'hover:bg-slate-200',
        bgMuted: 'bg-slate-300',
        bgMutedHover: 'hover:bg-slate-400',
        bgPrimary: 'bg-sky-500',
        bgPrimaryHover: 'hover:bg-sky-600',
        bgDanger: 'bg-rose-500',
        bgDangerHover: 'hover:bg-rose-600',
        bgBackdrop: 'bg-white/50',
        bgInverted: 'bg-slate-900',
        bgGradientFrom: 'bg-white',
        bgGradientTo: 'bg-slate-100',

        // Border
        border: 'border-slate-300',
        borderAlt: 'border-slate-200',
        borderHover: 'hover:border-slate-400',
        borderPrimary: 'border-sky-500',
        borderPrimaryHover: 'hover:border-sky-600',
        borderFocus: 'border-sky-600',
        borderError: 'border-red-600',
        borderErrorFocus: 'border-red-600',

        // Ring
        ring: 'ring-sky-600',
        ringError: 'ring-red-600',
        ringOffset: 'ring-offset-white',
        ringOffsetAlt: 'ring-offset-slate-100',

        // Placeholder
        placeholder: 'placeholder-slate-500',
    }
};

const generalRing = 'ring-2';
const generalRingOffset = 'ring-offset-1';

/**
 * Holds reusable sizing values for consistent component styling.
 * These are Tailwind CSS class strings organized by component type.
 */
export const sizes: SizeScheme = {
    panelCard: {
        padding: 'p-4',
        borderRadius: 'rounded-sm',
        shadow: 'shadow-xl',
        headerPadding: 'pb-3',
        headerMargin: 'mb-3',
        contentMargin: 'mb-3',
    },

    button: {
        padding: 'p-2',
        fontSize: 'text-xs',
        borderRadius: 'rounded-sm',
        iconSize: 'w-5 h-5',
        iconMargin: 'mr-2',
        focusRing: generalRing,
        focusRingOffset: generalRingOffset,
        linkPadding: 'px-2 py-2',
    },

    formField: {
        padding: 'px-3 py-2.5',
        borderRadius: 'rounded-sm',
        focusRing: generalRing,
        fontSize: 'text-base',
        labelFontSize: 'text-sm',
        errorFontSize: 'text-xs',
        errorMarginTop: 'mt-1.5',
    },

    toggleSwitch: {
        dimensions: 'h-6 w-11',
        thumbSize: 'h-5 w-5',
        thumbTranslate: 'translate-x-5',
        borderWidth: 'border-2',
        focusRing: generalRing,
        focusRingOffset: generalRingOffset,
        labelFontSize: 'text-sm',
        labelSpacing: 'mr-3',
        errorPadding: 'pl-10 sm:pl-12',
    },

    checkbox: {
        size: 'h-5 w-5',
        borderRadius: 'rounded-xs',
        marginRight: 'mr-2',
        iconSize: 'w-4 h-4',
        focusRing: generalRing,
        focusRingOffset: generalRingOffset,
        labelFontSize: 'text-sm',
        errorPadding: 'pl-7',
    },

    select: {
        padding: 'px-3 py-2.5',
        borderRadius: 'rounded-sm',
        focusRing: generalRing,
        fontSize: 'text-base',
        iconSize: 'w-5 h-5',
        dropdownMarginTop: 'mt-1',
        dropdownMaxHeight: 'max-h-60',
        optionPadding: 'px-3 py-2',
        optionFontSize: 'text-sm',
        optionIconSize: 'w-5 h-5',
        optionIconMargin: 'mr-2',
    },

    modal: {
        padding: 'p-6 sm:p-8',
        borderRadius: 'rounded-md',
        shadow: 'shadow-lg',
        maxWidth: 'max-w-md',
        headerMargin: 'mb-4 sm:mb-6',
        contentMargin: 'mb-6 sm:mb-8',
        titleFontSize: 'text-xl sm:text-2xl',
        iconSize: 'w-6 h-6',
        iconMargin: 'mr-2',
        closeButtonPadding: '!p-0',
        footerSpacing: 'space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse',
    },

    frontPanel: {
        padding: 'p-4',
        maxWidth: 'max-w-xs',
        contentPadding: 'p-8',
        borderRadius: 'rounded-md',
        shadow: 'shadow-sm',
        iconSize: 'w-14 h-14',
        iconMargin: 'mb-2',
        titleFontSize: 'text-lg',
    },

    sidebarLayout: {
        sidebarMinWidth: 'min-w-64',
        sidebarPadding: 'p-5',
        mainPadding: 'p-8',
    },

    panel: {
        default: {
            headerPadding: 'pb-1',
            headerMargin: 'mb-2',
            titleFontSize: 'text-lg',
            iconSize: 'w-5 h-5',
            iconMargin: 'mr-1.5',
            contentSpacing: 'space-y-4',
        },
        aside: {
            width: 'min-w-64 max-w-80',
            padding: 'p-4',
            headerPadding: 'pb-4',
            headerMargin: 'mb-4',
            titleFontSize: 'text-xl',
            iconSize: 'w-8 h-8',
            iconMargin: 'mr-2',
            contentSpacing: 'space-y-4',
        },
        card: {
            padding: 'p-3',
            margin: 'mb-8',
            borderRadius: 'rounded-md',
            shadow: 'shadow-xl',
            headerPadding: 'pb-2',
            headerMargin: 'mb-3',
            titleFontSize: 'text-lg',
            iconSize: 'w-6 h-6',
            iconMargin: 'mr-2',
        },
        main: {
            padding: 'p-4',
            headerMargin: 'mb-4',
            titleFontSize: 'text-xl',
            iconSize: 'w-6 h-6',
            iconMargin: 'mr-2',
        },
    },
};

/**
 * A centralized object for storing Tailwind CSS class string constants
 * used across various UI elements, supporting dark and light themes.
 * This promotes consistency and ease of maintenance by referencing the `colors` object.
 */
export const classConstants = (theme: keyof typeof colors = 'dark') => makeComponentTemplates(theme);
