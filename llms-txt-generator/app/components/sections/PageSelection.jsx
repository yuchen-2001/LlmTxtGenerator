'use client';

import React, { useState } from 'react';
import { 
  Database, CheckCircle, Search, Globe, ExternalLink, 
  GripVertical, Tag, Filter, MoreHorizontal, Edit,
  ChevronDown, Users, BookOpen, MessageSquare, FileText
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const PageSelection = ({ 
  pages, 
  selectedPages, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll,
  onReorderPages,
  onBulkCategoryChange,
  searchTerm,
  onSearchChange,
  filteredPages 
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedForBulk, setSelectedForBulk] = useState(new Set());
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: Filter, count: filteredPages.length },
    { id: 'documentation', name: 'Documentation', icon: BookOpen, count: filteredPages.filter(p => p.category === 'documentation').length },
    { id: 'support', name: 'Support', icon: MessageSquare, count: filteredPages.filter(p => p.category === 'support').length },
    { id: 'community', name: 'Community', icon: Users, count: filteredPages.filter(p => p.category === 'community').length },
    { id: 'blog', name: 'Blog', icon: FileText, count: filteredPages.filter(p => p.category === 'blog').length }
  ];

  const categoryChangeOptions = [
    { id: 'documentation', name: 'Documentation', icon: BookOpen },
    { id: 'support', name: 'Support', icon: MessageSquare },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'blog', name: 'Blog', icon: FileText }
  ];

  // Filter pages by category
  const categoryFilteredPages = filterCategory === 'all' 
    ? filteredPages 
    : filteredPages.filter(page => page.category === filterCategory);

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    // Reorder the pages
    const newPages = [...pages];
    const draggedPage = newPages[draggedIndex];
    newPages.splice(draggedIndex, 1);
    newPages.splice(dropIndex, 0, draggedPage);
    
    onReorderPages(newPages);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Bulk operations
  const toggleBulkMode = () => {
    setBulkMode(!bulkMode);
    setSelectedForBulk(new Set());
  };

  const toggleBulkSelection = (index) => {
    const newSelected = new Set(selectedForBulk);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedForBulk(newSelected);
  };

  const handleBulkCategoryChange = (newCategory) => {
    const indices = Array.from(selectedForBulk);
    onBulkCategoryChange(indices, newCategory);
    setSelectedForBulk(new Set());
    setShowCategoryDropdown(false);
  };

  const selectAllInCategory = () => {
    const indices = categoryFilteredPages.map((_, index) => pages.indexOf(pages[index]));
    setSelectedForBulk(new Set(indices));
  };

  // Updated color mapping function
  const getCategoryColor = (category) => {
    const colorMap = {
      documentation: 'bg-teal-50 text-teal-800 border-teal-200',
      support: 'bg-orange-50 text-orange-800 border-orange-200',
      community: 'bg-purple-50 text-purple-800 border-purple-200',
      blog: 'bg-amber-50 text-amber-800 border-amber-200',
      default: 'bg-stone-50 text-stone-800 border-stone-200'
    };
    return colorMap[category] || colorMap.default;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-7 border border-stone-200">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-teal-600 mr-3" />
          <h3 className="text-2xl font-semibold text-stone-900">
            Found Pages ({categoryFilteredPages.length})
          </h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <SelectedCounter selectedCount={selectedPages.size} />
          <BulkModeToggle bulkMode={bulkMode} onToggle={toggleBulkMode} />
          <BulkActions onSelectAll={onSelectAll} onDeselectAll={onDeselectAll} />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <SearchInput 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange} 
        />
        
        <CategoryFilter 
          categories={categories}
          selectedCategory={filterCategory}
          onCategoryChange={setFilterCategory}
        />
      </div>

      {/* Bulk Operations Bar */}
      {bulkMode && (
        <BulkOperationsBar 
          selectedCount={selectedForBulk.size}
          onSelectAllInCategory={selectAllInCategory}
          onBulkCategoryChange={handleBulkCategoryChange}
          categoryOptions={categoryChangeOptions}
          showDropdown={showCategoryDropdown}
          onToggleDropdown={() => setShowCategoryDropdown(!showCategoryDropdown)}
        />
      )}
      
      {/* Pages List */}
      <div className="space-y-3">
        {categoryFilteredPages.map((page, index) => {
          const originalIndex = pages.indexOf(page);
          return (
            <DraggablePageCard
              key={originalIndex}
              page={page}
              index={originalIndex}
              displayIndex={index}
              isSelected={selectedPages.has(originalIndex)}
              isBulkSelected={selectedForBulk.has(originalIndex)}
              bulkMode={bulkMode}
              isDragging={draggedIndex === originalIndex}
              onToggle={() => onToggleSelection(originalIndex)}
              onToggleBulk={() => toggleBulkSelection(originalIndex)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              getCategoryColor={getCategoryColor}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {categoryFilteredPages.length === 0 && (
        <EmptySearchState 
          searchTerm={searchTerm} 
          filterCategory={filterCategory}
          onClearFilters={() => {
            onSearchChange('');
            setFilterCategory('all');
          }}
        />
      )}
    </div>
  );
};

// Sub-components
const SelectedCounter = ({ selectedCount }) => (
  <div className="flex items-center text-sm text-stone-600 bg-stone-50 px-3 py-2 rounded-lg">
    <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
    {selectedCount} selected
  </div>
);

const BulkModeToggle = ({ bulkMode, onToggle }) => (
  <Button
    variant={bulkMode ? "primary" : "outline"}
    size="sm"
    onClick={onToggle}
    icon={Edit}
  >
    {bulkMode ? 'Exit Bulk' : 'Bulk Edit'}
  </Button>
);

const BulkActions = ({ onSelectAll, onDeselectAll }) => (
  <div className="flex space-x-2">
    <Button variant="ghost" size="sm" onClick={onSelectAll}>
      Select All
    </Button>
    <span className="text-stone-300">|</span>
    <Button variant="ghost" size="sm" onClick={onDeselectAll}>
      Clear All
    </Button>
  </div>
);

const SearchInput = ({ searchTerm, onSearchChange }) => (
  <Input
    icon={Search}
    placeholder="Search pages..."
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
  />
);

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => (
  <div className="relative">
    <select 
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="w-full px-4 py-2.5 border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors appearance-none bg-white text-base"
    >
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name} ({category.count})
        </option>
      ))}
    </select>
    <ChevronDown className="h-5 w-5 text-stone-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
  </div>
);

