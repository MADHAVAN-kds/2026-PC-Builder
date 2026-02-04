import React, { useEffect, useState } from 'react';
export const BackgroundEffects: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      {/* Cyber Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Floating Particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full animate-float"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ['#8b5cf6', '#06b6d4', '#10b981', '#ec4899'][Math.floor(Math.random() * 4)],
            opacity: 0.3 + Math.random() * 0.4,
            filter: 'blur(1px)',
            animationDuration: `${20 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
      {/* Data Streams */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`stream-${i}`}
          className="absolute w-px animate-data-stream"
          style={{
            left: `${10 + i * 9}%`,
            top: '-100%',
            height: '200%',
            background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? '#8b5cf6' : '#06b6d4'}, transparent)`,
            opacity: 0.3,
            animationDuration: `${3 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      {/* Morphing Orbs */}
      <div
        className="absolute w-96 h-96 rounded-full animate-morph opacity-20"
        style={{
          left: '10%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full animate-morph opacity-20"
        style={{
          right: '15%',
          bottom: '30%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5), transparent)',
          filter: 'blur(120px)',
          animationDelay: '5s',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full animate-morph opacity-15"
        style={{
          left: '50%',
          top: '60%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.5), transparent)',
          filter: 'blur(100px)',
          animationDelay: '10s',
        }}
      />
      {/* Mouse Spotlight */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full transition-all duration-300 ease-out pointer-events-none"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05), transparent)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
};
