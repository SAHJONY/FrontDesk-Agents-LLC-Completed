'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email && password) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('client_token', 'mock_token_' + email);
        window.location.href = '/dashboard';
      }
    } else {
      setError('Invalid credentials.');
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm sm:text-base">Access your private dashboard</p>
        </div>

        <div className="glass-panel-refined p-6 sm:p-8 rounded-sm border border-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-600" size={20} />
                <input 
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-sm pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
                  placeholder="business@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-600" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-sm pl-12 pr-12 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-sm sm:text-base"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-600 hover:text-white">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>}

            <button 
              type="submit" disabled={loading}
              className="w-full bg-white text-black font-medium rounded-sm text-xs sm:text-sm tracking-widest uppercase py-4 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[50px]"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <><Lock size={16} /> Access Dashboard</>}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-white/10 pt-6">
            <p className="text-gray-500 text-xs sm:text-sm">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#d4af37] hover:text-white font-medium transition-colors">Start Free Trial</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}