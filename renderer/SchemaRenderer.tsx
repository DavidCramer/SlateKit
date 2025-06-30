// SchemaRenderer.jsx
import {checkConditions} from "@/utils/logicUtils";
import * as typeToComponent from "@/components/ui";
import {useApp, useEventBus, validateEventName} from "@/contexts";
import {UISchema, UISchemaItem} from "@/json/UISchema";

type SchemaRendererProps = {
    schema: UISchema | UISchemaItem;
    basePath?: string;
}

type EventEmitters = {
    [emitterAction: string]: (value: any) => void;
}

const SchemaRenderer = (props: SchemaRendererProps) => {

    const {schema, basePath = 'root'} = props;
    const {appState, getValue, setValue} = useApp();
    const {emit} = useEventBus();

    const workingSchema = schema.type ? {[basePath]: schema} : schema;
    return Object.entries(workingSchema).map(([key, config]) => {
        if (!config) return null;
        const path = basePath ? `${basePath}.${key}` : key;
        const Component = typeToComponent[config.type as keyof typeof typeToComponent];
        if (!Component) return null;

        if (config.conditions && !checkConditions(config.conditions, appState)) return null;

        const {emits, bind} = config;

        const finalPath = bind || path;
        const value = getValue(finalPath);

        const emitAction = (action: string, payload: any) => {
            if (emits && emits[action]) {
                const event = emits[action];
                validateEventName(event);
                emit(`${path}.${event}`, payload);
            }
        };

        const events: EventEmitters = {
            onChange: (val: any) => {
                setValue(finalPath, val);
                emitAction("onChange", val);
            }
        };

        if (emits) {
            Object.keys(emits).forEach((action: string) => {
                if (action !== "onChange" && !events[action]) {
                    events[action] = () => emitAction(action, value);
                }
            });
        }

        let children = null;
        if (Array.isArray(config.children)) {
            const newPath: string[] = path.split(".");
            const childKey: string = newPath[ newPath.length - 1 ];
            children = config.children.map((child: UISchemaItem, i: number) => (
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
