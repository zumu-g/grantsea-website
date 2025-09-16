'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AskAIProps {
  propertyId?: string;
  propertyAddress?: string;
  propertyType?: 'card' | 'details' | 'floating';
  size?: 'small' | 'medium' | 'large';
}

export default function AskAI({ 
  propertyId, 
  propertyAddress, 
  propertyType = 'card',
  size = 'medium' 
}: AskAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens
      const welcomeMessage = propertyAddress 
        ? `Hi! I'm here to help answer any questions about ${propertyAddress}. What would you like to know?`
        : "Hi! I'm here to help answer any questions about this property. What would you like to know?";
      
      setMessages([{ role: 'ai', content: welcomeMessage }]);
    }
  }, [isOpen, propertyAddress, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call your AI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage, propertyAddress);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (question: string, address?: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost')) {
      return "I can help you understand the pricing for this property. The listing price is shown on the property card, but I can also discuss market trends, comparable sales, and potential negotiation strategies. Would you like more details about the local market conditions?";
    }
    
    if (lowerQuestion.includes('school') || lowerQuestion.includes('education')) {
      return "This area has several quality schools nearby. I can provide information about local primary and secondary schools, their ratings, and catchment areas. Would you like me to list the closest schools to this property?";
    }
    
    if (lowerQuestion.includes('transport') || lowerQuestion.includes('commute')) {
      return "Transport connections are excellent in this area. The property has good access to public transport including buses and trains. I can provide details about commute times to the CBD and major employment centers. What specific transport information would be helpful?";
    }
    
    if (lowerQuestion.includes('inspect') || lowerQuestion.includes('viewing')) {
      return "I'd be happy to help arrange an inspection! You can book directly through the property listing, or I can connect you with our agent who can schedule a private viewing at your convenience. Would you prefer a group inspection or private showing?";
    }
    
    if (lowerQuestion.includes('neighborhood') || lowerQuestion.includes('area') || lowerQuestion.includes('suburb')) {
      return "This is a fantastic area with lots to offer! The neighborhood features parks, shopping centers, restaurants, and great community amenities. I can share details about local attractions, safety ratings, and what makes this suburb special. What aspects of the area interest you most?";
    }
    
    if (lowerQuestion.includes('investment') || lowerQuestion.includes('rental')) {
      return "This property shows strong investment potential. I can discuss rental yields, capital growth prospects, and market trends for this area. Would you like to know about comparable rental prices or the investment outlook for this suburb?";
    }
    
    // Default response
    return "That's a great question! I'm here to help with any information about this property, the local area, schools, transport, pricing, or arranging an inspection. Could you tell me more specifically what you'd like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Different button styles based on size and type
  const getButtonStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: propertyType === 'floating' ? '50%' : '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '600',
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
      boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
    };

    if (propertyType === 'floating') {
      return {
        ...baseStyles,
        position: 'fixed' as const,
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        zIndex: 1000,
        boxShadow: '0 4px 16px rgba(0, 123, 255, 0.4)',
      };
    }

    if (size === 'small') {
      return {
        ...baseStyles,
        padding: '6px 12px',
        fontSize: '12px',
      };
    }

    if (size === 'large') {
      return {
        ...baseStyles,
        padding: '12px 24px',
        fontSize: '16px',
      };
    }

    return {
      ...baseStyles,
      padding: '8px 16px',
    };
  };

  const buttonStyles = getButtonStyles();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={buttonStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0056b3';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#007bff';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = propertyType === 'floating' 
            ? '0 4px 16px rgba(0, 123, 255, 0.4)'
            : '0 2px 8px rgba(0, 123, 255, 0.3)';
        }}
        title="Ask AI about this property"
      >
        {propertyType === 'floating' ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <circle cx="9" cy="9" r="1"></circle>
            <circle cx="15" cy="9" r="1"></circle>
            <path d="M8 13s1.5 2 4 2 4-2 4-2"></path>
          </svg>
        ) : (
          <>
            <svg width={size === 'small' ? '14' : '16'} height={size === 'small' ? '14' : '16'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <circle cx="9" cy="9" r="1"></circle>
              <circle cx="15" cy="9" r="1"></circle>
              <path d="M8 13s1.5 2 4 2 4-2 4-2"></path>
            </svg>
            <span>Ask AI</span>
          </>
        )}
      </button>

      {/* Chat Modal - ON.COM Minimalist Style */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '2px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid #e8e8e8'
          }}>
            {/* Header - ON.COM Style */}
            <div style={{
              padding: 'max(2rem, 3.33vw)',
              borderBottom: '1px solid #e8e8e8',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '24px', 
                  fontWeight: '400',
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  color: '#000',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.2'
                }}>
                  Property Assistant
                </h3>
                <p style={{ 
                  margin: '8px 0 0 0', 
                  fontSize: '16px', 
                  color: '#666',
                  fontWeight: '300',
                  lineHeight: '1.4'
                }}>
                  Ask me anything about this property
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  transition: 'all 0.2s ease',
                  borderRadius: '2px'
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Messages - ON.COM Style */}
            <div style={{
              flex: 1,
              padding: 'max(2rem, 3.33vw)',
              paddingTop: '2rem',
              paddingBottom: '2rem',
              overflowY: 'auto',
              maxHeight: 'calc(85vh - 240px)',
              backgroundColor: '#fafafa'
            }}>
              {messages.map((message, index) => (
                <div key={index} style={{
                  marginBottom: index === messages.length - 1 ? 0 : '2rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: message.role === 'user' ? '#000' : '#fff',
                    border: message.role === 'user' ? 'none' : '1px solid #e8e8e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    borderRadius: '2px'
                  }}>
                    {message.role === 'user' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        <circle cx="9" cy="9" r="1"></circle>
                        <circle cx="15" cy="9" r="1"></circle>
                        <path d="M8 13s1.5 2 4 2 4-2 4-2"></path>
                      </svg>
                    )}
                  </div>
                  <div style={{
                    backgroundColor: '#fff',
                    color: '#000',
                    padding: '1.5rem',
                    borderRadius: '2px',
                    border: '1px solid #e8e8e8',
                    maxWidth: '80%',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontWeight: '300'
                  }}>
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#fff',
                    border: '1px solid #e8e8e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '2px'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      <circle cx="9" cy="9" r="1"></circle>
                      <circle cx="15" cy="9" r="1"></circle>
                      <path d="M8 13s1.5 2 4 2 4-2 4-2"></path>
                    </svg>
                  </div>
                  <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8e8e8',
                    padding: '1.5rem',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#000',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#000',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s ease-in-out infinite 0.2s'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#000',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s ease-in-out infinite 0.4s'
                    }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - ON.COM Style */}
            <div style={{
              padding: 'max(2rem, 3.33vw)',
              borderTop: '1px solid #e8e8e8',
              backgroundColor: '#fff'
            }}>
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-end'
              }}>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about this property..."
                  style={{
                    flex: 1,
                    border: '1px solid #e8e8e8',
                    borderRadius: '2px',
                    padding: '1rem',
                    fontSize: '16px',
                    resize: 'none',
                    outline: 'none',
                    minHeight: '20px',
                    maxHeight: '120px',
                    fontFamily: 'inherit',
                    fontWeight: '300',
                    lineHeight: '1.4',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: inputValue.trim() && !isLoading ? '#000' : '#f5f5f5',
                    color: inputValue.trim() && !isLoading ? '#fff' : '#999',
                    border: '1px solid #e8e8e8',
                    borderRadius: '2px',
                    cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    fontWeight: '300'
                  }}
                  onMouseEnter={(e) => {
                    if (inputValue.trim() && !isLoading) {
                      e.currentTarget.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (inputValue.trim() && !isLoading) {
                      e.currentTarget.style.backgroundColor = '#000';
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22,2 15,22 11,13 2,9"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}