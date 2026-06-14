"use client";

import React, { useState } from "react";
import { CheckCircle, Clock, XCircle, FileText } from "lucide-react";

export default function HypothesesPage() {
  const [hypotheses] = useState([
    { id: "hyp-001", description: "Increased request latency is causally linked to high memory usage in the caching layer.", status: "testing", confidence: 0.65, createdAt: "2026-06-12" },
    { id: "hyp-002", description: "Batch processing will reduce overall CPU consumption by 15%.", status: "confirmed", confidence: 0.92, createdAt: "2026-06-10" },
    { id: "hyp-003", description: "User engagement drops when page load exceeds 2 seconds.", status: "rejected", confidence: 0.15, createdAt: "2026-06-08" },
    { id: "hyp-004", description: "New embedding model improves retrieval precision by at least 10%.", status: "proposed", confidence: 0.50, createdAt: "2026-06-14" },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="text-green-500" size={20} />;
      case "rejected": return <XCircle className="text-red-500" size={20} />;
      case "testing": return <Clock className="text-amber-500 animate-pulse" size={20} />;
      default: return <FileText className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hypotheses</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track the status of proposed, testing, and resolved hypotheses.
        </p>
      </div>

      <div className="grid gap-4">
        {hypotheses.map((hyp) => (
          <div key={hyp.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {hyp.id}
                </span>
                <span className="text-sm text-gray-500">{hyp.createdAt}</span>
              </div>
              <p className="text-lg text-gray-900 dark:text-white font-medium">
                {hyp.description}
              </p>
            </div>
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500 mb-1">Confidence</span>
                <span className="font-bold text-gray-900 dark:text-white">{(hyp.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex flex-col items-end min-w-[100px]">
                <span className="text-sm text-gray-500 mb-1">Status</span>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(hyp.status)}
                  <span className="font-medium capitalize text-gray-700 dark:text-gray-300">{hyp.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
