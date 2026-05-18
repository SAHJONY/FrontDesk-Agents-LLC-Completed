'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Phone, BarChart3, DollarSign, Zap, Globe, ChevronRight, Sparkles, ArrowRight, CheckCircle, MessageSquare, Clock, Menu, X } from 'lucide-react';
import Navigation from '../components/Navigation';

// --- Components ---

// 1. Animated Counter Component
const AnimatedCounter = ({ value, label, icon: Icon, delay }: { value: number, label: string, icon: any, delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out quart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="glass-panel p-8 rounded-2xl border border-white/10 text-center hover:border-blue-500/30 transition-all group">
      <div className="mb-4 inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <div className="text-4xl font-bold text-white mb-2">{count.toLocaleString()}+</div>
      <div className="text-slate-400">{label}</div>
    </div>
  );
};

// 2. FAQ Item Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-blue-400 transition-colors"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronRight className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400">{answer}</p>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'onboard' | 'dashboard'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (view === 'onboard') return <div className="min-h-screen bg-black"><Navigation onNavigate={setView} /></div>; // Placeholder
  if (view === 'dashboard') return <div className="min-h-screen bg-black"><Navigation onNavigate={setView} /></div>; // Placeholder

  const stats = [
    { value: 98, label: '% Answer Rate', icon: Phone },
    { value: 24, label: '/7 Availability', icon: Clock },
    { value: 40, label: '% Revenue Boost', icon: DollarSign },
    { value: 100, label: '% Automated', icon: Zap },
  ];

  const recentActivity = [
    { text: "Joe's Plumbing booked a $450 job", time: "2s ago" },
    { text: "Miami HVAC qualified 3 leads", time: "5s ago" },
    { text: "Austin Electric saved $1200/mo", time: "12s ago" },
    { text: "Denver Roofing scheduled 2 appts", time: "18s ago" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <Navigation onNavigate={setView} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="cinematic-ambience" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
        <div className="cinematic-grain absolute inset-0 z-20 pointer-events-none" />
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-8">
              <Sparkles size={14} className="text-blue-400" /> <span>The Future of AI Receptionists</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">Frontdesk Agents</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-300 max-w-4xl mx-auto mb-12 font-light">
              Never miss a <span className="text-white font-semibold">$1,000 call</span> again.
              <br className="hidden md:block" /><span className="text-slate-400">The world's most advanced AI for service businesses.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setView('onboard')} className="group px-10 py-5 bg-blue-600 text-white font-bold rounded-full text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center gap-2 justify-center">
                Start Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setView('dashboard')} className="px-10 py-5 glass-panel text-white font-semibold rounded-full text-lg border border-white/10">
                Client Login
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
      </section>

      {/* --- LIVE ACTIVITY TICKER (TRUST SIGNAL) --- */}
      <div className="bg-blue-900/10 border-y border-blue-500/20 py-3 overflow-hidden relative z-30">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...recentActivity, ...recentActivity, ...recentActivity].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-blue-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {item.text} • <span className="text-slate-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- ANIMATED STATS --- */}
      <section id="stats" className="py-24 px-4 bg-black relative z-30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} {...stat} delay={i * 0.2} />
          ))}
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="features" className="py-32 px-4 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,78,216,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Why Industry Leaders Choose Us</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Built for plumbers, electricians, HVAC, and contractors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<Phone className="text-blue-400" size={40} />} title="24/7 AI Receptionist" desc="Answers every call instantly, 365 days a year." />
            <FeatureCard icon={<BarChart3 className="text-emerald-400" size={40} />} title="Smart Qualification" desc="Distinguishes emergencies from routine calls." />
            <FeatureCard icon={<DollarSign className="text-yellow-400" size={40} />} title="90%+ Profit Margins" desc="Costs pennies to run, sells for hundreds." />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-32 px-4 bg-slate-950/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <FAQItem question="How quickly can I set up my AI agent?" answer="Less than 2 minutes. Just enter your website URL, and our AI scans your business details automatically." />
            <FAQItem question="Does it work for non-English callers?" answer="Yes! Our AI speaks 50+ languages fluently and auto-detects the caller's language instantly." />
            <FAQItem question="Can I customize the AI's voice?" answer="Absolutely. Choose from 20+ professional voices or clone your own for a personalized touch." />
            <FAQItem question="What if I need to talk to a human?" answer="The AI can transfer urgent calls to your mobile or schedule a callback time that works for you." />
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-32 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-12">Simple Pricing</h2>
          <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">MOST POPULAR</div>
            <h3 className="text-3xl font-bold mb-4">Professional</h3>
            <div className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">$299<span className="text-2xl text-slate-400 font-normal">/mo</span></div>
            <ul className="text-left space-y-4 mb-10 text-lg text-slate-300">
              <li className="flex items-center gap-3"><CheckCircle className="text-green-500" /> Unlimited AI Calls</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-green-500" /> Smart Lead Qualification</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-green-500" /> Global Language Support</li>
            </ul>
            <button onClick={() => setView('onboard')} className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)]">Start Free Trial</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="group p-8 rounded-3xl border border-white/5 bg-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-2">
      <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 inline-block">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 text-lg">{desc}</p>
    </div>
  );
}