const BulkOperationsBar = ({ 
  selectedCount, 
  onSelectAllInCategory, 
  onBulkCategoryChange,
  categoryOptions,
  showDropdown,
  onToggleDropdown 
}) => (
  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-teal-900">
        {selectedCount} pages selected for bulk edit
      </span>
      <Button variant="ghost" size="sm" onClick={onSelectAllInCategory}>
        Select All Visible
      </Button>
    </div>
    
    {selectedCount > 0 && (
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          onClick={onToggleDropdown}
          icon={Tag}
        >
          Change Category
        </Button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 z-20">
            {categoryOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => onBulkCategoryChange(option.id)}
                  className="w-full text-left px-4 py-3 hover:bg-stone-50 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center"
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {option.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    )}
  </div>
);

const DraggablePageCard = ({ 
  page, 
  index, 
  displayIndex,
  isSelected, 
  isBulkSelected,
  bulkMode,
  isDragging,
  onToggle, 
  onToggleBulk,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  getCategoryColor
}) => {
  const categoryColors = getCategoryColor(page.category);
  
  return (
    <div
      draggable={!bulkMode}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`group relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
      } ${
        isSelected
          ? 'border-teal-500 bg-teal-50 shadow-sm'
          : isBulkSelected
          ? 'border-purple-500 bg-purple-50 shadow-sm'  
          : 'border-stone-200 hover:border-stone-300'
      }`}
      onClick={bulkMode ? onToggleBulk : onToggle}
    >
      <div className="flex items-start space-x-4">
        {/* Drag Handle */}
        {!bulkMode && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
            <GripVertical className="h-5 w-5 text-stone-400" />
          </div>
        )}
        
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={bulkMode ? isBulkSelected : isSelected}
          onChange={bulkMode ? onToggleBulk : onToggle}
          className={`mt-1 h-5 w-5 rounded transition-colors ${
            bulkMode 
              ? 'text-purple-600 focus:ring-purple-500 border-purple-300'
              : 'text-teal-600 focus:ring-teal-500 border-stone-300'
          }`}
        />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <PageHeader page={page} categoryColors={categoryColors} />
          <PageUrl url={page.url} />
          <PageDescription description={page.description} />
          <PageMetadata lastModified={page.lastModified} />
        </div>
      </div>
    </div>
  );
};

const PageHeader = ({ page, categoryColors }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center space-x-3">
      <h4 className="text-lg font-semibold text-stone-900 truncate">
        {page.title}
      </h4>
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${categoryColors}`}>
        {page.category}
      </span>
    </div>
    <ExternalLink className="h-4 w-4 text-stone-400 flex-shrink-0" />
  </div>
);

const PageUrl = ({ url }) => (
  <p className="text-sm text-stone-500 mb-2 flex items-center">
    <Globe className="h-3 w-3 mr-1" />
    {url}
  </p>
);

const PageDescription = ({ description }) => (
  <p className="text-stone-600 leading-relaxed">{description}</p>
);

const PageMetadata = ({ lastModified }) => (
  lastModified && (
    <p className="text-xs text-stone-400 mt-2">
      Last modified: {lastModified}
    </p>
  )
);

const EmptySearchState = ({ searchTerm, filterCategory, onClearFilters }) => (
  <div className="text-center py-12">
    <Search className="h-16 w-16 text-stone-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-stone-900 mb-2">No pages found</h3>
    <p className="text-stone-600 mb-4">
      {searchTerm || filterCategory !== 'all' 
        ? `No pages match your current filters.`
        : 'No pages available to display.'
      }
    </p>
    {(searchTerm || filterCategory !== 'all') && (
      <Button variant="outline" size="sm" onClick={onClearFilters}>
        Clear Filters
      </Button>
    )}
  </div>
);

export default PageSelection;