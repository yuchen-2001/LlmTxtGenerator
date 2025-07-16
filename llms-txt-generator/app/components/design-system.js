// Design System Configuration

export const colors = {
  // Primary colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Main primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  
  // Secondary colors (Purple accent)
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff', 
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',  // Main secondary
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87'
  },

  // Status colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
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

  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },

  // Category colors for page types
  category: {
    documentation: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
      hex: '#dbeafe'
    },
    support: {
      bg: 'bg-green-100', 
      text: 'text-green-800',
      border: 'border-green-200',
      hex: '#dcfce7'
    },
    community: {
      bg: 'bg-purple-100',
      text: 'text-purple-800', 
      border: 'border-purple-200',
      hex: '#e9d5ff'
    },
    blog: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-200', 
      hex: '#fed7aa'
    },
    default: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200',
      hex: '#f3f4f6'
    }
  }
};

export const spacing = {
  // Base unit: 4px (0.25rem)
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem'       // 384px
};

export const typography = {
  // Font families
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
    display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif']
  },
  
  // Font sizes
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }],          // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],        // 72px
    '8xl': ['6rem', { lineHeight: '1' }],          // 96px
    '9xl': ['8rem', { lineHeight: '1' }]           // 128px
  },
  
  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  }
};

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px'
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000'
};

export const animations = {
  // Duration
  duration: {
    75: '75ms',
    100: '100ms', 
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms'
  },
  
  // Easing functions
  ease: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Component-specific design tokens
export const components = {
  button: {
    sizes: {
      sm: {
        padding: 'px-3 py-2',
        fontSize: 'text-sm',
        gap: 'space-x-1'
      },
      md: {
        padding: 'px-6 py-3',
        fontSize: 'text-base', 
        gap: 'space-x-2'
      },
      lg: {
        padding: 'px-8 py-4',
        fontSize: 'text-lg',
        gap: 'space-x-2',
        minWidth: 'min-w-[140px]'
      }
    },
    
    variants: {
      primary: {
        base: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white',
        hover: 'hover:from-indigo-700 hover:to-purple-700',
        focus: 'focus:ring-indigo-500'
      },
      secondary: {
        base: 'bg-gray-100 text-gray-700',
        hover: 'hover:bg-gray-200',
        focus: 'focus:ring-gray-500'
      },
      outline: {
        base: 'border-2 border-gray-300 text-gray-700',
        hover: 'hover:border-gray-400',
        focus: 'focus:ring-gray-500'
      },
      ghost: {
        base: 'text-indigo-600',
        hover: 'hover:text-indigo-700 hover:bg-indigo-50',
        focus: 'focus:ring-indigo-500'
      }
    }
  },
  
  input: {
    base: 'w-full border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200',
    sizes: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-4 py-4 text-lg'
    },
    states: {
      default: 'border-gray-300 hover:border-gray-400',
      error: 'border-red-300 bg-red-50',
      success: 'border-green-300 bg-green-50'
    }
  },
  
  card: {
    base: 'bg-white rounded-2xl shadow-xl border border-gray-100',
    padding: {
      sm: 'p-4',
      md: 'p-6', 
      lg: 'p-8'
    },
    hover: 'hover:shadow-2xl transition-shadow duration-200'
  }
};

// Utility functions for getting design tokens
export const getColor = (colorPath) => {
  const paths = colorPath.split('.');
  let result = colors;
  
  for (const path of paths) {
    result = result[path];
    if (!result) return null;
  }
  
  return result;
};

export const getCategoryColor = (category) => {
  return colors.category[category] || colors.category.default;
};

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Layout constants
export const layout = {
  maxWidth: {
    xs: '20rem',      // 320px
    sm: '24rem',      // 384px
    md: '28rem',      // 448px
    lg: '32rem',      // 512px
    xl: '36rem',      // 576px
    '2xl': '42rem',   // 672px
    '3xl': '48rem',   // 768px
    '4xl': '56rem',   // 896px
    '5xl': '64rem',   // 1024px
    '6xl': '72rem',   // 1152px
    '7xl': '80rem',   // 1280px
    full: '100%'
  },
  
  container: {
    padding: 'px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-5xl mx-auto'
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
  getColor,
  getCategoryColor
};