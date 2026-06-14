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
import { Cpu, MemoryStick, HeartPulse, Clock } from "lucide-react";

const mockSystemData = [
  { time: "10:00", cpu: 45, memory: 60, activeWorkers: 10 },
  { time: "10:05", cpu: 55, memory: 62, activeWorkers: 12 },
  { time: "10:10", cpu: 85, memory: 70, activeWorkers: 15 },
  { time: "10:15", cpu: 65, memory: 68, activeWorkers: 12 },
  { time: "10:20", cpu: 40, memory: 65, activeWorkers: 8 },
  { time: "10:25", cpu: 50, memory: 66, activeWorkers: 10 },
  { time: "10:30", cpu: 45, memory: 64, activeWorkers: 10 },
];

const mockWorkers = [
  { id: "worker-alpha", status: "healthy", tasks: 45, uptime: "48h 12m" },
  { id: "worker-beta", status: "healthy", tasks: 42, uptime: "48h 10m" },
  { id: "worker-gamma", status: "warning", tasks: 89, uptime: "24h 05m" },
  { id: "worker-delta", status: "error", tasks: 0, uptime: "0h 0m" },
  { id: "worker-epsilon", status: "healthy", tasks: 35, uptime: "12h 30m" },
];

export default function StabilityDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Stability</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">CPU Usage</h3>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
              <Cpu size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">45%</p>
          <p className="text-sm text-green-600 mt-2">Stable</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Memory Usage</h3>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
              <MemoryStick size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">64%</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-2">Moderate load</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">System Uptime</h3>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">99.9%</p>
          <p className="text-sm text-green-600 mt-2">No recent outages</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Worker Health</h3>
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
              <HeartPulse size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">10 / 12</p>
          <p className="text-sm text-red-600 mt-2">1 Error, 1 Warning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Usage Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resource Utilization (Last 30m)</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSystemData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
                />
                <Legend />
                <Line type="monotone" dataKey="cpu" name="CPU (%)" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="memory" name="Memory (%)" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Worker Status List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Workers</h3>
          <div className="flex-1 overflow-auto">
            <div className="space-y-3">
              {mockWorkers.map((worker) => (
                <div key={worker.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{worker.id}</span>
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                      worker.status === 'healthy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      worker.status === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {worker.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Tasks: {worker.tasks}</span>
                    <span>Uptime: {worker.uptime}</span>
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
