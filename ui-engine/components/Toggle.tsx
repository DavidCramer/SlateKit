import React from "react";
import { useForm } from "../contexts/FormContext";
import { useEventBus } from "../contexts/EventContext";

export default function Toggle({ path, label, description, emits = {} }) {
  const { getValue, setValue } = useForm();
  const { emit } = useEventBus();
  const value = getValue(path) ?? false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(path, e.target.checked);
    if (emits.onClick) {
        //console.log( `${path}.${emits.onClick}` );
        emit(`${path}.${emits.onClick}`, e.target.checked);
    }
  };

  return (
    <div className="flex items-start gap-3 mb-4">
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="mt-1 h-4 w-4"
      />
      <div>
        <label className="block font-medium">{label}</label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
}
