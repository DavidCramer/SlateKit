// App.jsx
import React from "react";
import { FormProvider } from "./FormContext";
import SchemaRenderer from "./SchemaRenderer";
import schema from "./schema.json";

export default function App() {
  const handleChange = (data) => {
    console.log("Form data:", data);
  };

  return (
    <FormProvider schema={schema} initialData={{}} onChange={handleChange}>
      <div className="p-4">
        <SchemaRenderer schema={schema} />
      </div>
    </FormProvider>
  );
}

// FormContext.js
import React, { createContext, useContext, useReducer } from "react";
import _ from "lodash";

const FormContext = createContext();

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE": {
      const updated = _.cloneDeep(state);
      _.set(updated, action.path, action.value);
      return updated;
    }
    default:
      return state;
  }
};

export const FormProvider = ({ schema, initialData, onChange, children }) => {
  const [state, dispatch] = useReducer(formReducer, initialData);

  const setValue = (path, value) => {
    dispatch({ type: "SET_VALUE", path, value });
    onChange && onChange(_.set(_.cloneDeep(state), path, value));
  };

  const getValue = (...paths) => {
    if (paths.length === 0) return state;
    if (paths.length === 1) return _.get(state, paths[0]);
    return paths.map((p) => _.get(state, p));
  };

  return (
    <FormContext.Provider value={{ schema, setValue, getValue, formState: state }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);

// logicUtils.js
import _ from "lodash";

export const matchCondition = (value, condition) => {
  if (condition.equals !== undefined) return value === condition.equals;
  if (condition.not !== undefined) return value !== condition.not;
  if (condition.contains !== undefined) return value?.includes(condition.contains);
  if (condition.notEmpty) return !!value?.trim?.();
  if (condition.validation?.regex) {
    const re = new RegExp(condition.validation.regex);
    return re.test(value);
  }
  return false;
};

export const evaluateConditionNode = (node, formState) => {
  if (node.and) return node.and.every(n => evaluateConditionNode(n, formState));
  if (node.or) return node.or.some(n => evaluateConditionNode(n, formState));
  if (node.not) return !evaluateConditionNode(node.not, formState);

  const value = _.get(formState, node.path);
  return matchCondition(value, node);
};

export const checkConditions = (conditions = {}, formState) => {
  if (conditions.showIf && !evaluateConditionNode(conditions.showIf, formState)) return false;
  if (conditions.hideIf && evaluateConditionNode(conditions.hideIf, formState)) return false;
  return true;
};

// SchemaRenderer.jsx
import React from "react";
import { useForm } from "./FormContext";
import { checkConditions } from "./logicUtils";
import Panel from "./components/Panel";
import Select from "./components/Select";
import Radio from "./components/Radio";
import Toggle from "./components/Toggle";

const typeToComponent = {
  Panel,
  Select,
  Radio,
  Toggle
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
