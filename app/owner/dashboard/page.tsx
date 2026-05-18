'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Users, DollarSign, Phone, Server, Lock, LogOut, 
  RefreshCw, AlertCircle, CheckCircle, Clock, Globe, Shield, Menu, X, Trash2, Play, Pause
} from 'lucide-react';

const MOCK_TENANTS = [
  { id: '1', name: "Juan's Premium Plumbing", status: 'active', calls: 1284, revenue: '$12,450', uptime: '99.9%' },
  { id: '2', name: 'Miami HVAC Pros', status: 'active', calls: 850, revenue: '$8,200', uptime: '98.5%' },
  { id: '3', name: 'Austin Electric', status: 'warning', calls: 420, revenue: '$3,100', uptime: '94.2%' },
  { id: '4', name: 'Denver Roofing', status: 'active', calls: 210, revenue: '$1,500', uptime: '99.1%' },
];

export default function OwnerDashboard() {
  const [view, setView] = useState<'overview' | 'tenants' | 'logs'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const auth = typeof window !== 'undefined' ? localStorage.getItem('owner_auth') : null;
    if (!auth) window.location.href = '/owner';
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('owner_auth');
      window.location.href = '/owner';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden font-mono">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-red-900/30 transform transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:static`}>
        <div className="h-full flex flex-col p-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-red-500 mb-1">
              <Shield size={24} />
              <h1 className="text-xl font-bold tracking-widest uppercase">Owner OS</h1>
            </div>
            <p className="text-xs text-red-900/60">GLOBAL COMMAND</p>
          </div>
          <nav className="flex flex-col gap-2 flex-1">
            <button onClick={() => setView('overview')} className={`text-left px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${view === 'overview' ? 'bg-red-900/20 text-red-500 border-l-2 border-red-500' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Overview</button>
            <button onClick={() => setView('tenants')} className={`text-left px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${view === 'tenants' ? 'bg-red-900/20 text-red-500 border-l-2 border-red-500' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Tenants</button>
            <button onClick={() => setView('logs')} className={`text-left px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${view === 'logs' ? 'bg-red-900/20 text-red-500 border-l-2 border-red-500' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>System Logs</button>
          </nav>
          <div className="mt-auto pt-6 border-t border-red-900/30">
            <button onClick={handleLogout} className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-wider w-full">
              <LogOut size={16} /> Terminate Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black">
        <div className="lg:hidden p-4 border-b border-red-900/30 flex items-center justify-between bg-black/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-2 text-red-500"><Shield size={20} /><span className="font-bold uppercase">Owner OS</span></div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
        <div className="p-8 max-w-7xl mx-auto">
          {view === 'overview' && <Overview />}
          {view === 'tenants' && <Tenants />}
          {view === 'logs' && <Logs />}
        </div>
      </main>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold uppercase tracking-widest">Global Overview</h2>
        <div className="flex items-center gap-2 text-green-500 text-xs font-mono bg-green-900/10 px-3 py-1 rounded border border-green-900/30"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> SYSTEMS NORMAL</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Daily Revenue" value="$14,250" icon={DollarSign} color="text-green-500" />
        <StatCard title="Total Calls" value="3,842" icon={Phone} color="text-blue-500" />
        <StatCard title="Active Agents" value="142" icon={Users} color="text-purple-500" />
        <StatCard title="API Latency" value="24ms" icon={Activity} color="text-orange-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded border border-red-900/30 bg-black/40">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider flex items-center gap-2"><Server size={18} className="text-red-500"/> Resources</h3>
          <div className="space-y-4"><ProgressBar label="CPU Load" value={42} color="bg-red-600" /><ProgressBar label="Memory" value={68} color="bg-purple-600" /><ProgressBar label="Storage" value={45} color="bg-blue-600" /></div>
        </div>
        <div className="glass-panel p-6 rounded border border-red-900/30 bg-black/40">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider flex items-center gap-2"><Globe size={18} className="text-blue-500"/> Network</h3>
          <div className="space-y-4 text-sm font-mono">
            <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500">Cloudflare</span> <span className="text-green-500">CONNECTED</span></div>
            <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500">Database</span> <span className="text-green-500">HEALTHY</span></div>
            <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-500">Stripe API</span> <span className="text-green-500">ACTIVE</span></div>
            <div className="flex justify-between pt-2"><span className="text-slate-500">Twilio</span> <span className="text-green-500">OPERATIONAL</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tenants() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold uppercase tracking-widest">Tenant Management</h2>
      <div className="glass-panel rounded border border-red-900/30 bg-black/40 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-red-950/20 text-red-500 uppercase tracking-wider font-bold border-b border-red-900/30">
            <tr>
              <th className="p-4">Business</th>
              <th className="p-4">Status</th>
              <th className="p-4">Calls</th>
              <th className="p-4">Revenue</th>
              <th className="p-4">Uptime</th>
              <th className="p-4 text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-900/10">
            {MOCK_TENANTS.map((t) => (
              <tr key={t.id} className="hover:bg-red-900/10 transition-colors">
                <td className="p-4 font-bold text-white">{t.name}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold uppercase ${t.status === 'active' ? 'bg-green-900/20 text-green-500' : 'bg-yellow-900/20 text-yellow-500'}`}>{t.status}</span></td>
                <td className="p-4 font-mono">{t.calls}</td>
                <td className="p-4 text-green-500">{t.revenue}</td>
                <td className="p-4 font-mono">{t.uptime}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button className="p-2 hover:bg-blue-900/30 text-slate-400 hover:text-blue-500 rounded transition-colors"><Play size={16} /></button>
                  <button className="p-2 hover:bg-red-900/30 text-slate-400 hover:text-red-500 rounded transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Logs() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold uppercase tracking-widest">System Logs</h2>
      <div className="glass-panel p-6 rounded border border-red-900/30 bg-black/80 font-mono text-sm text-green-500 h-[600px] overflow-y-auto space-y-1">
        <p><span className="text-slate-600">[SYSTEM]</span> Owner Dashboard initialized...</p>
        <p><span className="text-slate-600">[DB]</span> Connected to TenantDB</p>
        <p><span className="text-slate-600">[API]</span> Listening on port 8001</p>
        <p><span className="text-slate-600">[CALL]</span> Incoming call detected</p>
        <p><span className="text-slate-600">[AI]</span> Agent session #99281 started</p>
        <p><span className="text-slate-600">[STRIPE]</span> Payment verified $299.00</p>
        <p className="animate-pulse mt-4 text-red-500">_ Listening for events...</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="glass-panel p-6 rounded border border-red-900/30 bg-black/40">
      <div className="flex items-center justify-between mb-4"><span className="text-slate-500 text-xs uppercase tracking-wider">{title}</span><Icon className={color} size={24} /></div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

function ProgressBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1"><span className="text-slate-500 uppercase">{label}</span><span className="text-white">{value}%</span></div>
      <div className="w-full bg-white/5 rounded-sm h-2"><div className={`h-2 rounded-sm ${color}`} style={{ width: `${value}%` }} /></div>
    </div>
  );
}