import React from "react";
import { useForm } from "../contexts/FormContext";

interface Option {
  value: string;
  label: string;
}

interface RadioProps {
  path: string;
  label?: string;
  description?: string;
  options: Option[];
}

const Radio: React.FC<RadioProps> = ({ path, label, description, options }) => {
  const { getValue, setValue } = useForm();
  const value = getValue(path) ?? "";

  return (
    <div className="mb-4">
      {label && <p className="font-medium mb-1">{label}</p>}
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      <div className="space-y-1">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={path}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => setValue(path, opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;
