import type {ColorScheme} from '../constants/constants'; // adjust path if needed
import {colors, sizes} from "../constants/constants";

export interface TemplateSet {
    frontPanel: Record<string, string>;
    workspace: Record<string, string>;
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
    const scheme: ColorScheme = colors[theme];
    return {
        frontPanel: {
            container: `min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${scheme.bgGradientFrom} ${scheme.bgGradientTo} ${scheme.text} ${sizes.frontPanel.padding} transition-all duration-500 ease-in-out`,
            contentBox: `w-full ${sizes.frontPanel.maxWidth} ${sizes.frontPanel.contentPadding} ${scheme.bgAlt} ${sizes.frontPanel.borderRadius} ${sizes.frontPanel.shadow}`,
            icon: `${sizes.frontPanel.iconSize} ${scheme.textPrimary} ${sizes.frontPanel.iconMargin}`,
            title: `${sizes.frontPanel.titleFontSize} font-bold ${scheme.text}`
        },
        workspace: {
            container: `${scheme.bg}`
        },
        modal: {
            header: `flex items-center justify-between ${sizes.modal.headerMargin}`,
            title: `${sizes.modal.titleFontSize} font-bold ${scheme.text} truncate`,
            icon: `${sizes.modal.iconSize} ${scheme.textPrimary} ${sizes.modal.iconMargin} flex-shrink-0`,
            closeButton: `text-slate-400 ${scheme.textHover} ${sizes.modal.closeButtonPadding} ml-4 flex-shrink-0`,
            content: `flex-grow ${sizes.modal.contentMargin} ${scheme.text}`,
            footer: `flex flex-col sm:flex-row-reverse ${sizes.modal.footerSpacing}`,
            container: `${scheme.bgAlt} ${sizes.modal.padding} ${sizes.modal.borderRadius} ${sizes.modal.shadow} w-full transform transition-all duration-300 ease-in-out scale-100 flex flex-col`,
            backdrop: `fixed inset-0 z-50 flex items-center justify-center ${scheme.bgBackdrop} bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ease-in-out`
        },
        button: {
            base: `inline-flex items-center ${sizes.button.padding} ${sizes.button.fontSize} font-semibold ${sizes.button.borderRadius} focus:outline-hidden focus:${scheme.ring} focus:${sizes.button.focusRing} focus:${sizes.button.focusRing} focus:${sizes.button.focusRingOffset} transition-all duration-150 ease-in-out disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed`,
            defaultLayout: 'justify-center',
            primary: `border border-transparent ${scheme.textInverted} ${scheme.bgPrimary} ${scheme.bgPrimaryHover}`,
            danger: `border border-transparent ${scheme.textInverted} ${scheme.bgDanger} ${scheme.bgDangerHover}`,
            item: `justify-between ${scheme.bgComponentHover} ${scheme.textEmphasis} font-semibold shadow-none`,
            link: `${scheme.bgComponentAltHover} ${scheme.text} ${scheme.textHover} shadow-none ${sizes.button.linkPadding} font-normal justify-start`,
            secondary: `border ${scheme.border} ${scheme.bgComponentAltHover} ${scheme.text}`,
            active: `${scheme.textInverted} ${scheme.bgPrimary} `,
            iconBase: `${sizes.button.iconSize}`,
            iconMarginLeft: `${sizes.button.iconMargin}`,
            iconMarginRight: 'ml-2',
        },
        formField: {
            base: `w-full ${sizes.formField.padding} ${scheme.bgComponent} border ${scheme.border} ${sizes.formField.borderRadius} ${scheme.textEmphasis} ${scheme.placeholder} focus:outline-hidden focus:${sizes.formField.focusRing} focus:${scheme.borderFocus} transition-shadow disabled:opacity-70 disabled:cursor-not-allowed`,
            error: `${scheme.borderError} focus:${scheme.ringError} focus:${scheme.borderErrorFocus}`,
        },
        fieldBase: {
            label: `block ${sizes.formField.labelFontSize} font-medium ${scheme.text} mb-1`,
            requiredAsterisk: `${scheme.textDanger} ml-1`,
            errorText: `${sizes.formField.errorMarginTop} ${sizes.formField.errorFontSize} ${scheme.textDanger}`,
            errorPlaceholder: `${sizes.formField.errorMarginTop} ${sizes.formField.errorFontSize} text-transparent select-none`,
        },
        toggleSwitch: {
            base: `relative inline-flex items-center ${sizes.toggleSwitch.dimensions} flex-shrink-0 cursor-pointer rounded-full ${sizes.toggleSwitch.borderWidth} border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden`,
            focus: `${sizes.toggleSwitch.focusRing} ${scheme.ring} ${sizes.toggleSwitch.focusRingOffset} ${scheme.ringOffsetAlt}`,
            checked: `${scheme.bgPrimary}`,
            unchecked: `${scheme.bgMuted}`,
            disabled: 'opacity-50 cursor-not-allowed',
            enabledUncheckedHover: `${scheme.bgMutedHover}`,
            error: `${scheme.borderError}`,
            thumbBase: `pointer-events-none inline-block ${sizes.toggleSwitch.thumbSize} transform rounded-full ${scheme.bgInverted} shadow ring-0 transition duration-200 ease-in-out`,
            thumbChecked: `${sizes.toggleSwitch.thumbTranslate}`,
            thumbUnchecked: 'translate-x-0',
            labelBase: `${sizes.toggleSwitch.labelFontSize} font-medium ${scheme.text} select-none`,
            labelDisabled: 'cursor-not-allowed opacity-70',
            labelEnabled: 'cursor-pointer',
            labelSpacingLeft: `${sizes.toggleSwitch.labelSpacing}`,
            labelSpacingRight: 'ml-3',
            errorPaddingLeftLabel: `${sizes.toggleSwitch.errorPadding}`,
        },
        checkbox: {
            visualBase: `${sizes.checkbox.size} flex-shrink-0 inline-flex items-center justify-center border ${sizes.checkbox.borderRadius} ${sizes.checkbox.marginRight} transition-all duration-150 ease-in-out`,
            focus: `${sizes.checkbox.focusRing} ${scheme.ring} ${sizes.checkbox.focusRingOffset} ${scheme.ringOffsetAlt}`,
            checked: `${scheme.bgPrimary} ${scheme.borderPrimary}`,
            unchecked: `${scheme.bgComponent} ${scheme.border}`,
            hoverChecked: `${scheme.bgPrimaryHover} ${scheme.borderPrimaryHover}`,
            hoverUnchecked: `${scheme.borderHover}`,
            disabled: 'opacity-60 cursor-not-allowed',
            errorUnchecked: `${scheme.borderError}`,
            labelBase: `${sizes.checkbox.labelFontSize} font-medium ${scheme.text} select-none`,
            labelDisabled: 'cursor-not-allowed opacity-70',
            labelEnabled: 'cursor-pointer',
            checkIcon: `${sizes.checkbox.iconSize} ${scheme.textInverted}`,
            errorPaddingLeft: `${sizes.checkbox.errorPadding}`,
        },
        select: {
            buttonBase: `w-full flex items-center justify-between ${sizes.select.padding} ${scheme.bgComponent} border ${scheme.border} ${sizes.select.borderRadius} ${scheme.textEmphasis} ${scheme.placeholder} focus:outline-hidden focus:${sizes.select.focusRing} focus:${scheme.borderFocus} transition-shadow disabled:opacity-70 disabled:cursor-not-allowed text-left`,
            buttonError: `${scheme.borderError} focus:${scheme.ringError} focus:${scheme.borderErrorFocus}`,
            dropdownUl: `absolute z-10 w-full ${sizes.select.dropdownMarginTop} ${scheme.bgComponent} border ${scheme.border} ${sizes.select.borderRadius} shadow-sm ${sizes.select.dropdownMaxHeight} overflow-y-auto focus:outline-hidden`,
            optionBase: `${sizes.select.optionPadding} ${sizes.select.optionFontSize} flex items-center justify-between cursor-pointer`,
            optionDisabled: `${scheme.textMutedAlt} cursor-not-allowed`,
            optionEnabled: `${scheme.textAlt} ${scheme.bgComponentHover}`,
            optionFocusedEnabled: `${scheme.bgComponentHover.replace('hover:', '')}`,
            noOptionsLi: `${sizes.select.optionPadding} ${scheme.textMuted} ${sizes.select.optionFontSize}`,
            expandIcon: `${sizes.select.iconSize} ${scheme.textMuted} transform transition-transform duration-200`,
            expandIconOpenState: 'rotate-180',
            placeholderText: `${scheme.textMuted}`,
            optionLeadingIcon: `${sizes.select.optionIconSize} ${sizes.select.optionIconMargin} ${scheme.textMuted} flex-shrink-0`,
            optionSelectedCheckIcon: `${sizes.select.optionIconSize} ${scheme.textPrimary} flex-shrink-0`,
        },
        sidebarLayout: {
            containerVertical: `h-full flex ${scheme.bg}`,
            containerHorizontal: `w-full h-full flex-col ${scheme.bg} ${sizes.sidebarLayout.mainPadding}`,
            sidebar: `flex-shrink-0 ${scheme.bgAlt} ${scheme.textEmphasis}`,
            main: `flex-grow ${scheme.bg} ${scheme.textEmphasis} overflow-y-auto`,
        },
        panel: {
            default: {
                container: '',
                header: `flex items-center border-b ${scheme.borderAlt} ${sizes.panel.default.headerPadding} ${sizes.panel.default.headerMargin}`,
                title: `${sizes.panel.default.titleFontSize} font-medium ${scheme.textAlt}`,
                icon: `${sizes.panel.default.iconSize} ${sizes.panel.default.iconMargin} ${scheme.textPrimary}`,
                content: `${sizes.panel.default.contentSpacing} ${scheme.text}`,
                footer: ''
            },
            aside: {
                container: `${sizes.panel.aside.width} ${scheme.bgAlt} ${sizes.panel.aside.padding}`,
                header: `flex items-center border-b ${scheme.borderAlt} ${sizes.panel.aside.headerPadding} ${sizes.panel.aside.headerMargin}`,
                title: `${sizes.panel.aside.titleFontSize} font-bold ${scheme.textEmphasis} truncate`,
                icon: `${sizes.panel.aside.iconSize} ${scheme.textPrimaryEmphasis} ${sizes.panel.aside.iconMargin}`,
                content: `flex flex-col justify-between ${sizes.panel.aside.contentSpacing} ${scheme.text}`,
                footer: ''
            },
            card: {
                container: `${scheme.bgAlt} ${sizes.panel.card.padding} ${sizes.panel.card.margin} ${sizes.panel.card.borderRadius} ${sizes.panel.card.shadow}`,
                header: `flex items-center border-b ${scheme.borderAlt} ${sizes.panel.card.headerPadding} ${sizes.panel.card.headerMargin}`,
                title: `${sizes.panel.card.titleFontSize} font-semibold ${scheme.textEmphasis}`,
                icon: `${sizes.panel.card.iconSize} ${sizes.panel.card.iconMargin} ${scheme.textPrimary}`,
                content: ` ${scheme.text}`,
                footer: ''
            },
            main: {
                container: `flex-grow ${sizes.panel.main.padding} overflow-y-auto ${scheme.bg}`,
                header: `${sizes.panel.main.headerMargin}`,
                title: `${sizes.panel.main.titleFontSize} font-extrabold ${scheme.textEmphasis} tracking-tight`,
                icon: `${sizes.panel.main.iconSize} ${sizes.panel.main.iconMargin} ${scheme.textPrimaryEmphasis}`,
                content: ` ${scheme.text}`,
                footer: ''
            }
        }
    }
}
