"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockLongTermFitness = [
  { day: 'Day 1', fitness: 0.70 },
  { day: 'Day 2', fitness: 0.72 },
  { day: 'Day 3', fitness: 0.73 },
  { day: 'Day 4', fitness: 0.76 },
  { day: 'Day 5', fitness: 0.81 },
  { day: 'Day 6', fitness: 0.84 },
  { day: 'Day 7', fitness: 0.88 },
  { day: 'Day 8', fitness: 0.90 },
  { day: 'Day 9', fitness: 0.92 },
  { day: 'Day 10', fitness: 0.94 },
];

export default function FitnessTrackingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Long Horizon Fitness (10 Days)</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Overall Fitness Trajectory</h2>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockLongTermFitness}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0.5, 1]} />
              <Tooltip />
              <Area type="monotone" dataKey="fitness" stroke="#8b5cf6" fill="#c4b5fd" name="Best Fitness" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow border border-gray-100">
          <h3 className="font-semibold text-gray-700">24h Gain</h3>
          <p className="text-2xl font-bold text-green-600">+0.02</p>
        </div>
        <div className="bg-white p-4 rounded shadow border border-gray-100">
          <h3 className="font-semibold text-gray-700">72h Gain</h3>
          <p className="text-2xl font-bold text-green-600">+0.06</p>
        </div>
        <div className="bg-white p-4 rounded shadow border border-gray-100">
          <h3 className="font-semibold text-gray-700">7d Gain</h3>
          <p className="text-2xl font-bold text-green-600">+0.21</p>
        </div>
      </div>
    </div>
  );
}
