"use client";

import React from 'react';

const mockGenerations = [
  { id: 8, startDate: '2026-06-14T00:00:00Z', duration: '14h', candidates: 50, bestFitness: 0.94, status: 'Active' },
  { id: 7, startDate: '2026-06-11T00:00:00Z', duration: '72h', candidates: 120, bestFitness: 0.93, status: 'Completed' },
  { id: 6, startDate: '2026-06-08T00:00:00Z', duration: '72h', candidates: 115, bestFitness: 0.91, status: 'Completed' },
  { id: 5, startDate: '2026-06-05T00:00:00Z', duration: '72h', candidates: 130, bestFitness: 0.89, status: 'Completed' },
];

export default function GenerationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Generations Tracking</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gen ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Fitness</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockGenerations.map((gen) => (
              <tr key={gen.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{gen.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(gen.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{gen.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{gen.candidates}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{gen.bestFitness.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    gen.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {gen.status}
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
