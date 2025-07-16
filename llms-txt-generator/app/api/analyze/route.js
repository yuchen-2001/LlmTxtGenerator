// Next.js API Route for website analysis
// Uses third-party API for real data with smart mock generation

export async function POST(request) {
  const startTime = Date.now();
  const MINIMUM_LOADING_TIME = 3000; // 3 seconds minimum
  
  try {
    const { url } = await request.json();
    
    // Validate URL
    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
      new URL(url); // Validate URL format
    } catch {
      return Response.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Try to get real metadata using a free service (async, don't wait for it)
    let realMetadata = null;
    try {
      // Using htmlmeta.io as a free alternative (no API key needed)
      const metaResponse = await fetch(`https://htmlmeta.io/api/meta?url=${encodeURIComponent(url)}`, {
        headers: {
          'User-Agent': 'LLMsTxtGenerator/1.0'
        },
        timeout: 2000 // 2 second timeout to leave time for minimum wait
      });
      
      if (metaResponse.ok) {
        realMetadata = await metaResponse.json();
      }
    } catch (error) {
      console.log('Failed to fetch real metadata, using smart mock data');
    }

    // Generate smart mock data based on domain
    const domain = new URL(url).hostname;
    const pages = generateSmartPages(url, domain, realMetadata);

    // Calculate remaining time to reach minimum loading duration
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);
    
    // Wait for the remaining time to ensure consistent UX
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }

    return Response.json({ 
      success: true,
      pages,
      metadata: {
        analyzedAt: new Date().toISOString(),
        domain,
        totalPages: pages.length,
        hasRealData: !!realMetadata,
        processingTime: Date.now() - startTime
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Even for errors, ensure minimum loading time for consistency
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);
    
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }
    
    return Response.json({ 
      error: 'Failed to analyze website. Please try again.',
      processingTime: Date.now() - startTime
    }, { status: 500 });
  }
}

// Generate smart mock pages based on domain and real metadata
function generateSmartPages(url, domain, realMetadata) {
  const baseUrl = url.replace(/\/$/, ''); // Remove trailing slash
  
  // Use real metadata if available, otherwise generate smart defaults
  const siteTitle = realMetadata?.meta?.title || 
                   domain.replace('www.', '').replace('.com', '').replace(/[-_]/g, ' ');
  const siteDescription = realMetadata?.meta?.description || 
                         `Official website and documentation for ${siteTitle}`;

  // Determine site type based on domain
  const siteType = detectSiteType(domain);
  
  // Generate pages based on site type
  const pages = [];
  
  // Add main page
  pages.push({
    url: baseUrl,
    title: realMetadata?.meta?.title || `${siteTitle} - Home`,
    description: siteDescription,
    category: 'documentation',
    lastModified: new Date().toISOString().split('T')[0]
  });

  // Add common pages based on site type
  const pageTemplates = getPageTemplates(siteType, baseUrl, siteTitle);
  pages.push(...pageTemplates);

  // Add some variation
  return shuffleArray(pages).slice(0, Math.min(8, pages.length));
}

// Detect site type from domain
function detectSiteType(domain) {
  const lowerDomain = domain.toLowerCase();
  
  if (lowerDomain.includes('github') || lowerDomain.includes('gitlab')) {
    return 'repository';
  }
  if (lowerDomain.includes('docs') || lowerDomain.includes('wiki')) {
    return 'documentation';
  }
  if (lowerDomain.includes('blog') || lowerDomain.includes('medium')) {
    return 'blog';
  }
  if (lowerDomain.includes('api')) {
    return 'api';
  }
  if (lowerDomain.includes('support') || lowerDomain.includes('help')) {
    return 'support';
  }
  
  return 'general';
}

