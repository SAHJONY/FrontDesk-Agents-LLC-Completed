'use client';

import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

// --- 3D Avatar Component (Customer Facing) ---
function CustomerAvatar({ status }: { status: 'listening' | 'speaking' | 'processing' }) {
  const meshRef = React.useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Reacts to status
      const distort = status === 'speaking' ? 0.6 : status === 'listening' ? 0.3 : 0.1;
      meshRef.current.material.distort = distort;
      meshRef.current.rotation.x = Math.cos(t / 4) / 2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    }
  });

  const getColor = () => {
    if (status === 'speaking') return '#fbbf24'; // Gold when speaking
    if (status === 'listening') return '#38bdf8'; // Blue when listening
    return '#94a3b8'; // Gray when processing
  };

  return (
    <Sphere args={[1, 100, 100]} scale={2.5} ref={meshRef}>
      <MeshDistortMaterial
        color={getColor()}
        attach="material"
        distort={0.4}
        speed={status === 'speaking' ? 10 : 2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function ClientPortal() {
  const params = useParams();
  const businessName = (params?.business || 'Demo') as string;
  const [status, setStatus] = useState<'listening' | 'speaking' | 'processing'>('listening');
  const [transcript, setTranscript] = useState<string[]>([]);
  const [appointment, setAppointment] = useState<string | null>(null);

  // Simulate Customer Experience (In real app, this connects via WebSocket to backend)
  useEffect(() => {
    const sequence = [
      { t: 1000, msg: "AI: Thank you for calling " + businessName + ". How can I help?" },
      { t: 4000, msg: "You: I have a leaky pipe." },
      { t: 6000, msg: "AI: I understand. Is this an emergency?" },
      { t: 9000, msg: "You: Yes, water is everywhere!" },
      { t: 12000, msg: "AI: Dispatching emergency team. Booking appointment..." },
      { t: 15000, action: 'booked' }
    ];

    let timeouts: NodeJS.Timeout[] = [];

    sequence.forEach(({ t, msg, action }: any) => {
      const timeout = setTimeout(() => {
        if (action === 'booked') {
          setAppointment("Emergency Dispatch Scheduled - 15 mins");
          setStatus('listening');
        } else {
          setTranscript(prev => [...prev, msg]);
          setStatus(msg.startsWith('AI') ? 'speaking' : 'listening');
        }
      }, t / 1000 * 1000); // Simplified for demo
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [businessName]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black z-0" />
      
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center glass-panel border-b-0 border-l-0 border-r-0">
        <div>
          <h1 className="text-2xl font-bold text-white capitalize">{businessName}</h1>
          <p className="text-slate-400 text-sm">AI Receptionist Active</p>
        </div>
        <div className="flex items-center gap-2 text-green-500 bg-green-900/20 px-3 py-1 rounded-full text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          LIVE CALL
        </div>
      </div>

      {/* 3D Avatar Stage */}
      <div className="relative z-10 w-full h-1/2 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <CustomerAvatar status={status} />
        </Canvas>
        
        {/* Status Text */}
        <div className="absolute bottom-10 text-center">
          <motion.div 
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-light text-white tracking-widest uppercase"
          >
            {status === 'listening' && "Listening..."}
            {status === 'speaking' && "AI Speaking..."}
            {status === 'processing' && "Processing..."}
          </motion.div>
        </div>
      </div>

      {/* Transcript / Appointment Card */}
      <div className="relative z-20 w-full max-w-md p-6 glass-panel rounded-t-3xl border-t border-white/10 min-h-[300px]">
        {appointment ? (
          <div className="flex flex-col items-center justify-center h-full py-10">
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Appointment Confirmed</h2>
            <p className="text-slate-400 text-center">{appointment}</p>
            <p className="text-slate-500 text-sm mt-4">A technician has been dispatched.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-mono text-slate-500 uppercase mb-4">Live Transcript</h3>
            {transcript.map((line, idx) => (
              <div key={idx} className={`p-3 rounded-lg text-sm ${line.startsWith('AI') ? 'bg-blue-900/30 text-blue-200 ml-4' : 'bg-slate-800 text-slate-300 mr-4'}`}>
                {line}
              </div>
            ))}
            {transcript.length === 0 && (
              <p className="text-slate-600 text-center italic">Call in progress...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
