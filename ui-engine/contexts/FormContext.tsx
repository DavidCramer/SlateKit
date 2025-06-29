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
