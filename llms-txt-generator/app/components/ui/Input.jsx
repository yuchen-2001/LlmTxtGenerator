'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  const inputClasses = `
    w-full px-4 py-3 border-2 rounded-xl 
    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
    transition-all duration-200 text-base
    ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
    ${Icon ? 'pl-10' : ''}
    ${className}
  `;

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        )}
        
        <input
          className={inputClasses}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;