import React from "react";

export const Card = ({ children, className }) => (
  <div
    className={`backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-xl transition-all rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b border-white/20 pb-3 mb-3 text-xl font-semibold text-blue-400">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-white text-lg font-bold">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="text-gray-300 text-sm">{children}</div>
);
