"use client";

import React from "react";
import { TrendingUp, TrendingDown, DollarSign, Clock, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const topStrategies = [
  { id: "str_1", name: "Multi-Agent Code Generation", successRate: 94, cost: 0.15, duration: 120 },
  { id: "str_2", name: "Sequential Testing", successRate: 88, cost: 0.08, duration: 45 },
  { id: "str_3", name: "Concurrent Review", successRate: 85, cost: 0.22, duration: 80 },
];

const worstStrategies = [
  { id: "str_4", name: "Monolithic Execution", successRate: 42, cost: 0.45, duration: 300 },
  { id: "str_5", name: "Random Wait Steps", successRate: 35, cost: 0.05, duration: 500 },
];

const chartData = [
  { name: "Code Gen", success: 94 },
  { name: "Seq Test", success: 88 },
  { name: "Conc Review", success: 85 },
  { name: "Mono Exec", success: 42 },
  { name: "Random Wait", success: 35 },
];

export default function StrategiesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Strategies Performance</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Analyze the success rate, cost, and duration of execution strategies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Strategies */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Top Strategies</h2>
          </div>
          <div className="space-y-4">
            {topStrategies.map((strategy) => (
              <div key={strategy.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{strategy.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    {strategy.successRate}% Success
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                    ${strategy.cost.toFixed(2)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {strategy.duration}s avg
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worst Strategies */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingDown className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Worst Strategies</h2>
          </div>
          <div className="space-y-4">
            {worstStrategies.map((strategy) => (
              <div key={strategy.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{strategy.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    {strategy.successRate}% Success
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                    ${strategy.cost.toFixed(2)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    {strategy.duration}s avg
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700 mt-6">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Success Rate Comparison</h2>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="name" className="text-sm text-gray-500" />
              <YAxis className="text-sm text-gray-500" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Bar dataKey="success" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
