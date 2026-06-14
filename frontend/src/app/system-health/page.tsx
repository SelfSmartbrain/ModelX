import { 
  Activity, 
  Server, 
  Database, 
  HardDrive, 
  Share2, 
  Cpu, 
  Bot,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react'

type Status = 'operational' | 'degraded' | 'down'

export default function SystemHealthPage() {
  const services = [
    { name: 'API Workers', icon: Server, status: 'operational' as Status, uptime: '99.99%', latency: '45ms', details: 'All 8 workers online' },
    { name: 'PostgreSQL DB', icon: Database, status: 'operational' as Status, uptime: '99.95%', latency: '12ms', details: 'Primary active, 2 replicas synced' },
    { name: 'Redis Cache', icon: HardDrive, status: 'operational' as Status, uptime: '100%', latency: '2ms', details: 'Memory usage at 45%' },
    { name: 'Neo4j Graph', icon: Share2, status: 'degraded' as Status, uptime: '98.50%', latency: '150ms', details: 'High query latency detected on complex traversals' },
    { name: 'Qdrant Vector DB', icon: Cpu, status: 'operational' as Status, uptime: '99.99%', latency: '25ms', details: 'Index optimized. 1.2M vectors' },
    { name: 'Agent Orchestrator', icon: Bot, status: 'operational' as Status, uptime: '99.9%', latency: 'N/A', details: 'Processing queue normal (24 pending)' },
  ]

  const getStatusConfig = (status: Status) => {
    switch (status) {
      case 'operational':
        return { color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', text: 'Operational', Icon: CheckCircle2 }
      case 'degraded':
        return { color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'Degraded', Icon: AlertCircle }
      case 'down':
        return { color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', text: 'Down', Icon: XCircle }
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-500 mt-1">Real-time status of all core infrastructure and agent services.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Live Updates Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const ServiceIcon = service.icon
          const config = getStatusConfig(service.status)
          const StatusIcon = config.Icon

          return (
            <div key={service.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <ServiceIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                </div>
                <StatusIcon className={`w-6 h-6 ${config.color}`} />
              </div>
              
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
                    {config.text}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Uptime (30d)</span>
                  <span className="text-sm font-medium text-gray-900">{service.uptime}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Latency</span>
                  <span className="text-sm font-medium text-gray-900">{service.latency}</span>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">{service.details}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* System Metrics Chart Placeholder */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Overall System Load
        </h2>
        <div className="h-64 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center border-dashed">
          <p className="text-gray-400 text-sm">System metrics chart visualization (CPU/Memory/Network)</p>
        </div>
      </div>
    </div>
  )
}
