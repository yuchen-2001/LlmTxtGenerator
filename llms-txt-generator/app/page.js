'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Download, Globe, FileText, AlertCircle, CheckCircle, Loader2, 
  Copy, ExternalLink, Sparkles, Database, Settings, ArrowRight,
  CheckCircle2, AlertTriangle, Info, X
} from 'lucide-react';

// Enhanced mock data with more realistic examples
const mockCrawledPages = [
  {
    url: "https://example.com/docs/getting-started",
    title: "Getting Started Guide",
    description: "Complete guide to help new users get started with the platform quickly and effectively.",
    category: "documentation",
    lastModified: "2024-01-15"
  },
  {
    url: "https://example.com/docs/api-reference",
    title: "API Reference",
    description: "Comprehensive API documentation with endpoints, authentication, and examples.",
    category: "documentation",
    lastModified: "2024-01-10"
  },
  {
    url: "https://example.com/docs/tutorials",
    title: "Step-by-Step Tutorials",
    description: "Detailed tutorials covering basic to advanced implementation scenarios.",
    category: "documentation",
    lastModified: "2024-01-12"
  },
  {
    url: "https://example.com/support/faq",
    title: "Frequently Asked Questions",
    description: "Common questions and answers about the platform and its features.",
    category: "support",
    lastModified: "2024-01-08"
  },
  {
    url: "https://example.com/community/forums",
    title: "Community Forums",
    description: "Connect with other users, share ideas, and get help from the community.",
    category: "community",
    lastModified: "2024-01-05"
  },
  {
    url: "https://example.com/blog/updates",
    title: "Product Updates Blog",
    description: "Latest news, feature releases, and company announcements.",
    category: "blog",
    lastModified: "2024-01-14"
  }
];

