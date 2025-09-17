'use client';

import React, { useState, useEffect } from 'react';

interface OnboardingGuideProps {
  onComplete?: () => void;
}

export default function OnboardingGuide({ onComplete }: OnboardingGuideProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: "Welcome to Grant's Estate Agents",
      description: "Let us show you around! We'll help you find your perfect property in just a few steps.",
      targetElement: null,
      highlightArea: null,
      action: "Let's start"
    },
    {
      title: "Search for Properties",
      description: "Use the search bar in the header to find properties by location, price, or features. You can also browse our featured listings below.",
      targetElement: '[data-search-bar]',
      highlightArea: { top: '10px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '50px' },
      action: "Next"
    },
    {
      title: "Save Your Favorites",
      description: "Found a property you love? Click the heart icon on any property card to save it to your favorites for easy access later.",
      targetElement: '[data-heart-icon]',
      highlightArea: { top: '50%', right: '20px', transform: 'translateY(-50%)', width: '40px', height: '40px' },
      action: "Got it"
    },
    {
      title: "Ask Our AI Assistant",
      description: "Have questions about a property? Click the blue chat icon to get instant answers about pricing, features, neighborhoods, and more!",
      targetElement: '[data-ai-chat]',
      highlightArea: { bottom: '24px', right: '24px', width: '56px', height: '56px' },
      action: "Perfect!"
    }
  ];

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      // Small delay to let the page load completely
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
    onComplete?.();
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {/* Highlight Area */}
        {!isFirstStep && currentStepData.highlightArea && (
          <div style={{
            position: 'absolute',
            ...currentStepData.highlightArea,
            border: '3px solid #002b7f',
            borderRadius: '8px',
            boxShadow: '0 0 0 4px rgba(0, 43, 127, 0.3), 0 0 20px rgba(0, 43, 127, 0.5)',
            backgroundColor: 'transparent',
            pointerEvents: 'none',
            animation: 'pulse 2s infinite',
            zIndex: 10001
          }} />
        )}

        {/* Tooltip/Modal */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: isFirstStep ? '40px' : '32px',
          maxWidth: isFirstStep ? '500px' : '400px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          zIndex: 10002,
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.2s ease'
        }}>
          {/* Progress indicator */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            justifyContent: 'center'
          }}>
            {steps.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: index <= currentStep ? '#002b7f' : '#e0e0e0',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: isFirstStep ? '28px' : '24px',
              fontWeight: '700',
              color: '#000',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              {currentStepData.title}
            </h2>

            <p style={{
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.5',
              marginBottom: '32px'
            }}>
              {currentStepData.description}
            </p>

            {/* Action buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {!isFirstStep && (
                <button
                  onClick={skipOnboarding}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: '#666',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#666';
                  }}
                >
                  Skip tour
                </button>
              )}

              <button
                onClick={nextStep}
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#001f5c';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {currentStepData.action}
              </button>
            </div>

            {isFirstStep && (
              <button
                onClick={skipOnboarding}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#999',
                  border: 'none',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#666';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#999';
                }}
              >
                No thanks, I'll explore on my own
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 4px rgba(0, 43, 127, 0.3), 0 0 20px rgba(0, 43, 127, 0.5);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 8px rgba(0, 43, 127, 0.2), 0 0 30px rgba(0, 43, 127, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 4px rgba(0, 43, 127, 0.3), 0 0 20px rgba(0, 43, 127, 0.5);
          }
        }
      `}</style>
    </>
  );
}