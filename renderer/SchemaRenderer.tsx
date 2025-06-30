// SchemaRenderer.jsx
import {useApp} from "../contexts/AppContext.tsx";
import {checkConditions} from "../utils/logicUtils";
import {Panel} from "../components/panels";
import * as typeToComponent from "../components/ui";
import {useEventBus, validateEventName} from "../contexts/EventContext";

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

        const emitAction = (action, payload) => {
            if (emits && emits[action]) {
                const event = emits[action];
                validateEventName(event);
                emit(`${path}.${event}`, payload);
            }
        };

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
            const newPath = path.split(".");
            const childKey = newPath.pop();
            children = config.children.map((child, i) => (
                <SchemaRenderer key={i} schema={{[childKey]: child}} basePath={newPath.join('.')}/>
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
                value={value}
            >
                {children}
            </Component>
        );
    });
};

export default SchemaRenderer;
