import styles from './TypingIndicator.module.css';

export default function TypingIndicator() {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" fill="url(#orb-grad)" />
          <circle cx="12" cy="12" r="8" stroke="url(#orb-grad)" strokeWidth="1" opacity="0.4" />
          <circle cx="12" cy="12" r="11" stroke="url(#orb-grad)" strokeWidth="0.5" opacity="0.2" />
          <defs>
            <linearGradient id="orb-grad" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#7C3AED" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className={styles.bubble}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ animationDelay: '0ms' }} />
          <span className={styles.dot} style={{ animationDelay: '160ms' }} />
          <span className={styles.dot} style={{ animationDelay: '320ms' }} />
        </div>
        <span className={styles.label}>CosmosAI is thinking...</span>
      </div>
    </div>
  );
}
