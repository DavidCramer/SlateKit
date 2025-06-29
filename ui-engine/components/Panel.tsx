import React from "react";

interface PanelProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, description, children }) => {
  return (
    <div className="mb-6 rounded-xl border p-4 bg-white shadow-sm">
      {title && <h2 className="text-lg font-semibold mb-1">{title}</h2>}
      {description && <p className="text-sm text-gray-500 mb-3">{description}</p>}
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default Panel;
