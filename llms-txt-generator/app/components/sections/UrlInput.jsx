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
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <Globe className="h-6 w-6 text-indigo-600 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">Analyze Website</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            label="Website URL"
            type="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://your-website.com"
            error={urlError}
            disabled={isLoading}
            className="text-lg py-4"
            containerClassName="flex-1"
          />
          
          <div className="flex items-end">
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