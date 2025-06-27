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
        bgBackdrop: 'bg-slate-900',
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
        ring: 'ring-3 ring-sky-500',
        ringError: 'ring-3 ring-red-500',
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
        bgBackdrop: 'bg-white',
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
        ring: 'ring-3 ring-sky-600',
        ringError: 'ring-red-600',
        ringOffset: 'ring-offset-white',
        ringOffsetAlt: 'ring-offset-slate-100',

        // Placeholder
        placeholder: 'placeholder-slate-500',
    },
    ocean: <ColorScheme>{
        _themeLabel: 'Ocean',
        text: 'text-slate-800',
        textAlt: 'text-slate-700',
        textEmphasis: 'text-slate-900',
        textHover: 'hover:text-slate-900',
        textMuted: 'text-slate-500',
        textMutedAlt: 'text-slate-400',
        textInverted: 'text-white',
        textDanger: 'text-rose-600',
        textPrimary: 'text-cyan-600',
        textPrimaryEmphasis: 'text-cyan-800',

        bg: 'bg-cyan-50',
        bgAlt: 'bg-cyan-100',
        bgComponent: 'bg-white',
        bgComponentHover: 'hover:bg-cyan-100',
        bgComponentAltHover: 'hover:bg-cyan-200',
        bgMuted: 'bg-cyan-100',
        bgMutedHover: 'hover:bg-cyan-200',
        bgPrimary: 'bg-cyan-600',
        bgPrimaryHover: 'hover:bg-cyan-700',
        bgDanger: 'bg-rose-600',
        bgDangerHover: 'hover:bg-rose-700',
        bgBackdrop: 'bg-cyan-100',
        bgInverted: 'bg-slate-900',
        bgGradientFrom: 'bg-cyan-50',
        bgGradientTo: 'bg-cyan-800',

        border: 'border-cyan-200',
        borderAlt: 'border-cyan-300',
        borderHover: 'hover:border-cyan-400',
        borderPrimary: 'border-cyan-600',
        borderPrimaryHover: 'hover:border-cyan-700',
        borderFocus: 'border-cyan-700',
        borderError: 'border-rose-600',
        borderErrorFocus: 'border-rose-700',

        ring: 'ring-3 ring-cyan-600',
        ringError: 'ring-3 ring-rose-600',
        ringOffset: 'ring-offset-cyan-50',
        ringOffsetAlt: 'ring-offset-cyan-100',

        placeholder: 'placeholder-cyan-400',
    },
    sandstorm: <ColorScheme>{
        _themeLabel: 'Sandstorm',
        text: 'text-yellow-900',
        textAlt: 'text-yellow-800',
        textEmphasis: 'text-amber-900',
        textHover: 'hover:text-amber-900',
        textMuted: 'text-yellow-600',
        textMutedAlt: 'text-yellow-500',
        textInverted: 'text-white',
        textDanger: 'text-red-700',
        textPrimary: 'text-amber-600',
        textPrimaryEmphasis: 'text-amber-800',

        bg: 'bg-amber-50',
        bgAlt: 'bg-yellow-100',
        bgComponent: 'bg-white',
        bgComponentHover: 'hover:bg-amber-100',
        bgComponentAltHover: 'hover:bg-amber-200',
        bgMuted: 'bg-yellow-100',
        bgMutedHover: 'hover:bg-yellow-200',
        bgPrimary: 'bg-amber-600',
        bgPrimaryHover: 'hover:bg-amber-700',
        bgDanger: 'bg-red-600',
        bgDangerHover: 'hover:bg-red-700',
        bgBackdrop: 'bg-yellow-100',
        bgInverted: 'bg-yellow-900',
        bgGradientFrom: 'bg-amber-50',
        bgGradientTo: 'bg-yellow-200',

        border: 'border-amber-300',
        borderAlt: 'border-yellow-300',
        borderHover: 'hover:border-amber-400',
        borderPrimary: 'border-amber-600',
        borderPrimaryHover: 'hover:border-amber-700',
        borderFocus: 'border-amber-700',
        borderError: 'border-red-600',
        borderErrorFocus: 'border-red-700',

        ring: 'ring-3 ring-amber-600',
        ringError: 'ring-red-600',
        ringOffset: 'ring-offset-amber-50',
        ringOffsetAlt: 'ring-offset-yellow-100',

        placeholder: 'placeholder-yellow-400',
    },
    midnight: <ColorScheme>{
        _themeLabel: 'Midnight',
        text: 'text-gray-300',
        textAlt: 'text-gray-400',
        textEmphasis: 'text-white',
        textHover: 'hover:text-white',
        textMuted: 'text-gray-500',
        textMutedAlt: 'text-gray-600',
        textInverted: 'text-white',
        textDanger: 'text-red-400',
        textPrimary: 'text-indigo-400',
        textPrimaryEmphasis: 'text-indigo-600',

        bg: 'bg-gray-900',
        bgAlt: 'bg-gray-800',
        bgComponent: 'bg-gray-700',
        bgComponentHover: 'hover:bg-gray-600',
        bgComponentAltHover: 'hover:bg-gray-700',
        bgMuted: 'bg-gray-600',
        bgMutedHover: 'hover:bg-gray-500',
        bgPrimary: 'bg-indigo-600',
        bgPrimaryHover: 'hover:bg-indigo-500',
        bgDanger: 'bg-rose-500',
        bgDangerHover: 'hover:bg-rose-600',
        bgBackdrop: 'bg-gray-900',
        bgInverted: 'bg-white',
        bgGradientFrom: 'bg-gray-900',
        bgGradientTo: 'bg-gray-700',

        border: 'border-gray-600',
        borderAlt: 'border-gray-700',
        borderHover: 'hover:border-gray-500',
        borderPrimary: 'border-indigo-600',
        borderPrimaryHover: 'hover:border-indigo-500',
        borderFocus: 'border-indigo-500',
        borderError: 'border-red-500',
        borderErrorFocus: 'border-red-500',

        ring: 'ring-3 ring-indigo-500',
        ringError: 'ring-3 ring-red-500',
        ringOffset: 'ring-offset-gray-900',
        ringOffsetAlt: 'ring-offset-gray-800',

        placeholder: 'placeholder-gray-400',
    },
    cyberpunk: <ColorScheme>{
        _themeLabel: 'Cyberpunk',
        text: 'text-pink-200',
        textAlt: 'text-fuchsia-300',
        textEmphasis: 'text-white',
        textHover: 'hover:text-white',
        textMuted: 'text-purple-400',
        textMutedAlt: 'text-fuchsia-400',
        textInverted: 'text-black',
        textDanger: 'text-red-400',
        textPrimary: 'text-cyan-400',
        textPrimaryEmphasis: 'text-teal-500',

        bg: 'bg-gray-950',
        bgAlt: 'bg-gray-900',
        bgComponent: 'bg-fuchsia-900',
        bgComponentHover: 'hover:bg-fuchsia-800',
        bgComponentAltHover: 'hover:bg-purple-800',
        bgMuted: 'bg-gray-800',
        bgMutedHover: 'hover:bg-purple-700',
        bgPrimary: 'bg-cyan-500',
        bgPrimaryHover: 'hover:bg-teal-500',
        bgDanger: 'bg-red-600',
        bgDangerHover: 'hover:bg-red-700',
        bgBackdrop: 'bg-black',
        bgInverted: 'bg-white',
        bgGradientFrom: 'bg-gray-950',
        bgGradientTo: 'bg-fuchsia-900',

        border: 'border-fuchsia-700',
        borderAlt: 'border-fuchsia-800',
        borderHover: 'hover:border-fuchsia-500',
        borderPrimary: 'border-cyan-500',
        borderPrimaryHover: 'hover:border-teal-500',
        borderFocus: 'border-cyan-500',
        borderError: 'border-red-500',
        borderErrorFocus: 'border-red-500',

        ring: 'ring-3 ring-cyan-400',
        ringError: 'ring-3 ring-red-500',
        ringOffset: 'ring-offset-black',
        ringOffsetAlt: 'ring-offset-gray-900',

        placeholder: 'placeholder-fuchsia-400',
    },
    cyberpunkLight: <ColorScheme>{
        _themeLabel: 'Cyberpunk (Light)',
        text: 'text-gray-800',
        textAlt: 'text-fuchsia-700',
        textEmphasis: 'text-black',
        textHover: 'hover:text-black',
        textMuted: 'text-purple-500',
        textMutedAlt: 'text-fuchsia-500',
        textInverted: 'text-white',
        textDanger: 'text-red-600',
        textPrimary: 'text-cyan-600',
        textPrimaryEmphasis: 'text-teal-700',

        bg: 'bg-white',
        bgAlt: 'bg-fuchsia-100',
        bgComponent: 'bg-purple-100',
        bgComponentHover: 'hover:bg-fuchsia-200',
        bgComponentAltHover: 'hover:bg-purple-200',
        bgMuted: 'bg-gray-100',
        bgMutedHover: 'hover:bg-gray-200',
        bgPrimary: 'bg-cyan-500',
        bgPrimaryHover: 'hover:bg-teal-500',
        bgDanger: 'bg-red-500',
        bgDangerHover: 'hover:bg-red-600',
        bgBackdrop: 'bg-white',
        bgInverted: 'bg-gray-900',
        bgGradientFrom: 'bg-white',
        bgGradientTo: 'bg-fuchsia-100',

        border: 'border-fuchsia-400',
        borderAlt: 'border-purple-300',
        borderHover: 'hover:border-fuchsia-500',
        borderPrimary: 'border-cyan-500',
        borderPrimaryHover: 'hover:border-teal-500',
        borderFocus: 'border-cyan-600',
        borderError: 'border-red-500',
        borderErrorFocus: 'border-red-600',

        ring: 'ring-3 ring-cyan-500',
        ringError: 'ring-3 ring-red-500',
        ringOffset: 'ring-offset-white',
        ringOffsetAlt: 'ring-offset-fuchsia-100',

        placeholder: 'placeholder-fuchsia-400',
    }


};

/**
 * A centralized object for storing Tailwind CSS class string constants
 * used across various UI elements, supporting dark and light themes.
 * This promotes consistency and ease of maintenance by referencing the `colors` object.
 */
export const classConstants = (theme: keyof typeof colors = 'dark') => makeComponentTemplates(theme);
