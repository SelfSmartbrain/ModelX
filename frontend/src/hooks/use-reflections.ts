import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Reflection {
  id: string;
  agent_id: string;
  score: number;
  insights: string[];
  created_at: string;
}

export function useReflections(limit = 50, offset = 0) {
  return useQuery({
    queryKey: ['reflections', limit, offset],
    queryFn: () => apiClient.get<Reflection[]>(`/api/v1/cognition/reflections?limit=${limit}&offset=${offset}`),
  });
}

export function useTriggerReflection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.post<Reflection>('/api/v1/cognition/reflections'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
    },
  });
}
