// Anima Integration Utilities
// This file helps integrate Anima-exported components into the Next.js project

import React, { ReactElement, ComponentType } from 'react';
import { clsx } from 'clsx';

// Anima Component Wrapper Types
export interface AnimaComponentProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

// Anima Style Processing
export const animaStyleProcessor = {
  // Convert Anima CSS-in-JS styles to Tailwind classes
  convertToTailwind: (animaStyles: Record<string, any>): string => {
    const tailwindClasses: string[] = [];

    // Convert common CSS properties to Tailwind
    const styleMap: Record<string, (value: any) => string | null> = {
      display: (value) => {
        const displayMap: Record<string, string> = {
          'flex': 'flex',
          'block': 'block',
          'inline': 'inline',
          'inline-block': 'inline-block',
          'none': 'hidden',
          'grid': 'grid'
        };
        return displayMap[value] || null;
      },

      flexDirection: (value) => {
        const directionMap: Record<string, string> = {
          'column': 'flex-col',
          'row': 'flex-row',
          'column-reverse': 'flex-col-reverse',
          'row-reverse': 'flex-row-reverse'
        };
        return directionMap[value] || null;
      },

      justifyContent: (value) => {
        const justifyMap: Record<string, string> = {
          'center': 'justify-center',
          'flex-start': 'justify-start',
          'flex-end': 'justify-end',
          'space-between': 'justify-between',
          'space-around': 'justify-around',
          'space-evenly': 'justify-evenly'
        };
        return justifyMap[value] || null;
      },

      alignItems: (value) => {
        const alignMap: Record<string, string> = {
          'center': 'items-center',
          'flex-start': 'items-start',
          'flex-end': 'items-end',
          'stretch': 'items-stretch',
          'baseline': 'items-baseline'
        };
        return alignMap[value] || null;
      },

      padding: (value) => {
        if (typeof value === 'number') return `p-[${value}px]`;
        if (typeof value === 'string' && value.endsWith('px')) {
          const numValue = parseInt(value);
          // Convert to Tailwind spacing scale
          if (numValue === 4) return 'p-1';
          if (numValue === 8) return 'p-2';
          if (numValue === 12) return 'p-3';
          if (numValue === 16) return 'p-4';
          if (numValue === 20) return 'p-5';
          if (numValue === 24) return 'p-6';
          if (numValue === 32) return 'p-8';
          return `p-[${value}]`;
        }
        return null;
      },

      margin: (value) => {
        if (typeof value === 'number') return `m-[${value}px]`;
        if (typeof value === 'string' && value.endsWith('px')) {
          const numValue = parseInt(value);
          if (numValue === 4) return 'm-1';
          if (numValue === 8) return 'm-2';
          if (numValue === 12) return 'm-3';
          if (numValue === 16) return 'm-4';
          if (numValue === 20) return 'm-5';
          if (numValue === 24) return 'm-6';
          if (numValue === 32) return 'm-8';
          return `m-[${value}]`;
        }
        return null;
      },

      width: (value) => {
        if (value === '100%') return 'w-full';
        if (typeof value === 'string' && value.endsWith('px')) {
          return `w-[${value}]`;
        }
        return null;
      },

      height: (value) => {
        if (value === '100%') return 'h-full';
        if (typeof value === 'string' && value.endsWith('px')) {
          return `h-[${value}]`;
        }
        return null;
      },

      backgroundColor: (value) => {
        // Convert hex colors to custom CSS variables or closest Tailwind color
        if (typeof value === 'string' && value.startsWith('#')) {
          return `bg-[${value}]`;
        }
        return null;
      },

      color: (value) => {
        if (typeof value === 'string' && value.startsWith('#')) {
          return `text-[${value}]`;
        }
        return null;
      },

      fontSize: (value) => {
        if (typeof value === 'string' && value.endsWith('px')) {
          const numValue = parseInt(value);
          if (numValue === 12) return 'text-xs';
          if (numValue === 14) return 'text-sm';
          if (numValue === 16) return 'text-base';
          if (numValue === 18) return 'text-lg';
          if (numValue === 20) return 'text-xl';
          if (numValue === 24) return 'text-2xl';
          if (numValue === 30) return 'text-3xl';
          if (numValue === 36) return 'text-4xl';
          return `text-[${value}]`;
        }
        return null;
      },

      fontWeight: (value) => {
        const weightMap: Record<string, string> = {
          '300': 'font-light',
          '400': 'font-normal',
          '500': 'font-medium',
          '600': 'font-semibold',
          '700': 'font-bold',
          '800': 'font-extrabold',
          'normal': 'font-normal',
          'bold': 'font-bold'
        };
        return weightMap[value.toString()] || null;
      },

      borderRadius: (value) => {
        if (typeof value === 'string' && value.endsWith('px')) {
          const numValue = parseInt(value);
          if (numValue === 4) return 'rounded';
          if (numValue === 8) return 'rounded-lg';
          if (numValue === 12) return 'rounded-xl';
          if (numValue === 16) return 'rounded-2xl';
          return `rounded-[${value}]`;
        }
        return null;
      },

      position: (value) => {
        const positionMap: Record<string, string> = {
          'relative': 'relative',
          'absolute': 'absolute',
          'fixed': 'fixed',
          'sticky': 'sticky',
          'static': 'static'
        };
        return positionMap[value] || null;
      }
    };

    // Process each style property
    Object.entries(animaStyles).forEach(([property, value]) => {
      const converter = styleMap[property];
      if (converter) {
        const tailwindClass = converter(value);
        if (tailwindClass) {
          tailwindClasses.push(tailwindClass);
        }
      }
    });

    return tailwindClasses.join(' ');
  },

  // Extract custom CSS properties that can't be converted to Tailwind
  extractCustomStyles: (animaStyles: Record<string, any>): Record<string, any> => {
    const customStyles: Record<string, any> = {};
    const supportedProperties = [
      'display', 'flexDirection', 'justifyContent', 'alignItems',
      'padding', 'margin', 'width', 'height', 'backgroundColor',
      'color', 'fontSize', 'fontWeight', 'borderRadius', 'position'
    ];

    Object.entries(animaStyles).forEach(([property, value]) => {
      if (!supportedProperties.includes(property)) {
        customStyles[property] = value;
      }
    });

    return customStyles;
  }
};

