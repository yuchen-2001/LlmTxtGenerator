'use client';

import React from 'react';
import { FileText, Copy, Download } from 'lucide-react';
import Button from '../ui/Button';

const Preview = ({ content, onCopy, onDownload }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-indigo-600 mr-3" />
          <h3 className="text-2xl font-semibold text-gray-900">LLMs.txt Preview</h3>
        </div>
        
        <ActionButtons onCopy={onCopy} onDownload={onDownload} />
      </div>
      
      {/* Preview Content */}
      <PreviewContent content={content} />
    </div>
  );
};

const ActionButtons = ({ onCopy, onDownload }) => (
  <div className="flex space-x-3">
    <Button
      onClick={onCopy}
      variant="secondary"
      size="md"
      icon={Copy}
    >
      Copy
    </Button>
    <Button
      onClick={onDownload}
      variant="primary"
      size="md"
      icon={Download}
    >
      Download
    </Button>
  </div>
);

const PreviewContent = ({ content }) => (
  <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm overflow-x-auto border border-gray-200">
    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
      {content}
    </pre>
  </div>
);

export default Preview;