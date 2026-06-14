"use client";

import React from 'react';

export default function ArchitectureCandidatesPage() {
  const candidates = [
    { id: "1", version: "v1.2-alpha", proposedChanges: "Migrate to Kafka from RabbitMQ for data ingestion.", estImprovement: "+25% throughput" },
    { id: "2", version: "v1.2-alpha", proposedChanges: "Add secondary Redis cluster for search caching.", estImprovement: "-40ms latency" },
    { id: "3", version: "v2.0-draft", proposedChanges: "Split Monolith user service into auth and profile microservices.", estImprovement: "+15% deployment speed" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Architecture Candidates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map(c => (
          <div key={c.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-bold text-blue-800 mb-2">{c.version}</h3>
            <p className="text-gray-700 mb-4">{c.proposedChanges}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Estimated Improvement:</span>
              <span className="font-bold text-green-600">{c.estImprovement}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
