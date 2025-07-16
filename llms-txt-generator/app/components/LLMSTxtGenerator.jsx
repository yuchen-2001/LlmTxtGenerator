'use client';

import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

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

const LLMSTxtGenerator = () => {
  // State management - could use useReducer
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
  const [analysisMetadata, setAnalysisMetadata] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  // Real API call with guaranteed 3-second loading experience
  const handleAnalyzeWebsite = async () => {
    if (!validateUrl(url)) return;

    setIsLoading(true);
    setError('');
    setPages([]);
    setShowPreview(false);
    setLoadingStage(0);
    setAnalysisMetadata(null);

    try {
      // Runs parallel with API call for better UX
      // Total duration: 3 seconds, 4 stages = 750ms per stage
      const stageTimings = [750, 750, 750, 750]; // Each stage gets equal time
      let currentStage = 0;

      // Progress through stages while API call happens
      const progressStages = () => {
        const stageInterval = setInterval(() => {
          if (currentStage < 4) {
            setLoadingStage(currentStage);
            currentStage++;
          } else {
            clearInterval(stageInterval);
          }
        }, 750); // 750ms per stage = 3 seconds total

        return stageInterval;
      };

      // Start both the loading animation and API call simultaneously
      const stageInterval = progressStages();
      
      const apiCall = fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      // Wait for API call to complete (backend ensures 3-second minimum)
      const response = await apiCall;
      
      // Clear the stage interval since backend timing is guaranteed
      clearInterval(stageInterval);
      
      setLoadingStage(3); //ensure final stage is set

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Process the successful response
      if (result.success && result.pages) {
        // Extract site info from first page or use domain
        const domain = result.metadata?.domain || new URL(url).hostname;
        const cleanDomain = domain.replace('www.', '').replace('.com', '');
        
        setSiteName(cleanDomain.charAt(0).toUpperCase() + cleanDomain.slice(1));
        setSiteDescription(result.pages[0]?.description || `Official documentation and resources for ${domain}`);
        setPages(result.pages);
        setSelectedPages(new Set(result.pages.map((_, index) => index)));
        setAnalysisMetadata(result.metadata);
        setShowPreview(true);
        
        // Show success message with additional info
        const message = result.metadata?.hasRealData 
          ? 'Website analyzed successfully with real data!'
          : 'Website analyzed successfully with smart mock data!';
        showToast(message, 'success');
      } else {
        throw new Error('Invalid response format from server');
      }

    } catch (err) {
      console.error('Analysis failed:', err);
      
      // Handle different types of errors
      let errorMessage = 'Failed to analyze website. ';
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage += 'Network connection failed. Please check your internet connection.';
      } else if (err.message.includes('timeout')) {
        errorMessage += 'Request timed out. The website might be slow to respond.';
      } else if (err.message.includes('Invalid URL')) {
        errorMessage += 'The URL appears to be invalid or inaccessible.';
      } else {
        errorMessage += err.message || 'Please try again.';
      }
      
      setError(errorMessage);
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

  // Page reordering handler
  const handleReorderPages = (newPages) => {
    setPages(newPages);
    showToast('Pages reordered successfully!', 'success');
  };

  // Bulk category change handler
  const handleBulkCategoryChange = (indices, newCategory) => {
    const newPages = [...pages];
    indices.forEach(index => {
      if (newPages[index]) {
        newPages[index] = { ...newPages[index], category: newCategory };
      }
    });
    setPages(newPages);
    showToast(`Updated ${indices.length} pages to ${newCategory} category!`, 'success');
  };

  // Filter pages based on search
  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected pages data
  const getSelectedPagesData = () => {
    return pages.filter((_, index) => selectedPages.has(index));
  };

  // Enhanced file operations with format support
  const handleDownload = (content, extension, format) => {
    const blob = new Blob([content], { 
      type: getContentType(format) 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `llms.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const formatName = format.toUpperCase();
    showToast(`${formatName} file downloaded successfully!`, 'success');
  };

  const handleCopy = async (content, format) => {
    try {
      await navigator.clipboard.writeText(content);
      const formatName = format.toUpperCase();
      showToast(`${formatName} content copied to clipboard!`, 'success');
    } catch (err) {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const getContentType = (format) => {
    const contentTypes = {
      txt: 'text/plain',
      json: 'application/json',
      yaml: 'application/x-yaml',
      xml: 'application/xml'
    };
    return contentTypes[format] || 'text/plain';
  };

  // Statistics for enhanced UI
  const getPageStats = () => {
    const categoryStats = pages.reduce((acc, page) => {
      acc[page.category] = (acc[page.category] || 0) + 1;
      return acc;
    }, {});

    return {
      total: pages.length,
      selected: selectedPages.size,
      categories: categoryStats
    };
  };

  const stats = getPageStats();
  if (showLoader) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center animate-fadeIn">
          <FileText className="h-20 w-20 text-teal-600 mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold text-stone-900 animate-slideUp">
            LLMs.txt Generator
          </h1>
          <p className="text-stone-600 mt-2 animate-slideUp" style={{animationDelay: '0.3s'}}>
            Loading...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50 to-teal-50">
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
              {/* Enhanced Stats Summary with Analysis Info */}
              <div className="bg-white rounded-xl shadow-md p-7 border border-stone-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <StatCard 
                    label="Total Pages" 
                    value={stats.total}
                    color="text-teal-600"
                  />
                  <StatCard 
                    label="Selected" 
                    value={stats.selected}
                    color="text-emerald-600"
                  />
                  <StatCard 
                    label="Documentation" 
                    value={stats.categories.documentation || 0}
                    color="text-teal-700"
                  />
                  <StatCard 
                    label="Support" 
                    value={stats.categories.support || 0}
                    color="text-orange-600"
                  />
                </div>
                
                {/* Analysis Metadata */}
                {analysisMetadata && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Analyzed: {new Date(analysisMetadata.analyzedAt).toLocaleString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analysisMetadata.hasRealData 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-teal-100 text-teal-800'
                        }`}>
                        {analysisMetadata.hasRealData ? 'Real Data' : 'Smart Mock'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

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
                onReorderPages={handleReorderPages}
                onBulkCategoryChange={handleBulkCategoryChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filteredPages={filteredPages}
              />

              <Preview
                siteName={siteName}
                siteDescription={siteDescription}
                selectedPagesData={getSelectedPagesData()}
                onCopy={handleCopy}
                onDownload={handleDownload}
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

// Enhanced Stats Card Component
const StatCard = ({ label, value, color }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default LLMSTxtGenerator;