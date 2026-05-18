'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Text, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Phone, PhoneOff, Mic, Shield, Zap, Users, DollarSign } from 'lucide-react';
import axios from 'axios';

// --- Configuration ---
const API_BASE = "https://usd-frost-mercury-lit.trycloudflare.com";
const AVATAR_COLOR = "#38bdf8"; // Sky blue

// --- 3D Avatar Component (The "Face" of the AI) ---
function AIAvatar({ isSpeaking, mood }: { isSpeaking: boolean; mood: string }) {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.cos(t / 4) / 2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2;
      meshRef.current.rotation.z = Math.sin(t / 1.5) / 2;
    }
  });

  const getColor = () => {
    if (mood === 'CRITICAL') return "#ef4444"; // Red for emergency
    if (mood === 'ACTIVE') return "#22c55e"; // Green for active
    return AVATAR_COLOR;
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1, 100, 100]} scale={2.2} ref={meshRef}>
        <MeshDistortMaterial
          color={getColor()}
          attach="material"
          distort={isSpeaking ? 0.6 : 0.3}
          speed={isSpeaking ? 10 : 2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      {/* Inner Core */}
      <Sphere args={[0.5, 32, 32]} scale={1.5}>
         <meshStandardMaterial color="white" emissive={getColor()} emissiveIntensity={2} toneMapped={false} />
      </Sphere>
    </Float>
  );
}

// --- Main App Component ---
export default function NexusPrime() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mood, setMood] = useState<'IDLE' | 'ACTIVE' | 'CRITICAL'>('IDLE');
  const [transcript, setTranscript] = useState<{role: string, content: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const [metrics, setMetrics] = useState({ calls: 0, revenue: 0 });
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Simulate Live Metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        calls: prev.calls + (Math.random() > 0.7 ? 1 : 0),
        revenue: prev.revenue + (Math.random() > 0.8 ? 250 : 0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const startCall = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/v1/call/start`, {
        caller_id: "+15550001111",
        target_number: "+18552833652",
        business_name: "Demo Plumbing Co.",
        service_area: "Houston, TX"
      });
      setSessionId(res.data.session_id);
      setIsConnected(true);
      setMood('ACTIVE');
      addMessage('AI', "Thank you for calling Demo Plumbing. This is your AI assistant. How can I help you?");
    } catch (e) {
      console.error("Connection failed", e);
    }
  };

  const endCall = async () => {
    if (sessionId) {
      await axios.post(`${API_BASE}/api/v1/call/end`, { session_id: sessionId });
    }
    setIsConnected(false);
    setSessionId(null);
    setMood('IDLE');
    addMessage('System', "Call ended.");
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !sessionId) return;
    
    const userMsg = inputText;
    setInputText('');
    addMessage('User', userMsg);
    setIsSpeaking(true);

    try {
      const res = await axios.post(`${API_BASE}/api/v1/call/process`, null, {
        params: { session_id: sessionId, user_input: userMsg }
      });
      
      const data = res.data;
      addMessage('AI', data.response_text);
      
      if (data.action === 'EMERGENCY_DISPATCH') setMood('CRITICAL');
      else if (data.action === 'BOOK_APPOINTMENT') setMood('ACTIVE');
      
      // Simulate speaking duration
      setTimeout(() => setIsSpeaking(false), 2000);
      
    } catch (e) {
      addMessage('System', "Error processing response.");
      setIsSpeaking(false);
    }
  };

  const addMessage = (role: string, content: string) => {
    setTranscript(prev => [...prev.slice(-10), { role, content }]);
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden flex flex-col md:flex-row">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black z-0" />
      
      {/* LEFT: 3D Avatar Stage */}
      <div className="relative z-10 w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center perspective-1000">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#38bdf8" />
          <AIAvatar isSpeaking={isSpeaking} mood={mood} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
        
        {/* Floating Status Badge */}
        <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel px-6 py-3 rounded-full flex items-center gap-3"
          >
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-white font-mono text-sm tracking-wider">
              {isConnected ? `AGENT ACTIVE // ${mood}` : 'SYSTEM STANDBY'}
            </span>
          </motion.div>
        </div>
      </div>

      {/* RIGHT: Control Panel & Transcript */}
      <div className="relative z-20 w-full md:w-1/2 h-1/2 md:h-full glass-panel border-l border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">NEXUS PRIME</h1>
            <p className="text-slate-400 text-xs font-mono">HERMES AGENT CORE v3.0</p>
          </div>
          <div className="flex gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>{metrics.calls} CALLS</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <DollarSign size={14} />
              <span>${metrics.revenue} SAVED</span>
            </div>
          </div>
        </div>

        {/* Transcript Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-sm">
          <AnimatePresence>
            {transcript.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.role === 'User' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === 'User' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'User' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : msg.role === 'System' ? 'bg-gray-700 text-gray-300 w-full text-center' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-white/10'
                }`}>
                  <span className="block text-xs opacity-50 mb-1">{msg.role}</span>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {!isConnected && transcript.length === 0 && (
            <div className="text-center text-slate-500 mt-20">
              <p>SYSTEM READY.</p>
              <p className="text-xs">CLICK &quot;INITIATE CALL&quot; TO BEGIN.</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-white/10 bg-black/40">
          {!isConnected ? (
            <button
              onClick={startCall}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.8)] flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              INITIATE CALL
            </button>
          ) : (
            <div className="flex gap-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type customer response..."
                className="flex-1 glass-input px-4 py-3 rounded-lg text-white placeholder-slate-500"
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim()}
                className="px-6 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2"
              >
                <Mic size={20} />
              </button>
              <button
                onClick={endCall}
                className="px-6 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all flex items-center gap-2"
              >
                <PhoneOff size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
