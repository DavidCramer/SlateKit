import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "../contexts/FormContext";
import SchemaRenderer from "../SchemaRenderer";

export default function Template({ path, name, children, ...rest }) {
  const { setValue } = useForm();
  const [internalData, setInternalData] = useState({});

  // Commit local state to root context
  useEffect(() => {
    setValue(path, internalData);
  }, [internalData]);

  return (
    <div className="border p-4 rounded bg-gray-50">
      <FormProvider initialData={{}} onChange={setInternalData}>
        <SchemaRenderer schema={rest.children || {}} basePath="" />
      </FormProvider>
    </div>
  );
}
