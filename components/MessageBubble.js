import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './MessageBubble.module.css';

export default function MessageBubble({ message, isStreaming }) {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === 'user';
  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  const handleCopy = async () => {
    if (!message.content) return;
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.userWrapper : styles.botWrapper}`}>
      {!isUser && (
        <div className={styles.avatar}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill="url(#mg)" />
            <circle cx="12" cy="12" r="8" stroke="url(#mg)" strokeWidth="1" opacity="0.4" />
            <circle cx="12" cy="12" r="11" stroke="url(#mg)" strokeWidth="0.5" opacity="0.2" />
            <defs>
              <linearGradient id="mg" x1="0" y1="0" x2="24" y2="24">
                <stop stopColor="#7C3AED" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble} ${isStreaming ? styles.streaming : ''}`}>
        {isUser ? (
          <p className={styles.userText}>{message.content}</p>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
            {!isStreaming && (
              <button 
                className={styles.copyButton} 
                onClick={handleCopy} 
                aria-label={isCopied ? "Copied" : "Copy to clipboard"}
                title="Copy to clipboard"
              >
                {isCopied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                )}
              </button>
            )}
          </div>
        )}
        {time && <span className={styles.timestamp}>{time}</span>}
      </div>
    </div>
  );
}
