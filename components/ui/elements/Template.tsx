import React, {useEffect, useState} from "react";
import {AppProvider, useApp} from "@/contexts/AppContext.tsx";
import SchemaRenderer from "../../../renderer/SchemaRenderer";
import {Panel} from "@/components/panels";

const Template = ({path, name, children, ...rest}) => {
    const {setValue} = useApp();
    const [internalData, setInternalData] = useState({});

    // Commit local state to root context
    useEffect(() => {
        setValue(path, internalData);
    }, [internalData]);

    return (
        <Panel>
            <AppProvider initialData={{}} onChange={setInternalData}>
                <SchemaRenderer schema={children.props.schema || {}} basePath={path}/>
            </AppProvider>
        </Panel>
    );
}

export default Template;
