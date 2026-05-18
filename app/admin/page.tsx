'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Users, DollarSign, Phone, Server, Lock, LogOut, 
  RefreshCw, AlertCircle, CheckCircle, Clock, Globe, Shield
} from 'lucide-react';

// Mock Data for "God View" (In reality, this fetches from your TenantDB)
const MOCK_TENANTS = [
  { id: '1', name: "Juan's Premium Plumbing", status: 'active', calls: 1284, revenue: '$12,450', uptime: '99.9%' },
  { id: '2', name: 'Miami HVAC Pros', status: 'active', calls: 850, revenue: '$8,200', uptime: '98.5%' },
  { id: '3', name: 'Austin Electric', status: 'warning', calls: 420, revenue: '$3,100', uptime: '94.2%' },
  { id: '4', name: 'Denver Roofing', status: 'active', calls: 210, revenue: '$1,500', uptime: '99.1%' },
];

const MOCK_SYSTEM = {
  cpu: 42,
  ram: 68,
  apiLatency: 24,
  activeAgents: 142,
  totalCallsToday: 3842,
  revenueToday: '$14,250'
};

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tenants, setTenants] = useState(MOCK_TENANTS);
  const [system, setSystem] = useState(MOCK_SYSTEM);
  const [view, setView] = useState<'overview' | 'tenants' | 'logs'>('overview');

  // Simple Auth Check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'SAHJONY2024') { // MASTER KEY
      setAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Access Denied. Invalid Master Key.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') setAuthenticated(true);
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,78,216,0.1),transparent_70%)]" />
        <div className="relative z-10 w-full max-w-md">
          <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center">
            <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-red-500" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Super Admin Access</h1>
            <p className="text-slate-400 mb-6">Restricted to Owner Only</p>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/60 border border-red-500/30 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-red-500"
                placeholder="Enter Master Key"
              />
              <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-all">
                Unlock God View
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-md fixed h-full p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">GOD VIEW</h1>
          <p className="text-xs text-slate-500">System Control Center</p>
        </div>
        <nav className="flex flex-col gap-2">
          <button onClick={() => setView('overview')} className={`text-left px-4 py-2 rounded-lg ${view === 'overview' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Overview</button>
          <button onClick={() => setView('tenants')} className={`text-left px-4 py-2 rounded-lg ${view === 'tenants' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Tenants</button>
          <button onClick={() => setView('logs')} className={`text-left px-4 py-2 rounded-lg ${view === 'logs' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Live Logs</button>
        </nav>
        <div className="mt-auto">
          <button onClick={() => { setAuthenticated(false); localStorage.removeItem('admin_auth'); }} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        {view === 'overview' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Global Overview</h2>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> System Operational
              </div>
            </div>
            
            {/* Global Stats */}
            <div className="grid grid-cols-4 gap-6">
              <StatCard title="Total Revenue (Today)" value={system.revenueToday} icon={DollarSign} color="text-green-400" />
              <StatCard title="Total Calls (Today)" value={system.totalCallsToday.toLocaleString()} icon={Phone} color="text-blue-400" />
              <StatCard title="Active Agents" value={system.activeAgents} icon={Users} color="text-purple-400" />
              <StatCard title="API Latency" value={`${system.apiLatency}ms`} icon={Activity} color="text-orange-400" />
            </div>

            {/* System Health */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Server size={20} /> Server Resources</h3>
                <div className="space-y-4">
                  <ProgressBar label="CPU Usage" value={system.cpu} color="bg-blue-500" />
                  <ProgressBar label="RAM Usage" value={system.ram} color="bg-purple-500" />
                  <ProgressBar label="Disk Usage" value={45} color="bg-green-500" />
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Globe size={20} /> Network Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm"><span className="text-slate-400">Cloudflare Tunnel</span> <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14} /> Connected</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-400">Database</span> <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14} /> Healthy</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-400">Stripe API</span> <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14} /> Active</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'tenants' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Tenant Management</h2>
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-400 text-sm">
                  <tr>
                    <th className="p-4">Business</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Calls</th>
                    <th className="p-4">Revenue</th>
                    <th className="p-4">Uptime</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tenants.map((t) => (
                    <tr key={t.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold">{t.name}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${t.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">{t.calls}</td>
                      <td className="p-4 text-green-400">{t.revenue}</td>
                      <td className="p-4">{t.uptime}</td>
                      <td className="p-4 text-right">
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {view === 'logs' && (
           <div className="space-y-6">
           <h2 className="text-3xl font-bold">Live System Logs</h2>
           <div className="glass-panel p-6 rounded-2xl border border-white/10 font-mono text-sm text-green-400 h-[600px] overflow-y-auto space-y-1">
             <p><span className="text-slate-500">[SYSTEM]</span> Initializing God View...</p>
             <p><span className="text-slate-500">[DB]</span> Connected to TenantDB</p>
             <p><span className="text-slate-500">[API]</span> Listening on port 8001</p>
             <p><span className="text-slate-500">[CALL]</span> Incoming call detected</p>
             <p><span className="text-slate-500">[AI]</span> Agent session started #99281</p>
             <p><span className="text-slate-500">[STRIPE]</span> Payment verified $299.00</p>
             <p><span className="text-slate-500">[CALL]</span> Call completed (4m 20s)</p>
             <p className="animate-pulse mt-4">_ Listening for events...</p>
           </div>
         </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-sm">{title}</span>
        <Icon className={color} size={24} />
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

function ProgressBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}