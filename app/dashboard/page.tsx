'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, PhoneIncoming, PhoneMissed, Users, DollarSign, Activity, 
  Clock, CheckCircle, AlertCircle, Globe, Headphones, MessageSquare,
  BarChart3, TrendingUp, UserCheck
} from 'lucide-react';

// Mock Data for Demo Purposes (Simulating Live Calls)
const MOCK_CALLS = [
  { id: 1, caller: 'Maria Garcia', number: '+1 (555) 0123', type: 'Emergency', status: 'Completed', duration: '4:20', time: '2 mins ago', sentiment: 'Urgent', saved: '$450' },
  { id: 2, caller: 'John Doe', number: '+1 (555) 0198', type: 'Routine', status: 'Booked', duration: '2:15', time: '15 mins ago', sentiment: 'Happy', saved: '$150' },
  { id: 3, caller: 'Unknown', number: '+1 (555) 0987', type: 'Spam', status: 'Blocked', duration: '0:05', time: '1 hour ago', sentiment: 'Neutral', saved: '$0' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'settings'>('overview');
  const [clientData, setClientData] = useState<any>(null);
  const [calls, setCalls] = useState(MOCK_CALLS);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure client-side only rendering
  useEffect(() => {
    setMounted(true);
    // Simulate fetching private client data
    const token = typeof window !== 'undefined' ? localStorage.getItem('client_token') : null;
    
    // Mock data specific to this "client"
    setClientData({
      business_name: "Juan's Premium Plumbing",
      industry: "Plumbing",
      revenue: "$12,450",
      calls: 1284,
      appointments: 342
    });
    setLoading(false);
  }, []);

  if (!mounted || loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"/></div>;

  // Simulate a new call coming in every 30 seconds for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Only add if we have less than 10 mock calls to avoid memory leaks in demo
      if (calls.length < 10) {
        const newCall = {
          id: Date.now(),
          caller: 'New Customer',
          number: `+1 (555) ${Math.floor(Math.random() * 9000) + 1000}`,
          type: Math.random() > 0.5 ? 'Emergency' : 'Routine',
          status: 'Live',
          duration: '0:00',
          time: 'Just now',
          sentiment: 'Neutral',
          saved: '$0'
        };
        setCalls(prev => [newCall, ...prev]);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [calls.length]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-hidden">
      {/* Procedural Cinematic Background */}
      <div className="cinematic-ambience" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 z-10" />
      <div className="cinematic-grain absolute inset-0 z-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-20 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                <Activity className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  {clientData?.business_name || 'Loading...'}
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> System Operational
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <DashboardNavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<BarChart3 size={18} />} label="Overview" />
              <DashboardNavButton active={activeTab === 'calls'} onClick={() => setActiveTab('calls')} icon={<Phone size={18} />} label="Call Logs" />
              <DashboardNavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<UserCheck size={18} />} label="Settings" />
              <div className="h-8 w-px bg-white/10 mx-2" />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">Juan Gonzalez</p>
                  <p className="text-xs text-slate-400">Premium Plan</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-white/20 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Revenue Saved" 
            value="$12,450" 
            change="+18.2%" 
            icon={<DollarSign className="text-yellow-400" size={24} />} 
            color="from-yellow-500/20 to-orange-500/20"
            border="border-yellow-500/30"
          />
          <StatCard 
            title="Calls Handled" 
            value="1,284" 
            change="+12.5%" 
            icon={<PhoneIncoming className="text-blue-400" size={24} />} 
            color="from-blue-500/20 to-cyan-500/20"
            border="border-blue-500/30"
          />
          <StatCard 
            title="Appointments Booked" 
            value="342" 
            change="+8.1%" 
            icon={<CheckCircle className="text-green-400" size={24} />} 
            color="from-green-500/20 to-emerald-500/20"
            border="border-green-500/30"
          />
          <StatCard 
            title="Missed Opportunities" 
            value="3" 
            change="-45%" 
            icon={<PhoneMissed className="text-red-400" size={24} />} 
            color="from-red-500/20 to-rose-500/20"
            border="border-red-500/30"
          />
        </div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Recent Activity Feed */}
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Activity className="text-blue-400" size={20} /> Live Call Feed
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" /> LIVE
                    </span>
                  </div>
                  <div className="space-y-4">
                    {calls.slice(0, 5).map((call) => (
                      <div key={call.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${call.type === 'Emergency' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            <Phone size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{call.caller}</p>
                            <p className="text-sm text-slate-400">{call.number} • {call.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{call.status}</p>
                          <p className="text-sm text-slate-400">{call.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Agent Status */}
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Headphones className="text-purple-400" size={20} /> Agent Status
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                        <span className="font-bold text-white">Active & Listening</span>
                      </div>
                      <span className="text-xs text-purple-300 font-mono">Uptime: 99.9%</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Voice Accuracy</span>
                        <span className="text-white font-bold">98.5%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '98.5%' }} />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Sentiment Analysis</span>
                        <span className="text-white font-bold">Positive</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'calls' && (
            <motion.div 
              key="calls"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Call History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 text-sm">
                      <th className="pb-4 font-medium">Caller</th>
                      <th className="pb-4 font-medium">Type</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium">Duration</th>
                      <th className="pb-4 font-medium">Saved Revenue</th>
                      <th className="pb-4 font-medium text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {calls.map((call) => (
                      <tr key={call.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4">
                          <p className="font-bold">{call.caller}</p>
                          <p className="text-sm text-slate-400">{call.number}</p>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${call.type === 'Emergency' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {call.type}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="flex items-center gap-2 text-sm">
                            <span className={`w-2 h-2 rounded-full ${call.status === 'Completed' ? 'bg-green-500' : call.status === 'Live' ? 'bg-blue-500 animate-pulse' : 'bg-slate-500'}`} />
                            {call.status}
                          </span>
                        </td>
                        <td className="py-4 text-slate-300 font-mono">{call.duration}</td>
                        <td className="py-4 font-bold text-green-400">{call.saved}</td>
                        <td className="py-4 text-right text-slate-400 text-sm">{call.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
             <motion.div 
             key="settings"
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             exit={{ opacity: 0, y: -20 }}
             className="glass-panel p-6 rounded-2xl border border-white/10 max-w-2xl mx-auto"
           >
             <h3 className="text-2xl font-bold text-white mb-6">Agent Configuration</h3>
             <div className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-slate-400 mb-2">Business Name</label>
                 <input type="text" value="Juan's Premium Plumbing" readOnly className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-400 mb-2">Active Phone Number</label>
                 <div className="flex items-center gap-3">
                   <input type="text" value="+1 (855) 283-3652" readOnly className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                   <button className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors">Edit</button>
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-400 mb-2">Language Model</label>
                 <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
                   <option>Auto-Detect (Global)</option>
                   <option>English (US)</option>
                   <option>Spanish (ES)</option>
                   <option>French (FR)</option>
                 </select>
               </div>
               <div className="pt-4 border-t border-white/10">
                 <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                   Save Changes
                 </button>
               </div>
             </div>
           </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function DashboardNavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${active ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
      {icon} {label}
    </button>
  );
}

function StatCard({ title, value, change, icon, color, border }: { title: string, value: string, change: string, icon: React.ReactNode, color: string, border: string }) {
  const isPositive = change.startsWith('+');
  return (
    <div className={`glass-panel p-6 rounded-2xl border ${border} bg-gradient-to-br ${color} backdrop-blur-md`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10">{icon}</div>
        <span className={`text-sm font-bold ${isPositive ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingUp size={16} className="rotate-180" />} {change}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}
