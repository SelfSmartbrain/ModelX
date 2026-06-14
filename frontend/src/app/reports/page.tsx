import { FileText, Calendar, Clock, Download } from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    { id: 1, type: 'Daily', date: '2026-06-14', title: 'Daily System Summary', status: 'Generated' },
    { id: 2, type: 'Weekly', date: '2026-06-08 - 2026-06-14', title: 'Weekly Performance Review', status: 'Generated' },
    { id: 3, type: 'Monthly', date: 'May 2026', title: 'Monthly Strategy Alignment', status: 'Generated' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">System Reports</h1>
        <p className="text-gray-500 mt-1">View and generate daily, weekly, and monthly AI performance reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Recent Reports
            </h2>
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="p-3 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                      {report.type}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{report.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full min-h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                Report Preview
              </h2>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="prose prose-indigo max-w-none">
                <h1>Daily System Summary</h1>
                <p className="text-gray-500">Generated on June 14, 2026</p>
                <hr />
                <h2>Executive Summary</h2>
                <p>
                  The system operated smoothly over the last 24 hours. A total of <strong>1,452 tasks</strong> were processed 
                  with a success rate of <strong>98.7%</strong>.
                </p>
                <h2>Key Metrics</h2>
                <ul>
                  <li>Average Task Completion Time: 1.2s</li>
                  <li>New Strategies Synthesized: 3</li>
                  <li>Error Rate: 1.3% (Mainly API rate limits)</li>
                </ul>
                <h2>Agent Performance</h2>
                <p>
                  The main orchestration agent successfully delegated tasks to 4 sub-agents. 
                  Memory retrieval efficiency improved by 15% following the recent index optimization.
                </p>
                <h3>Anomalies Detected</h3>
                <p>
                  Minor latency spikes observed in the Vector Database (Qdrant) around 14:00 UTC, 
                  resolved automatically within 2 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
