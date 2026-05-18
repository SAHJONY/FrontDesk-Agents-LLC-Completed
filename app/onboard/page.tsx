'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Check, Loader2, Globe, ArrowRight, CreditCard } from 'lucide-react';
import axios from 'axios';

const API_BASE = "https://usd-frost-mercury-lit.trycloudflare.com";

export default function Onboarding() {
  const [step, setStep] = useState<'input' | 'scanning' | 'review' | 'payment'>('input');
  const [formData, setFormData] = useState({
    website_url: '',
    business_name: '',
    owner_email: '',
    industry: ''
  });
  const [scanResult, setScanResult] = useState<any>(null);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!formData.website_url) return;
    setStep('scanning');
    try {
      // Simulate scan delay for effect (real scan happens on backend)
      const res = await axios.post(`${API_BASE}/api/saas/onboard`, {
        website_url: formData.website_url,
        owner_email: formData.owner_email || 'user@example.com'
      });
      
      // If backend returns scanned data, use it
      if (res.data.scanned_data) {
        setFormData(prev => ({
          ...prev,
          business_name: res.data.scanned_data.business_name,
          industry: res.data.scanned_data.industry
        }));
        setScanResult(res.data.scanned_data);
      }
      setStep('review');
    } catch (err) {
      console.error("Scan failed", err);
      // Fallback to manual if scan fails
      setStep('review');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/saas/onboard`, formData);
      if (res.data.payment_url) {
        setPaymentUrl(res.data.payment_url);
        setStep('payment');
      }
    } catch (err) {
      console.error("Onboarding failed", err);
      alert("Failed to start onboarding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Frontdesk Agents
          </h1>
          <p className="text-slate-400">Autonomous AI Setup in 60 seconds.</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          
          {/* Step 1: Input URL */}
          {step === 'input' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Business Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-3.5 text-slate-500" size={20} />
                  <input 
                    required
                    type="text" 
                    value={formData.website_url}
                    onChange={e => setFormData({...formData, website_url: e.target.value})}
                    className="w-full glass-input pl-12 pr-4 py-3 rounded-lg"
                    placeholder="e.g. www.joesplumbing.com"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">We'll scan your site to auto-configure your AI.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Your Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.owner_email}
                  onChange={e => setFormData({...formData, owner_email: e.target.value})}
                  className="w-full glass-input px-4 py-3 rounded-lg"
                  placeholder="you@example.com"
                />
              </div>
              <button 
                onClick={handleScan}
                disabled={!formData.website_url}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Search size={20} /> Scan & Configure
              </button>
            </motion.div>
          )}

          {/* Step 2: Scanning Animation */}
          {step === 'scanning' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Loader2 className="animate-spin text-blue-500 mx-auto mb-6" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">Analyzing Website...</h3>
              <p className="text-slate-400">Extracting business name, services, and tone.</p>
            </motion.div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 'review' && (
            <motion.form 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Check size={20} />
                  <span className="font-bold">Scan Complete!</span>
                </div>
                <p className="text-sm text-slate-300">
                  We found: <span className="text-white font-bold">{formData.business_name || "Unknown"}</span> 
                  ({formData.industry || "General"}).
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Business Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.business_name}
                  onChange={e => setFormData({...formData, business_name: e.target.value})}
                  className="w-full glass-input px-4 py-3 rounded-lg"
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Check size={20} /> Confirm & Pay</>}
              </button>
            </motion.form>
          )}

          {/* Step 4: Payment */}
          {step === 'payment' && paymentUrl && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
              <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="text-green-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Activate Your AI</h3>
              <p className="text-slate-400 mb-8">Secure payment of $299/mo.</p>
              <a 
                href={paymentUrl} 
                className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-12 rounded-lg transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)]"
              >
                Pay & Activate Now
              </a>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
