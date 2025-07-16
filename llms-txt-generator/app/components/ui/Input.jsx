'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Search } from 'lucide-react';

const Input = ({ 
  label, 
  error, 
  success,
  icon: Icon, 
  size = 'md',
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  // Base styles with updated colors
  const baseStyles = 'w-full border-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-250';
  
  const sizeConfig = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2.5 text-base rounded-lg',
    lg: 'px-5 py-3.5 text-lg rounded-xl'
  };

  const getStateStyles = () => {
    if (error) return 'border-red-300 bg-red-50';
    if (success) return 'border-emerald-300 bg-emerald-50';
    return 'border-stone-300 hover:border-stone-400 bg-white';
  };

  const inputClasses = `
    ${baseStyles}
    ${sizeConfig[size]}
    ${getStateStyles()}
    ${Icon ? 'pl-10' : ''}
    text-gray-800
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-6 w-6';
      default: return 'h-5 w-5';
    }
  };

  const getIconPosition = () => {
    switch (size) {
      case 'sm': return 'left-2.5';
      case 'lg': return 'left-4';
      default: return 'left-3';
    }
  };

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-stone-700 mb-3">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className={`${getIconSize()} text-stone-400 absolute ${getIconPosition()} top-1/2 transform -translate-y-1/2`} />
        )}
        
        <input
          className={inputClasses}
          {...props}
        />
        
        {/* Status icon */}
        {(error || success) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {error && <AlertCircle className={`${getIconSize()} text-red-500`} />}
            {success && <CheckCircle className={`${getIconSize()} text-emerald-500`} />}
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
      
      {/* Success message */}
      {success && (
        <p className="mt-2 text-sm text-emerald-600 flex items-center">
          <CheckCircle className="h-4 w-4 mr-1" />
          {success}
        </p>
      )}
    </div>
  );
};

// Input variants for specific use cases
export const SearchInput = (props) => <Input icon={Search} placeholder="Search..." {...props} />;
export const UrlInput = (props) => <Input type="url" placeholder="https://example.com" {...props} />;

export default Input;