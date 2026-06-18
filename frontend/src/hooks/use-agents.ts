import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Agent {
  agent_id: string;
  status: string;
  current_task?: string;
  memory_usage?: number;
  uptime?: number;
}

export function useAgentsStatus() {
  return useQuery({
    queryKey: ['agents-status'],
    queryFn: () => apiClient.get<Agent[]>('/api/v1/agents/status'),
  });
}

export function useAgentState(agentId: string) {
  return useQuery({
    queryKey: ['agent-state', agentId],
    queryFn: () => apiClient.get<Agent>(`/api/v1/agents/${agentId}/state`),
    enabled: !!agentId,
  });
}

export function useSubmitTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskPayload: any) => apiClient.post('/api/v1/agents/tasks', taskPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents-status'] });
    },
  });
}
