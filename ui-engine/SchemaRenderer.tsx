import React from "react";
import { useForm } from "./contexts/FormContext";
import { checkConditions } from "./utils/logicUtils";
import Panel from "./components/Panel";
import Select from "./components/Select";
import Radio from "./components/Radio";
import Toggle from "./components/Toggle";
import Text from "./components/Text";
import Template from "./components/Template";
import Triggered from "./components/Triggered";

const typeToComponent = {
  Panel,
  Select,
  Radio,
  Toggle,
  Text,
  Triggered,
  ComponentTemplate: Template
};

const SchemaRenderer = ({ schema, basePath = "" }) => {
  const { formState } = useForm();

  return Object.entries(schema).map(([key, config]) => {
    const path = basePath ? `${basePath}.${key}` : key;
    const Component = typeToComponent[config.type];

    if (!Component) return null;
    if (config.conditions && !checkConditions(config.conditions, formState)) return null;

    const children = config.children ? (
      <SchemaRenderer schema={config.children} basePath={path} />
    ) : null;

    return (
      <Component key={path} {...config} path={path}>
        {children}
      </Component>
    );
  });
};

export default SchemaRenderer;
