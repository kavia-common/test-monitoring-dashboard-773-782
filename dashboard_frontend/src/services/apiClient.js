import { useEnv } from '../hooks/useEnv';

/**
 * PUBLIC_INTERFACE
 * Simple API client. Prefer using hooks within components for env; also export a helper function for non-react modules.
 */
export function createApiClient(baseUrl, logLevel = 'info') {
  const shouldLog = (level) => {
    const order = ['error', 'warn', 'info', 'debug'];
    return order.indexOf(level) <= order.indexOf(logLevel);
  };

  async function request(path, options = {}) {
    const url = (baseUrl || '').replace(/\/$/, '') + path;
    if (shouldLog('debug')) console.debug('[api] request', url, options);
    const res = await fetch(url, options);
    if (!res.ok) {
      if (shouldLog('error')) console.error('[api] error', res.status, url);
      throw new Error(`Request failed: ${res.status}`);
    }
    const data = await res.json();
    if (shouldLog('debug')) console.debug('[api] response', data);
    return data;
  }

  return { request };
}

// PUBLIC_INTERFACE
export function useApiClient() {
  const env = useEnv();
  return createApiClient(env.API_BASE || env.BACKEND_URL || '', env.LOG_LEVEL || 'info');
}
