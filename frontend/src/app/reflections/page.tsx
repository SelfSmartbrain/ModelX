import React from 'react';
import { Search, Filter } from 'lucide-react';

const mockReflections = [
  { id: 'REF-8921', date: '2026-06-14', successScore: 92, qualityScore: 88, summary: 'Optimized the database indexing strategy, reducing query latency by 45%. Encountered minor memory bloat which was quickly collected.', status: 'Excellent' },
  { id: 'REF-8920', date: '2026-06-13', successScore: 75, qualityScore: 82, summary: 'Deployed microservice auto-scaling rules. Initial threshold was too aggressive causing thrashing. Corrected in subsequent epoch.', status: 'Good' },
  { id: 'REF-8919', date: '2026-06-12', successScore: 98, qualityScore: 95, summary: 'Successfully resolved 14 low-priority UI layout bugs. Code style adherence was perfect.', status: 'Excellent' },
  { id: 'REF-8918', date: '2026-06-11', successScore: 45, qualityScore: 60, summary: 'Attempted to rewrite legacy authentication flow. Failed due to missing OAuth credentials in environment. Rolled back changes cleanly.', status: 'Needs Improvement' },
  { id: 'REF-8917', date: '2026-06-10', successScore: 88, qualityScore: 90, summary: 'Generated comprehensive documentation for the new API endpoints using TypeDoc.', status: 'Good' },
];

export default function ReflectionsPage() {
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">ID / Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Scores</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Summary</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {mockReflections.map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="font-medium text-slate-900 dark:text-white">{ref.id}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{ref.date}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium w-16 text-slate-500">Success:</span>
                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${ref.successScore > 80 ? 'bg-green-500' : ref.successScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${ref.successScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{ref.successScore}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium w-16 text-slate-500">Quality:</span>
                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${ref.qualityScore > 80 ? 'bg-blue-500' : ref.qualityScore > 60 ? 'bg-indigo-500' : 'bg-orange-500'}`} 
                            style={{ width: `${ref.qualityScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{ref.qualityScore}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md line-clamp-2">{ref.summary}</p>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ref.status === 'Excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      ref.status === 'Good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      {ref.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
