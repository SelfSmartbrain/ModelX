import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Tool {
  id: string;
  name: string;
  category: string;
  success_rate: number;
  avg_latency_ms: number;
  last_used: string;
}

export function useToolsRegistry() {
  return useQuery({
    queryKey: ['tools-registry'],
    queryFn: () => apiClient.get<Tool[]>('/api/v1/tools/registry'),
  });
}

export function useToolBenchmarks(toolId: string) {
  return useQuery({
    queryKey: ['tool-benchmarks', toolId],
    queryFn: () => apiClient.get(`/api/v1/tools/${toolId}/benchmarks`),
    enabled: !!toolId,
  });
}
