'use client';

import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { components } from '../design-system';

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
  // Get design tokens from design system
  const sizeConfig = components.input.sizes[size];
  const baseStyles = components.input.base;
  
  const getStateStyles = () => {
    if (error) return components.input.states.error;
    if (success) return components.input.states.success;
    return components.input.states.default;
  };

  const inputClasses = `
    ${baseStyles}
    ${sizeConfig}
    ${getStateStyles()}
    ${Icon ? 'pl-10' : ''}
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
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className={`${getIconSize()} text-gray-400 absolute ${getIconPosition()} top-1/2 transform -translate-y-1/2`} />
        )}
        
        <input
          className={inputClasses}
          {...props}
        />
        
        {/* Status icon */}
        {(error || success) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {error && <AlertCircle className={`${getIconSize()} text-red-500`} />}
            {success && <CheckCircle className={`${getIconSize()} text-green-500`} />}
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
        <p className="mt-2 text-sm text-green-600 flex items-center">
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