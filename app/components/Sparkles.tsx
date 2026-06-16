'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  color: string;
  dur: number;
  delay: number;
  type: string;
};

const COLORS = ['gold-light', 'pink', 'white'];

export default function Sparkles({ count = 60 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = `sparkle ${COLORS[i % COLORS.length]}`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.setProperty('--dur', `${1.5 + Math.random() * 3}s`);
      el.style.setProperty('--delay', `${Math.random() * 4}s`);
      container.appendChild(el);
    }
  }, [count]);

  return <div ref={ref} className="sparkles-container" aria-hidden="true" />;
}
