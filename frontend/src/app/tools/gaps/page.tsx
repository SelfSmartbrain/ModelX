"use client";

import React from 'react';
import { AlertCircle, Target, ArrowUpRight, Cpu, Plus } from 'lucide-react';

const MOCK_GAPS = [
  { id: 'GAP-104', description: 'Agent cannot natively parse PDF documents without high failure rates.', frequency: 1450, complexity: 'Medium', status: 'Generating Spec' },
  { id: 'GAP-105', description: 'Need ability to execute GraphQL mutations securely.', frequency: 890, complexity: 'High', status: 'Detected' },
  { id: 'GAP-106', description: 'Lack of tool to interact with Redis caches directly.', frequency: 320, complexity: 'Low', status: 'Coding' },
  { id: 'GAP-107', description: 'Agent fails to render charts from structured data dynamically.', frequency: 2100, complexity: 'High', status: 'Testing in Sandbox' },
];

export default function CapabilityGapsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Capability Gaps</h1>
          <p className="text-gray-500 mt-2">Automatically identified areas where the agent lacks tools to succeed.</p>
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Report Gap Manually
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-2">Gap ID</div>
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-center">Frequency</div>
          <div className="col-span-1 text-center">Complexity</div>
          <div className="col-span-2 text-right">Pipeline Status</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {MOCK_GAPS.map((gap) => (
            <div key={gap.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-blue-50/50 transition-colors cursor-pointer">
              <div className="col-span-2 flex items-center font-mono text-sm text-blue-600 font-medium">
                <Target className="w-4 h-4 mr-2 text-blue-400" />
                {gap.id}
              </div>
              <div className="col-span-5 text-gray-800 text-sm pr-4">
                {gap.description}
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1 text-gray-500" />
                  {gap.frequency} times
                </span>
              </div>
              <div className="col-span-1 flex justify-center">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  gap.complexity === 'High' ? 'text-red-700 bg-red-100' : 
                  gap.complexity === 'Medium' ? 'text-yellow-700 bg-yellow-100' : 
                  'text-green-700 bg-green-100'
                }`}>
                  {gap.complexity}
                </span>
              </div>
              <div className="col-span-2 flex justify-end items-center">
                <span className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-md shadow-sm">
                  {gap.status === 'Detected' && <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-red-500" />}
                  {gap.status === 'Generating Spec' && <Cpu className="w-3.5 h-3.5 mr-1.5 text-blue-500" />}
                  {gap.status === 'Coding' && <CodeIcon className="w-3.5 h-3.5 mr-1.5 text-purple-500" />}
                  {gap.status === 'Testing in Sandbox' && <Target className="w-3.5 h-3.5 mr-1.5 text-orange-500" />}
                  {gap.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}
