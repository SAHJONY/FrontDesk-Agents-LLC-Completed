'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, CreditCard, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE = "https://usd-frost-mercury-lit.trycloudflare.com"; // Your tunnel URL

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    business_name: '',
    owner_email: '',
    industry: 'plumber'
  });
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/saas/onboard`, formData);
      if (res.data.payment_url) {
        setPaymentUrl(res.data.payment_url);
        setStep(3); // Move to payment step
      }
    } catch (err) {
      console.error("Onboarding failed", err);
      alert("Failed to start onboarding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Frontdesk Agents
          </h1>
          <p className="text-slate-400 text-lg">Launch your 24/7 AI Receptionist in 60 seconds.</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="flex justify-between mb-8 relative z-10">
            {['Business Info', 'Configuration', 'Payment', 'Activation'].map((label, idx) => (
              <div key={label} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step > idx ? 'bg-green-500 text-white' : step === idx + 1 ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {step > idx ? <Check size={16} /> : idx + 1}
                </div>
                <span className={`text-xs mt-2 ${step === idx + 1 ? 'text-white' : 'text-slate-500'}`}>{label}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            
            {/* Step 1: Business Info */}
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                className="space-y-6"
              >
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
                  <label className="block text-sm font-medium text-slate-400 mb-2">Owner Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.owner_email}
                    onChange={e => setFormData({...formData, owner_email: e.target.value})}
                    className="w-full glass-input px-4 py-3 rounded-lg"
                    placeholder="joe@example.com"
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
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2">
                  Next Step <ArrowRight size={20} />
                </button>
              </motion.form>
            )}

            {/* Step 2: Configuration (Simplified) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white">AI Configuration</h3>
                <p className="text-slate-400">We'll configure your AI agent with the best practices for <span className="text-blue-400 capitalize">{formData.industry}</span> businesses.</p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2"><Check className="text-green-500" size={18} /> Emergency Triage Enabled</li>
                  <li className="flex items-center gap-2"><Check className="text-green-500" size={18} /> Appointment Booking Logic</li>
                  <li className="flex items-center gap-2"><Check className="text-green-500" size={18} /> 24/7 Availability</li>
                </ul>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(1)} className="flex-1 border border-slate-700 hover:bg-slate-800 text-white py-4 rounded-lg">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2">
                    Continue <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-10"
              >
                {paymentUrl ? (
                  <>
                    <div className="w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CreditCard className="text-blue-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Activate Your AI</h3>
                    <p className="text-slate-400 mb-8">Secure payment of $299/mo. Cancel anytime.</p>
                    <a 
                      href={paymentUrl} 
                      className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-12 rounded-lg transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)]"
                    >
                      Pay & Activate Now
                    </a>
                    <p className="text-slate-600 text-sm mt-4">Redirects to secure Stripe Checkout</p>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
                    <p className="text-slate-400">Generating secure payment link...</p>
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
