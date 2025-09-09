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
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '50px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '16px',
            fontWeight: '500',
            animation: 'pulse 2s infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.3)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Ask Grant's</span>
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
          {/* Chat Window */}
          <div style={{
            width: '90%',
            maxWidth: '500px',
            height: '80%',
            maxHeight: '700px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideIn 0.3s ease'
          }}>
            {/* Header */}
            <div style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  🏠
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Grant's AI Assistant</h3>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Always here to help</p>
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

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              backgroundColor: '#f9fafb'
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
                    maxWidth: '75%',
                    padding: '12px 20px',
                    borderRadius: message.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    backgroundColor: message.sender === 'user' ? '#2563eb' : 'white',
                    color: message.sender === 'user' ? 'white' : '#1f2937',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    fontSize: '15px',
                    lineHeight: '1.5'
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
                    padding: '12px 20px',
                    borderRadius: '18px 18px 18px 4px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
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

            {/* Input */}
            <div style={{
              padding: '20px',
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
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.backgroundColor = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#f9fafb';
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  style={{
                    padding: '14px 28px',
                    borderRadius: '12px',
                    backgroundColor: inputValue.trim() ? '#2563eb' : '#e5e7eb',
                    color: 'white',
                    border: 'none',
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    fontSize: '15px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    if (inputValue.trim()) {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (inputValue.trim()) {
                      e.currentTarget.style.backgroundColor = '#2563eb';
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
              box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
            }
            50% {
              box-shadow: 0 4px 20px rgba(37, 99, 235, 0.5);
            }
            100% {
              box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
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