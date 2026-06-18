export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;

async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  let { retries = MAX_RETRIES, timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;
  
  // Setup AbortController for timeout
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  // Inject auth header
  const headers = new Headers(fetchOptions.headers);
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
    
    clearTimeout(id);

    // Handle 429 Rate Limit with exponential backoff
    if (response.status === 429 && retries > 0) {
      const retryAfter = response.headers.get('Retry-After');
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : (MAX_RETRIES - retries + 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, { ...options, retries: retries - 1 });
    }

    if (!response.ok) {
      let errorMessage = 'An error occurred';
      let errorData;
      try {
        errorData = await response.json();
        // Extract FastAPI validation errors or detail message
        errorMessage = errorData.detail || (Array.isArray(errorData) && errorData[0]?.msg) || errorMessage;
      } catch (e) {
        errorMessage = response.statusText;
      }
      throw new ApiError(response.status, errorMessage, errorData);
    }

    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new ApiError(408, 'Request timeout');
    }
    // If network error, might want to retry
    if (retries > 0 && !error.status) {
        const delay = (MAX_RETRIES - retries + 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, { ...options, retries: retries - 1 });
    }
    throw error;
  }
}

export const apiClient = {
  get: async <T>(endpoint: string, options?: FetchOptions): Promise<T> => {
    const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, { ...options, method: 'GET' });
    return response.json();
  },
  post: async <T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> => {
    const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },
  put: async <T>(endpoint: string, data?: any, options?: FetchOptions): Promise<T> => {
    const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },
  delete: async <T>(endpoint: string, options?: FetchOptions): Promise<T> => {
    const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, { ...options, method: 'DELETE' });
    return response.json();
  },
};
