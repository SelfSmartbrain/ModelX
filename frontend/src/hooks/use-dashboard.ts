import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface DashboardMetrics {
  task_count: number;
  success_rate: number;
  active_agents: number;
  knowledge_growth: { date: string; value: number }[];
}

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: () => apiClient.get<DashboardMetrics>('/api/v1/metrics/overview'),
  });
}
