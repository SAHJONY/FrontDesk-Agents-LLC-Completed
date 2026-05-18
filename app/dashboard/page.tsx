'use client';
import React from 'react';

// Simple placeholder for the dashboard until we refactor the old code
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-slate-400">Real-time metrics and call logs.</p>
        <a href="/" className="inline-block mt-4 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500">Back to Home</a>
      </div>
    </div>
  );
}
