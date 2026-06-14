"use client";

import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Wrench, TrendingUp, DollarSign, Repeat } from "lucide-react";

const mockSkillData = [
  { week: "W1", reuseRate: 15, perfGain: 5, roi: 10 },
  { week: "W2", reuseRate: 25, perfGain: 12, roi: 22 },
  { week: "W3", reuseRate: 40, perfGain: 28, roi: 45 },
  { week: "W4", reuseRate: 65, perfGain: 42, roi: 70 },
  { week: "W5", reuseRate: 85, perfGain: 55, roi: 110 },
  { week: "W6", reuseRate: 110, perfGain: 70, roi: 160 },
];

const mockSkillsList = [
  { id: 1, name: "WebScraping_V2", calls: 1450, reuse: "94%", roi: "+120%", status: "Stable" },
  { id: 2, name: "DataNormalization", calls: 890, reuse: "85%", roi: "+85%", status: "Stable" },
  { id: 3, name: "APISynthesis", calls: 420, reuse: "62%", roi: "+45%", status: "Learning" },
  { id: 4, name: "DOMParser_Fast", calls: 310, reuse: "45%", roi: "+30%", status: "Learning" },
  { id: 5, name: "CodeAnalyzer", calls: 120, reuse: "18%", roi: "+5%", status: "New" },
];

export default function SkillValidationDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skill Validation & ROI</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Skills</h3>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
              <Wrench size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">42</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>+5 this week</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Global Reuse Rate</h3>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
              <Repeat size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">78%</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>+12% this week</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Performance Gain</h3>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">3.5x</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>Execution speedup</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Estimated ROI</h3>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600 dark:text-yellow-400">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">160%</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span>Token savings vs cost</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Skill Validation Trends</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mockSkillData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="week" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="reuseRate" name="Reuse Rate" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="left" type="monotone" dataKey="perfGain" name="Perf Gain (%)" stroke="#10B981" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI (%)" stroke="#F59E0B" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Skills</h3>
          <div className="flex-1 overflow-auto">
            <div className="space-y-4">
              {mockSkillsList.map((skill) => (
                <div key={skill.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      skill.status === 'Stable' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      skill.status === 'Learning' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {skill.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Calls: {skill.calls}</span>
                    <span>Reuse: {skill.reuse}</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">ROI: {skill.roi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
