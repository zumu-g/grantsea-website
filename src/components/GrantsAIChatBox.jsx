import React, { useState } from 'react';

const GrantsAIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm Grant's AI Assistant. I can help you find properties, schedule viewings, or answer questions about the real estate market in Melbourne's Southeast. How can I assist you today?", 
      isUser: false 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "I'd be happy to help you explore properties in Berwick, Narre Warren, and surrounding areas. What type of property are you looking for?",
          "Great question! Our current listings include family homes from $650,000 to $2M+. Would you like to see properties in a specific price range?",
          "I can schedule a property viewing for you. Which address interests you, or would you like me to suggest some properties based on your requirements?",
          "The market in Melbourne's Southeast is quite dynamic. Property values in areas like Officer and Pakenham have grown significantly. Would you like specific suburb insights?",
          "For property appraisals, I can connect you with one of our expert agents. They typically provide free market appraisals within 24-48 hours."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          text: randomResponse, 
          isUser: false 
        }]);
      }, 1500);
      setInputValue('');
    }
  };

  const quickActions = [
    { text: "Properties for sale", value: "Show me properties for sale" },
    { text: "Rental properties", value: "I need a rental property" },
    { text: "Property appraisal", value: "Book an appraisal" }
  ];

  return (
    <>
      {/* Chat button - ChatGPT Style */}
      {!isOpen && (
        <button
          className="grants-ai-chat-button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            zIndex: 1000,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = '#333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#1a1a1a';
          }}
        >
          💬
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '12px',
            height: '12px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            border: '2px solid white'
          }}></span>
        </button>
      )}

      {/* Chat box - ChatGPT Style */}
      {isOpen && (
        <div
          className="grants-ai-chatbox"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '440px',
            height: '600px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: 'white',
              color: '#1a1a1a',
              padding: '20px',
              borderRadius: '16px 16px 0 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#1a1a1a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                G
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Grant's AI</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b7280',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '0',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  flexDirection: message.isUser ? 'row-reverse' : 'row',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: message.isUser ? '#3b82f6' : '#1a1a1a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'white',
                  flexShrink: 0,
                }}>
                  {message.isUser ? 'U' : 'G'}
                </div>
                <div
                  style={{
                    backgroundColor: message.isUser ? '#1a1a1a' : '#f3f4f6',
                    color: message.isUser ? 'white' : '#1a1a1a',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                  G
                </div>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#9ca3af',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0s',
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#9ca3af',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0.2s',
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#9ca3af',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0.4s',
                  }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{
            padding: '12px 20px',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
          }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputValue(action.value);
                  document.getElementById('chat-input').focus();
                }}
                style={{
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
              >
                {action.text}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '20px',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <input
              id="chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message Grant's AI..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: 'none',
                backgroundColor: '#f3f4f6',
                outline: 'none',
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                padding: '10px',
                borderRadius: '50%',
                backgroundColor: inputValue.trim() ? '#1a1a1a' : '#e5e7eb',
                color: inputValue.trim() ? 'white' : '#9ca3af',
                border: 'none',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
};

export default GrantsAIChatBox;