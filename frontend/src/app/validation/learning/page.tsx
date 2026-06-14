"use client";

import React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BookOpen, Zap, Target, Network } from "lucide-react";

const mockGrowthData = [
  { week: "W1", concepts: 150, relationships: 210 },
  { week: "W2", concepts: 230, relationships: 420 },
  { week: "W3", concepts: 380, relationships: 850 },
  { week: "W4", concepts: 510, relationships: 1250 },
  { week: "W5", concepts: 690, relationships: 1840 },
  { week: "W6", concepts: 880, relationships: 2500 },
];

const mockLearningMetrics = [
  { date: "Day 1", velocity: 12, gapClosure: 5 },
  { date: "Day 2", velocity: 15, gapClosure: 8 },
  { date: "Day 3", velocity: 18, gapClosure: 15 },
  { date: "Day 4", velocity: 16, gapClosure: 22 },
  { date: "Day 5", velocity: 22, gapClosure: 35 },
  { date: "Day 6", velocity: 25, gapClosure: 48 },
  { date: "Day 7", velocity: 30, gapClosure: 65 },
];

export default function LearningDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Knowledge Graph Nodes</h3>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Network size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">3,380</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>+850 this week</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Learning Velocity</h3>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600 dark:text-yellow-400">
              <Zap size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">30 / day</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>+5 from yesterday</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Knowledge Gap Closure</h3>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
              <Target size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">65%</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>+17% this week</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Concepts</h3>
            <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-cyan-600 dark:text-cyan-400">
              <BookOpen size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">880</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>+190 this week</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Knowledge Growth */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Knowledge Graph Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockGrowthData}>
                <defs>
                  <linearGradient id="colorConcepts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRels" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="week" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                />
                <Legend />
                <Area type="monotone" dataKey="relationships" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRels)" name="Relationships" />
                <Area type="monotone" dataKey="concepts" stroke="#3B82F6" fillOpacity={1} fill="url(#colorConcepts)" name="Concepts" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Learning Velocity & Gap Closure */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Velocity & Gap Closure</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockLearningMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="velocity" stroke="#F59E0B" strokeWidth={2} name="Velocity (concepts/day)" />
                <Line yAxisId="right" type="monotone" dataKey="gapClosure" stroke="#10B981" strokeWidth={2} name="Gap Closure (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
