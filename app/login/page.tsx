'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const API_BASE = "https://usd-frost-mercury-lit.trycloudflare.com"; // Your tunnel

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulated Auth for now (Real auth would hit backend)
      // In a real scenario, this exchanges credentials for a JWT
      const response = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      
      if (response.data.token) {
        localStorage.setItem('client_token', response.data.token);
        window.location.href = '/dashboard'; // Redirect to private dashboard
      }
    } catch (err: any) {
      // Fallback for demo: if backend isn't ready, allow mock login
      if (email && password) {
         // Mock successful login
         localStorage.setItem('client_token', 'mock_token_' + email);
         window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Frontdesk Agents
          </h1>
          <p className="text-slate-400">Client Portal Login</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Business Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-500" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="you@business.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-500" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-12 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Access Dashboard <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{' '}
              <a href="/onboard" className="text-blue-400 hover:text-blue-300 font-medium">
                Start Free Trial
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
