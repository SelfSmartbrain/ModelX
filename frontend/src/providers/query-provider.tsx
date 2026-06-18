'use client';

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ApiError } from '@/lib/api-client';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30 seconds
        gcTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.status === 401) return false;
          if (error instanceof ApiError && error.status === 404) return false;
          return failureCount < 3;
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            router.push('/login');
          } else if (error.status >= 500) {
            console.error(`Global Error: ${error.message}`);
            // In a real app, use a toast notification here
          }
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            router.push('/login');
          } else if (error.status >= 500) {
            console.error(`Global Error: ${error.message}`);
          }
        }
      },
    })
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
