import { createApiClient } from './apiClient';
import { getEnvStatic } from './utilsEnv';

const env = getEnvStatic();
const api = createApiClient(env.API_BASE || env.BACKEND_URL || '', env.LOG_LEVEL || 'info');

function mockSuites() {
  const suites = ['Smoke', 'Regression', 'E2E', 'API', 'UI'].map((name, idx) => ({
    id: String(idx + 1),
    name,
    lastRunId: String(1000 + idx),
    lastStatus: ['passed', 'failed', 'flaky'][idx % 3],
  }));
  return suites;
}

export const suitesService = {
  // PUBLIC_INTERFACE
  async list() {
    if (!env.API_BASE && !env.BACKEND_URL) {
      return mockSuites();
    }
    // TODO: Replace with backend endpoint when available
    return api.request('/suites');
  }
};
