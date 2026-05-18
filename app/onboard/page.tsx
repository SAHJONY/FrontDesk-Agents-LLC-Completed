'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, Loader2, Globe, ArrowRight, CreditCard, Edit3, Wand2 } from 'lucide-react';
import axios from 'axios';

const API_BASE = "https://usd-frost-mercury-lit.trycloudflare.com"; // Your tunnel URL

export default function Onboarding() {
  const [mode, setMode] = useState<'scan' | 'manual'>('scan'); // 'scan' or 'manual'
  const [step, setStep] = useState<'input' | 'scanning' | 'review' | 'payment'>('input');
  
  const [formData, setFormData] = useState({
    website_url: '',
    business_name: '',
    owner_email: '',
    industry: 'plumber',
    phone: '',
    services: ''
  });
  
  const [paymentUrl, setPaymentUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!formData.website_url) return;
    setStep('scanning');
    try {
      // Simulate backend scan
      const res = await axios.post(`${API_BASE}/api/saas/onboard`, {
        website_url: formData.website_url,
        owner_email: formData.owner_email || 'user@example.com'
      });
      
      if (res.data.scanned_data) {
        setFormData(prev => ({
          ...prev,
          business_name: res.data.scanned_data.business_name,
          industry: res.data.scanned_data.industry,
          services: res.data.scanned_data.services?.join(', ') || ''
        }));
      }
      setStep('review');
    } catch (err) {
      console.error("Scan failed", err);
      // If scan fails, switch to manual mode with error message
      alert("Could not scan website. Switching to manual entry.");
      setMode('manual');
      setStep('input');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = mode === 'scan' 
        ? { website_url: formData.website_url, owner_email: formData.owner_email }
        : formData;
        
      const res = await axios.post(`${API_BASE}/api/saas/onboard`, payload);
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background: Bright, Collaborative Meeting Space */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center cinematic-bg"
        style={{ 
          // Image: Bright, modern meeting room with diverse team, natural light, 8K
          backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95 z-0" />
      <div className="cinematic-grain absolute inset-0 z-0 pointer-events-none" />
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Frontdesk Agents
          </h1>
          <p className="text-slate-400">Setup your AI Receptionist in 60 seconds.</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          
          {/* Mode Toggle */}
          <div className="flex mb-8 bg-slate-900/50 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setMode('scan')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all ${mode === 'scan' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Wand2 size={16} /> AI Auto-Scan
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all ${mode === 'manual' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              <Edit3 size={16} /> Manual Entry
            </button>
          </div>

          <AnimatePresence mode="wait">
            
            {/* SCANNING MODE */}
            {mode === 'scan' && (
              <motion.div key="scan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {step === 'input' || step === 'scanning' ? (
                  step === 'scanning' ? (
                    <div className="text-center py-12">
                      <Loader2 className="animate-spin text-blue-500 mx-auto mb-6" size={48} />
                      <h3 className="text-xl font-bold text-white mb-2">Analyzing Website...</h3>
                      <p className="text-slate-400">Extracting business name, services, and tone.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
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
                    </div>
                  )
                ) : null}
              </motion.div>
            )}

            {/* MANUAL MODE */}
            {mode === 'manual' && (
              <motion.form 
                key="manual"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Business Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.business_name}
                      onChange={e => setFormData({...formData, business_name: e.target.value})}
                      className="w-full glass-input px-4 py-3 rounded-lg"
                      placeholder="e.g. Joe's Plumbing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Industry</label>
                    <select 
                      value={formData.industry}
                      onChange={e => setFormData({...formData, industry: e.target.value})}
                      className="w-full glass-input px-4 py-3 rounded-lg"
                    >
                      <option value="plumber">Plumbing</option>
                      <option value="electrician">Electrician</option>
                      <option value="hvac">HVAC</option>
                      <option value="general">General Contractor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Owner Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.owner_email}
                    onChange={e => setFormData({...formData, owner_email: e.target.value})}
                    className="w-full glass-input px-4 py-3 rounded-lg"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Services (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.services}
                    onChange={e => setFormData({...formData, services: e.target.value})}
                    className="w-full glass-input px-4 py-3 rounded-lg"
                    placeholder="e.g. Leak repair, Water heaters, Drain cleaning"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <><Check size={20} /> Continue to Payment</>}
                </button>
              </motion.form>
            )}

            {/* Review & Payment Step (Shared) */}
            {(step === 'review' || step === 'payment') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {step === 'review' ? (
                   <div className="text-center">
                     <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mb-6">
                        <h3 className="text-xl font-bold text-white">Configuration Ready</h3>
                        <p className="text-slate-400 mt-2">
                          Business: <span className="text-white">{formData.business_name}</span>
                        </p>
                        <p className="text-slate-400">
                          Industry: <span className="text-white capitalize">{formData.industry}</span>
                        </p>
                     </div>
                     <button 
                        onClick={handleSubmit}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg transition-all"
                      >
                        Confirm & Proceed to Payment
                      </button>
                   </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CreditCard className="text-green-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Activate Your AI</h3>
                    <p className="text-slate-400 mb-8">Secure payment of $299/mo.</p>
                    {paymentUrl ? (
                      <a 
                        href={paymentUrl} 
                        className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-12 rounded-lg transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)]"
                      >
                        Pay & Activate Now
                      </a>
                    ) : (
                      <Loader2 className="animate-spin text-blue-500" size={32} />
                    )}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
