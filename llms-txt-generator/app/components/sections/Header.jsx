'use client';

import React from 'react';
import { FileText, Sparkles, ArrowRight } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <FileText className="h-16 w-16 text-teal-600 mr-4" />
          <Sparkles className="h-6 w-6 text-orange-500 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div>
          <h1 className="text-5xl font-bold text-stone-900 mb-2">
            LLMs.txt Generator
          </h1>
          <div className="flex items-center justify-center text-sm text-teal-600 font-medium">
            <span>AI-Ready Content Standard</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </div>
        </div>
      </div>
      
      <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
        Transform your website into an AI-friendly format. Generate standardized llms.txt files 
        that help Large Language Models understand and interact with your content effectively.
      </p>
    </div>
  );
};

export default Header;