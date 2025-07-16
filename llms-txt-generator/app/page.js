'use client';

import React, { useState } from 'react';
import { Search, Download, Globe, FileText, AlertCircle, CheckCircle, Loader2, Copy, ExternalLink } from 'lucide-react';

// Mock data for demonstration
const mockCrawledPages = [
  {
    url: "https://example.com/docs/getting-started",
    title: "Getting Started Guide",
    description: "Complete guide to help new users get started with the platform quickly and effectively."
  },
  {
    url: "https://example.com/docs/api-reference",
    title: "API Reference",
    description: "Comprehensive API documentation with endpoints, authentication, and examples."
  },
  {
    url: "https://example.com/docs/tutorials",
    title: "Tutorials",
    description: "Step-by-step tutorials covering basic to advanced implementation scenarios."
  },
  {
    url: "https://example.com/support/faq",
    title: "Frequently Asked Questions",
    description: "Common questions and answers about the platform and its features."
  },
  {
    url: "https://example.com/community/forums",
    title: "Community Forums",
    description: "Connect with other users, share ideas, and get help from the community."
  }
];

const LLMSTxtGenerator = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [selectedPages, setSelectedPages] = useState(new Set());

  // Simulate API call
  const handleAnalyzeWebsite = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      new URL(url); // Validate URL format
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setIsLoading(true);
    setError('');
    setPages([]);
    setShowPreview(false);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Mock successful response
      const domain = new URL(url).hostname;
      setSiteName(domain.replace('www.', '').replace('.com', '').toUpperCase());
      setSiteDescription(`Official documentation and resources for ${domain}`);
      setPages(mockCrawledPages);
      setSelectedPages(new Set(mockCrawledPages.map((_, index) => index)));
      setShowPreview(true);
    } catch (err) {
      setError('Failed to analyze website. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePageSelection = (index) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedPages(newSelected);
  };

  const generateLLMSTxt = () => {
    const selectedPagesData = pages.filter((_, index) => selectedPages.has(index));
    
    let content = `# ${siteName}\n> ${siteDescription}\n\n`;
    
    // Group pages by type (basic categorization)
    const docs = selectedPagesData.filter(page => 
      page.url.includes('/docs/') || page.title.toLowerCase().includes('doc') || 
      page.title.toLowerCase().includes('guide') || page.title.toLowerCase().includes('api')
    );
    
    const support = selectedPagesData.filter(page => 
      page.url.includes('/support/') || page.url.includes('/help/') || 
      page.title.toLowerCase().includes('faq') || page.title.toLowerCase().includes('support')
    );
    
    const community = selectedPagesData.filter(page => 
      page.url.includes('/community/') || page.url.includes('/forum/') || 
      page.title.toLowerCase().includes('community') || page.title.toLowerCase().includes('forum')
    );
    
    const other = selectedPagesData.filter(page => 
      !docs.includes(page) && !support.includes(page) && !community.includes(page)
    );

    if (docs.length > 0) {
      content += '## Documentation\n';
      docs.forEach(page => {
        content += `- [${page.title}](${page.url}): ${page.description}\n`;
      });
      content += '\n';
    }

    if (support.length > 0) {
      content += '## Support\n';
      support.forEach(page => {
        content += `- [${page.title}](${page.url}): ${page.description}\n`;
      });
      content += '\n';
    }

    if (other.length > 0) {
      content += '## Resources\n';
      other.forEach(page => {
        content += `- [${page.title}](${page.url}): ${page.description}\n`;
      });
      content += '\n';
    }

    if (community.length > 0) {
      content += '## Optional\n';
      community.forEach(page => {
        content += `- [${page.title}](${page.url}): ${page.description}\n`;
      });
    }

    return content;
  };

  const downloadLLMSTxt = () => {
    const content = generateLLMSTxt();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llms.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const content = generateLLMSTxt();
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">LLMs.txt Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Automatically generate an llms.txt file for your website to help Large Language Models 
            better understand and interact with your content.
          </p>
        </div>

        {/* URL Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Analyze Website</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <div className="flex space-x-3">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={handleAnalyzeWebsite}
                  disabled={isLoading}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Website</h3>
              <p className="text-gray-600">
                We're crawling your website to extract page information and metadata...
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showPreview && pages.length > 0 && (
          <div className="space-y-8">
            {/* Site Configuration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Site Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <input
                    type="text"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Page Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Found Pages ({pages.length})
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  {selectedPages.size} selected
                </div>
              </div>
              
              <div className="space-y-3">
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPages.has(index)
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => togglePageSelection(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedPages.has(index)}
                        onChange={() => togglePageSelection(index)}
                        className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {page.title}
                          </h4>
                          <ExternalLink className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{page.url}</p>
                        <p className="text-sm text-gray-600">{page.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview and Download */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">LLMs.txt Preview</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadLLMSTxt}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap text-gray-800">
                  {generateLLMSTxt()}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !showPreview && !error && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Enter your website URL above to start analyzing your site structure and generate 
              an llms.txt file that helps AI models understand your content.
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-2"><strong>What is llms.txt?</strong></p>
              <p>
                A standardized file format that helps Large Language Models efficiently 
                access and understand website content, similar to robots.txt for search engines.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Learn more about the{' '}
            <a
              href="https://llmstxt.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 underline"
            >
              llms.txt specification
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LLMSTxtGenerator;