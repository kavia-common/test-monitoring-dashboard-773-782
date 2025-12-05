import { act, renderHook } from '@testing-library/react';
import { useWebSocket } from '../useWebSocket';

describe('useWebSocket', () => {
  const OLD_ENV = process.env;
  let originalWS;

  beforeEach(() => {
    originalWS = global.WebSocket;
  });
  afterEach(() => {
    process.env = OLD_ENV;
    global.WebSocket = originalWS;
  });

  test('no-ops without WS URL', () => {
    process.env = { ...OLD_ENV, REACT_APP_WS_URL: '' };
    const { result } = renderHook(() => useWebSocket('/socket'));
    expect(result.current.connected).toBe(false);
    expect(result.current.socket).toBeNull();
  });

  test('connects and cleans up when URL present', async () => {
    class WS {
      constructor(url) {
        this.url = url;
        // on construction, open will be called in next task
        setTimeout(() => this.onopen && this.onopen(), 0);
      }
      close() {
        this.onclose && this.onclose();
      }
      addEventListener() {}
    }
    global.WebSocket = WS;
    process.env = { ...OLD_ENV, REACT_APP_WS_URL: 'wss://ws.example.com/' };

    const { result, unmount } = renderHook(() => useWebSocket('/events'));
    expect(result.current.connected).toBe(false);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(result.current.connected).toBe(true);

    await act(async () => {
      unmount();
      await Promise.resolve();
    });
  });
});
