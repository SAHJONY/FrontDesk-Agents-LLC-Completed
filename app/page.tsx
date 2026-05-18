'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play, Globe, Shield, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';

// High-End Imagery URLs (Real World, Not Abstract)
const HERO_IMAGE = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=3200&q=80";
const FEATURE_IMAGE_1 = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80";
const FEATURE_IMAGE_2 = "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80";

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'onboard' | 'dashboard'>('landing');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  if (view === 'onboard') return <div className="bg-black"><Navigation onNavigate={setView} /></div>; // Placeholder
  if (view === 'dashboard') return <div className="bg-black"><Navigation onNavigate={setView} /></div>;

  return (
    <div className="bg-black text-white font-sans selection:bg-blue-500/30">
      <Navigation onNavigate={setView} />

      {/* --- HERO: Photorealistic & Minimal --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Parallax */}
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Darken for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <img 
            src={HERO_IMAGE} 
            alt="Modern Office" 
            className="w-full h-full object-cover scale-110" // Slightly zoomed for parallax
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-blue-500 font-semibold tracking-widest text-sm uppercase mb-6">The Future of Service Business</h2>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8 text-white">
              Never miss a <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">$1,000 call</span> again.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              The world's most advanced AI receptionist. Automatically answers, qualify, and book appointments while you sleep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setView('onboard')}
                className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full text-lg hover:bg-gray-100 transition-all flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="px-8 py-4 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
                <Play size={18} className="fill-white" /> Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SOCIAL PROOF: Minimalist Ticker --- */}
      <section className="py-12 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple Text Logos for Cleanliness */}
            {['Acme Plumbing', 'Global HVAC', 'Elite Electric', 'Premier Roofing', 'Apex Legal'].map((logo) => (
              <span key={logo} className="text-xl md:text-2xl font-bold text-gray-400">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUE PROP: Editorial Layout --- */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Block 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-6">24/7 Availability.<br/>Zero Burnout.</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Your phone never stops ringing, but you can't answer at 2 AM. Our AI handles every call, every time, ensuring you never miss a revenue opportunity due to human limitations.
              </p>
              <ul className="space-y-4 text-gray-300">
                {['Instant Answer Time', 'Infinite Patience', 'Multilingual Support'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-blue-500" size={24} /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <img src={FEATURE_IMAGE_1} alt="Team working" className="rounded-2xl shadow-2xl shadow-blue-900/20" />
            </motion.div>
          </div>

          {/* Block 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={FEATURE_IMAGE_2} alt="Data analytics" className="rounded-2xl shadow-2xl shadow-emerald-900/20" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Data-Driven<br/>Revenue Growth.</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Stop guessing. Get detailed transcripts, sentiment analysis, and lead scoring for every single interaction. Know exactly why customers call and how much revenue you're generating.
              </p>
              <button className="text-blue-400 font-semibold flex items-center gap-2 hover:gap-4 transition-all">
                Explore Analytics <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- CTA: Clean & Bold --- */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Ready to upgrade<br/>your business?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Join the waitlist for the most advanced AI receptionist on the market.</p>
          <button 
            onClick={() => setView('onboard')}
            className="px-10 py-5 bg-black text-white font-bold rounded-full text-lg hover:scale-105 transition-transform"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}