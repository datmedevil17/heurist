import React from "react";

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b pb-2 mb-2 text-lg font-semibold">{children}</div>
);

export const CardTitle = ({ children }) => <h2 className="text-gray-900">{children}</h2>;

export const CardContent = ({ children }) => <div className="text-gray-700">{children}</div>;
