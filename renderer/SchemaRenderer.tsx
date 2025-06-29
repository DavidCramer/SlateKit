// SchemaRenderer.jsx
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
    const {emit} = useEventBus();

    return Object.entries(schema).map(([key, config]) => {
        if (!config) return null;
        const path = basePath ? `${basePath}.${key}` : key;
        const Component = typeToComponent[config.type];
        if (!Component) return null;

        if (config.conditions && !checkConditions(config.conditions, appState)) return null;

        const {emits, bind} = config;

        const finalPath = bind || path;
        const value = getValue(finalPath);

        const emitAction = useCallback(
            (action, payload) => {
                if (emits && emits[action]) {
                    const event = emits[action];
                    validateEventName(event);
                    emit(`${path}.${event}`, payload);
                }
            },
            [emits, path]
        );

        const events = {
            onChange: (val) => {
                setValue(finalPath, val);
                emitAction("onChange", val);
            }
        };

        if (emits) {
            Object.keys(emits).forEach((action) => {
                if (action !== "onChange" && !events[action]) {
                    events[action] = () => emitAction(action, value);
                }
            });
        }

        let children = null;
        if (Array.isArray(config.children)) {
            children = config.children.map((child, i) => (
                <SchemaRenderer key={i} schema={{child}} basePath={basePath}/>
            ));
        } else if (typeof config.children === "object" && config.children !== null) {
            children = <SchemaRenderer schema={config.children} basePath={path}/>;
        }

        return (
            <Component
                key={path}
                {...(config.props || {})}
                {...events}
                path={finalPath}
                emits={emits}
            >
                {children}
            </Component>
        );
    });
};

export default SchemaRenderer;
