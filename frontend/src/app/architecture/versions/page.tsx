"use client";

import React from 'react';

export default function ArchitectureVersionsPage() {
  const versions = [
    { id: "1", name: "v1.0-stable", date: "2026-06-10", fitness: 92.5, status: "Active" },
    { id: "2", name: "v1.1-beta", date: "2026-06-12", fitness: 94.1, status: "Testing" },
    { id: "3", name: "v0.9-legacy", date: "2025-12-01", fitness: 78.0, status: "Deprecated" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Architecture Versions</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fitness Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {versions.map(v => (
              <tr key={v.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{v.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{v.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{v.fitness}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    v.status === 'Active' ? 'bg-green-100 text-green-800' :
                    v.status === 'Testing' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
