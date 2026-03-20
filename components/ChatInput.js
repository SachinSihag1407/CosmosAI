'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatInput.module.css';

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charCount = value.length;
  const maxChars = 2000;

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, maxChars))}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the cosmos..."
          rows={1}
          disabled={isLoading}
          aria-label="Type your message"
          id="chat-input"
        />
        <div className={styles.actions}>
          {charCount > maxChars * 0.8 && (
            <span className={`${styles.charCount} ${charCount >= maxChars ? styles.charLimit : ''}`}>
              {charCount}/{maxChars}
            </span>
          )}
          <button
            className={`${styles.sendButton} ${value.trim() && !isLoading ? styles.sendActive : ''}`}
            onClick={handleSubmit}
            disabled={!value.trim() || isLoading}
            aria-label="Send message"
            id="send-button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
      <p className={styles.hint}>
        Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
