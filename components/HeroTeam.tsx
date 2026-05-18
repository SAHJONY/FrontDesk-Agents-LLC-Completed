'use client';

import React from 'react';
import { motion } from 'framer-motion';

// High-quality, diverse professional headshots (Unsplash Source)
const TEAM_IMAGES = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Woman in suit
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Man in suit
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Woman leader
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Man casual
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Woman casual
];

export default function HeroTeam() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background: Deep Blue/Tech Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,12,27,0.85),rgba(2,12,27,0.92))] z-0" />
      
      {/* Blue Digital Overlay (Grid + Glow) */}
      <div className="absolute inset-0 z-10 opacity-60 mix-blend-screen pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Central AI Circle (Decorative) */}
      <div className="absolute z-20 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border-2 border-cyan-500/30 flex items-center justify-center text-6xl sm:text-8xl font-extrabold text-cyan-300 bg-[radial-gradient(circle,rgba(0,255,255,0.15),rgba(0,255,255,0.02))] shadow-[0_0_60px_rgba(0,255,255,0.35)] animate-[spin_60s_linear_infinite]">
        <span className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/25" style={{ animation: 'spin 20s linear infinite reverse' }} />
        AI
      </div>

      {/* Content Container */}
      <div className="relative z-30 w-full max-w-7xl px-4 sm:px-8 text-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-12 drop-shadow-2xl">
          FrontDesk<br/><span className="text-cyan-300">Agents</span>
        </h1>

        {/* Team Grid */}
        <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6 md:gap-8">
          {TEAM_IMAGES.map((src, index) => {
            const isCenter = index === 2; // Center the 3rd image
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative transition-transform duration-500 hover:-translate-y-3 ${isCenter ? 'w-40 sm:w-56 md:w-64 order-1' : 'w-28 sm:w-40 md:w-48 order-2'}`}
              >
                <img
                  src={src}
                  alt="Team Member"
                  className="w-full aspect-[3/4] object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(0,255,255,0.15)] border border-white/10"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}