import React from "react";
import { FormProvider } from "./contexts/FormContext";
import { EventProvider } from "./contexts/EventContext";
import SchemaRenderer from "./SchemaRenderer";
import schema from "./schema.json";

export default function App() {
  const handleChange = (data) => {
    console.log("Form data:", data);
  };

  return (
    <FormProvider schema={schema} initialData={{}} onChange={handleChange}>
      <EventProvider>
        <div className="p-4">
          <SchemaRenderer schema={schema} />
        </div>
      </EventProvider>
    </FormProvider>
  );
}
