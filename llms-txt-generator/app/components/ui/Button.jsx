'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { components } from '../design-system';

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
  const sizeConfig = components.button.sizes[size];
  const variantConfig = components.button.variants[variant];
  
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = `${sizeConfig.padding} ${sizeConfig.fontSize} ${sizeConfig.gap} ${sizeConfig.minWidth || ''}`;
  
  const variantStyles = `${variantConfig.base} ${variantConfig.hover} ${variantConfig.focus}`;
  
  const fullWidthStyle = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidthStyle} ${className}`;

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-3 w-3';
      case 'lg': return 'h-5 w-5';
      default: return 'h-4 w-4';
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

// Button variants for specific use cases
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const OutlineButton = (props) => <Button variant="outline" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;

export default Button;