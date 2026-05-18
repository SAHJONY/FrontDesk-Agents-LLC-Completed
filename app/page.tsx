'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, BarChart3, DollarSign, Zap, Globe, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';

const Onboarding = () => <div className="min-h-screen bg-black"><Navigation onNavigate={()=>{}} /><div className="pt-32 text-center text-white"><h1 className="text-4xl font-bold">Onboarding</h1></div></div>;
const Dashboard = () => <div className="min-h-screen bg-black"><Navigation onNavigate={()=>{}} /><div className="pt-32 text-center text-white"><h1 className="text-4xl font-bold">Dashboard</h1></div></div>;

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'onboard' | 'dashboard'>('landing');
  if (view === 'onboard') return <Onboarding />;
  if (view === 'dashboard') return <Dashboard />;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <Navigation onNavigate={setView} />
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 8K Cinematic Background: High-End Office Command Center */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center cinematic-bg"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80')",
            backgroundColor: '#1e293b' /* Fallback color */
          }}
        />
        {/* Dark Overlay - Reduced opacity to let image show */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        {/* Film Grain */}
        <div className="cinematic-grain absolute inset-0 z-20 pointer-events-none" />
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-8">
              <Sparkles size={14} className="text-blue-400" /> <span>The Future of AI Receptionists</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">Frontdesk Agents</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-300 max-w-4xl mx-auto mb-12 font-light">
              Never miss a <span className="text-white font-semibold">$1,000 call</span> again.
              <br className="hidden md:block" /><span className="text-slate-400">The world's most advanced AI for service businesses.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setView('onboard')} className="group px-10 py-5 bg-blue-600 text-white font-bold rounded-full text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center gap-2">
                Start Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setView('dashboard')} className="px-10 py-5 glass-panel text-white font-semibold rounded-full text-lg border border-white/10">
                Client Login
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* FEATURES */}
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

      {/* PRICING */}
      <section id="pricing" className="py-32 px-4 bg-slate-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-12">Simple Pricing</h2>
          <div className="glass-panel p-10 rounded-[2.5rem] border border-blue-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">MOST POPULAR</div>
            <h3 className="text-3xl font-bold mb-4">Professional</h3>
            <div className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">$299<span className="text-2xl text-slate-400 font-normal">/mo</span></div>
            <ul className="text-left space-y-4 mb-10 text-lg text-slate-300">
              <li className="flex items-center gap-3"><ChevronRight className="text-green-500" /> Unlimited AI Calls</li>
              <li className="flex items-center gap-3"><ChevronRight className="text-green-500" /> Smart Lead Qualification</li>
              <li className="flex items-center gap-3"><ChevronRight className="text-green-500" /> Global Language Support</li>
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
