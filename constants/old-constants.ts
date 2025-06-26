// constants/constants.ts

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

/**
 * Holds the reusable colors based on theme.
 * These are Tailwind CSS class strings, organized by theme, to promote
 * consistency and ease of maintenance.
 */
export const colors = {
    dark: {
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
    light: {
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

/**
 * A centralized object for storing Tailwind CSS class string constants
 * used across various UI elements, supporting dark and light themes.
 * This promotes consistency and ease of maintenance by referencing the `colors` object.
 */
export const classConstants = {
    dark: {
        modal: {
            header: '',
            title: '',
            icon: '',
            container: `${colors.dark.bgAlt} p-6 sm:p-8 rounded-xl shadow-2xl w-full transform transition-all duration-300 ease-in-out scale-100 flex flex-col`,
            backdrop: `fixed inset-0 z-50 flex items-center justify-center ${colors.dark.bgBackdrop} bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ease-in-out`
        },
        button: {
            base: `inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${colors.dark.ringOffset} focus:${colors.dark.ring} transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`,
            defaultLayout: 'justify-center',
            primary: `border border-transparent ${colors.dark.textInverted} ${colors.dark.bgPrimary} ${colors.dark.bgPrimaryHover}`,
            danger: `border border-transparent ${colors.dark.textInverted} ${colors.dark.bgDanger} ${colors.dark.bgDangerHover}`,
            item: `justify-between ${colors.dark.bgComponent} ${colors.dark.bgComponentHover} ${colors.dark.textEmphasis} font-semibold`,
            link: `bg-transparent ${colors.dark.bgComponentAltHover} ${colors.dark.text} ${colors.dark.textHover} shadow-none px-2 py-2 font-normal justify-start`,
            secondary: `border ${colors.dark.border} ${colors.dark.bgComponentAltHover} ${colors.dark.text}`,
            iconBase: 'w-5 h-5',
            iconMarginLeft: 'mr-2',
            iconMarginRight: 'ml-2',
        },
        formField: {
            base: `w-full px-3 py-2.5 ${colors.dark.bgComponent} border ${colors.dark.border} rounded-md ${colors.dark.textEmphasis} ${colors.dark.placeholder} focus:outline-none focus:ring-2 focus:${colors.dark.ring} focus:${colors.dark.borderFocus} transition-shadow disabled:opacity-70 disabled:cursor-not-allowed`,
            error: `${colors.dark.borderError} focus:${colors.dark.ringError} focus:${colors.dark.borderErrorFocus}`,
        },
        fieldBase: {
            label: `block text-sm font-medium ${colors.dark.text} mb-1`,
            requiredAsterisk: `${colors.dark.textDanger} ml-1`,
            errorText: `mt-1.5 text-xs ${colors.dark.textDanger}`,
            errorPlaceholder: 'mt-1.5 text-xs text-transparent select-none',
        },
        toggleSwitch: {
            base: 'relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
            focus: `ring-2 ${colors.dark.ring} ring-offset-2 ${colors.dark.ringOffsetAlt}`,
            checked: `${colors.dark.bgPrimary}`,
            unchecked: `${colors.dark.bgMuted}`,
            disabled: 'opacity-50 cursor-not-allowed',
            enabledUncheckedHover: `${colors.dark.bgMutedHover}`,
            error: `${colors.dark.borderError}`,
            thumbBase: `pointer-events-none inline-block h-5 w-5 transform rounded-full ${colors.dark.bgInverted} shadow ring-0 transition duration-200 ease-in-out`,
            thumbChecked: 'translate-x-5',
            thumbUnchecked: 'translate-x-0',
            labelBase: `text-sm font-medium ${colors.dark.text} select-none`,
            labelDisabled: 'cursor-not-allowed opacity-70',
            labelEnabled: 'cursor-pointer',
            labelSpacingLeft: 'mr-3',
            labelSpacingRight: 'ml-3',
            errorPaddingLeftLabel: 'pl-10 sm:pl-12',
        },
        checkbox: {
            visualBase: 'h-5 w-5 flex-shrink-0 inline-flex items-center justify-center border rounded mr-2 transition-all duration-150 ease-in-out',
            focus: `ring-2 ${colors.dark.ring} ring-offset-2 ${colors.dark.ringOffsetAlt}`,
            checked: `${colors.dark.bgPrimary} ${colors.dark.borderPrimary}`,
            unchecked: `${colors.dark.bgComponent} ${colors.dark.border}`,
            hoverChecked: `${colors.dark.bgPrimaryHover} ${colors.dark.borderPrimaryHover}`,
            hoverUnchecked: `${colors.dark.borderHover}`,
            disabled: 'opacity-60 cursor-not-allowed',
            errorUnchecked: `${colors.dark.borderError}`,
            labelBase: `text-sm font-medium ${colors.dark.text} select-none`,
            labelDisabled: 'cursor-not-allowed opacity-70',
            labelEnabled: 'cursor-pointer',
            checkIcon: `w-4 h-4 ${colors.dark.textInverted}`,
            errorPaddingLeft: 'pl-7',
        },
        select: {
            buttonBase: `w-full flex items-center justify-between px-3 py-2.5 ${colors.dark.bgComponent} border ${colors.dark.border} rounded-md ${colors.dark.textEmphasis} ${colors.dark.placeholder} focus:outline-none focus:ring-2 focus:${colors.dark.ring} focus:${colors.dark.borderFocus} transition-shadow disabled:opacity-70 disabled:cursor-not-allowed text-left`,
            buttonError: `${colors.dark.borderError} focus:${colors.dark.ringError} focus:${colors.dark.borderErrorFocus}`,
            dropdownUl: `absolute z-10 w-full mt-1 ${colors.dark.bgComponent} border ${colors.dark.border} rounded-md shadow-lg max-h-60 overflow-y-auto focus:outline-none`,
            optionBase: 'px-3 py-2 text-sm flex items-center justify-between cursor-pointer',
            optionDisabled: `${colors.dark.textMutedAlt} cursor-not-allowed`,
            optionEnabled: `${colors.dark.textAlt} ${colors.dark.bgComponentHover}`,
            optionFocusedEnabled: `${colors.dark.bgComponentHover.replace('hover:', '')}`,
            noOptionsLi: `px-3 py-2 ${colors.dark.textMuted} text-sm`,
            expandIcon: `w-5 h-5 ${colors.dark.textMuted} transform transition-transform duration-200`,
            expandIconOpenState: 'rotate-180',
            placeholderText: `${colors.dark.textMuted}`,
            optionLeadingIcon: `w-5 h-5 mr-2 ${colors.dark.textMuted} flex-shrink-0`,
            optionSelectedCheckIcon: `w-5 h-5 ${colors.dark.textPrimary} flex-shrink-0`,
        },
        sidebarLayout: {
            container: 'flex',
            sidebar: `flex-shrink-0 ${colors.dark.bgAlt} ${colors.dark.textEmphasis}`,
            main: `flex-grow ${colors.dark.bg} ${colors.dark.textEmphasis} overflow-y-auto`,
        },
        panel: {
            default: {
                container: '',
                header: `flex items-center border-b ${colors.dark.borderAlt} pb-1 mb-2`,
                title: `text-lg font-medium ${colors.dark.textAlt}`,
                icon: `w-5 h-5 mr-1.5 ${colors.dark.textPrimary}`,
                content: 'space-y-4',
                footer: ''
            },
            aside: {
                container: `w-64 ${colors.dark.bgAlt} p-5`,
                header: `flex items-center border-b ${colors.dark.borderAlt} pb-1 mb-2`,
                title: `text-2xl font-bold ${colors.dark.textEmphasis} truncate`,
                icon: `w-8 h-8 ${colors.dark.textPrimaryEmphasis} mr-2`,
                content: 'flex flex-col justify-between space-y-4',
                footer: ''
            },
            card: {
                container: `${colors.dark.bgAlt} p-6 rounded-xl shadow-xl`,
                header: `flex items-center border-b ${colors.dark.borderAlt} pb-3 mb-6`,
                title: `text-2xl font-semibold ${colors.dark.textEmphasis}`,
                icon: `w-6 h-6 mr-2 ${colors.dark.textPrimary}`,
                content: '',
                footer: ''
            },
            main: {
                container: `flex-grow p-8 overflow-y-auto ${colors.dark.bg}`,
                header: 'mb-8',
                title: `text-4xl font-extrabold ${colors.dark.textEmphasis} tracking-tight`,
                icon: `w-6 h-6 mr-2 ${colors.dark.textPrimaryEmphasis}`,
                content: '',
                footer: ''
            }
        }
    },
    light: {
        modal: {
            header: '',
            title: '',
            icon: '',
            container: `${colors.light.bgAlt} p-6 sm:p-8 rounded-xl shadow-2xl w-full transform transition-all duration-300 ease-in-out scale-100 flex flex-col`,
            backdrop: `fixed inset-0 z-50 flex items-center justify-center ${colors.light.bgBackdrop} bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ease-in-out`
        },
        button: {
            base: `inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${colors.light.ringOffset} focus:${colors.light.ring} transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`,
            defaultLayout: 'justify-center',
            primary: `border border-transparent ${colors.light.textInverted} ${colors.light.bgPrimary} ${colors.light.bgPrimaryHover}`,
            danger: `border border-transparent ${colors.light.textInverted} ${colors.light.bgDanger} ${colors.light.bgDangerHover}`,
            item: `justify-between ${colors.light.bgComponent} ${colors.light.bgComponentHover} ${colors.light.textEmphasis} font-semibold`,
            link: `bg-transparent ${colors.light.bgComponentAltHover} ${colors.light.text} ${colors.light.textHover} shadow-none px-2 py-2 font-normal justify-start`,
            secondary: `border ${colors.light.border} ${colors.light.bgComponentAltHover} ${colors.light.text}`,
            iconBase: 'w-5 h-5',
            iconMarginLeft: 'mr-2',
            iconMarginRight: 'ml-2',
        },
        formField: {
            base: `w-full px-3 py-2.5 ${colors.light.bgComponent} border ${colors.light.border} rounded-md ${colors.light.textEmphasis} ${colors.light.placeholder} focus:outline-none focus:ring-2 focus:${colors.light.ring} focus:${colors.light.borderFocus} transition-shadow disabled:opacity-70 disabled:cursor-not-allowed`,
            error: `${colors.light.borderError} focus:${colors.light.ringError} focus:${colors.light.borderErrorFocus}`,
        },
        fieldBase: {
            label: `block text-sm font-medium ${colors.light.text} mb-1`,
            requiredAsterisk: `${colors.light.textDanger} ml-1`,
            errorText: `mt-1.5 text-xs ${colors.light.textDanger}`,
            errorPlaceholder: 'mt-1.5 text-xs text-transparent select-none',
        },
        toggleSwitch: {
            base: 'relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
            focus: `ring-2 ${colors.light.ring} ring-offset-2 ${colors.light.ringOffsetAlt}`,
            checked: `${colors.light.bgPrimary}`,
            unchecked: `${colors.light.bgMuted}`,
            disabled: 'opacity-50 cursor-not-allowed',
            enabledUncheckedHover: `${colors.light.bgMutedHover}`,
            error: `${colors.light.borderError}`,
            thumbBase: `pointer-events-none inline-block h-5 w-5 transform rounded-full ${colors.light.bgInverted} shadow ring-0 transition duration-200 ease-in-out`,
            thumbChecked: 'translate-x-5',
            thumbUnchecked: 'translate-x-0',
            labelBase: `text-sm font-medium ${colors.light.text} select-none`,
            labelDisabled: 'cursor-not-allowed opacity-70',
            labelEnabled: 'cursor-pointer',
            labelSpacingLeft: 'mr-3',
            labelSpacingRight: 'ml-3',
            errorPaddingLeftLabel: 'pl-10 sm:pl-12',
        },
        checkbox: {
            visualBase: 'h-5 w-5 flex-shrink-0 inline-flex items-center justify-center border rounded mr-2 transition-all duration-150 ease-in-out',
            focus: `ring-2 ${colors.light.ring} ring-offset-2 ${colors.light.ringOffsetAlt}`,
            checked: `${colors.light.bgPrimary} ${colors.light.borderPrimary}`,
            unchecked: `${colors.light.bgComponent} ${colors.light.border}`,
            hoverChecked: `${colors.light.bgPrimaryHover} ${colors.light.borderPrimaryHover}`,
            hoverUnchecked: `${colors.light.borderHover}`,
            disabled: 'opacity-60 cursor-not-allowed',
            errorUnchecked: `${colors.light.borderError}`,
            labelBase: `text-sm font-medium ${colors.light.text} select-none`,
            labelDisabled: 'cursor-not-allowed opacity-70',
            labelEnabled: 'cursor-pointer',
            checkIcon: `w-4 h-4 ${colors.light.textInverted}`,
            errorPaddingLeft: 'pl-7',
        },
        select: {
            buttonBase: `w-full flex items-center justify-between px-3 py-2.5 ${colors.light.bgComponent} border ${colors.light.border} rounded-md ${colors.light.textEmphasis} ${colors.light.placeholder} focus:outline-none focus:ring-2 focus:${colors.light.ring} focus:${colors.light.borderFocus} transition-shadow disabled:opacity-70 disabled:cursor-not-allowed text-left`,
            buttonError: `${colors.light.borderError} focus:${colors.light.ringError} focus:${colors.light.borderErrorFocus}`,
            dropdownUl: `absolute z-10 w-full mt-1 ${colors.light.bgComponent} border ${colors.light.border} rounded-md shadow-lg max-h-60 overflow-y-auto focus:outline-none`,
            optionBase: 'px-3 py-2 text-sm flex items-center justify-between cursor-pointer',
            optionDisabled: `${colors.light.textMutedAlt} cursor-not-allowed`,
            optionEnabled: `${colors.light.textAlt} ${colors.light.bgComponentHover}`,
            optionFocusedEnabled: `${colors.light.bgComponentHover.replace('hover:', '')}`,
            noOptionsLi: `px-3 py-2 ${colors.light.textMuted} text-sm`,
            expandIcon: `w-5 h-5 ${colors.light.textMuted} transform transition-transform duration-200`,
            expandIconOpenState: 'rotate-180',
            placeholderText: `${colors.light.textMuted}`,
            optionLeadingIcon: `w-5 h-5 mr-2 ${colors.light.textMuted} flex-shrink-0`,
            optionSelectedCheckIcon: `w-5 h-5 ${colors.light.textPrimary} flex-shrink-0`,
        },
        sidebarLayout: {
            container: 'flex',
            sidebar: `flex-shrink-0 ${colors.light.bgAlt} ${colors.light.textEmphasis}`,
            main: `flex-grow ${colors.light.bg} ${colors.light.textEmphasis} overflow-y-auto`,
        },
        panel: {
            default: {
                container: '',
                header: `flex items-center border-b ${colors.light.borderAlt} pb-1 mb-2`,
                title: `text-lg font-medium ${colors.light.textAlt}`,
                icon: `w-5 h-5 mr-1.5 ${colors.light.textPrimary}`,
                content: 'space-y-4',
                footer: ''
            },
            aside: {
                container: `w-64 ${colors.light.bgAlt} p-5`,
                header: `flex items-center border-b ${colors.light.borderAlt} pb-1 mb-2`,
                title: `text-2xl font-bold ${colors.light.textEmphasis} truncate`,
                icon: `w-8 h-8 ${colors.light.textPrimaryEmphasis} mr-2`,
                content: 'flex flex-col justify-between space-y-4',
                footer: ''
            },
            card: {
                container: `${colors.light.bgAlt} p-6 rounded-xl shadow-xl`,
                header: `flex items-center border-b ${colors.light.borderAlt} pb-3 mb-6`,
                title: `text-2xl font-semibold ${colors.light.textEmphasis}`,
                icon: `w-6 h-6 mr-2 ${colors.light.textPrimary}`,
                content: '',
                footer: ''
            },
            main: {
                container: `flex-grow p-8 overflow-y-auto ${colors.light.bg}`,
                header: 'mb-8',
                title: `text-4xl font-extrabold ${colors.light.textEmphasis} tracking-tight`,
                icon: `w-6 h-6 mr-2 ${colors.light.textPrimaryEmphasis}`,
                content: '',
                footer: ''
            }
        }
    }
};
