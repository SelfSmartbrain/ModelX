import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Project {
  id: string;
  name: string;
  status: string;
  milestones: any[];
  resource_budget: number;
  progress_pct: number;
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.get<Project[]>('/api/v1/projects'),
  });
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => apiClient.get<Project>(`/api/v1/projects/${projectId}`),
    enabled: !!projectId,
  });
}
