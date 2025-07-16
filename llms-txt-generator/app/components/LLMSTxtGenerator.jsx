'use client';

import React, { useState } from 'react';

// UI Components
import Toast from './ui/Toast';

// Section Components
import Header from './sections/Header';
import UrlInput from './sections/UrlInput';
import LoadingState from './sections/LoadingState';
import SiteConfig from './sections/SiteConfig';
import PageSelection from './sections/PageSelection';
import Preview from './sections/Preview';
import EmptyState from './sections/EmptyState';
import Footer from './sections/Footer';

// Mock data
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

const LLMSTxtGenerator = () => {
  // State management
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

  // URL validation
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

  // Simulate API call with loading stages
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

  // Toast management
  const showToast = (message, type) => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  // Page selection handlers
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

  // Filter pages based on search
  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate llms.txt content
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

  // File operations
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toast {...toast} onClose={closeToast} />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Header />
          
          <UrlInput
            url={url}
            onUrlChange={setUrl}
            onAnalyze={handleAnalyzeWebsite}
            isLoading={isLoading}
            error={error}
            urlError={urlError}
          />

          {isLoading && <LoadingState stage={loadingStage} />}

          {showPreview && pages.length > 0 && (
            <div className="space-y-8">
              <SiteConfig
                siteName={siteName}
                siteDescription={siteDescription}
                onSiteNameChange={setSiteName}
                onSiteDescriptionChange={setSiteDescription}
              />

              <PageSelection
                pages={pages}
                selectedPages={selectedPages}
                onToggleSelection={togglePageSelection}
                onSelectAll={selectAllPages}
                onDeselectAll={deselectAllPages}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filteredPages={filteredPages}
              />

              <Preview
                content={generateLLMSTxt()}
                onCopy={copyToClipboard}
                onDownload={downloadLLMSTxt}
              />
            </div>
          )}

          {!isLoading && !showPreview && !error && <EmptyState />}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LLMSTxtGenerator;