"use client";

import React from "react";
import { Brain, FlaskConical, Target, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function WorldModelDashboard() {
  const stats = [
    { name: "Active Beliefs", value: "24", icon: Brain, href: "/world-model/beliefs", color: "text-blue-500" },
    { name: "Pending Hypotheses", value: "12", icon: Target, href: "/world-model/hypotheses", color: "text-purple-500" },
    { name: "Running Experiments", value: "3", icon: FlaskConical, href: "/world-model/experiments", color: "text-amber-500" },
    { name: "Prediction Accuracy", value: "94.2%", icon: TrendingUp, href: "/world-model/predictions", color: "text-green-500" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">World Model Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Scientific discovery loop status, beliefs, and predictions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.name}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Discovery Loop Activity</h2>
        <div className="space-y-4">
          {[
            { stage: "Pattern Discovery", status: "Active", time: "10 mins ago" },
            { stage: "Hypothesis Generation", status: "Completed", time: "1 hour ago" },
            { stage: "Experiment Execution", status: "Running", time: "2 hours ago" },
            { stage: "Belief Update", status: "Scheduled", time: "Pending" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${activity.status === 'Active' || activity.status === 'Running' ? 'bg-green-500 animate-pulse' : activity.status === 'Completed' ? 'bg-blue-500' : 'bg-gray-400'}`} />
                <span className="font-medium text-gray-900 dark:text-white">{activity.stage}</span>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-sm text-gray-500">{activity.status}</span>
                <span className="text-sm text-gray-400 w-24 text-right">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
