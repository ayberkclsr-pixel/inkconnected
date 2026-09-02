'use client';

import { useEffect, useState } from 'react';

export default function ParticleBackground() {
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; top: number; color: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const colors = ['bg-purple-500', 'bg-cyan-500', 'bg-white'];
    const generateParticles = () => {
      return Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 10,
      }));
    };
    setParticles(generateParticles());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden transform-gpu">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full opacity-30 ${p.color} will-change-transform`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `float ${p.duration}s infinite linear ${p.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
