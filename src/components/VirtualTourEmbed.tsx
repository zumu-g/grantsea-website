'use client';

import React from 'react';

interface VirtualTourEmbedProps {
  url: string;
  type: 'matterport' | 'youtube' | 'vimeo' | 'other';
  title?: string;
}

export default function VirtualTourEmbed({ url, type, title = 'Virtual Tour' }: VirtualTourEmbedProps) {
  // Helper function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
    }
    return null;
  };

  // Helper function to convert Vimeo URL to embed URL
  const getVimeoEmbedUrl = (url: string): string | null => {
    const regExp = /vimeo\.com\/(?:video\/)?(\d+)/;
    const match = url.match(regExp);

    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?title=0&byline=0&portrait=0`;
    }
    return null;
  };

  // Helper function to convert Matterport URL to embed URL
  const getMatterportEmbedUrl = (url: string): string | null => {
    // Matterport URLs can be in various formats
    // Example: https://my.matterport.com/show/?m=XXXXXXXXXX
    const showMatch = url.match(/show\/\?m=([^&]+)/);
    if (showMatch && showMatch[1]) {
      return `https://my.matterport.com/show/?m=${showMatch[1]}&play=1`;
    }

    // If already an embed URL, use as-is
    if (url.includes('my.matterport.com')) {
      return url;
    }

    return null;
  };

  const renderEmbed = () => {
    let embedUrl: string | null = null;

    switch (type) {
      case 'youtube':
        embedUrl = getYouTubeEmbedUrl(url);
        break;
      case 'vimeo':
        embedUrl = getVimeoEmbedUrl(url);
        break;
      case 'matterport':
        embedUrl = getMatterportEmbedUrl(url);
        break;
      case 'other':
        // Try to use URL directly if it looks like an embed
        if (url.includes('embed') || url.includes('iframe')) {
          embedUrl = url;
        }
        break;
    }

    if (!embedUrl) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
          <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Virtual Tour Available</h3>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Click the button below to view the virtual tour in a new window
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 32px',
              backgroundColor: '#000',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Open Virtual Tour
          </a>
        </div>
      );
    }

    return (
      <iframe
        src={embedUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px'
        }}
        allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
        allowFullScreen
        title={title}
      />
    );
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '500px',
      backgroundColor: '#000',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {renderEmbed()}
    </div>
  );
}
