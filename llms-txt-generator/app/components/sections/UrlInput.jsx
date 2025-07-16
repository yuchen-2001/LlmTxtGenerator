'use client';

import React from 'react';
import { Globe, Search, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const UrlInput = ({ 
  url, 
  onUrlChange, 
  onAnalyze, 
  isLoading, 
  error, 
  urlError 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAnalyze();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-7 mb-8 border border-stone-200">
      <div className="flex items-center mb-6">
        <Globe className="h-6 w-6 text-teal-600 mr-3" />
        <h2 className="text-2xl font-semibold text-stone-900">Analyze Website</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Website URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="https://your-website.com"
              disabled={isLoading}
              className="text-lg py-4"
              containerClassName="flex-1"
            />
            
            <div className="flex items-center">
              <Button
                onClick={onAnalyze}
                disabled={isLoading}
                loading={isLoading}
                variant="primary"
                size="lg"
                icon={Search}
              >
                {isLoading ? 'Analyzing' : 'Analyze'}
              </Button>
            </div>
          </div>
          
          {/* URL error message outside the flex container */}
          {urlError && (
            <div className="mt-3 flex items-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{urlError}</span>
            </div>
          )}
        </div>

        {/* General error message */}
        {error && (
          <div className="flex items-center p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlInput;