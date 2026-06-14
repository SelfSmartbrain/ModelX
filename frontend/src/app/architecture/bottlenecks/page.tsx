"use client";

import React from 'react';

export default function ArchitectureBottlenecksPage() {
  const bottlenecks = [
    { id: "1", component: "Data Ingestion Pipeline", severity: "Critical", description: "Message queue backpressure during peak load", detectedAt: "2026-06-14 10:00 AM" },
    { id: "2", component: "Redis Cache Cluster", severity: "Warning", description: "Eviction rate increasing above 15%", detectedAt: "2026-06-13 02:30 PM" },
    { id: "3", component: "Search Service", severity: "Moderate", description: "Query latency p99 exceeds 200ms", detectedAt: "2026-06-12 11:15 AM" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bottlenecks</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {bottlenecks.map(b => (
            <li key={b.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{b.component}</h3>
                  <p className="mt-1 text-sm text-gray-500">{b.description}</p>
                  <p className="mt-2 text-xs text-gray-400">Detected: {b.detectedAt}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                    b.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    b.severity === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {b.severity}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
