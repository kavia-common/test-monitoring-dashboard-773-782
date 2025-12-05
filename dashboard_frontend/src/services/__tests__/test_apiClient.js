import { createApiClient } from '../apiClient';

describe('apiClient', () => {
  const origFetch = global.fetch;

  afterEach(() => {
    global.fetch = origFetch;
    jest.restoreAllMocks();
  });

  test('handles base URL and JSON parsing', async () => {
    const api = createApiClient('https://api.example.com', 'debug');
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: 1 }),
    });
    const data = await api.request('/runs');
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/runs', {});
    expect(data).toEqual({ ok: 1 });
  });

  test('normalizes errors', async () => {
    const api = createApiClient('https://api.example.com');
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    await expect(api.request('/oops')).rejects.toThrow(/Request failed: 500/);
  });
});
