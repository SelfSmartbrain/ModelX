import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Failure {
  id: string;
  severity: string;
  pattern: string;
  resolution_status: string;
  timestamp: string;
}

export function useFailures(severity = 'all', limit = 100) {
  return useQuery({
    queryKey: ['failures', severity, limit],
    queryFn: () => apiClient.get<Failure[]>(`/api/v1/cognition/failures?severity=${severity}&limit=${limit}`),
  });
}
