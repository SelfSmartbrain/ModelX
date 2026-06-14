"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Brain, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const mockTrendData = [
  { date: "2026-06-08", score: 82, completed: 120, failed: 15, interventions: 8 },
  { date: "2026-06-09", score: 84, completed: 135, failed: 12, interventions: 6 },
  { date: "2026-06-10", score: 83, completed: 128, failed: 14, interventions: 7 },
  { date: "2026-06-11", score: 87, completed: 150, failed: 10, interventions: 5 },
  { date: "2026-06-12", score: 89, completed: 165, failed: 8, interventions: 4 },
  { date: "2026-06-13", score: 92, completed: 180, failed: 5, interventions: 3 },
  { date: "2026-06-14", score: 95, completed: 200, failed: 3, interventions: 2 },
];

export default function AutonomyDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Autonomy Dashboard</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Autonomy Score</h3>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
              <Brain size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">95%</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>+3% from yesterday</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Goals Completed</h3>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
              <CheckCircle size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">200</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>+20 from yesterday</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Goals Failed</h3>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
              <XCircle size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>-2 from yesterday</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Interventions</h3>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
              <AlertTriangle size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">2</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>-1 from yesterday</span>
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Autonomy Score Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} name="Score (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Execution Metrics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Completed" />
                <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} name="Failed" />
                <Line type="monotone" dataKey="interventions" stroke="#F59E0B" strokeWidth={2} name="Interventions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
