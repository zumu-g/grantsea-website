'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { animaIntegration } from '@/lib/anima-integration';

interface AnimaComponentWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationPreset?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleIn';
  customAnimation?: any;
  loading?: boolean;
  errorBoundary?: boolean;
}

// Loading component for Anima components
const AnimaLoadingFallback = ({ className }: { className?: string }) => (
  <div className={clsx('animate-pulse bg-gray-200 rounded', className)}>
    <div className="w-full h-full bg-gray-300 rounded"></div>
  </div>
);

// Error boundary component
class AnimaErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Anima component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800">Component failed to load</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main wrapper component
export const AnimaComponentWrapper: React.FC<AnimaComponentWrapperProps> = ({
  children,
  className,
  animationPreset = 'fadeIn',
  customAnimation,
  loading = false,
  errorBoundary = true
}) => {
  // Animation presets
  const animationPresets = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    slideLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };
  
  // Get animation configuration
  const animationConfig = customAnimation || animationPresets[animationPreset || 'fadeIn'];

  const content = loading ? (
    <AnimaLoadingFallback className={className} />
  ) : (
    <motion.div
      className={className}
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      transition={animationConfig.transition}
    >
      {children}
    </motion.div>
  );

  if (errorBoundary) {
    return (
      <AnimaErrorBoundary>
        <Suspense fallback={<AnimaLoadingFallback className={className} />}>
          {content}
        </Suspense>
      </AnimaErrorBoundary>
    );
  }

  return (
    <Suspense fallback={<AnimaLoadingFallback className={className} />}>
      {content}
    </Suspense>
  );
};

export default AnimaComponentWrapper;