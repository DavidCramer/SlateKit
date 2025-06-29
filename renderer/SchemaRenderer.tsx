import React, {useCallback} from "react";
import {useApp} from "../contexts/AppContext.tsx";
import {checkConditions} from "../utils/logicUtils";
import {Panel} from "../components/panels";
import Select from "../components/elements/Select";
import Button from "../components/elements/Button";
import ToggleSwitch from "../components/elements/ToggleSwitch";
import Input from "../components/elements/Input";
import Textarea from "../components/elements/Textarea";
import Checkbox from "../components/elements/Checkbox";
import {Template} from "../components/elements/Template";
import {useEventBus, validateEventName} from "../contexts/EventContext";

const typeToComponent = {
    Panel,
    Select,
    ToggleSwitch,
    Input,
    Button,
    Textarea,
    Checkbox,
    Template
};

const SchemaRenderer = ({schema, basePath = ""}) => {
    const {appState, getValue, setValue} = useApp();

    return Object.entries(schema).map(([key, config]) => {
        const path = basePath ? `${basePath}.${key}` : key;
        const Component = typeToComponent[config.type];

        if (!Component || !config) return null;
        if (config.conditions && !checkConditions(config.conditions, appState)) return null;

        const {triggeredBy, emits} = config;

        const children = config.children ? (
            <SchemaRenderer schema={config.children} basePath={path}/>
        ) : null;

        const {emit} = useEventBus();
        const value = getValue(path) ?? false;

        const emitAction = useCallback((action) => {
            if (!emits) return;

            if (emits[action]) {
                const event = emits[action];
                validateEventName(event);
                emit(`${path}.${event}`, value);
            }
        }, [emits])

        // Default action.
        const onChange = (value) => {
            setValue(path, value);
            emitAction(value);
        };

        // Setup the events.
        const events = {
            onChange
        }

        // Add emits to events.
        if (emits) {
            Object.keys(emits).forEach((action) => {
                if (!events[action]) {
                    events[action] = () => emitAction(action);
                }
            });
        }

        return (
            <Component
                key={path}
                {...(config.props || {})}
                {...events}
                path={path}
                emits={config.emits}
            >
                {children}
            </Component>
        );
    });
};

export default SchemaRenderer;
