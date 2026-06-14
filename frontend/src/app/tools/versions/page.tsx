"use client";

import React, { useState } from 'react';
import { GitCommit, Code, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

const MOCK_VERSIONS = [
  { id: 'v1.2.0', date: '2026-06-14 10:30', author: 'Auto-Agent', status: 'active', message: 'Optimized json parsing for output.', code: 'def execute(input_data):\n    import json\n    return json.loads(input_data)' },
  { id: 'v1.1.1', date: '2026-06-12 14:15', author: 'Subh', status: 'superseded', message: 'Added timeout handling.', code: 'def execute(input_data):\n    import time\n    time.sleep(1)\n    return input_data' },
  { id: 'v1.1.0', date: '2026-06-10 09:00', author: 'Auto-Agent', status: 'superseded', message: 'Initial sandbox python executor.', code: 'def execute(input_data):\n    return input_data' },
];

export default function ToolVersionsPage() {
  const [selectedVersion, setSelectedVersion] = useState(MOCK_VERSIONS[0]);

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tool Versions</h1>
        <p className="text-gray-500 mt-2">View version history and code changes for: <span className="font-semibold text-blue-600">python_executor</span></p>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Sidebar with versions */}
        <div className="w-1/3 bg-white rounded-lg border border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-100 bg-gray-50 font-semibold">Version History</div>
          <div className="p-2 space-y-2">
            {MOCK_VERSIONS.map(v => (
              <div 
                key={v.id} 
                onClick={() => setSelectedVersion(v)}
                className={`p-4 rounded-lg cursor-pointer border transition-colors ${selectedVersion.id === v.id ? 'bg-blue-50 border-blue-200' : 'border-transparent hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <GitCommit className="w-4 h-4 text-gray-400" />
                    <span className="font-mono font-medium text-gray-900">{v.id}</span>
                  </div>
                  {v.status === 'active' ? (
                    <span className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full"><CheckCircle2 className="w-3 h-3 mr-1" /> Active</span>
                  ) : (
                    <span className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Superseded</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{v.message}</p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{v.author}</span>
                  <span>{v.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main code viewer */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col min-h-0">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-700">Code Viewer</span>
              <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
              <span className="font-mono text-sm bg-white px-2 py-1 border rounded">{selectedVersion.id}</span>
            </div>
            <button className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors">
              Compare with Previous
            </button>
          </div>
          <div className="flex-1 p-0 overflow-hidden relative bg-gray-900 rounded-b-lg">
            <pre className="p-6 font-mono text-sm text-gray-300 overflow-auto h-full">
              <code>{selectedVersion.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
