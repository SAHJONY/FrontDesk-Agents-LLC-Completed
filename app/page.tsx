'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play, Globe, Shield, Zap, TrendingUp, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';
import HeroTeam from '../components/HeroTeam';

// Upscale Imagery (Black & White or Muted Tones)
const HERO_IMAGE = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=3200&q=80";
const FEATURE_IMAGE_1 = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80";
const FEATURE_IMAGE_2 = "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80";

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'onboard' | 'dashboard'>('landing');

  if (view === 'onboard') return <div className="bg-black"><Navigation onNavigate={setView} /></div>;
  if (view === 'dashboard') return <div className="bg-black"><Navigation onNavigate={setView} /></div>;

  return (
    <div className="bg-black text-white font-sans selection:bg-[#d4af37]/30">
      <Navigation onNavigate={setView} />

      {/* --- HERO: The "Hollywood Team" Composition --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <HeroTeam />
      </section>

      {/* --- TRUST: Minimalist Logos --- */}
      <section className="py-20 border-b border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-600 text-xs font-bold tracking-[0.2em] uppercase mb-12">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale">
            {['Acme Corp', 'Global Dynamics', 'Stark Ind', 'Wayne Ent', 'Umbrella'].map((logo) => (
              <span key={logo} className="text-lg font-serif text-gray-500">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES: Editorial Layout --- */}
      <section className="py-20 sm:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 sm:space-y-40">
          
          {/* Block 1 */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="order-2 md:order-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 sm:w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Unmatched Availability</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8 leading-tight">
                Always available.<br/>
                <span className="font-serif italic text-gray-500">Never fatigued.</span>
              </h3>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 sm:mb-10 font-light">
                Your reputation depends on responsiveness. Our AI ensures every call is answered with the same level of professionalism at 3 PM or 3 AM, eliminating missed opportunities due to human limitation.
              </p>
              <ul className="space-y-4 sm:space-y-6 text-gray-300 font-light text-sm sm:text-base">
                {['Instant Response Time', 'Infinite Scalability', 'Multilingual Capability'].map((item) => (
                  <li key={item} className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle2 className="text-[#d4af37] flex-shrink-0" size={18} /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 md:order-2"
            >
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 border border-white/10 z-10" />
                <img src={FEATURE_IMAGE_1} alt="Executive Team" className="grayscale contrast-110 brightness-90 w-full h-auto object-cover" />
              </div>
            </motion.div>
          </div>

          {/* Block 2 */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
               <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 border border-white/10 z-10" />
                <img src={FEATURE_IMAGE_2} alt="Analytics" className="grayscale contrast-110 brightness-90 w-full h-auto object-cover" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 sm:w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Intelligent Insights</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8 leading-tight">
                Data-driven <br/>
                <span className="font-serif italic text-gray-500">Decision making.</span>
              </h3>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 sm:mb-10 font-light">
                Gain profound insights into customer needs and business performance. Our comprehensive analytics dashboard provides clarity on every interaction, empowering you to optimize operations and maximize revenue.
              </p>
              <button className="text-[#d4af37] font-medium uppercase tracking-widest text-[10px] sm:text-xs border-b border-[#d4af37]/30 pb-1 hover:border-[#d4af37] transition-colors flex items-center gap-2">
                Explore Analytics <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- CTA: Refined & Direct --- */}
      <section className="py-20 sm:py-40 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 sm:mb-8 tracking-tight">
            Elevate your <span className="font-serif italic text-[#d4af37]">standard</span>.
          </h2>
          <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 font-light leading-relaxed">
            Join the exclusive network of businesses that demand excellence.
          </p>
          <button 
            onClick={() => setView('onboard')}
            className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-white text-black font-medium rounded-sm text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors min-h-[50px]"
          >
            Request Access
          </button>
        </div>
      </section>
    </div>
  );
}