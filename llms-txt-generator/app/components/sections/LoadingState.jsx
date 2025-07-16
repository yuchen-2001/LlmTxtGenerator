'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Database, Search, Sparkles, CheckCircle, Loader2, Clock, Wifi } from 'lucide-react';

const LoadingState = ({ stage }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [tips, setTips] = useState(0);

  // Loading tips to show users
  const loadingTips = [
    "We're analyzing your website structure and extracting metadata...",
    "This process helps AI models understand your content better.",
    "The generated llms.txt file will be optimized for LLM consumption.",
    "You can customize the results after analysis completes."
  ];

  const stages = [
    { 
      label: "Connecting to website", 
      icon: Wifi,
      description: "Establishing connection and checking accessibility"
    },
    { 
      label: "Analyzing page structure", 
      icon: Database,
      description: "Discovering pages and navigation patterns"
    },
    { 
      label: "Extracting metadata", 
      icon: Search,
      description: "Gathering titles, descriptions, and content information"
    },
    { 
      label: "Generating preview", 
      icon: Sparkles,
      description: "Creating your customized llms.txt structure"
    }
  ];

  // Timer for elapsed time (resets when component mounts)
  useEffect(() => {
    setElapsedTime(0); // Reset timer when loading starts
    
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Only run once when component mounts

  // Rotate tips every 2.5 seconds to fit within 3-second window
  useEffect(() => {
    setTips(0); // Reset tips when loading starts
    
    const tipTimer = setInterval(() => {
      setTips(prev => (prev + 1) % loadingTips.length);
    }, 2500); // Slightly faster rotation to fit 3 seconds

    return () => clearInterval(tipTimer);
  }, []);

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage based on stage (0-3) and elapsed time
  const getProgressPercentage = () => {
    // Each stage represents 25% progress
    const stageProgress = (stage / 4) * 100;
    
    // Add a small time-based progress within current stage (max 6.25% per stage)
    const timeProgress = Math.min((elapsedTime * 2), 25); // Caps at 25% from time
    
    return Math.min(stageProgress + (timeProgress / 4), 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-7 mb-8 border border-stone-200">
      <div className="text-center">
        {/* Main Loading Animation */}
        <div className="relative mb-6">
          <Loader2 className="h-16 w-16 animate-spin text-teal-600 mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Title and Timer */}
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-stone-900">
            Analyzing Website
          </h3>
          <div className="flex items-center justify-center mt-2 text-sm text-stone-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Dynamic Tips */}
        <div className="mb-6 h-12 flex items-center justify-center">
          <p className="text-stone-600 text-sm max-w-md transition-opacity duration-500">
            {loadingTips[tips]}
          </p>
        </div>

        {/* Progress Stages */}
        <div className="space-y-3 max-w-md mx-auto mb-6">
          {stages.map((stageItem, index) => {
            const Icon = stageItem.icon;
            const isActive = index === stage;
            const isCompleted = index < stage;
            
            return (
              <StageItem
                key={index}
                icon={Icon}
                label={stageItem.label}
                description={stageItem.description}
                isActive={isActive}
                isCompleted={isCompleted}
              />
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-teal-600 to-orange-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-sm text-stone-500">
          {Math.round(getProgressPercentage())}% Complete
        </div>

        {/* Expected completion time */}
        <div className="mt-4 text-xs text-stone-400">
          Analysis typically completes in 3 seconds
        </div>
      </div>
    </div>
  );
};

const StageItem = ({ icon: Icon, label, description, isActive, isCompleted }) => {
  const getStageStyles = () => {
    if (isActive) {
      return 'bg-teal-50 border-2 border-teal-200 shadow-sm';
    }
    if (isCompleted) {
      return 'bg-emerald-50 border-2 border-emerald-200 shadow-sm';
    }
    return 'bg-stone-50 border-2 border-stone-200';
  };

  const getTextStyles = () => {
    if (isActive) return 'text-teal-900';
    if (isCompleted) return 'text-emerald-900';
    return 'text-stone-500';
  };

  const getIconStyles = () => {
    if (isActive) return 'text-teal-600';
    if (isCompleted) return 'text-emerald-600';
    return 'text-stone-400';
  };

  return (
    <div className={`flex items-start p-3 rounded-lg transition-all duration-300 ${getStageStyles()}`}>
      <div className="flex-shrink-0 mr-3 mt-0.5">
        {isCompleted ? (
          <CheckCircle className="h-5 w-5 text-emerald-600" />
        ) : (
          <Icon className={`h-5 w-5 ${getIconStyles()}`} />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${getTextStyles()}`}>
            {label}
          </span>
          {isActive && <Loader2 className="h-4 w-4 animate-spin text-teal-600 ml-2" />}
          {isCompleted && <CheckCircle className="h-4 w-4 text-emerald-600 ml-2" />}
        </div>
        
        {/* Show description for active stage */}
        {isActive && (
          <p className="text-xs text-teal-700 mt-1 animate-pulse">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingState;