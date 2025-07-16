'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { components } from '../design-system';

// TODO: Maybe split this into separate button types later?
// For now keeping everything in one component since it's easier to maintain

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  className = '',
  fullWidth = false,
  ...props 
}) => {
  // Get design tokens from design system
  if (!components.button) {
    console.error('Button design tokens not found in design system');
    return null;
  }

  const sizeConfig = components.button.sizes[size];
  const variantConfig = components.button.variants[variant];
  
  // Base styles - could probably optimize this - works fine for now
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = sizeConfig ? `${sizeConfig.padding} ${sizeConfig.fontSize} ${sizeConfig.borderRadius} ${sizeConfig.gap}` : 'px-4 py-2 text-base rounded-lg gap-2';
  const variantStyles = variantConfig ? `${variantConfig.base} ${variantConfig.hover} ${variantConfig.focus}` : 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500';
  const fullWidthStyle = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidthStyle} ${className}`;

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-3 w-3';
      case 'lg': return 'h-5 w-5';
      default: return 'h-4 w-4'; // most common case
    }
  };
  const getIconPosition = () => {
    switch (size) {
      case 'sm': return 'left-2';
      case 'lg': return 'left-3';
      default: return 'left-2.5'; // most common case
    }
  };
  const LoadingContent = () => (
    <>
      <Loader2 className={`${getIconSize()} animate-spin`} />
      <span>Loading...</span>
    </>
  );

  const DefaultContent = () => (
    <>
      {Icon && <Icon className={getIconSize()} />}
      {children}
    </>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {loading ? <LoadingContent /> : <DefaultContent />}
    </button>
  );
};

export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const OutlineButton = (props) => <Button variant="outline" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;


export default Button;