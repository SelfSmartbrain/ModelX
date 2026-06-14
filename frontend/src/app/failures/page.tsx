"use client";

import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ShieldAlert, AlertOctagon } from 'lucide-react';

const failureFrequencyData = [
  { name: 'Mon', apiErrors: 4, syntaxErrors: 2, logicFailures: 1 },
  { name: 'Tue', apiErrors: 3, syntaxErrors: 1, logicFailures: 0 },
  { name: 'Wed', apiErrors: 7, syntaxErrors: 4, logicFailures: 2 },
  { name: 'Thu', apiErrors: 2, syntaxErrors: 0, logicFailures: 1 },
  { name: 'Fri', apiErrors: 5, syntaxErrors: 2, logicFailures: 0 },
  { name: 'Sat', apiErrors: 1, syntaxErrors: 0, logicFailures: 0 },
  { name: 'Sun', apiErrors: 2, syntaxErrors: 1, logicFailures: 0 },
];

const severityDistributionData = [
  { name: 'Critical', value: 3, color: '#ef4444' }, // red-500
  { name: 'High', value: 12, color: '#f97316' }, // orange-500
  { name: 'Medium', value: 24, color: '#eab308' }, // yellow-500
  { name: 'Low', value: 45, color: '#3b82f6' }, // blue-500
];

export default function FailuresPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Failure Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Detailed breakdown of execution anomalies and error severity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-300">Critical Failures</p>
            <p className="text-2xl font-bold text-red-900 dark:text-red-100">3</p>
          </div>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-full text-orange-600 dark:text-orange-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-orange-800 dark:text-orange-300">High Severity</p>
            <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">12</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Mitigated Automatically</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">84%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Failure Frequency (Past 7 Days)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failureFrequencyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="name" className="text-slate-600 dark:text-slate-400" />
                <YAxis className="text-slate-600 dark:text-slate-400" />
                <Tooltip 
                  cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="apiErrors" name="API Errors" stackId="a" fill="#3b82f6" />
                <Bar dataKey="syntaxErrors" name="Syntax Errors" stackId="a" fill="#f59e0b" />
                <Bar dataKey="logicFailures" name="Logic Failures" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Severity Distribution</h2>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
