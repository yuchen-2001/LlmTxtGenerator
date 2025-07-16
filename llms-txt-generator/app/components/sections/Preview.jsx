'use client';

import React, { useState } from 'react';
import { FileText, Copy, Download, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

const Preview = ({ 
  siteName, 
  siteDescription, 
  selectedPagesData, 
  onCopy, 
  onDownload 
}) => {
  const [selectedFormat, setSelectedFormat] = useState('txt');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formats = [
    { 
      id: 'txt', 
      name: 'LLMs.txt', 
      extension: 'txt',
      description: 'Standard LLMs.txt format',
      color: 'text-teal-600 bg-teal-50 border-teal-200'
    },
    { 
      id: 'json', 
      name: 'JSON', 
      extension: 'json',
      description: 'Structured JSON format',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    { 
      id: 'yaml', 
      name: 'YAML', 
      extension: 'yaml',
      description: 'Human-readable YAML',
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    { 
      id: 'xml', 
      name: 'XML', 
      extension: 'xml',
      description: 'Structured XML format',
      color: 'text-orange-600 bg-orange-50 border-orange-200'
    }
  ];

  const generateContent = (format) => {
    switch (format) {
      case 'json':
        return generateJSON();
      case 'yaml':
        return generateYAML();
      case 'xml':
        return generateXML();
      default:
        return generateLLMSTxt();
    }
  };

  const generateLLMSTxt = () => {
    let content = `# ${siteName}\n> ${siteDescription}\n\n`;
    
    // Categorize pages
    const categories = categorizePagesData(selectedPagesData);
    
    // Generate sections
    const sections = [
      { title: 'Documentation', pages: categories.documentation },
      { title: 'Support', pages: categories.support },
      { title: 'Blog', pages: categories.blog },
      { title: 'Resources', pages: categories.other },
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

  const generateJSON = () => {
    const categories = categorizePagesData(selectedPagesData);
    
    const data = {
      site: {
        name: siteName,
        description: siteDescription,
        generatedAt: new Date().toISOString()
      },
      sections: {
        documentation: categories.documentation,
        support: categories.support,
        blog: categories.blog,
        resources: categories.other,
        optional: categories.community
      },
      metadata: {
        totalPages: selectedPagesData.length,
        format: 'llms-json',
        version: '1.0'
      }
    };
    
    return JSON.stringify(data, null, 2);
  };

  const generateYAML = () => {
    const categories = categorizePagesData(selectedPagesData);
    
    let yaml = `site:
  name: "${siteName}"
  description: "${siteDescription}"
  generatedAt: "${new Date().toISOString()}"

sections:
`;

    const sections = [
      { key: 'documentation', title: 'Documentation', pages: categories.documentation },
      { key: 'support', title: 'Support', pages: categories.support },
      { key: 'blog', title: 'Blog', pages: categories.blog },
      { key: 'resources', title: 'Resources', pages: categories.other },
      { key: 'optional', title: 'Optional', pages: categories.community }
    ];

    sections.forEach(section => {
      if (section.pages.length > 0) {
        yaml += `  ${section.key}:
    title: "${section.title}"
    pages:
`;
        section.pages.forEach(page => {
          yaml += `      - title: "${page.title}"
        url: "${page.url}"
        description: "${page.description}"
        category: "${page.category}"
        lastModified: "${page.lastModified || 'N/A'}"
`;
        });
      }
    });

    yaml += `
metadata:
  totalPages: ${selectedPagesData.length}
  format: "llms-yaml"
  version: "1.0"`;

    return yaml;
  };

  const generateXML = () => {
    const categories = categorizePagesData(selectedPagesData);
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<llms-data>
  <site>
    <name>${siteName}</name>
    <description>${siteDescription}</description>
    <generatedAt>${new Date().toISOString()}</generatedAt>
  </site>
  
  <sections>
`;

    const sections = [
      { key: 'documentation', pages: categories.documentation },
      { key: 'support', pages: categories.support },
      { key: 'blog', pages: categories.blog },
      { key: 'resources', pages: categories.other },
      { key: 'optional', pages: categories.community }
    ];

    sections.forEach(section => {
      if (section.pages.length > 0) {
        xml += `    <section type="${section.key}">
`;
        section.pages.forEach(page => {
          xml += `      <page>
        <title>${escapeXml(page.title)}</title>
        <url>${escapeXml(page.url)}</url>
        <description>${escapeXml(page.description)}</description>
        <category>${page.category}</category>
        <lastModified>${page.lastModified || 'N/A'}</lastModified>
      </page>
`;
        });
        xml += `    </section>
`;
      }
    });

    xml += `  </sections>
  
  <metadata>
    <totalPages>${selectedPagesData.length}</totalPages>
    <format>llms-xml</format>
    <version>1.0</version>
  </metadata>
</llms-data>`;

    return xml;
  };

  const categorizePagesData = (pages) => {
    return {
      documentation: pages.filter(page => 
        page.category === 'documentation' || 
        page.url.includes('/docs/') || 
        page.title.toLowerCase().includes('doc') || 
        page.title.toLowerCase().includes('guide') || 
        page.title.toLowerCase().includes('api')
      ),
      support: pages.filter(page => 
        page.category === 'support' ||
        page.url.includes('/support/') || 
        page.url.includes('/help/') || 
        page.title.toLowerCase().includes('faq') || 
        page.title.toLowerCase().includes('support')
      ),
      blog: pages.filter(page =>
        page.category === 'blog' ||
        page.url.includes('/blog/') ||
        page.title.toLowerCase().includes('blog') ||
        page.title.toLowerCase().includes('news')
      ),
      community: pages.filter(page => 
        page.category === 'community' ||
        page.url.includes('/community/') || 
        page.url.includes('/forum/') || 
        page.title.toLowerCase().includes('community') || 
        page.title.toLowerCase().includes('forum')
      ),
      other: pages.filter(page => {
        const otherCategories = ['documentation', 'support', 'blog', 'community'];
        return !otherCategories.some(cat => 
          page.category === cat ||
          page.url.includes(`/${cat}/`) ||
          page.title.toLowerCase().includes(cat)
        );
      })
    };
  };

  const escapeXml = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const handleCopy = () => {
    const content = generateContent(selectedFormat);
    onCopy(content, selectedFormat);
  };

  const handleDownload = () => {
    const content = generateContent(selectedFormat);
    const format = formats.find(f => f.id === selectedFormat);
    onDownload(content, format.extension, selectedFormat);
  };

  const selectedFormatInfo = formats.find(f => f.id === selectedFormat);

  return (
    <div className="bg-white rounded-xl shadow-md p-7 border border-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-teal-600 mr-3" />
          <h3 className="text-2xl font-semibold text-stone-900">Content Preview</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Format Selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center px-4 py-2 border rounded-lg font-medium transition-colors ${selectedFormatInfo.color}`}
            >
              <span className="mr-2">{selectedFormatInfo.name}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-stone-200 z-10">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => {
                      setSelectedFormat(format.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-stone-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      selectedFormat === format.id ? 'bg-stone-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-stone-900">{format.name}</div>
                        <div className="text-sm text-stone-500">{format.description}</div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${format.color}`}>
                        .{format.extension}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <Button
            onClick={handleCopy}
            variant="secondary"
            size="md"
            icon={Copy}
          >
            Copy
          </Button>
          <Button
            onClick={handleDownload}
            variant="primary"
            size="md"
            icon={Download}
          >
            Download
          </Button>
        </div>
      </div>
      
      {/* Format Info */}
      <div className={`mb-4 p-3 rounded-lg border ${selectedFormatInfo.color}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Exporting as {selectedFormatInfo.name} format
          </span>
          <span className="text-xs">
            {selectedPagesData.length} pages selected
          </span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-stone-50 rounded-xl p-6 font-mono text-sm overflow-x-auto border border-stone-200 max-h-96">
        <pre className="whitespace-pre-wrap text-stone-800 leading-relaxed">
          {generateContent(selectedFormat)}
        </pre>
      </div>
    </div>
  );
};

export default Preview;