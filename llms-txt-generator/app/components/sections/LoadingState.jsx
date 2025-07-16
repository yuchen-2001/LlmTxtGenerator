'use client';

import React from 'react';
import { Globe, Database, Search, Sparkles, CheckCircle, Loader2 } from 'lucide-react';

const LoadingState = ({ stage }) => {
  const stages = [
    { label: "Connecting to website", icon: Globe },
    { label: "Analyzing page structure", icon: Database },
    { label: "Extracting metadata", icon: Search },
    { label: "Generating preview", icon: Sparkles }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
      <div className="text-center">
        {/* Main Loading Animation */}
        <div className="relative mb-6">
          <Loader2 className="h-16 w-16 animate-spin text-indigo-600 mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-white rounded-full"></div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Analyzing Website
        </h3>
        <p className="text-gray-600 mb-6">
          We're crawling your website to extract page information and metadata...
        </p>

        {/* Progress Stages */}
        <div className="space-y-3 max-w-md mx-auto">
          {stages.map((stageItem, index) => {
            const Icon = stageItem.icon;
            const isActive = index === stage;
            const isCompleted = index < stage;
            
            return (
              <StageItem
                key={index}
                icon={Icon}
                label={stageItem.label}
                isActive={isActive}
                isCompleted={isCompleted}
              />
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const StageItem = ({ icon: Icon, label, isActive, isCompleted }) => {
  const getStageStyles = () => {
    if (isActive) {
      return 'bg-indigo-50 border-2 border-indigo-200';
    }
    if (isCompleted) {
      return 'bg-green-50 border-2 border-green-200';
    }
    return 'bg-gray-50 border-2 border-gray-200';
  };

  const getTextStyles = () => {
    if (isActive) return 'text-indigo-900';
    if (isCompleted) return 'text-green-900';
    return 'text-gray-500';
  };

  const getIconStyles = () => {
    if (isActive) return 'text-indigo-600';
    if (isCompleted) return 'text-green-600';
    return 'text-gray-400';
  };

  return (
    <div className={`flex items-center p-3 rounded-lg transition-all duration-300 ${getStageStyles()}`}>
      {isCompleted ? (
        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
      ) : (
        <Icon className={`h-5 w-5 mr-3 ${getIconStyles()}`} />
      )}
      
      <span className={`text-sm font-medium ${getTextStyles()}`}>
        {label}
      </span>
      
      {isActive && <Loader2 className="h-4 w-4 animate-spin text-indigo-600 ml-auto" />}
      {isCompleted && <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />}
    </div>
  );
};

export default LoadingState;