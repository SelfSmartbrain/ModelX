"use client";

import React from 'react';

export default function ArchitectureComponentsPage() {
  const components = [
    { id: "1", name: "User Service", type: "Microservice", health: 98, version: "v1.0-stable" },
    { id: "2", name: "Data Ingestion Pipeline", type: "Pipeline", health: 75, version: "v1.1-beta" },
    { id: "3", name: "Redis Cache Cluster", type: "Infrastructure", health: 88, version: "v1.0-stable" },
    { id: "4", name: "API Gateway", type: "Gateway", health: 95, version: "v1.0-stable" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Components</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map(c => (
          <div key={c.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded ${
                c.health >= 90 ? 'bg-green-100 text-green-800' :
                c.health >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {c.health}/100
              </span>
            </div>
            <p className="text-sm text-gray-600">Version: {c.version}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
