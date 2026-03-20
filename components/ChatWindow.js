'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import styles from './ChatWindow.module.css';

const SUGGESTED_PROMPTS = [
  { emoji: '🕳️', text: 'Tell me about black holes' },
  { emoji: '🔴', text: "What's it like on Mars?" },
  { emoji: '⭐', text: 'How do stars die?' },
  { emoji: '🚀', text: 'Latest NASA missions' },
  { emoji: '🌌', text: 'What is dark matter?' },
  { emoji: '🪐', text: "Why does Saturn have rings?" },
];

export default function ChatWindow({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const sendMessage = async (content) => {
    setError(null);
    const userMessage = {
      role: 'user',
      content,
      timestamp: Date.now(),
      id: `u-${Date.now()}`,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setStreamingContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Houston, we have a problem! (Error ${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setStreamingContent(accumulated);
      }

      const botMessage = {
        role: 'assistant',
        content: accumulated || 'I encountered an issue generating a response. Please try again!',
        timestamp: Date.now(),
        id: `b-${Date.now()}`,
      };

      setMessages((prev) => [...prev, botMessage]);
      setStreamingContent('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (text) => {
    sendMessage(text);
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
      if (lastUserMsg) {
        setMessages((prev) => prev.slice(0, -1));
        sendMessage(lastUserMsg.content);
      }
    }
    setError(null);
  };

  const isEmpty = messages.length === 0 && !isLoading;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack} aria-label="Go back" id="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className={styles.headerInfo}>
          <div className={styles.headerAvatar}>
            <div className={styles.avatarOrb} />
          </div>
          <div>
            <h2 className={styles.headerTitle}>CosmosAI</h2>
            <span className={styles.headerStatus}>
              {isLoading ? (
                <><span className={styles.statusDot + ' ' + styles.statusThinking} /> Thinking...</>
              ) : (
                <><span className={styles.statusDot + ' ' + styles.statusOnline} /> Online</>
              )}
            </span>
          </div>
        </div>
        <button className={styles.clearButton} onClick={() => { setMessages([]); setError(null); }} aria-label="Clear chat" id="clear-chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className={styles.body} ref={chatBodyRef} role="log" aria-live="polite" aria-atomic="false">
        {isEmpty && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="url(#eig)" opacity="0.8" />
                <circle cx="12" cy="12" r="8" stroke="url(#eig)" strokeWidth="0.8" opacity="0.3">
                  <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="20s" repeatCount="indefinite"/>
                </circle>
                <circle cx="12" cy="12" r="11" stroke="url(#eig)" strokeWidth="0.4" opacity="0.15">
                  <animateTransform attributeName="transform" type="rotate" from="360 12 12" to="0 12 12" dur="30s" repeatCount="indefinite"/>
                </circle>
                <circle cx="20" cy="8" r="0.6" fill="#06B6D4" opacity="0.6" />
                <circle cx="4" cy="16" r="0.4" fill="#EC4899" opacity="0.5" />
                <defs>
                  <linearGradient id="eig" x1="0" y1="0" x2="24" y2="24">
                    <stop stopColor="#7C3AED" />
                    <stop offset="1" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>Explore the Universe</h3>
            <p className={styles.emptySubtitle}>
              Ask me anything about space, astronomy, planets, stars, black holes, NASA missions, and more!
            </p>
            <div className={styles.prompts}>
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className={styles.promptChip}
                  onClick={() => handleSuggestedPrompt(prompt.text)}
                  style={{ animationDelay: `${i * 80}ms` }}
                  id={`prompt-chip-${i}`}
                >
                  <span className={styles.promptEmoji}>{prompt.emoji}</span>
                  {prompt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {streamingContent && (
          <MessageBubble
            message={{ role: 'assistant', content: streamingContent }}
            isStreaming={true}
          />
        )}

        {isLoading && !streamingContent && <TypingIndicator />}

        {error && (
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>🚨</div>
            <p className={styles.errorText}>{error}</p>
            <button className={styles.retryButton} onClick={handleRetry} id="retry-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Retry
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}
