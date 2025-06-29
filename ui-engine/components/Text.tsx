import React from "react";
import { FormProvider, useForm } from "../contexts/FormContext";

export default function Text({ path, label, description }) {
  const { getValue, setValue } = useForm();
  const value = getValue(path) || "";

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <p className="text-xs text-gray-500 mb-1">{description}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(path, e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />
    </div>
  );
}
