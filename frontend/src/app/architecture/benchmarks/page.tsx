"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function ArchitectureBenchmarksPage() {
  const lineData = [
    { time: '10:00', throughput: 4000, latency: 120 },
    { time: '10:05', throughput: 3000, latency: 139 },
    { time: '10:10', throughput: 2000, latency: 980 },
    { time: '10:15', throughput: 2780, latency: 390 },
    { time: '10:20', throughput: 1890, latency: 480 },
    { time: '10:25', throughput: 2390, latency: 380 },
    { time: '10:30', throughput: 3490, latency: 430 },
  ];

  const barData = [
    { name: 'Baseline', score: 75 },
    { name: 'Candidate A', score: 82 },
    { name: 'Candidate B', score: 88 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Architecture Benchmarks</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Throughput vs Latency (Load Test)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="throughput" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="latency" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Fitness Score Comparison</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
