import type {ColorScheme} from '../constants/constants'; // adjust path if needed
import {colors} from "../constants/constants";

export interface TemplateSet {
    frontPanel: Record<string, string>;
    modal: Record<string, string>;
    button: Record<string, string>;
    formField: Record<string, string>;
    fieldBase: Record<string, string>;
    toggleSwitch: Record<string, string>;
    checkbox: Record<string, string>;
    select: Record<string, string>;
    sidebarLayout: Record<string, string>;
    panel: Record<string, Record<string, string>>
}

export function makeComponentTemplates(theme: keyof typeof colors = 'dark'): TemplateSet {
    const scheme:ColorScheme = colors[theme];
    return {
        frontPanel: {
            container: `min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${scheme.bg.replace('bg-', 'from-')} ${scheme.bgComponent.replace('bg-', 'to-')} ${scheme.text} p-4 transition-all duration-500 ease-in-out`,
            contentBox:`w-full max-w-md p-8 ${scheme.bgAlt} rounded-xl shadow-lg`,
            icon:`w-16 h-16 ${scheme.textPrimary} mb-3`,
            title:`text-3xl font-bold ${scheme.text}`
        },
        modal: {
            header: 'flex items-center justify-between mb-4 sm:mb-6',
            title: `text-xl sm:text-2xl font-bold ${scheme.text} truncate`,
            icon: `w-6 h-6 ${scheme.textPrimary} mr-2 flex-shrink-0`,
            closeButton: `text-slate-400 ${scheme.textHover} !p-0 ml-4 flex-shrink-0`,
            content: `flex-grow mb-6 sm:mb-8 ${scheme.text}`,
            footer: 'flex flex-col sm:flex-row-reverse space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse ',
            container: `${scheme.bgAlt} p-6 sm:p-8 rounded-xl shadow-2xl w-full transform transition-all duration-300 ease-in-out scale-100 flex flex-col`,
            backdrop: `fixed inset-0 z-50 flex items-center justify-center ${scheme.bgBackdrop} bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ease-in-out`
        },
        button: {
            base: `inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${scheme.ringOffset} focus:${scheme.ring} transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`,
            defaultLayout: 'justify-center',
            primary: `border border-transparent ${scheme.textInverted} ${scheme.bgPrimary} ${scheme.bgPrimaryHover}`,
            danger: `border border-transparent ${scheme.textInverted} ${scheme.bgDanger} ${scheme.bgDangerHover}`,
            item: `justify-between ${scheme.bgComponent} ${scheme.bgComponentHover} ${scheme.textEmphasis} font-semibold shadow-none`,
            link: `bg-transparent ${scheme.bgComponentAltHover} ${scheme.text} ${scheme.textHover} shadow-none px-2 py-2 font-normal justify-start`,
            secondary: `border ${scheme.border} ${scheme.bgComponentAltHover} ${scheme.text}`,
            active: `!${scheme.textInverted} !${scheme.bgPrimary} `,
            iconBase: 'w-5 h-5',
            iconMarginLeft: 'mr-2',
            iconMarginRight: 'ml-2',
        },
        formField: {
            base: `w-full px-3 py-2.5 ${scheme.bgComponent} border ${scheme.border} rounded-md ${scheme.textEmphasis} ${scheme.placeholder} focus:outline-none focus:ring-2 focus:${scheme.ring} focus:${scheme.borderFocus} transition-shadow disabled:opacity-70 disabled:cursor-not-allowed`,
            error: `${scheme.borderError} focus:${scheme.ringError} focus:${scheme.borderErrorFocus}`,
        },
        fieldBase: {
            label: `block text-sm font-medium ${scheme.text} mb-1`,
            requiredAsterisk: `${scheme.textDanger} ml-1`,
            errorText: `mt-1.5 text-xs ${scheme.textDanger}`,
            errorPlaceholder: 'mt-1.5 text-xs text-transparent select-none',
        },
        toggleSwitch: {
            base: 'relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
            focus: `ring-2 ${scheme.ring} ring-offset-2 ${scheme.ringOffsetAlt}`,
            checked: `${scheme.bgPrimary}`,
            unchecked: `${scheme.bgMuted}`,
            disabled: 'opacity-50 cursor-not-allowed',
            enabledUncheckedHover: `${scheme.bgMutedHover}`,
            error: `${scheme.borderError}`,
            thumbBase: `pointer-events-none inline-block h-5 w-5 transform rounded-full ${scheme.bgInverted} shadow ring-0 transition duration-200 ease-in-out`,
            thumbChecked: 'translate-x-5',
            thumbUnchecked: 'translate-x-0',
            labelBase: `text-sm font-medium ${scheme.text} select-none`,
            labelDisabled: 'cursor-not-allowed opacity-70',
            labelEnabled: 'cursor-pointer',
            labelSpacingLeft: 'mr-3',
            labelSpacingRight: 'ml-3',
            errorPaddingLeftLabel: 'pl-10 sm:pl-12',
        },
        checkbox: {
            visualBase: 'h-5 w-5 flex-shrink-0 inline-flex items-center justify-center border rounded mr-2 transition-all duration-150 ease-in-out',
            focus: `ring-2 ${scheme.ring} ring-offset-2 ${scheme.ringOffsetAlt}`,
            checked: `${scheme.bgPrimary} ${scheme.borderPrimary}`,
            unchecked: `${scheme.bgComponent} ${scheme.border}`,
            hoverChecked: `${scheme.bgPrimaryHover} ${scheme.borderPrimaryHover}`,
            hoverUnchecked: `${scheme.borderHover}`,
            disabled: 'opacity-60 cursor-not-allowed',
            errorUnchecked: `${scheme.borderError}`,
            labelBase: `text-sm font-medium ${scheme.text} select-none`,
            labelDisabled: 'cursor-not-allowed opacity-70',
            labelEnabled: 'cursor-pointer',
            checkIcon: `w-4 h-4 ${scheme.textInverted}`,
            errorPaddingLeft: 'pl-7',
        },
        select: {
            buttonBase: `w-full flex items-center justify-between px-3 py-2.5 ${scheme.bgComponent} border ${scheme.border} rounded-md ${scheme.textEmphasis} ${scheme.placeholder} focus:outline-none focus:ring-2 focus:${scheme.ring} focus:${scheme.borderFocus} transition-shadow disabled:opacity-70 disabled:cursor-not-allowed text-left`,
            buttonError: `${scheme.borderError} focus:${scheme.ringError} focus:${scheme.borderErrorFocus}`,
            dropdownUl: `absolute z-10 w-full mt-1 ${scheme.bgComponent} border ${scheme.border} rounded-md shadow-lg max-h-60 overflow-y-auto focus:outline-none`,
            optionBase: 'px-3 py-2 text-sm flex items-center justify-between cursor-pointer',
            optionDisabled: `${scheme.textMutedAlt} cursor-not-allowed`,
            optionEnabled: `${scheme.textAlt} ${scheme.bgComponentHover}`,
            optionFocusedEnabled: `${scheme.bgComponentHover.replace('hover:', '')}`,
            noOptionsLi: `px-3 py-2 ${scheme.textMuted} text-sm`,
            expandIcon: `w-5 h-5 ${scheme.textMuted} transform transition-transform duration-200`,
            expandIconOpenState: 'rotate-180',
            placeholderText: `${scheme.textMuted}`,
            optionLeadingIcon: `w-5 h-5 mr-2 ${scheme.textMuted} flex-shrink-0`,
            optionSelectedCheckIcon: `w-5 h-5 ${scheme.textPrimary} flex-shrink-0`,
        },
        sidebarLayout: {
            container: 'flex',
            sidebar: `flex-shrink-0 ${scheme.bgAlt} ${scheme.textEmphasis}`,
            main: `flex-grow ${scheme.bg} ${scheme.textEmphasis} overflow-y-auto`,
        },
        panel: {
            default: {
                container: '',
                header: `flex items-center border-b ${scheme.borderAlt} pb-1 mb-2`,
                title: `text-lg font-medium ${scheme.textAlt}`,
                icon: `w-5 h-5 mr-1.5 ${scheme.textPrimary}`,
                content: 'space-y-4',
                footer: ''
            },
            aside: {
                container: `min-w-64  ${scheme.bgAlt} p-5`,
                header: `flex items-center border-b ${scheme.borderAlt} pb-1 mb-2`,
                title: `text-2xl font-bold ${scheme.textEmphasis} truncate`,
                icon: `w-8 h-8 ${scheme.textPrimaryEmphasis} mr-2`,
                content: 'flex flex-col justify-between space-y-4',
                footer: ''
            },
            card: {
                container: `${scheme.bgAlt} p-6 rounded-xl shadow-xl`,
                header: `flex items-center border-b ${scheme.borderAlt} pb-3 mb-6`,
                title: `text-2xl font-semibold ${scheme.textEmphasis}`,
                icon: `w-6 h-6 mr-2 ${scheme.textPrimary}`,
                content: '',
                footer: ''
            },
            main: {
                container: `flex-grow p-8 overflow-y-auto ${scheme.bg}`,
                header: 'mb-8',
                title: `text-4xl font-extrabold ${scheme.textEmphasis} tracking-tight`,
                icon: `w-6 h-6 mr-2 ${scheme.textPrimaryEmphasis}`,
                content: '',
                footer: ''
            }
        }
    }
}
