"use client";

import React from "react";
import { BookOpen, BarChart3, Zap, CheckCircle2, Search } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const skills = [
  { id: "sk_1", name: "workflow_pattern_abc", category: "Workflow", usageCount: 1432, successRate: 98, lastUsed: "2 mins ago" },
  { id: "sk_2", name: "error_recovery_xyz", category: "Recovery", usageCount: 856, successRate: 85, lastUsed: "15 mins ago" },
  { id: "sk_3", name: "data_extraction_v2", category: "Extraction", usageCount: 2105, successRate: 92, lastUsed: "1 hour ago" },
  { id: "sk_4", name: "api_fallback_handler", category: "Network", usageCount: 420, successRate: 76, lastUsed: "3 hours ago" },
];

const usageTrendData = [
  { day: "Mon", usage: 120 },
  { day: "Tue", usage: 200 },
  { day: "Wed", usage: 150 },
  { day: "Thu", usage: 320 },
  { day: "Fri", usage: 280 },
  { day: "Sat", usage: 450 },
  { day: "Sun", usage: 400 },
];

export default function SkillsRegistryPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skill Registry</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">View discovered skills, usage analytics, and success rates.</p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search skills..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
              Discovered Skills
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Skill Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage Count</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Success Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {skills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Zap className="flex-shrink-0 h-5 w-5 text-yellow-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {skill.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {skill.usageCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CheckCircle2 className={`h-4 w-4 mr-1 ${skill.successRate >= 90 ? 'text-green-500' : skill.successRate >= 80 ? 'text-yellow-500' : 'text-red-500'}`} />
                        <span className="text-sm text-gray-900 dark:text-gray-100">{skill.successRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Overall Usage Trend</h2>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" vertical={false} />
                <XAxis dataKey="day" className="text-xs text-gray-500" tickLine={false} axisLine={false} />
                <YAxis className="text-xs text-gray-500" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '0.375rem' }}
                />
                <Line type="monotone" dataKey="usage" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Skills Learned</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Executions</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">12,450</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
