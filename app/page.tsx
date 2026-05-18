'use client';

import React, { useState } from 'react';
import { Phone, BarChart3, DollarSign, ShieldCheck, Clock, Users } from 'lucide-react';

// Simple placeholders
const Onboarding = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Onboarding</h1>
      <p className="text-slate-400">Stripe integration pending API setup.</p>
      <a href="/" className="px-6 py-3 bg-blue-600 rounded-lg inline-block">Back</a>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-slate-400">Your real-time metrics.</p>
      <a href="/" className="px-6 py-3 bg-blue-600 rounded-lg inline-block">Back</a>
    </div>
  </div>
);

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'onboard' | 'dashboard'>('landing');

  if (view === 'onboard') return <Onboarding />;
  if (view === 'dashboard') return <Dashboard />;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,78,216,0.15),transparent_50%)]" />
      
      <div className="relative z-10 max-w-5xl w-full text-center space-y-12">
        <div className="space-y-6 pt-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            ✨ AI Receptionist for Service Businesses
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Frontdesk Agents
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Never miss a $1,000 call again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={() => setView('onboard')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)]"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => setView('dashboard')}
              className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-semibold rounded-xl text-lg transition-all"
            >
              Client Login
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <FeatureCard icon={<Phone className="text-blue-400" size={28} />} title="24/7 AI" desc="Answers every call instantly." />
          <FeatureCard icon={<BarChart3 className="text-emerald-400" size={28} />} title="Smart Qualify" desc="Books appointments automatically." />
          <FeatureCard icon={<DollarSign className="text-yellow-400" size={28} />} title="90% Margin" desc="Pure profit engine." />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="glass-panel p-8 rounded-2xl border border-white/5">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}
