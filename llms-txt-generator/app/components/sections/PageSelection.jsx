'use client';

import React from 'react';
import { Database, CheckCircle, Search, Globe, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const PageSelection = ({ 
  pages, 
  selectedPages, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll,
  searchTerm,
  onSearchChange,
  filteredPages 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-indigo-600 mr-3" />
          <h3 className="text-2xl font-semibold text-gray-900">
            Found Pages ({filteredPages.length})
          </h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <SelectedCounter selectedCount={selectedPages.size} />
          <BulkActions onSelectAll={onSelectAll} onDeselectAll={onDeselectAll} />
        </div>
      </div>

      {/* Search */}
      <SearchInput 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange} 
      />
      
      {/* Pages List */}
      <div className="grid gap-4">
        {filteredPages.map((page, index) => {
          const originalIndex = pages.indexOf(page);
          return (
            <PageCard
              key={originalIndex}
              page={page}
              isSelected={selectedPages.has(originalIndex)}
              onToggle={() => onToggleSelection(originalIndex)}
            />
          );
        })}
      </div>

      {filteredPages.length === 0 && searchTerm && (
        <EmptySearchState searchTerm={searchTerm} />
      )}
    </div>
  );
};

const SelectedCounter = ({ selectedCount }) => (
  <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
    {selectedCount} selected
  </div>
);

const BulkActions = ({ onSelectAll, onDeselectAll }) => (
  <div className="flex space-x-2">
    <Button variant="ghost" size="sm" onClick={onSelectAll}>
      Select All
    </Button>
    <span className="text-gray-300">|</span>
    <Button variant="ghost" size="sm" onClick={onDeselectAll}>
      Clear All
    </Button>
  </div>
);

const SearchInput = ({ searchTerm, onSearchChange }) => (
  <div className="mb-6">
    <Input
      icon={Search}
      placeholder="Search pages..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

const PageCard = ({ page, isSelected, onToggle }) => {
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
    <div
      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start space-x-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
        />
        
        <div className="flex-1 min-w-0">
          <PageHeader page={page} getCategoryColor={getCategoryColor} />
          <PageUrl url={page.url} />
          <PageDescription description={page.description} />
          <PageMetadata lastModified={page.lastModified} />
        </div>
      </div>
    </div>
  );
};

const PageHeader = ({ page, getCategoryColor }) => (
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
);

const PageUrl = ({ url }) => (
  <p className="text-sm text-gray-500 mb-2 flex items-center">
    <Globe className="h-3 w-3 mr-1" />
    {url}
  </p>
);

const PageDescription = ({ description }) => (
  <p className="text-gray-600 leading-relaxed">{description}</p>
);

const PageMetadata = ({ lastModified }) => (
  lastModified && (
    <p className="text-xs text-gray-400 mt-2">
      Last modified: {lastModified}
    </p>
  )
);

const EmptySearchState = ({ searchTerm }) => (
  <div className="text-center py-8">
    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No pages found</h3>
    <p className="text-gray-600">
      No pages match your search for "{searchTerm}". Try different keywords.
    </p>
  </div>
);

export default PageSelection;