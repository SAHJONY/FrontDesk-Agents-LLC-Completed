'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2, Globe, Phone, Mail, Building } from 'lucide-react';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
    setTimeout(() => {
      window.location.href = '/login?new=true';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Start Your Free Trial</h1>
          <p className="text-gray-500 text-sm sm:text-base">Join the future of service business</p>
        </div>

        <div className="glass-panel-refined p-6 sm:p-8 rounded-sm border border-white/10">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
              <h2 className="text-xl font-light text-white mb-4">1. Business Details</h2>
              
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Business Name</label>
                <div className="relative">
                  <Building className="absolute left-4 top-3.5 text-gray-600" size={20} />
                  <input 
                    type="text" required
                    value={formData.businessName}
                    onChange={e => setFormData({...formData, businessName: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
                    placeholder="e.g. Juan's Premium Plumbing"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Industry</label>
                  <select 
                    value={formData.industry}
                    onChange={e => setFormData({...formData, industry: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
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
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-3.5 text-gray-600" size={20} />
                    <input 
                      type="url" required
                      value={formData.website}
                      onChange={e => setFormData({...formData, website: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-white text-black font-medium rounded-sm text-xs sm:text-sm tracking-widest uppercase py-4 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 min-h-[50px]">
                Next Step <ArrowRight size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-light text-white mb-4">2. Account Credentials</h2>
              
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-600" size={20} />
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
                    placeholder="you@business.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                <div className="relative">
                  <input 
                    type="password" required
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-sm">
                <h3 className="font-medium text-[#d4af37] mb-2 text-sm">What happens next?</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#d4af37]" /> AI scans your website</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#d4af37]" /> Custom agent configured</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-[#d4af37]" /> Ready to take calls in 2 mins</li>
                </ul>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black font-medium rounded-sm text-xs sm:text-sm tracking-widest uppercase py-4 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[50px]"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <><Check size={18} /> Create Account</>}
              </button>
              
              <button type="button" onClick={() => setStep(1)} className="w-full text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">
                ← Back to Business Details
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-8 text-gray-500 text-xs sm:text-sm">
          Already have an account? <a href="/login" className="text-[#d4af37] hover:text-white font-medium transition-colors">Log in</a>
        </div>
      </div>
    </div>
  );
}