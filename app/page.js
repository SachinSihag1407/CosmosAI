'use client';

import { useState } from 'react';
import Starfield from '@/components/Starfield';
import ChatWindow from '@/components/ChatWindow';
import styles from './page.module.css';

const FEATURES = [
  {
    emoji: '🪐',
    title: 'Planets & Moons',
    desc: 'Explore every world in our solar system and beyond',
  },
  {
    emoji: '⭐',
    title: 'Stars & Galaxies',
    desc: 'From stellar nurseries to supermassive black holes',
  },
  {
    emoji: '🚀',
    title: 'Space Missions',
    desc: 'NASA, SpaceX, JWST and the future of exploration',
  },
  {
    emoji: '🔭',
    title: 'Deep Universe',
    desc: 'Dark matter, dark energy, and the Big Bang',
  },
];

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <>
        <Starfield />
        <ChatWindow onBack={() => setShowChat(false)} />
      </>
    );
  }

  return (
    <>
      <Starfield />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            AI-Powered Space Guide
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>Explore the</span>
            <span className={styles.titleAccent}>Cosmos</span>
          </h1>
          <p className={styles.subtitle}>
            Your intelligent guide to the universe. Ask about planets, stars, black holes,
            NASA missions, and the deepest mysteries of space.
          </p>
          <button
            className={styles.cta}
            onClick={() => setShowChat(true)}
            id="start-exploring"
          >
            <span className={styles.ctaText}>Start Exploring</span>
            <svg className={styles.ctaIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </section>

        {/* Features */}
        <section className={styles.features}>
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className={styles.featureCard}
              style={{ animationDelay: `${i * 100 + 300}ms` }}
            >
              <span className={styles.featureEmoji}>{feature.emoji}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>Built with 💫 for exploring the universe</p>
        </footer>
      </main>
    </>
  );
}
