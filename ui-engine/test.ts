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
    <FormContext.Provider value={{ schema, setValue, getValue }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);

// SchemaRenderer.jsx
import React from "react";
import { useForm } from "./FormContext";
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
  return Object.entries(schema).map(([key, config]) => {
    const path = basePath ? `${basePath}.${key}` : key;
    const Component = typeToComponent[config.type];

    if (!Component) return null;

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

// ./components/Panel.jsx
import React from "react";

export default function Panel({ title, description, children }) {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm mb-4 text-gray-600">{description}</p>
      {children}
    </div>
  );
}

// ./components/Select.jsx
import React from "react";
import { useForm } from "../FormContext";

export default function Select({ path, label, description, options }) {
  const { getValue, setValue } = useForm();
  const value = getValue(path);

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <p className="text-xs text-gray-500 mb-1">{description}</p>
      <select
        value={value}
        onChange={(e) => setValue(path, e.target.value)}
        className="border px-2 py-1 rounded"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}

// ./components/Radio.jsx
import React from "react";
import { useForm } from "../FormContext";

export default function Radio({ path, label, description, options }) {
  const { getValue, setValue } = useForm();
  const value = getValue(path);

  return (
    <div className="mb-4">
      <p className="font-medium mb-1">{label}</p>
      <p className="text-xs text-gray-500 mb-1">{description}</p>
      {options.map(({ value: val, label: lbl }) => (
        <label key={val} className="block">
          <input
            type="radio"
            name={path}
            value={val}
            checked={value === val}
            onChange={() => setValue(path, val)}
            className="mr-2"
          />
          {lbl}
        </label>
      ))}
    </div>
  );
}

// ./components/Toggle.jsx
import React from "react";
import { useForm } from "../FormContext";

export default function Toggle({ path, label, description }) {
  const { getValue, setValue } = useForm();
  const value = getValue(path);

  return (
    <div className="mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(path, e.target.checked)}
          className="mr-2"
        />
        <div>
          <span className="font-medium">{label}</span>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </label>
    </div>
  );
}

// schema.json
{
  "appearance": {
    "title": "Appearance Settings",
    "description": "Set the appearance for the app",
    "type": "Panel",
    "children": {
      "theme": {
        "label": "Theme",
        "description": "Set the theme for the app",
        "type": "Select",
        "default": "dark",
        "options": [
          { "value": "dark", "label": "Dark (default)" },
          { "value": "light", "label": "Light" }
        ]
      },
      "fontSize": {
        "label": "Font Size",
        "description": "Set the general font size",
        "type": "Radio",
        "default": "md",
        "options": [
          { "value": "sm", "label": "Small" },
          { "value": "md", "label": "Medium" },
          { "value": "lg", "label": "Large" },
          { "value": "xl", "label": "Extra Large" }
        ]
      }
    }
  },
  "notifications": {
    "title": "Notifications Settings",
    "description": "Configure notifications for the app",
    "type": "Panel",
    "children": {
      "email": {
        "label": "Email",
        "description": "Enable or disable email notifications",
        "type": "Toggle",
        "default": true
      },
      "sms": {
        "label": "SMS",
        "description": "Enable or disable SMS notifications",
        "type": "Toggle",
        "default": false
      }
    }
  }
}
