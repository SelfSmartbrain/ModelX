"use client";

import React, from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useReflections } from '@/hooks/use-reflections';

export default function ReflectionsPage() {
  const { data: reflections, isLoading, error } = useReflections();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Execution Reflections</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Historical logs of agent self-evaluations and quality scores.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reflections..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="p-8 text-red-500">Failed to load reflections data. Ensure backend is running.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">ID / Date</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Scores</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {reflections?.map((ref) => (
                  <tr key={ref.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-medium text-slate-900 dark:text-white">{ref.id}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{new Date(ref.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium w-16 text-slate-500">Score:</span>
                          <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${ref.score > 80 ? 'bg-green-500' : ref.score > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                              style={{ width: `${ref.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{ref.score}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <ul className="list-disc pl-4 text-sm text-slate-600 dark:text-slate-300">
                        {ref.insights.map((insight, idx) => (
                          <li key={idx}>{insight}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
                {!reflections?.length && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-500">No reflections found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
