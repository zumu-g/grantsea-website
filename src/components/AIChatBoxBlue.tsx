'use client';

import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatBoxBlue() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you with property questions. Ask me about prices, neighborhoods, or anything else!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your question! I'd be happy to help you with that. This is a demo response - in a real implementation, this would connect to an AI service.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000
      }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            border: '2px solid #2563EB',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="11" r="1"/>
            <circle cx="8" cy="11" r="1"/>
            <circle cx="16" cy="11" r="1"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '380px',
      height: '520px',
      backgroundColor: '#FFFFFF',
      border: '2px solid #3B82F6',
      borderRadius: '16px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 50px rgba(59, 130, 246, 0.15)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>
              Property AI Assistant
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              Ask me anything about properties
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            opacity: 0.8,
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        backgroundColor: '#F8FAFC'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: '16px',
              display: 'flex',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: message.isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              backgroundColor: message.isUser ? '#3B82F6' : '#FFFFFF',
              color: message.isUser ? 'white' : '#1F2937',
              fontSize: '14px',
              lineHeight: '1.5',
              border: message.isUser ? 'none' : '1px solid #E5E7EB',
              boxShadow: message.isUser ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end'
        }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about properties, neighborhoods, prices..."
            style={{
              flex: 1,
              border: '2px solid #E5E7EB',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              resize: 'none',
              minHeight: '44px',
              maxHeight: '100px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backgroundColor: '#F9FAFB'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: inputText.trim() 
                ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' 
                : '#E5E7EB',
              border: 'none',
              color: inputText.trim() ? 'white' : '#9CA3AF',
              cursor: inputText.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22,2 15,22 11,13 2,9 22,2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}