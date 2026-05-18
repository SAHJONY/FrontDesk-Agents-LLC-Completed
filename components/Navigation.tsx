'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Zap, ChevronRight } from 'lucide-react';

interface NavProps {
  onNavigate: (view: 'landing' | 'onboard' | 'dashboard') => void;
}

export default function Navigation({ onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      {/* Desktop & Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all">
              <Zap className="text-white" size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden sm:block">
              Frontdesk Agents
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              <Globe size={16} /> EN
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => onNavigate('onboard')}
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-0.5"
            >
              Start Free Trial
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-white p-2 z-50 relative"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => { setMobileOpen(false); }}
                  className="text-2xl font-bold text-white border-b border-white/10 pb-4 flex items-center justify-between group"
                >
                  {link.name} <ChevronRight className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
              
              <div className="h-px bg-white/10 my-4" />
              
              <button 
                onClick={() => { setMobileOpen(false); onNavigate('dashboard'); }}
                className="text-xl font-medium text-slate-400 py-4 border-b border-white/10 flex justify-between items-center"
              >
                Log in <ChevronRight />
              </button>
              
              <button
                onClick={() => { setMobileOpen(false); onNavigate('onboard'); }}
                className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              >
                Start Free Trial
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
