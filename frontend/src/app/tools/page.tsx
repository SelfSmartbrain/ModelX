"use client";

import React, { useState } from 'react';
import { Wrench, CheckCircle, XCircle, Clock, Activity, Search, Filter } from 'lucide-react';

const MOCK_TOOLS = [
  { id: '1', name: 'python_executor', version: 'v1.2.0', status: 'healthy', latency: '45ms', successRate: '99.9%', description: 'Executes safe python snippets in sandbox.' },
  { id: '2', name: 'postgres_query', version: 'v2.0.1', status: 'degraded', latency: '120ms', successRate: '95.4%', description: 'Connects to read-only DB replicas to fetch data.' },
  { id: '3', name: 'web_search_duckduckgo', version: 'v1.0.0', status: 'healthy', latency: '800ms', successRate: '98.0%', description: 'Web search via DuckDuckGo API.' },
  { id: '4', name: 'image_metadata_extractor', version: 'v0.9.5', status: 'offline', latency: '-', successRate: '-', description: 'Extracts EXIF and basic info from images.' },
];

export default function ToolRegistryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = MOCK_TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tool Registry</h1>
          <p className="text-gray-500 mt-2">Manage and monitor registered autonomous tools.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <Wrench className="w-4 h-4 mr-2" />
          Add Manual Tool
        </button>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tools by name..." 
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <div key={tool.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Wrench className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{tool.version}</span>
                </div>
              </div>
              <div>
                {tool.status === 'healthy' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {tool.status === 'degraded' && <Activity className="w-5 h-5 text-yellow-500" />}
                {tool.status === 'offline' && <XCircle className="w-5 h-5 text-red-500" />}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
              {tool.description}
            </p>

            <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Latency</p>
                <p className="font-medium text-gray-900 flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-gray-400" />
                  {tool.latency}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                <p className="font-medium text-gray-900 flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1 text-gray-400" />
                  {tool.successRate}
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Logs</button>
              <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">Configure</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
