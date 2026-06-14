"use client";

import React, { useState } from "react";
import { FlaskConical, Activity, ArrowRight } from "lucide-react";

export default function ExperimentsPage() {
  const [experiments] = useState([
    {
      id: "exp-001",
      name: "Latency vs Memory Caching",
      hypothesisId: "hyp-001",
      status: "running",
      control: "Standard Cache TTL (60s)",
      treatment: "Adaptive Cache TTL (dynamic)",
      results: { controlMetric: "240ms", treatmentMetric: "180ms", pValue: 0.04 },
      progress: 65
    },
    {
      id: "exp-002",
      name: "Batch Processing CPU Impact",
      hypothesisId: "hyp-002",
      status: "completed",
      control: "Single message processing",
      treatment: "Batch size 50 processing",
      results: { controlMetric: "85% CPU", treatmentMetric: "62% CPU", pValue: 0.001 },
      progress: 100
    }
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Experiments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Design, execution, and results of A/B tests and causal experiments.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <FlaskConical size={18} />
          <span>New Experiment</span>
        </button>
      </div>

      <div className="grid gap-6">
        {experiments.map((exp) => (
          <div key={exp.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    exp.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {exp.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Testing Hypothesis: {exp.hypothesisId}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">p-value</div>
                <div className={`font-bold text-lg ${exp.results.pValue < 0.05 ? 'text-green-500' : 'text-gray-700 dark:text-gray-300'}`}>
                  {exp.results.pValue}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-500 mb-2">Control Group</div>
                <p className="text-gray-900 dark:text-white font-medium mb-4">{exp.control}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Result Metric</span>
                  <span className="font-bold text-gray-900 dark:text-white">{exp.results.controlMetric}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Treatment Group</div>
                <p className="text-gray-900 dark:text-white font-medium mb-4">{exp.treatment}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Result Metric</span>
                  <span className="font-bold text-gray-900 dark:text-white">{exp.results.treatmentMetric}</span>
                </div>
              </div>
            </div>

            {exp.status === 'running' && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{exp.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${exp.progress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
