import React from "react";
import { useForm } from "../contexts/FormContext";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  path: string;
  label?: string;
  description?: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ path, label, description, options }) => {
  const { getValue, setValue } = useForm();
  const value = getValue(path) ?? "";

  return (
    <div className="mb-4">
      {label && <label className="block font-medium mb-1">{label}</label>}
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      <select
        value={value}
        onChange={(e) => setValue(path, e.target.value)}
        className="w-full rounded border p-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
