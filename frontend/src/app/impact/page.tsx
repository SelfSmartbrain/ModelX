"use client";

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockImpactData = [
  { month: 'Jan', costSaved: 4000, efficiencyGain: 2400, riskReduction: 2400 },
  { month: 'Feb', costSaved: 3000, efficiencyGain: 1398, riskReduction: 2210 },
  { month: 'Mar', costSaved: 2000, efficiencyGain: 9800, riskReduction: 2290 },
  { month: 'Apr', costSaved: 2780, efficiencyGain: 3908, riskReduction: 2000 },
  { month: 'May', costSaved: 1890, efficiencyGain: 4800, riskReduction: 2181 },
  { month: 'Jun', costSaved: 2390, efficiencyGain: 3800, riskReduction: 2500 },
  { month: 'Jul', costSaved: 3490, efficiencyGain: 4300, riskReduction: 2100 },
];

export default function ImpactValidation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold">External Impact Validation Dashboard</h1>
      <p className="text-gray-600">Quantifiable metrics on how autonomous operations impact the broader ecosystem.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Cost Saved (YTD)</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">$142,500</p>
          <p className="text-sm text-green-500 mt-1">↑ 12% vs last year</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">Efficiency Gains (Hrs)</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,240 hrs</p>
          <p className="text-sm text-blue-500 mt-1">↑ 8% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">Risk Incidents Avoided</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">45</p>
          <p className="text-sm text-purple-500 mt-1">AI preventive actions</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow h-96">
        <h2 className="text-xl font-semibold mb-4">Impact Trends</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockImpactData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="costSaved" stroke="#10b981" activeDot={{ r: 8 }} name="Cost Saved ($)" />
            <Line type="monotone" dataKey="efficiencyGain" stroke="#3b82f6" name="Efficiency Gain (units)" />
            <Line type="monotone" dataKey="riskReduction" stroke="#8b5cf6" name="Risk Reduction Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
