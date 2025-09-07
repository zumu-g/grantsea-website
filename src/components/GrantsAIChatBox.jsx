import React, { useState } from 'react';

const GrantsAIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Grant's AI assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your message! A Grant's Estate Agents representative will get back to you shortly.", 
          isUser: false 
        }]);
      }, 1000);
      setInputValue('');
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        className="grants-ai-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
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
        }}
      >
        💬
      </button>

      {/* Chat box */}
      {isOpen && (
        <div
          className="grants-ai-chatbox"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '350px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#1a1a1a',
              color: 'white',
              padding: '16px',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '16px' }}>Grant's AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  backgroundColor: message.isUser ? '#1a1a1a' : '#f0f0f0',
                  color: message.isUser ? 'white' : 'black',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '16px',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                backgroundColor: '#1a1a1a',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default GrantsAIChatBox;