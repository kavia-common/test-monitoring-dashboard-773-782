import { createApiClient } from './apiClient';
import { getEnvStatic } from './utilsEnv';

const env = getEnvStatic();
const api = createApiClient(env.API_BASE || env.BACKEND_URL || '', env.LOG_LEVEL || 'info');

function mockRuns() {
  const now = Date.now();
  const Suites = ['Smoke', 'Regression', 'E2E', 'API', 'UI'];
  const Statuses = ['passed', 'failed', 'flaky'];
  const runs = Array.from({ length: 25 }).map((_, i) => {
    const status = Statuses[i % Statuses.length];
    const passed = status === 'failed' ? 20 : 28;
    const failed = status === 'failed' ? 8 : status === 'flaky' ? 2 : 0;
    const skipped = i % 3;
    return {
      id: String(1000 + i),
      suite: Suites[i % Suites.length],
      status,
      passed,
      failed,
      skipped,
      durationSec: 120 + (i % 10) * 5,
      startTime: new Date(now - i * 3600_000).toISOString(),
      tests: Array.from({ length: 6 }).map((__, j) => ({
        name: `Test ${j + 1}`,
        status: j % 5 === 0 ? 'failed' : 'passed',
        durationSec: 5 + j,
      })),
      logs: 'Execution logs are not available in mock mode.',
    };
  });
  return runs;
}

export const testRunsService = {
  // PUBLIC_INTERFACE
  async list() {
    if (!env.API_BASE && !env.BACKEND_URL) {
      return mockRuns();
    }
    // TODO: Replace with backend endpoint when available
    return api.request('/runs');
  },

  // PUBLIC_INTERFACE
  async get(id) {
    if (!env.API_BASE && !env.BACKEND_URL) {
      const runs = mockRuns();
      return runs.find(r => r.id === String(id)) || runs[0];
    }
    // TODO: Replace with backend endpoint when available
    return api.request(`/runs/${id}`);
  }
};
