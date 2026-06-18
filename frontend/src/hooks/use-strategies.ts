import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Strategy {
  id: string;
  name: string;
  success_rate: number;
  execution_count: number;
  avg_duration_ms: number;
}

export function useStrategies(sort = 'performance', order = 'desc') {
  return useQuery({
    queryKey: ['strategies', sort, order],
    queryFn: () => apiClient.get<Strategy[]>(`/api/v1/meta/strategies?sort=${sort}&order=${order}`),
  });
}
