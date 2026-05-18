'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, Fingerprint, ChevronRight, Eye, EyeOff } from 'lucide-react';

export default function OwnerLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate heavy security check
    setTimeout(() => {
      // MASTER KEY CHECK
      if (password === 'SAHJONY2024' || password === 'owner') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('owner_auth', 'true');
          window.location.href = '/owner/dashboard';
        }
      } else {
        setError('ACCESS DENIED: Invalid Master Key');
        setLoading(false);
      }
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-mono">
      {/* Background: Aggressive Red/Black Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-red-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 border border-red-500/30 mb-4 animate-pulse">
            <Shield className="text-red-500" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-widest uppercase">Owner Access</h1>
          <p className="text-red-500/80 text-sm mt-2 flex items-center justify-center gap-2">
            <Lock size={12} /> RESTRICTED: LEVEL 5 CLEARANCE
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-panel p-8 rounded-none border border-red-900/50 bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(220,38,38,0.1)]">
          <form onSubmit={handleOwnerLogin} className="space-y-6">
            
            {/* Warning Banner */}
            <div className="flex items-start gap-3 p-4 rounded bg-red-950/30 border border-red-900/50 text-red-400 text-xs">
              <AlertTriangle className="shrink-0" size={16} />
              <p>
                <strong>WARNING:</strong> This system monitors all access attempts. Unauthorized entry is prohibited and tracked.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-red-500/80 uppercase tracking-wider mb-2">Master Key Required</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-red-900 group-focus-within:text-red-500 transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-red-900/50 rounded-sm pl-12 pr-12 py-3.5 text-red-100 font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-red-900/50"
                  placeholder="ENTER KEY..."
                  autoFocus
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-red-900 hover:text-red-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/20 border-l-2 border-red-500 text-red-400 text-sm font-mono">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-red-900/20 hover:bg-red-900/40 border border-red-800 text-red-500 font-bold py-4 uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Fingerprint className="animate-spin" size={18} /> AUTHENTICATING...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                  Initialize Session <ChevronRight size={18} />
                </span>
              )}
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-red-900/30 flex justify-between items-center text-xs text-red-900/60 font-mono">
            <span>SECURE CONNECTION</span>
            <span>ENC: AES-256</span>
          </div>
        </div>

        {/* Back to Civilians Link */}
        <div className="text-center mt-8">
          <a href="/" className="text-slate-600 hover:text-white text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
             ← Return to Public Site
          </a>
        </div>
      </div>
    </div>
  );
}