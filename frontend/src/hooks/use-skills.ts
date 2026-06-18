import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Skill {
  id: string;
  name: string;
  category: string;
  usage_count: number;
  performance_score: number;
  created_at: string;
}

export function useSkills(search = '', category = 'all') {
  return useQuery({
    queryKey: ['skills', search, category],
    queryFn: () => apiClient.get<Skill[]>(`/api/v1/meta/skills?search=${search}&category=${category}`),
  });
}
