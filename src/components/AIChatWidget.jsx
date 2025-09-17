import React, { useState, useEffect } from 'react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Grant's AI assistant. How can I help you find your perfect property today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "I'm here to help you with property inquiries. You can ask me about available properties, market trends, or schedule viewings.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Animated Chat Button */}
      {!isOpen && (
        <button
          data-ai-chat-button="true"
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '20px 32px',
            borderRadius: '60px',
            backgroundColor: '#AF272F', // Grant's red
            color: 'white',
            border: '3px solid #fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 32px rgba(175, 39, 47, 0.4)',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '18px',
            fontWeight: '600',
            animation: 'pulse 2s infinite, bounce 4s infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(175, 39, 47, 0.5)';
            e.currentTarget.style.backgroundColor = '#8B1E24';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(175, 39, 47, 0.4)';
            e.currentTarget.style.backgroundColor = '#AF272F';
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="8" cy="10" r="1" fill="currentColor"/>
            <circle cx="12" cy="10" r="1" fill="currentColor"/>
            <circle cx="16" cy="10" r="1" fill="currentColor"/>
          </svg>
          <span>Ask Grant's AI</span>
          <span style={{
            position: 'absolute',
            top: '-10px',
            right: '10px',
            backgroundColor: '#FFD700',
            color: '#000',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>NEW</span>
        </button>
      )}

      {/* Full Screen Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpen(false);
          }
        }}
        >
          {/* Chat Window - Much Bigger */}
          <div style={{
            width: '90%',
            maxWidth: '900px',
            height: '90%',
            maxHeight: '800px',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideIn 0.3s ease'
          }}>
            {/* Header - Minimal on.com style */}
            <div style={{
              backgroundColor: '#000',
              color: 'white',
              padding: '32px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  🏠
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '300', letterSpacing: '-0.5px' }}>Grant's AI Assistant</h3>
                  <p style={{ margin: 0, fontSize: '16px', opacity: 0.7, fontWeight: '300' }}>Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages - Larger area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '40px',
              backgroundColor: '#fff'
            }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '70%',
                    padding: '16px 24px',
                    borderRadius: message.sender === 'user' ? '2px' : '2px',
                    backgroundColor: message.sender === 'user' ? '#000' : '#f5f5f5',
                    color: message.sender === 'user' ? 'white' : '#000',
                    boxShadow: 'none',
                    fontSize: '17px',
                    lineHeight: '1.6',
                    fontWeight: '300'
                  }}>
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    padding: '16px 24px',
                    borderRadius: '2px',
                    backgroundColor: '#f5f5f5',
                    boxShadow: 'none'
                  }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0s' }}>•</span>
                      <span style={{ animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.2s' }}>•</span>
                      <span style={{ animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.4s' }}>•</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input - Larger */}
            <div style={{
              padding: '32px 40px',
              borderTop: '1px solid #e5e7eb',
              backgroundColor: 'white'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about properties, pricing, or locations..."
                  style={{
                    flex: 1,
                    padding: '18px 24px',
                    borderRadius: '2px',
                    border: '1px solid #000',
                    fontSize: '18px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: '#fff',
                    fontWeight: '300'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#000';
                    e.target.style.backgroundColor = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#000';
                    e.target.style.backgroundColor = '#fff';
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  style={{
                    padding: '18px 40px',
                    borderRadius: '2px',
                    backgroundColor: inputValue.trim() ? '#000' : '#ccc',
                    color: 'white',
                    border: 'none',
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    fontSize: '18px',
                    fontWeight: '300',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    if (inputValue.trim()) {
                      e.currentTarget.style.backgroundColor = '#333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (inputValue.trim()) {
                      e.currentTarget.style.backgroundColor = '#000';
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add animations */}
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 8px 32px rgba(175, 39, 47, 0.4);
            }
            50% {
              box-shadow: 0 8px 48px rgba(175, 39, 47, 0.6);
            }
            100% {
              box-shadow: 0 8px 32px rgba(175, 39, 47, 0.4);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            40% {
              transform: scale(1.3);
              opacity: 0.7;
            }
          }
        `}
      </style>
    </>
  );
};

export default AIChatWidget;