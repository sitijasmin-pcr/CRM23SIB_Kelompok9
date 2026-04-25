// src/components/ui/button.jsx
import React from 'react';

export function Button({ children, className = '', onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
