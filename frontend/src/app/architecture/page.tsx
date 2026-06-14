"use client";

import React from 'react';

export default function ArchitectureDashboard() {
  const metrics = [
    { title: "Architecture Versions", value: 12 },
    { title: "Total Components", value: 48 },
    { title: "Critical Bottlenecks", value: 3 },
    { title: "Avg Fitness Score", value: "87.5" },
    { title: "Active Candidates", value: 5 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Architecture Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">{m.title}</h3>
            <p className="text-3xl font-bold text-blue-600">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Recent Architecture Activities</h2>
        <ul className="space-y-3">
          <li className="p-3 bg-gray-50 rounded">Generated Candidate v1.2-alpha</li>
          <li className="p-3 bg-gray-50 rounded">Detected Bottleneck in Database Connection Pool</li>
          <li className="p-3 bg-gray-50 rounded">Fitness Score updated for Version 1.1</li>
        </ul>
      </div>
    </div>
  );
}
