'use client';

import { useEffect, useRef } from 'react';
import styles from './Starfield.module.css';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let shootingStars = [];
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 3000), 300);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        depth: Math.random() * 3 + 1,
      }));
    };

    const createShootingStar = () => {
      if (shootingStars.length > 2) return;
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle: (Math.random() * 30 + 15) * (Math.PI / 180),
        opacity: 1,
        life: 0,
      });
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / canvas.width - 0.5) * 2;
      mouseY = (e.clientY / canvas.height - 0.5) * 2;
    };

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebula glow
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.3, 0,
        canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.5
      );
      gradient1.addColorStop(0, 'rgba(124, 58, 237, 0.03)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.7, 0,
        canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.4
      );
      gradient2.addColorStop(0, 'rgba(6, 182, 212, 0.02)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with parallax
      stars.forEach((star) => {
        const parallaxX = mouseX * star.depth * 2;
        const parallaxY = mouseY * star.depth * 2;
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.4 + 0.6;

        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y + parallaxY,
          star.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();

        // Add glow for larger stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x + parallaxX, star.y + parallaxY, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${star.opacity * twinkle * 0.1})`;
          ctx.fill();
        }
      });

      // Draw shooting stars
      shootingStars = shootingStars.filter((ss) => {
        ss.life += 0.02;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity = Math.max(0, 1 - ss.life);

        if (ss.opacity <= 0) return false;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.7, `rgba(200, 220, 255, ${ss.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`;
        ctx.fill();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createStars();
    animate();

    const shootingInterval = setInterval(createShootingStar, 3000);
    window.addEventListener('resize', () => { resize(); createStars(); });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(shootingInterval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
