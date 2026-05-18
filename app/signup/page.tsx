'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2, Globe, Phone, Mail, Building } from 'lucide-react';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    industry: 'Plumbing',
    website: '',
    email: '',
    password: '',
    plan: 'professional'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to create tenant
    setTimeout(() => {
      // In real app: POST to /api/tenants
      // Then redirect to login or dashboard
      window.location.href = '/login?new=true';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background: Clean, Professional Blue/Emerald Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Start Your Free Trial
          </h1>
          <p className="text-slate-400">Join thousands of businesses using AI to answer calls.</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">1. Business Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Business Name</label>
                <div className="relative">
                  <Building className="absolute left-4 top-3.5 text-slate-500" size={20} />
                  <input 
                    type="text" required
                    value={formData.businessName}
                    onChange={e => setFormData({...formData, businessName: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g. Juan's Premium Plumbing"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Industry</label>
                  <select 
                    value={formData.industry}
                    onChange={e => setFormData({...formData, industry: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option>Plumbing</option>
                    <option>HVAC</option>
                    <option>Electrician</option>
                    <option>Roofing</option>
                    <option>Legal</option>
                    <option>Medical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    <input 
                      type="url" required
                      value={formData.website}
                      onChange={e => setFormData({...formData, website: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                Next Step <ArrowRight size={20} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">2. Account Credentials</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-500" size={20} />
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="you@business.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type="password" required
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h3 className="font-bold text-blue-400 mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> AI scans your website</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Custom agent configured</li>
                  <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Ready to take calls in 2 mins</li>
                </ul>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                {loading ? 'Creating Account...' : 'Create Account & Scan Website'}
              </button>
              
              <button type="button" onClick={() => setStep(1)} className="w-full text-slate-400 hover:text-white text-sm">
                ← Back to Business Details
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-8 text-slate-500 text-sm">
          Already have an account? <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Log in</a>
        </div>
      </div>
    </div>
  );
}