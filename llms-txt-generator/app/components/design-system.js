// Personal Design System - Custom tokens and patterns
// Developed based on my preferences for modern web design

export const colors = {
  // Primary: Teal-focused palette (personal preference over typical blue/purple)
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1', 
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',  // Main brand color
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a'
  },
  
  // Secondary: Warm orange (adds energy to the teal)
  secondary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa', 
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Accent color
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12'
  },

  // Status colors - keeping standard for usability
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
    700: '#047857'
  },
  
  warning: {
    50: '#fffbeb', 
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309'
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  },

  // Neutral: Warmer grays instead of cool grays
  neutral: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917'
  },

  // Page type colors - more distinctive combinations
  pageTypes: {
    documentation: {
      bg: 'bg-teal-100',
      text: 'text-teal-900',
      border: 'border-teal-300',
      hex: '#f0fdfa'
    },
    support: {
      bg: 'bg-orange-100', 
      text: 'text-orange-900',
      border: 'border-orange-300',
      hex: '#fff7ed'
    },
    community: {
      bg: 'bg-purple-100',
      text: 'text-purple-900', 
      border: 'border-purple-300',
      hex: '#faf5ff'
    },
    blog: {
      bg: 'bg-amber-100',
      text: 'text-amber-900',
      border: 'border-amber-300', 
      hex: '#fffbeb'
    },
    default: {
      bg: 'bg-stone-100',
      text: 'text-stone-900',
      border: 'border-stone-300',
      hex: '#fafaf9'
    }
  }
};

// Personal spacing preferences (not perfect 4px grid)
export const spacing = {
  xs: '0.375rem',     // 6px  - slightly off-grid
  sm: '0.625rem',     // 10px 
  md: '0.875rem',     // 14px
  lg: '1.375rem',     // 22px
  xl: '2.125rem',     // 34px
  '2xl': '3.25rem',   // 52px
  '3xl': '5rem',      // 80px
  
  // Component-specific spacing
  cardPadding: '1.75rem',    // 28px
  buttonPadding: '0.875rem 1.375rem',  // 14px 22px
  inputPadding: '0.875rem 1.125rem'     // 14px 18px
};

export const typography = {
  // Font stack - personal preference
  fontFamily: {
    sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
    display: ['Inter', 'system-ui', 'sans-serif'] // For headings
  },
  
  // Slightly different scale than typical
  fontSize: {
    xs: ['0.8125rem', { lineHeight: '1.125rem' }],    // 13px
    sm: ['0.9375rem', { lineHeight: '1.375rem' }],    // 15px
    base: ['1rem', { lineHeight: '1.625rem' }],       // 16px - more line height
    lg: ['1.0625rem', { lineHeight: '1.625rem' }],    // 17px
    xl: ['1.1875rem', { lineHeight: '1.75rem' }],     // 19px
    '2xl': ['1.4375rem', { lineHeight: '2rem' }],     // 23px
    '3xl': ['1.875rem', { lineHeight: '2.375rem' }],  // 30px
    '4xl': ['2.375rem', { lineHeight: '2.75rem' }],   // 38px
    '5xl': ['3.125rem', { lineHeight: '1.1' }]        // 50px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',    // Prefer medium over semibold
    semibold: '600',
    bold: '700'
  }
};

// Personal border radius preferences
export const borderRadius = {
  sm: '0.25rem',      // 4px
  md: '0.625rem',     // 10px - uncommon value
  lg: '0.875rem',     // 14px 
  xl: '1.25rem',      // 20px
  '2xl': '1.5625rem', // 25px - personal preference
  full: '9999px'
};

// Custom shadow system
export const shadows = {
  sm: '0 2px 4px -1px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px -2px rgba(0, 0, 0, 0.1), 0 2px 8px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.08)',
  xl: '0 16px 48px -8px rgba(0, 0, 0, 0.15), 0 8px 24px -4px rgba(0, 0, 0, 0.1)',
  glow: '0 0 20px rgba(20, 184, 166, 0.15)' // Custom glow effect
};

// Animation preferences - different timing than AI typical
export const animations = {
  duration: {
    fast: '150ms',
    normal: '250ms',    // Slightly slower than AI typical 200ms
    slow: '400ms',
    slower: '600ms'
  },
  
  easing: {
    smooth: 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // Custom bounce
    natural: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // More natural
    sharp: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Component design tokens with personal preferences
export const components = {
  button: {
    sizes: {
      sm: {
        padding: 'px-3 py-2',
        fontSize: 'text-sm',
        borderRadius: 'rounded-md',
        gap: 'gap-1.5'
      },
      md: {
        padding: 'px-5 py-2.5',  // Slightly tighter than typical
        fontSize: 'text-base', 
        borderRadius: 'rounded-lg',
        gap: 'gap-2'
      },
      lg: {
        padding: 'px-7 py-3.5',  // Personal preference
        fontSize: 'text-lg',
        borderRadius: 'rounded-xl',
        gap: 'gap-2'
      }
    },
    
    variants: {
      primary: {
        base: 'bg-gradient-to-r from-teal-600 to-orange-500 text-white font-medium',
        hover: 'hover:from-teal-700 hover:to-orange-600 hover:-translate-y-0.5',
        focus: 'focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
      },
      secondary: {
        base: 'bg-stone-50 text-stone-700 border border-stone-200 font-medium',
        hover: 'hover:bg-stone-100 hover:border-stone-300',
        focus: 'focus:ring-2 focus:ring-stone-400 focus:ring-offset-2'
      },
      outline: {
        base: 'border-2 border-teal-300 text-teal-700 font-medium',
        hover: 'hover:bg-teal-50 hover:border-teal-400',
        focus: 'focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
      },
      ghost: {
        base: 'text-teal-700 font-medium',
        hover: 'hover:text-teal-800 hover:bg-teal-50',
        focus: 'focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
      }
    }
  },
  
  input: {
    base: 'w-full border-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-250',
    sizes: {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2.5 text-base rounded-lg',
      lg: 'px-5 py-3.5 text-lg rounded-xl'
    },
    states: {
      default: 'border-stone-300 hover:border-stone-400 bg-white',
      error: 'border-red-300 bg-red-50',
      success: 'border-green-300 bg-green-50'
    }
  },
  
  card: {
    base: 'bg-white border border-stone-200 shadow-md',
    padding: {
      sm: 'p-4',
      md: 'p-6', 
      lg: 'p-7'  // Personal preference: 28px
    },
    radius: {
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl'
    },
    hover: 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-250'
  }
};

// Utility functions
export const getCategoryColor = (category) => {
  return colors.pageTypes[category] || colors.pageTypes.default;
};

export const getPageTypeColor = (type) => {
  return colors.pageTypes[type] || colors.pageTypes.default;
};

export const createGradient = (from, to, direction = 'to right') => {
  return `linear-gradient(${direction}, ${from}, ${to})`;
};

// Responsive breakpoints - slightly different from standard
export const breakpoints = {
  xs: '420px',   // For very small phones
  sm: '648px',   // Slightly larger than typical 640px
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Layout system
export const layout = {
  container: {
    padding: 'px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-6xl mx-auto',  // Slightly wider than typical 5xl
    spacing: 'space-y-8 sm:space-y-12 lg:space-y-16'
  },
  
  grid: {
    cols: {
      sm: 'grid-cols-1',
      md: 'grid-cols-2',
      lg: 'grid-cols-3',
      xl: 'grid-cols-4'
    },
    gap: 'gap-6 sm:gap-8'
  }
};

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animations,
  components,
  breakpoints,
  layout,
  getPageTypeColor,
  createGradient
};