// Anima Component Wrapper (simplified)
export const createAnimaWrapper = (defaultClassName?: string) => {
  return (props: AnimaComponentProps) => {
    return clsx(defaultClassName, props.className);
  };
};

// Anima Asset Management
export const animaAssets = {
  // Process Anima image exports
  processImage: (animaImageUrl: string): string => {
    // If it's a relative path from Anima export, convert to Next.js public path
    if (animaImageUrl.startsWith('./') || animaImageUrl.startsWith('../')) {
      return `/anima-assets${animaImageUrl.substring(1)}`;
    }
    
    // If it's already an absolute URL, return as is
    if (animaImageUrl.startsWith('http')) {
      return animaImageUrl;
    }
    
    // Assume it's a public asset
    return `/anima-assets/${animaImageUrl}`;
  },

  // Process Anima icon exports
  processIcon: (animaIconPath: string): string => {
    return `/anima-assets/icons/${animaIconPath}`;
  },

  // Create optimized image component from Anima export
  createOptimizedImage: (src: string, alt: string, width?: number, height?: number) => {
    const optimizedSrc = animaAssets.processImage(src);
    
    return {
      src: optimizedSrc,
      alt,
      width,
      height,
      // Add Next.js Image component props
      priority: false,
      placeholder: 'blur' as const,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLCa3WGaRmknyEkJYWTNcLC'
    };
  }
};

// Anima Animation Integration
export const animaAnimations = {
  // Convert Anima animations to Framer Motion variants
  convertToFramerMotion: (animaAnimation: any) => {
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: 'easeOut' },
      ...animaAnimation
    };
  },

  // Common animation presets
  presets: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 }
    },
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    slideLeft: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    staggerContainer: {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    }
  }
};

// Anima Responsive Design Utils
export const animaResponsive = {
  // Convert Anima breakpoints to Tailwind responsive classes
  convertBreakpoints: (animaBreakpoints: Record<string, any>) => {
    const breakpointMap: Record<string, string> = {
      mobile: 'sm:',
      tablet: 'md:',
      desktop: 'lg:',
      wide: 'xl:'
    };

    const responsiveClasses: string[] = [];

    Object.entries(animaBreakpoints).forEach(([breakpoint, styles]) => {
      const prefix = breakpointMap[breakpoint] || '';
      const tailwindClasses = animaStyleProcessor.convertToTailwind(styles);
      if (tailwindClasses) {
        responsiveClasses.push(
          tailwindClasses
            .split(' ')
            .map(cls => `${prefix}${cls}`)
            .join(' ')
        );
      }
    });

    return responsiveClasses.join(' ');
  },

  // Generate responsive grid classes
  generateGridClasses: (columns: { mobile?: number; tablet?: number; desktop?: number }) => {
    const classes: string[] = [];
    
    if (columns.mobile) classes.push(`grid-cols-${columns.mobile}`);
    if (columns.tablet) classes.push(`md:grid-cols-${columns.tablet}`);
    if (columns.desktop) classes.push(`lg:grid-cols-${columns.desktop}`);
    
    return classes.join(' ');
  }
};

// Anima Integration Helper
export const animaIntegration = {
  // Initialize Anima integration
  init: () => {
    // Setup any global Anima configuration
    console.log('Anima integration initialized');
  },

  // Process Anima component export
  processComponent: (animaComponent: any) => {
    const processedProps: AnimaComponentProps = {};

    // Process styles
    if (animaComponent.style) {
      processedProps.className = animaStyleProcessor.convertToTailwind(animaComponent.style);
    }

    // Process animations
    if (animaComponent.animation) {
      processedProps.animation = animaAnimations.convertToFramerMotion(animaComponent.animation);
    }

    // Process responsive design
    if (animaComponent.responsive) {
      const responsiveClasses = animaResponsive.convertBreakpoints(animaComponent.responsive);
      processedProps.className = clsx(processedProps.className, responsiveClasses);
    }

    return processedProps;
  },

  // Validate Anima export structure
  validateExport: (animaExport: any): boolean => {
    const requiredFields = ['components', 'assets', 'styles'];
    return requiredFields.every(field => field in animaExport);
  },

  // Generate Next.js pages from Anima export
  generatePages: (animaExport: any) => {
    // This would generate Next.js page components from Anima export
    // Implementation would depend on Anima export structure
    console.log('Generating pages from Anima export:', animaExport);
  }
};

// Export utilities for use in components
export default {
  styleProcessor: animaStyleProcessor,
  withWrapper: createAnimaWrapper,
  assets: animaAssets,
  animations: animaAnimations,
  responsive: animaResponsive,
  integration: animaIntegration
};