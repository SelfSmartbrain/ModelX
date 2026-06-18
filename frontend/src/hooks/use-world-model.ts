import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Hypothesis {
  id: string;
  hypothesis: string;
  status: string;
  confidence: number;
  evidence_count: number;
}

export interface Experiment {
  id: string;
  hypothesis_id: string;
  status: string;
}

export function useHypotheses() {
  return useQuery({
    queryKey: ['hypotheses'],
    queryFn: () => apiClient.get<Hypothesis[]>('/api/v1/world-model/hypotheses'),
  });
}

export function useExperiments() {
  return useQuery({
    queryKey: ['experiments'],
    queryFn: () => apiClient.get<Experiment[]>('/api/v1/world-model/experiments'),
  });
}
