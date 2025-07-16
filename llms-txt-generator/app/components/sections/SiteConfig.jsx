'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import Input from '../ui/Input';

const SiteConfig = ({ siteName, siteDescription, onSiteNameChange, onSiteDescriptionChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <Settings className="h-6 w-6 text-indigo-600 mr-3" />
        <h3 className="text-2xl font-semibold text-gray-900">Site Information</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Site Name"
          type="text"
          value={siteName}
          onChange={(e) => onSiteNameChange(e.target.value)}
          placeholder="Your Site Name"
        />
        
        <Input
          label="Site Description"
          type="text"
          value={siteDescription}
          onChange={(e) => onSiteDescriptionChange(e.target.value)}
          placeholder="Brief description of your site"
        />
      </div>
    </div>
  );
};

export default SiteConfig;