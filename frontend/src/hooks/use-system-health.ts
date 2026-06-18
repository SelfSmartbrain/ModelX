import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface SystemService {
  name: string;
  status: string;
  uptime_pct: number;
  latency_ms: number;
}

export function useSystemHealth() {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: () => apiClient.get<SystemService[]>('/api/v1/monitoring/health'),
  });
}

export function useSystemMetrics() {
  return useQuery({
    queryKey: ['system-metrics'],
    queryFn: () => apiClient.get('/api/v1/monitoring/metrics'),
  });
}
