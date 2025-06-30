import React, {useReducer, createContext, useContext} from "react";
import _ from "lodash";

const SchemaContext = createContext(undefined);

function toSchemaChildrenPath(path) {
    if (!path) return '';
    const parts = path.split('.');
    return parts
        .map((p, i) => (i === 0 ? p : 'children.' + p))
        .join('.');
}

function setSchemaPath(obj, path, value) {
    const schemaPath = toSchemaChildrenPath(path);
    const next = _.cloneDeep(obj);
    if (value === null) {
        _.unset(next, schemaPath);
    } else {
        _.set(next, schemaPath, value);
    }
    return next;
}


function schemaReducer(state, action) {
    switch (action.type) {
        case "SET_PATH": {
            return setSchemaPath(state, action.path, action.value);
        }
        default:
            return state;
    }
}


export const SchemaProvider = ({initialSchema, children}) => {
    const [schema, dispatch] = useReducer(schemaReducer, initialSchema);

    // Write-only
    const setPath = (path, value) => {
        dispatch({type: "SET_PATH", path, value});
    };

    // Read-only
    function getSchema(path) {
        if (!path) return schema;
        const keys = path.split('.');
        const key = keys[keys.length - 1];
        const block = _.get(schema, toSchemaChildrenPath(path));
        return block ? {[key]: block} : {};
    }


    const value = {
        setPath,
        getSchema,
    }

    // Only expose setPath and getSchema
    return (
        <SchemaContext.Provider value={value}>
            {children}
        </SchemaContext.Provider>
    );
}

export function useSchema() {
    const ctx = useContext(SchemaContext);
    if (!ctx) throw new Error("useSchema must be used within a SchemaProvider");
    return ctx;
}
