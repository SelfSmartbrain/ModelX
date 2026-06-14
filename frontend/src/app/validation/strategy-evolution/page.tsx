"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Settings, Clock, Activity } from "lucide-react";

const mockComparisonData = [
  { metric: "Quality Score", v1: 72, v2: 91 },
  { metric: "Success Rate (%)", v1: 65, v2: 94 },
  { metric: "Resource Eff. (%)", v1: 50, v2: 85 },
  { metric: "Reliability (%)", v1: 68, v2: 96 },
];

const mockTimelineData = [
  { epoch: "E1", v1Cost: 120, v2Cost: 80, v1Duration: 45, v2Duration: 25 },
  { epoch: "E2", v1Cost: 115, v2Cost: 75, v1Duration: 42, v2Duration: 23 },
  { epoch: "E3", v1Cost: 110, v2Cost: 72, v1Duration: 40, v2Duration: 20 },
  { epoch: "E4", v1Cost: 112, v2Cost: 65, v1Duration: 43, v2Duration: 18 },
  { epoch: "E5", v1Cost: 105, v2Cost: 60, v1Duration: 39, v2Duration: 15 },
];

export default function StrategyEvolutionDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Strategy Evolution (V1 vs V2)</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="text-blue-500" size={24} />
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Quality Gain</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">+26.4%</p>
          <p className="text-sm text-green-600 mt-1">V2 vs V1 Average</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="text-green-500" size={24} />
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Success Rate Gain</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">+44.6%</p>
          <p className="text-sm text-green-600 mt-1">V2 vs V1 Average</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <Settings className="text-purple-500" size={24} />
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Cost Reduction</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">-42.8%</p>
          <p className="text-sm text-green-600 mt-1">V2 vs V1 Token Usage</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="text-amber-500" size={24} />
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Speed Increase</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">61.5%</p>
          <p className="text-sm text-green-600 mt-1">Faster execution time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Quality & Success */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Metrics Comparison</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockComparisonData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#6B7280" fontSize={12} />
                <YAxis dataKey="metric" type="category" stroke="#6B7280" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                  cursor={{ fill: '#374151', opacity: 0.1 }}
                />
                <Legend />
                <Bar dataKey="v1" name="V1 Strategy" fill="#9CA3AF" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="v2" name="V2 Strategy" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart - Cost & Duration Over Time */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Cost & Duration Timeline</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="epoch" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="v1Cost" name="V1 Cost" stroke="#9CA3AF" strokeDasharray="5 5" />
                <Line yAxisId="left" type="monotone" dataKey="v2Cost" name="V2 Cost" stroke="#10B981" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="v1Duration" name="V1 Duration (s)" stroke="#D1D5DB" strokeDasharray="5 5" />
                <Line yAxisId="right" type="monotone" dataKey="v2Duration" name="V2 Duration (s)" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
