'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, PhoneIncoming, PhoneMissed, DollarSign, Activity, 
  Clock, BarChart3, TrendingUp, Settings, LogOut, Menu, X
} from 'lucide-react';

const MOCK_CALLS = [
  { id: 1, caller: 'Maria Garcia', type: 'Emergency', status: 'Completed', duration: '4:20', time: '2 mins ago', saved: '$450' },
  { id: 2, caller: 'John Doe', type: 'Routine', status: 'Booked', duration: '2:15', time: '15 mins ago', saved: '$150' },
  { id: 3, caller: 'Unknown', type: 'Spam', status: 'Blocked', duration: '0:05', time: '1 hour ago', saved: '$0' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'calls'>('overview');
  const [clientData, setClientData] = useState<any>(null);
  const [calls, setCalls] = useState(MOCK_CALLS);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem('client_token') : null;
    if (token) {
      setClientData({ business_name: "Juan's Premium Plumbing", plan: "Professional", revenue: 12450, calls: 142 });
    }
    setLoading(false);
  }, []);

  if (!mounted || loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-light">{clientData?.business_name || 'Dashboard'}</h1>
          <p className="text-xs text-gray-500">Professional Plan</p>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-20 p-6 space-y-6">
          <button onClick={() => setActiveTab('overview')} className="block w-full text-left text-lg py-4 border-b border-white/10">Overview</button>
          <button onClick={() => setActiveTab('calls')} className="block w-full text-left text-lg py-4 border-b border-white/10">Call Log</button>
          <button className="block w-full text-left text-lg py-4 border-b border-white/10 text-red-500 flex items-center gap-2"><LogOut size={18} /> Logout</button>
        </div>
      )}

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-sm pt-20 px-6">
          <div className="mb-8">
            <h1 className="text-xl font-light tracking-tight">{clientData?.business_name || 'Dashboard'}</h1>
            <p className="text-xs text-gray-500 mt-1">Professional Plan</p>
          </div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-3 rounded-sm text-sm tracking-wide transition-colors ${activeTab === 'overview' ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-gray-400 hover:text-white'}`}>Overview</button>
            <button onClick={() => setActiveTab('calls')} className={`w-full text-left px-4 py-3 rounded-sm text-sm tracking-wide transition-colors ${activeTab === 'calls' ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-gray-400 hover:text-white'}`}>Call Log</button>
          </nav>
          <div className="mt-auto pb-4">
            <button className="w-full text-left px-4 py-3 rounded-sm text-sm text-red-500 hover:bg-red-900/20 transition-colors flex items-center gap-2"><LogOut size={16} /> Logout</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pt-20 lg:pt-10 px-4 sm:px-8 pb-10">
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="glass-panel-refined p-6 rounded-sm border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#d4af37]/10 rounded-sm"><DollarSign size={24} className="text-[#d4af37]" /></div>
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Revenue Saved</span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-light">$12,450</p>
                  <div className="flex items-center gap-2 mt-2 text-green-500 text-xs"><TrendingUp size={14} /> +18% this month</div>
                </div>
                <div className="glass-panel-refined p-6 rounded-sm border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#d4af37]/10 rounded-sm"><PhoneIncoming size={24} className="text-[#d4af37]" /></div>
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Calls Handled</span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-light">142</p>
                  <div className="flex items-center gap-2 mt-2 text-green-500 text-xs"><TrendingUp size={14} /> +12% this month</div>
                </div>
                <div className="glass-panel-refined p-6 rounded-sm border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#d4af37]/10 rounded-sm"><Activity size={24} className="text-[#d4af37]" /></div>
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Success Rate</span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-light">98%</p>
                  <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs"><Clock size={14} /> Real-time</div>
                </div>
              </div>

              {/* Recent Calls Table */}
              <div className="glass-panel-refined rounded-sm border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-light">Recent Calls</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-xs uppercase tracking-widest text-gray-500">
                      <tr>
                        <th className="text-left py-4 px-4 sm:px-6">Caller</th>
                        <th className="text-left py-4 px-4 sm:px-6 hidden sm:table-cell">Type</th>
                        <th className="text-left py-4 px-4 sm:px-6 hidden md:table-cell">Status</th>
                        <th className="text-right py-4 px-4 sm:px-6">Saved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {calls.map((call) => (
                        <tr key={call.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 sm:px-6">
                            <p className="font-medium">{call.caller}</p>
                            <p className="text-xs text-gray-500 mt-1">{call.time}</p>
                          </td>
                          <td className="py-4 px-4 sm:px-6 hidden sm:table-cell text-gray-400">{call.type}</td>
                          <td className="py-4 px-4 sm:px-6 hidden md:table-cell">
                            <span className={`px-2 py-1 rounded-sm text-[10px] uppercase tracking-widest ${call.status === 'Completed' ? 'bg-green-900/30 text-green-400' : call.status === 'Booked' ? 'bg-blue-900/30 text-blue-400' : 'bg-gray-800 text-gray-400'}`}>{call.status}</span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right font-medium text-[#d4af37]">{call.saved}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calls' && (
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-light mb-6">Complete Call History</h2>
              <p className="text-gray-500">Full call log functionality coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}