// Get page templates based on site type
function getPageTemplates(siteType, baseUrl, siteTitle) {
  const templates = {
    repository: [
      {
        url: `${baseUrl}/blob/main/README.md`,
        title: 'README - Project Overview',
        description: 'Complete project documentation and setup instructions',
        category: 'documentation',
        lastModified: '2024-01-15'
      },
      {
        url: `${baseUrl}/blob/main/docs/api.md`,
        title: 'API Documentation',
        description: 'Comprehensive API reference and examples',
        category: 'documentation',
        lastModified: '2024-01-12'
      },
      {
        url: `${baseUrl}/issues`,
        title: 'Issues & Support',
        description: 'Bug reports, feature requests, and community support',
        category: 'support',
        lastModified: '2024-01-10'
      },
      {
        url: `${baseUrl}/blob/main/CONTRIBUTING.md`,
        title: 'Contributing Guidelines',
        description: 'How to contribute to this project',
        category: 'community',
        lastModified: '2024-01-08'
      }
    ],
    
    documentation: [
      {
        url: `${baseUrl}/getting-started`,
        title: 'Getting Started Guide',
        description: 'Quick start guide to help you begin using our platform',
        category: 'documentation',
        lastModified: '2024-01-14'
      },
      {
        url: `${baseUrl}/api-reference`,
        title: 'API Reference',
        description: 'Complete API documentation with examples and use cases',
        category: 'documentation',
        lastModified: '2024-01-11'
      },
      {
        url: `${baseUrl}/tutorials`,
        title: 'Tutorials & Guides',
        description: 'Step-by-step tutorials for common use cases',
        category: 'documentation',
        lastModified: '2024-01-09'
      },
      {
        url: `${baseUrl}/faq`,
        title: 'Frequently Asked Questions',
        description: 'Common questions and their answers',
        category: 'support',
        lastModified: '2024-01-07'
      }
    ],
    
    blog: [
      {
        url: `${baseUrl}/latest-updates`,
        title: 'Latest Updates & News',
        description: 'Recent news, updates, and announcements',
        category: 'blog',
        lastModified: '2024-01-16'
      },
      {
        url: `${baseUrl}/tutorials`,
        title: 'How-to Tutorials',
        description: 'Practical tutorials and best practices',
        category: 'blog',
        lastModified: '2024-01-13'
      },
      {
        url: `${baseUrl}/about`,
        title: 'About Us',
        description: 'Learn more about our team and mission',
        category: 'support',
        lastModified: '2024-01-05'
      }
    ],
    
    api: [
      {
        url: `${baseUrl}/docs`,
        title: 'API Documentation',
        description: 'Complete API reference with authentication and endpoints',
        category: 'documentation',
        lastModified: '2024-01-15'
      },
      {
        url: `${baseUrl}/quickstart`,
        title: 'Quick Start Guide',
        description: 'Get up and running with our API in minutes',
        category: 'documentation',
        lastModified: '2024-01-12'
      },
      {
        url: `${baseUrl}/examples`,
        title: 'Code Examples',
        description: 'Sample code and integration examples',
        category: 'documentation',
        lastModified: '2024-01-10'
      },
      {
        url: `${baseUrl}/support`,
        title: 'Developer Support',
        description: 'Get help with integration and troubleshooting',
        category: 'support',
        lastModified: '2024-01-08'
      }
    ],
    
    support: [
      {
        url: `${baseUrl}/help-center`,
        title: 'Help Center',
        description: 'Find answers to common questions and issues',
        category: 'support',
        lastModified: '2024-01-14'
      },
      {
        url: `${baseUrl}/contact`,
        title: 'Contact Support',
        description: 'Get in touch with our support team',
        category: 'support',
        lastModified: '2024-01-12'
      },
      {
        url: `${baseUrl}/knowledge-base`,
        title: 'Knowledge Base',
        description: 'Comprehensive guides and documentation',
        category: 'documentation',
        lastModified: '2024-01-10'
      }
    ],
    
    general: [
      {
        url: `${baseUrl}/about`,
        title: `About ${siteTitle}`,
        description: 'Learn more about our company, mission, and values',
        category: 'support',
        lastModified: '2024-01-14'
      },
      {
        url: `${baseUrl}/services`,
        title: 'Our Services',
        description: 'Discover the services and solutions we provide',
        category: 'documentation',
        lastModified: '2024-01-12'
      },
      {
        url: `${baseUrl}/contact`,
        title: 'Contact Us',
        description: 'Get in touch with our team',
        category: 'support',
        lastModified: '2024-01-10'
      },
      {
        url: `${baseUrl}/blog`,
        title: 'Blog & News',
        description: 'Latest news, insights, and updates',
        category: 'blog',
        lastModified: '2024-01-08'
      }
    ]
  };

  return templates[siteType] || templates.general;
}

// Utility function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}