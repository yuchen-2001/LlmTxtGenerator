'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const typeIcons = {
    success: CheckCircle2,
    error: AlertTriangle,
    info: Info
  };

  const Icon = typeIcons[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-4 duration-300">
      <div className={`flex items-center p-4 border rounded-lg shadow-lg max-w-sm transition-all ${typeStyles[type]}`}>
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;