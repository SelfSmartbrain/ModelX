import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { 
  LayoutDashboard, BrainCircuit, AlertTriangle, Target, Wrench, 
  Dna, FileText, Activity, Globe, Share2, Layers, Zap, GitBranch,
  FolderKanban, Library, Terminal, CheckCircle, Server, Users,
  TrendingUp, Lightbulb, ChevronRight
} from 'lucide-react'
import './globals.css'
import { QueryProvider } from '@/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ModelX Dashboard',
  description: 'Autonomous Agent Platform',
}

const navGroups = [
  {
    name: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'System Health', href: '/system-health', icon: Activity },
      { name: 'Reports', href: '/reports', icon: FileText },
    ]
  },
  {
    name: 'Cognition',
    items: [
      { name: 'Reflections', href: '/reflections', icon: BrainCircuit },
      { name: 'Failures', href: '/failures', icon: AlertTriangle },
      { name: 'Meta Learning', href: '/meta-learning', icon: Dna },
    ]
  },
  {
    name: 'Agent',
    items: [
      { name: 'Agents', href: '/agents', icon: BrainCircuit },
      { name: 'Skills', href: '/skills', icon: Wrench },
      { name: 'Strategies', href: '/strategies', icon: Target },
    ]
  },
  {
    name: 'Knowledge',
    items: [
      { name: 'World Model', href: '/world-model', icon: Globe },
      { name: 'Knowledge Graph', href: '/knowledge-graph', icon: Share2 },
    ]
  },
  {
    name: 'Evolution',
    items: [
      { name: 'Architecture', href: '/architecture', icon: Layers },
      { name: 'Capabilities', href: '/capabilities', icon: Zap },
      { name: 'Evolution', href: '/evolution', icon: GitBranch },
    ]
  },
  {
    name: 'Projects',
    items: [
      { name: 'Projects', href: '/projects', icon: FolderKanban },
      { name: 'Research Programs', href: '/research-programs', icon: Library },
      { name: 'Programs', href: '/programs', icon: Terminal },
    ]
  },
  {
    name: 'Operations',
    items: [
      { name: 'Tools', href: '/tools', icon: Wrench },
      { name: 'Validation', href: '/validation', icon: CheckCircle },
      { name: 'Environment', href: '/environment', icon: Server },
      { name: 'Peer Review', href: '/peer-review', icon: Users },
    ]
  },
  {
    name: 'Analytics',
    items: [
      { name: 'Impact', href: '/impact', icon: TrendingUp },
      { name: 'Opportunities', href: '/opportunities', icon: Lightbulb },
    ]
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 flex h-screen overflow-hidden`}>
        <QueryProvider>
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
              <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                <BrainCircuit className="w-6 h-6" />
                ModelX
              </h1>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4 px-3">
                {navGroups.map((group) => (
                  <details key={group.name} className="group" open>
                    <summary className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-900 rounded-md hover:bg-gray-50">
                      {group.name}
                      <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                    </summary>
                    <ul className="mt-1 space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                            >
                              <Icon className="w-5 h-5 text-gray-400 shrink-0" />
                              {item.name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </details>
                ))}
              </div>
            </nav>
          </aside>
  
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  )
}
