import { useEffect, useRef, useState } from 'react';
import { useEnv } from './useEnv';

/**
 * PUBLIC_INTERFACE
 * Simple WebSocket placeholder. No-op if WS_URL missing.
 */
export function useWebSocket(path = '') {
  const env = useEnv();
  const [connected, setConnected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!env.WS_URL) return;
    try {
      const url = env.WS_URL.replace(/\/$/, '') + path;
      const ws = new WebSocket(url);
      ref.current = ws;
      ws.onopen = () => setConnected(true);
      ws.onclose = () => setConnected(false);
      ws.onerror = () => setConnected(false);
      return () => ws.close();
    } catch {
      setConnected(false);
    }
  }, [env.WS_URL, path]);

  return { connected, socket: ref.current };
}
