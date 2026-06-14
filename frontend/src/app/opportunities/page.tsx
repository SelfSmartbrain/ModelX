"use client";

import React, { useState, useEffect } from 'react';

const mockOpportunities = [
  { id: 'op-1', title: 'Automate Code Reviews', score: 95, effort: 'Low', impact: 'High', category: 'Engineering' },
  { id: 'op-2', title: 'Optimize Cloud Storage', score: 88, effort: 'Medium', impact: 'High', category: 'Infrastructure' },
  { id: 'op-3', title: 'Enhance Security Logging', score: 82, effort: 'Medium', impact: 'Medium', category: 'Security' },
  { id: 'op-4', title: 'Refactor Legacy Auth', score: 75, effort: 'High', impact: 'High', category: 'Engineering' },
  { id: 'op-5', title: 'Update UI Dependencies', score: 60, effort: 'Low', impact: 'Low', category: 'Frontend' }
];

export default function OpportunitiesMapping() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold">Ranked Opportunities</h1>
      <p className="text-gray-600">AI-identified opportunities ranked by viability, impact, and effort.</p>
      
      <div className="bg-white p-6 rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 rounded-tl-lg">Opportunity Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Effort</th>
              <th className="py-3 px-4">Impact</th>
              <th className="py-3 px-4">AI Score</th>
              <th className="py-3 px-4 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockOpportunities.sort((a, b) => b.score - a.score).map((op, idx) => (
              <tr key={op.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-medium flex items-center gap-2">
                  <span className="text-gray-400 font-mono text-xs">#{idx + 1}</span>
                  {op.title}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{op.category}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    op.effort === 'Low' ? 'bg-green-100 text-green-800' :
                    op.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {op.effort}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    op.impact === 'High' ? 'bg-blue-100 text-blue-800' :
                    op.impact === 'Medium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {op.impact}
                  </span>
                </td>
                <td className="py-4 px-4 font-bold text-indigo-600">{op.score}/100</td>
                <td className="py-4 px-4">
                  <button className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition">
                    Create Project
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
