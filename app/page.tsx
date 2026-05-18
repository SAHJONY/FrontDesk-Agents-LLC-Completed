'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play, Globe, Shield, Zap, TrendingUp, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';

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

      {/* --- HERO: Elegant & Restrained --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* B&W Background with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/50 z-10" /> 
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black z-10" />
          <img 
            src={HERO_IMAGE} 
            alt="Executive Office" 
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-75" 
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-1.5 border border-white/20 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-gray-300 backdrop-blur-sm bg-white/5">
                Premier AI Solutions
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] mb-8 text-white">
              Excellence in <br className="hidden md:block" />
              <span className="font-serif italic text-[#d4af37]">Communication</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Elevate your service business with an AI receptionist that embodies professionalism. 
              Seamlessly answer, qualify, and book appointments with unparalleled precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => setView('onboard')}
                className="group px-10 py-4 bg-[#d4af37] text-black font-medium rounded-sm text-sm tracking-widest uppercase hover:bg-[#b5952f] transition-all flex items-center gap-3"
              >
                <span>Begin Consultation</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-4 border border-white/20 text-white font-medium rounded-sm text-sm tracking-widest uppercase hover:bg-white/5 transition-colors flex items-center gap-3">
                <Play size={14} className="fill-white" /> View Presentation
              </button>
            </div>
          </motion.div>
        </div>
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
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 space-y-40">
          
          {/* Block 1 */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="order-2 md:order-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase">Unmatched Availability</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
                Always available.<br/>
                <span className="font-serif italic text-gray-500">Never fatigued.</span>
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed mb-10 font-light">
                Your reputation depends on responsiveness. Our AI ensures every call is answered with the same level of professionalism at 3 PM or 3 AM, eliminating missed opportunities due to human limitation.
              </p>
              <ul className="space-y-6 text-gray-300 font-light">
                {['Instant Response Time', 'Infinite Scalability', 'Multilingual Capability'].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <CheckCircle2 className="text-[#d4af37]" size={20} /> <span className="tracking-wide">{item}</span>
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
                <div className="absolute -inset-4 border border-white/10 z-10" />
                <img src={FEATURE_IMAGE_1} alt="Executive Team" className="grayscale contrast-110 brightness-90" />
              </div>
            </motion.div>
          </div>

          {/* Block 2 */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
               <div className="relative">
                <div className="absolute -inset-4 border border-white/10 z-10" />
                <img src={FEATURE_IMAGE_2} alt="Analytics" className="grayscale contrast-110 brightness-90" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase">Intelligent Insights</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
                Data-driven <br/>
                <span className="font-serif italic text-gray-500">Decision making.</span>
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed mb-10 font-light">
                Gain profound insights into customer needs and business performance. Our comprehensive analytics dashboard provides clarity on every interaction, empowering you to optimize operations and maximize revenue.
              </p>
              <button className="text-[#d4af37] font-medium uppercase tracking-widest text-xs border-b border-[#d4af37]/30 pb-1 hover:border-[#d4af37] transition-colors flex items-center gap-2">
                Explore Analytics <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- CTA: Refined & Direct --- */}
      <section className="py-40 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
            Elevate your <span className="font-serif italic text-[#d4af37]">standard</span>.
          </h2>
          <p className="text-lg text-gray-500 mb-12 font-light leading-relaxed">
            Join the exclusive network of businesses that demand excellence.
          </p>
          <button 
            onClick={() => setView('onboard')}
            className="px-12 py-5 bg-white text-black font-medium rounded-sm text-xs tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors"
          >
            Request Access
          </button>
        </div>
      </section>
    </div>
  );
}