"use client";

import React from "react";
import { BrainCircuit, Lightbulb, GitMerge, AlertCircle, ArrowRight } from "lucide-react";

const patternLogs = [
  { id: "log_1", time: "10:24 AM", message: "Identified redundant API calls in strategy_abc.", confidence: 0.92, type: "optimization" },
  { id: "log_2", time: "11:05 AM", message: "New workflow pattern discovered: 'Parallel UI testing'.", confidence: 0.88, type: "discovery" },
  { id: "log_3", time: "01:15 PM", message: "Frequent timeout failures on legacy endpoints detected.", confidence: 0.95, type: "anomaly" },
  { id: "log_4", time: "02:30 PM", message: "Extracted skill: 'parse_graphql_errors'.", confidence: 0.85, type: "discovery" },
];

const recommendations = [
  { 
    id: "rec_1", 
    title: "Merge duplicate skills", 
    description: "Skills 'fetch_user_data' and 'get_user_profile' are 95% similar. Merging them will reduce model selection latency.",
    impact: "High",
    action: "Merge Skills"
  },
  { 
    id: "rec_2", 
    title: "Deprecate Monolithic Execution", 
    description: "Strategy 'Monolithic Execution' has dropped below 50% success rate in the last 7 days. Recommend fallback to Sequential.",
    impact: "Critical",
    action: "Update Routing"
  },
  { 
    id: "rec_3", 
    title: "Increase Parallelism Limit", 
    description: "Current token rate limits allow for 20% more concurrent sub-agents safely.",
    impact: "Medium",
    action: "Apply Config"
  }
];

export default function MetaLearningPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meta-Learning & Optimization</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">System generated pattern discovery logs and actionable optimization recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pattern Discovery Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center space-x-2">
            <BrainCircuit className="w-6 h-6 text-indigo-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Pattern Discovery Logs</h2>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {patternLogs.map((log) => (
                <li key={log.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {log.type === 'optimization' && <GitMerge className="w-5 h-5 text-blue-500" />}
                      {log.type === 'discovery' && <Lightbulb className="w-5 h-5 text-yellow-500" />}
                      {log.type === 'anomaly' && <AlertCircle className="w-5 h-5 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{log.time}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Conf: {(log.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{log.message}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 px-2">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">System Recommendations</h2>
          </div>
          
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
              <div className={`absolute top-0 left-0 w-1 h-full ${
                rec.impact === 'Critical' ? 'bg-red-500' : rec.impact === 'High' ? 'bg-orange-500' : 'bg-blue-500'
              }`}></div>
              
              <div className="flex justify-between items-start pl-2">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{rec.title}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      rec.impact === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                      rec.impact === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : 
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {rec.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{rec.description}</p>
                </div>
              </div>
              
              <div className="mt-2 pl-2">
                <button className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  {rec.action}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
