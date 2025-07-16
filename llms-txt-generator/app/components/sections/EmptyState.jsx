'use client';

import React from 'react';
import { FileText, Sparkles, Globe, Settings, Download, ExternalLink } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center border border-stone-200">
      {/* Main Icon */}
      <div className="relative mb-6">
        <FileText className="h-20 w-20 text-stone-300 mx-auto" />
        <Sparkles className="h-8 w-8 text-teal-400 absolute -top-2 -right-2" />
      </div>
      
      {/* Title and Description */}
      <h3 className="text-2xl font-semibold text-stone-900 mb-3">Ready to Generate</h3>
      <p className="text-stone-600 mb-8 max-w-lg mx-auto leading-relaxed">
        Enter your website URL above to start analyzing your site structure and generate 
        an llms.txt file that helps AI models understand your content better.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <FeatureCard
          icon={Globe}
          title="Analyze"
          description="Crawl and extract website content"
          bgColor="from-teal-50 to-emerald-50"
          borderColor="border-teal-100"
          iconColor="text-teal-600"
        />
        
        <FeatureCard
          icon={Settings}
          title="Customize"
          description="Select and organize your content"
          bgColor="from-orange-50 to-amber-50"
          borderColor="border-orange-100"
          iconColor="text-orange-600"
        />
        
        <FeatureCard
          icon={Download}
          title="Export"
          description="Download your llms.txt file"
          bgColor="from-purple-50 to-violet-50"
          borderColor="border-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Info Section */}
      <div className="mt-8 p-6 bg-stone-50 rounded-lg border border-stone-200">
        <h5 className="font-semibold text-stone-900 mb-2">What is llms.txt?</h5>
        <p className="text-sm text-stone-600 leading-relaxed">
          A standardized file format that helps Large Language Models efficiently 
          access and understand website content, similar to robots.txt for search engines.
        </p>
        <a
          href="https://llmstxt.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
        >
          Learn more about the specification
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, bgColor, borderColor, iconColor }) => {
  return (
    <div className={`p-4 bg-gradient-to-br ${bgColor} rounded-lg border ${borderColor} transition-transform hover:scale-105`}>
      <Icon className={`h-8 w-8 ${iconColor} mx-auto mb-2`} />
      <h4 className="font-semibold text-stone-900 mb-1">{title}</h4>
      <p className="text-sm text-stone-600">{description}</p>
    </div>
  );
};

export default EmptyState;