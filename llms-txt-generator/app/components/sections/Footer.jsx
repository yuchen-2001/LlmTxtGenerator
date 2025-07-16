'use client';

import React from 'react';
import { FileText, Sparkles, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <div className="mt-16 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Learn More</h4>
        <p className="text-gray-600 mb-4">
          Discover how llms.txt can improve AI interactions with your website
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <FooterLink
            href="https://llmstxt.org/"
            icon={FileText}
            label="Official Specification"
            bgColor="bg-indigo-50"
            textColor="text-indigo-700"
            hoverColor="hover:bg-indigo-100"
          />
          
          <FooterLink
            href="https://llmstxthub.com/guides/getting-started-llms-txt"
            icon={Sparkles}
            label="Getting Started Guide"
            bgColor="bg-green-50"
            textColor="text-green-700"
            hoverColor="hover:bg-green-100"
          />
        </div>
      </div>
    </div>
  );
};

const FooterLink = ({ href, icon: Icon, label, bgColor, textColor, hoverColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center px-4 py-2 ${bgColor} ${textColor} rounded-lg ${hoverColor} transition-colors font-medium`}
  >
    <Icon className="h-4 w-4 mr-2" />
    {label}
    <ExternalLink className="h-3 w-3 ml-1" />
  </a>
);

export default Footer;