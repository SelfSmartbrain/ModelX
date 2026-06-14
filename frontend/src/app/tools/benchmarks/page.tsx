"use client";

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import { Activity, Zap, ShieldAlert, Cpu } from 'lucide-react';

const LATENCY_DATA = [
  { time: '10:00', python_executor: 45, postgres_query: 120, web_search: 800 },
  { time: '10:05', python_executor: 48, postgres_query: 125, web_search: 850 },
  { time: '10:10', python_executor: 42, postgres_query: 110, web_search: 780 },
  { time: '10:15', python_executor: 47, postgres_query: 130, web_search: 900 },
  { time: '10:20', python_executor: 50, postgres_query: 140, web_search: 820 },
  { time: '10:25', python_executor: 43, postgres_query: 115, web_search: 810 },
];

const SUCCESS_RATE_DATA = [
  { name: 'python_executor', success: 99.9, fail: 0.1 },
  { name: 'postgres_query', success: 95.4, fail: 4.6 },
  { name: 'web_search', success: 98.0, fail: 2.0 },
  { name: 'image_extractor', success: 85.0, fail: 15.0 },
];

export default function ToolBenchmarksPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tool Benchmarks</h1>
        <p className="text-gray-500 mt-2">Real-time performance metrics across all autonomous tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Avg Latency', value: '245ms', icon: <Zap className="w-5 h-5 text-yellow-500" />, trend: '-12ms' },
          { title: 'Global Success Rate', value: '97.2%', icon: <Activity className="w-5 h-5 text-green-500" />, trend: '+0.4%' },
          { title: 'Total Executions', value: '1.2M', icon: <Cpu className="w-5 h-5 text-blue-500" />, trend: '+45k' },
          { title: 'Error Rate', value: '2.8%', icon: <ShieldAlert className="w-5 h-5 text-red-500" />, trend: '-0.4%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              {stat.icon}
            </div>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Latency Trends (ms)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LATENCY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="python_executor" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="postgres_query" stroke="#10B981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="web_search" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Success vs Failure Rates (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUCCESS_RATE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Bar dataKey="success" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="fail" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