// Toast notification component
const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const typeIcons = {
    success: CheckCircle2,
    error: AlertTriangle,
    info: Info
  };

  const Icon = typeIcons[type];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center p-4 border rounded-lg shadow-lg max-w-sm ${typeStyles[type]}`}>
        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 hover:opacity-70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Enhanced loading component
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
        <div className="relative mb-6">
          <Loader2 className="h-16 w-16 animate-spin text-indigo-600 mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-white rounded-full"></div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Website</h3>
        <p className="text-gray-600 mb-6">
          We're crawling your website to extract page information and metadata...
        </p>

        {/* Progress stages */}
        <div className="space-y-3 max-w-md mx-auto">
          {stages.map((stageItem, index) => {
            const Icon = stageItem.icon;
            const isActive = index === stage;
            const isCompleted = index < stage;
            
            return (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-indigo-50 border-2 border-indigo-200' 
                    : isCompleted 
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                ) : (
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                )}
                <span className={`text-sm font-medium ${
                  isActive ? 'text-indigo-900' : isCompleted ? 'text-green-900' : 'text-gray-500'
                }`}>
                  {stageItem.label}
                </span>
                {isActive && <Loader2 className="h-4 w-4 animate-spin text-indigo-600 ml-auto" />}
                {isCompleted && <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Enhanced empty state
const EmptyState = () => (
  <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
    <div className="relative mb-6">
      <FileText className="h-20 w-20 text-gray-300 mx-auto" />
      <Sparkles className="h-8 w-8 text-indigo-400 absolute -top-2 -right-2" />
    </div>
    
    <h3 className="text-2xl font-semibold text-gray-900 mb-3">Ready to Generate</h3>
    <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
      Enter your website URL above to start analyzing your site structure and generate 
      an llms.txt file that helps AI models understand your content better.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
        <h4 className="font-semibold text-gray-900 mb-1">Analyze</h4>
        <p className="text-sm text-gray-600">Crawl and extract website content</p>
      </div>
      
      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
        <Settings className="h-8 w-8 text-green-600 mx-auto mb-2" />
        <h4 className="font-semibold text-gray-900 mb-1">Customize</h4>
        <p className="text-sm text-gray-600">Select and organize your content</p>
      </div>
      
      <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-100">
        <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
        <h4 className="font-semibold text-gray-900 mb-1">Export</h4>
        <p className="text-sm text-gray-600">Download your llms.txt file</p>
      </div>
    </div>

    <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h5 className="font-semibold text-gray-900 mb-2">What is llms.txt?</h5>
      <p className="text-sm text-gray-600 leading-relaxed">
        A standardized file format that helps Large Language Models efficiently 
        access and understand website content, similar to robots.txt for search engines.
      </p>
      <a
        href="https://llmstxt.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
      >
        Learn more about the specification
        <ExternalLink className="h-3 w-3 ml-1" />
      </a>
    </div>
  </div>
);

const LLMSTxtGenerator = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [selectedPages, setSelectedPages] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ message: '', type: '', isVisible: false });
  const [urlError, setUrlError] = useState('');

  // Enhanced URL validation
  const validateUrl = (urlString) => {
    if (!urlString.trim()) {
      setUrlError('Please enter a URL');
      return false;
    }

    try {
      const url = new URL(urlString);
      if (!['http:', 'https:'].includes(url.protocol)) {
        setUrlError('URL must start with http:// or https://');
        return false;
      }
      setUrlError('');
      return true;
    } catch {
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
      return false;
    }
  };

  // Enhanced simulate API call with stages
  const handleAnalyzeWebsite = async () => {
    if (!validateUrl(url)) return;

    setIsLoading(true);
    setError('');
    setPages([]);
    setShowPreview(false);
    setLoadingStage(0);

    try {
      // Simulate different stages with delays
      const stages = [
        { delay: 800, action: () => setLoadingStage(1) },
        { delay: 1200, action: () => setLoadingStage(2) },
        { delay: 1000, action: () => setLoadingStage(3) },
        { delay: 800, action: () => {} }
      ];

      for (let i = 0; i < stages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, stages[i].delay));
        stages[i].action();
      }

      // Mock successful response
      const domain = new URL(url).hostname;
      const cleanDomain = domain.replace('www.', '').replace('.com', '');
      setSiteName(cleanDomain.charAt(0).toUpperCase() + cleanDomain.slice(1));
      setSiteDescription(`Official documentation and resources for ${domain}`);
      setPages(mockCrawledPages);
      setSelectedPages(new Set(mockCrawledPages.map((_, index) => index)));
      setShowPreview(true);
      
      showToast('Website analyzed successfully!', 'success');
    } catch (err) {
      setError('Failed to analyze website. Please try again.');
      showToast('Analysis failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
      setLoadingStage(0);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
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

  const selectAllPages = () => {
    setSelectedPages(new Set(filteredPages.map((_, index) => pages.indexOf(_))));
  };

  const deselectAllPages = () => {
    setSelectedPages(new Set());
  };

  // Filter pages based on search term
  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateLLMSTxt = () => {
    const selectedPagesData = pages.filter((_, index) => selectedPages.has(index));
    
    let content = `# ${siteName}\n> ${siteDescription}\n\n`;
    
    // Enhanced categorization
    const categories = {
      documentation: selectedPagesData.filter(page => 
        page.category === 'documentation' || 
        page.url.includes('/docs/') || 
        page.title.toLowerCase().includes('doc') || 
        page.title.toLowerCase().includes('guide') || 
        page.title.toLowerCase().includes('api')
      ),
      support: selectedPagesData.filter(page => 
        page.category === 'support' ||
        page.url.includes('/support/') || 
        page.url.includes('/help/') || 
        page.title.toLowerCase().includes('faq') || 
        page.title.toLowerCase().includes('support')
      ),
      blog: selectedPagesData.filter(page =>
        page.category === 'blog' ||
        page.url.includes('/blog/') ||
        page.title.toLowerCase().includes('blog') ||
        page.title.toLowerCase().includes('news')
      ),
      community: selectedPagesData.filter(page => 
        page.category === 'community' ||
        page.url.includes('/community/') || 
        page.url.includes('/forum/') || 
        page.title.toLowerCase().includes('community') || 
        page.title.toLowerCase().includes('forum')
      )
    };

    const other = selectedPagesData.filter(page => 
      !Object.values(categories).some(cat => cat.includes(page))
    );

    // Generate sections
    const sections = [
      { title: 'Documentation', pages: categories.documentation },
      { title: 'Support', pages: categories.support },
      { title: 'Blog', pages: categories.blog },
      { title: 'Resources', pages: other },
      { title: 'Optional', pages: categories.community }
    ];

    sections.forEach(section => {
      if (section.pages.length > 0) {
        content += `## ${section.title}\n`;
        section.pages.forEach(page => {
          content += `- [${page.title}](${page.url}): ${page.description}\n`;
        });
        content += '\n';
      }
    });

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
    showToast('File downloaded successfully!', 'success');
  };

  const copyToClipboard = async () => {
    try {
      const content = generateLLMSTxt();
      await navigator.clipboard.writeText(content);
      showToast('Content copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      documentation: 'bg-blue-100 text-blue-800 border-blue-200',
      support: 'bg-green-100 text-green-800 border-green-200',
      community: 'bg-purple-100 text-purple-800 border-purple-200',
      blog: 'bg-orange-100 text-orange-800 border-orange-200',
      default: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toast {...toast} onClose={closeToast} />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <FileText className="h-16 w-16 text-indigo-600 mr-4" />
                <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-2">LLMs.txt Generator</h1>
                <div className="flex items-center justify-center text-sm text-indigo-600 font-medium">
                  <span>AI-Ready Content Standard</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your website into an AI-friendly format. Generate standardized llms.txt files 
              that help Large Language Models understand and interact with your content effectively.
            </p>
          </div>

          {/* Enhanced URL Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <Globe className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Analyze Website</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-3">
                  Website URL
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="url"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAnalyzeWebsite()}
                      placeholder="https://your-website.com"
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${
                        urlError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      disabled={isLoading}
                    />
                    {urlError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {urlError}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleAnalyzeWebsite}
                    disabled={isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold text-lg min-w-[140px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Analyzing</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5" />
                        <span>Analyze</span>
                      </>
                    )}
                  </button>
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

          {/* Enhanced Loading State */}
          {isLoading && <LoadingState stage={loadingStage} />}

          {/* Enhanced Results Section */}
          {showPreview && pages.length > 0 && (
            <div className="space-y-8">
              {/* Site Configuration */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <Settings className="h-6 w-6 text-indigo-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-900">Site Information</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Site Description
                    </label>
                    <input
                      type="text"
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Page Selection */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center">
                    <Database className="h-6 w-6 text-indigo-600 mr-3" />
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Found Pages ({filteredPages.length})
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      {selectedPages.size} selected
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={selectAllPages}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Select All
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={deselectAllPages}
                        className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search pages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {filteredPages.map((page, index) => {
                    const originalIndex = pages.indexOf(page);
                    return (
                      <div
                        key={originalIndex}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedPages.has(originalIndex)
                            ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => togglePageSelection(originalIndex)}
                      >
                        <div className="flex items-start space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedPages.has(originalIndex)}
                            onChange={() => togglePageSelection(originalIndex)}
                            className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <h4 className="text-lg font-semibold text-gray-900 truncate">
                                  {page.title}
                                </h4>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(page.category)}`}>
                                  {page.category}
                                </span>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            </div>
                            <p className="text-sm text-gray-500 mb-2 flex items-center">
                              <Globe className="h-3 w-3 mr-1" />
                              {page.url}
                            </p>
                            <p className="text-gray-600 leading-relaxed">{page.description}</p>
                            {page.lastModified && (
                              <p className="text-xs text-gray-400 mt-2">
                                Last modified: {page.lastModified}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Preview and Download */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-indigo-600 mr-3" />
                    <h3 className="text-2xl font-semibold text-gray-900">LLMs.txt Preview</h3>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={copyToClipboard}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 font-medium"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={downloadLLMSTxt}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 font-medium"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm overflow-x-auto border border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {generateLLMSTxt()}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Empty State */}
          {!isLoading && !showPreview && !error && <EmptyState />}

          {/* Enhanced Footer */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Learn More</h4>
              <p className="text-gray-600 mb-4">
                Discover how llms.txt can improve AI interactions with your website
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://llmstxt.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Official Specification
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <a
                  href="https://llmstxthub.com/guides/getting-started-llms-txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Getting Started Guide
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMSTxtGenerator;