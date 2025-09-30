'use client';

import React, { Component, ErrorInfo } from 'react';
import SimplePropertyDetailPage from './page-simple';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class PropertyErrorBoundary extends Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Error info:', errorInfo);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);

    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: 'red', marginBottom: '20px' }}>Something went wrong</h1>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h2>Error Details:</h2>
            <p style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {this.state.error?.toString()}
            </p>
          </div>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h2>Stack Trace:</h2>
            <p style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '12px' }}>
              {this.state.error?.stack}
            </p>
          </div>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <h2>Component Stack:</h2>
            <p style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '12px' }}>
              {this.state.errorInfo?.componentStack}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function PropertyDetailWithErrorBoundary() {
  return (
    <PropertyErrorBoundary>
      <SimplePropertyDetailPage />
    </PropertyErrorBoundary>
  );
}