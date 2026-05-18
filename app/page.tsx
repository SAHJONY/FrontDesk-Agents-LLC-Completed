'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, BarChart3, DollarSign, ShieldCheck, Clock, Users, CheckCircle, Globe, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';

// Placeholder components
const Onboarding = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Onboarding Portal</h1>
      <p className="text-slate-400 mb-8">Autonomous AI Setup in 60 seconds.</p>
      <div className="animate-pulse h-4 bg-slate-800 rounded w-64 mx-auto mb-4"></div>
      <div className="animate-pulse h-4 bg-slate-800 rounded w-48 mx-auto"></div>
      <button onClick={() => window.location.reload()} className="mt-8 px-6 py-3 bg-blue-600 rounded-lg">Back</button>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Command Center</h1>
      <p className="text-slate-400 mb-8">Real-time metrics and live calls.</p>
      <div className="w-32 h-32 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin mx-auto mb-4"></div>
      <button onClick={() => window.location.reload()} className="mt-8 px-6 py-3 bg-blue-600 rounded-lg">Back</button>
    </div>
  </div>
);

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'onboard' | 'dashboard'>('landing');

  if (view === 'onboard') return <Onboarding />;
  if (view === 'dashboard') return <Dashboard />;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <Navigation onNavigate={setView} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(29,78,216,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8">
              <Globe size={14} /> Now Available Worldwide
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Frontdesk Agents
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              The world's most advanced AI receptionist for service businesses.
              <br className="hidden md:block" />
              <span className="text-white font-semibold">Never miss a $1,000 call again.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setView('onboard')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Zap size={20} fill="currentColor" /> Start Free Trial
              </button>
              <button 
                onClick={() => setView('dashboard')}
                className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-semibold rounded-full text-lg transition-all hover:-translate-y-1 border border-white/10"
              >
                Client Login
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Top Businesses Choose Us</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Built for plumbers, electricians, HVAC, and contractors who demand perfection.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Phone className="text-blue-400" size={32} />}
              title="24/7 AI Receptionist" 
              desc="Answers every call instantly, 365 days a year. No holidays, no sick days, no missed opportunities."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-emerald-400" size={32} />}
              title="Smart Qualification" 
              desc="Distinguishes emergencies from routine calls. Books appointments and captures lead data automatically."
            />
            <FeatureCard 
              icon={<DollarSign className="text-yellow-400" size={32} />}
              title="90%+ Profit Margins" 
              desc="Built on self-hosted infrastructure. Costs pennies to run, sells for hundreds. Pure profit engine."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Autonomous Setup in 60 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <StepCard number="01" title="Scan Website" desc="Enter your business URL. Our AI scans your services, tone, and details automatically." />
            <StepCard number="02" title="Auto-Configure" desc="Your custom AI agent is built instantly with your specific industry knowledge." />
            <StepCard number="03" title="Go Live" desc="Forward your phone number. Your AI starts answering calls and booking jobs immediately." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-slate-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Simple, Transparent Pricing</h2>
          <div className="glass-panel p-8 rounded-3xl border border-blue-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <div className="text-5xl font-bold mb-6">$299<span className="text-lg text-slate-400 font-normal">/mo</span></div>
            <ul className="text-left space-y-4 mb-8 text-slate-300">
              <li className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20} /> Unlimited AI Calls</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20} /> Smart Lead Qualification</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20} /> 24/7 Support & Monitoring</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20} /> Global Language Support</li>
            </ul>
            <button 
              onClick={() => setView('onboard')}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2026 Frontdesk Agents. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group hover:-translate-y-2 duration-300">
      <div className="mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="text-center">
      <div className="text-6xl font-bold text-slate-800 mb-4">{number}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}
