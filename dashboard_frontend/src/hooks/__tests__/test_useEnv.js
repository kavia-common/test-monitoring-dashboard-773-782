import { renderHook } from '@testing-library/react';
import { useEnv } from '../useEnv';

describe('useEnv', () => {
  const OLD_ENV = process.env;
  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('returns expected defaults', () => {
    process.env = {};
    const { result } = renderHook(() => useEnv());
    expect(result.current.NODE_ENV).toBe('development');
    expect(result.current.LOG_LEVEL).toBe('info');
    expect(result.current.HEALTHCHECK_PATH).toBe('/healthz');
  });

  test('parses REACT_APP_* values', () => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_API_BASE: 'https://api.example.com',
      REACT_APP_WS_URL: 'wss://ws.example.com',
      REACT_APP_NODE_ENV: 'staging',
      REACT_APP_LOG_LEVEL: 'debug',
      REACT_APP_FEATURE_FLAGS: 'a,b',
      REACT_APP_EXPERIMENTS_ENABLED: 'true',
    };
    const { result } = renderHook(() => useEnv());
    expect(result.current.API_BASE).toBe('https://api.example.com');
    expect(result.current.WS_URL).toBe('wss://ws.example.com');
    expect(result.current.NODE_ENV).toBe('staging');
    expect(result.current.LOG_LEVEL).toBe('debug');
    expect(result.current.FEATURE_FLAGS).toBe('a,b');
    expect(result.current.EXPERIMENTS_ENABLED).toBe('true');
  });
});
