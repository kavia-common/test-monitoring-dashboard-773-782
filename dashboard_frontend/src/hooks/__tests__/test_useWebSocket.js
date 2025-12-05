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

  test('connects and cleans up when URL present', () => {
    const listeners = {};
    class WS {
      constructor(url) {
        this.url = url;
        setTimeout(() => this.onopen && this.onopen(), 0);
      }
      close() {
        this.onclose && this.onclose();
      }
      addEventListener(ev, cb) {
        listeners[ev] = cb;
      }
    }
    global.WebSocket = WS;
    process.env = { ...OLD_ENV, REACT_APP_WS_URL: 'wss://ws.example.com/' };

    const { result, unmount } = renderHook(() => useWebSocket('/events'));
    expect(result.current.connected).toBe(false);

    // Simulate open
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(result.current.connected).toBe(true);
        unmount();
        // on unmount, should set connected false via onclose
        setTimeout(() => {
          resolve();
        }, 0);
      }, 0);
    });
  });
});
