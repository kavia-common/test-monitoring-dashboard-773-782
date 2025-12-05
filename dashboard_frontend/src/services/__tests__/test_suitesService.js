import * as utilsEnv from '../utilsEnv';

describe('suitesService', () => {
  let suitesService;

  beforeEach(() => {
    // Ensure a clean module cache and set env mocks before importing the service
    jest.resetModules();

    // Mock getEnvStatic to force mock mode (no API urls)
    jest.spyOn(utilsEnv, 'getEnvStatic').mockReturnValue({
      API_BASE: '',
      BACKEND_URL: '',
      LOG_LEVEL: 'info',
    });

    // Default fetch mock to avoid real network calls if code ever hits it
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    // Now require the service after mocks are in place
    // eslint-disable-next-line global-require
    suitesService = require('../suitesService').suitesService;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('list returns mocked suites when API disabled', async () => {
    const suites = await suitesService.list();
    expect(Array.isArray(suites)).toBe(true);
    expect(suites.length).toBeGreaterThan(0);
    const s = suites[0];
    expect(s).toHaveProperty('id');
    expect(s).toHaveProperty('name');
    expect(s).toHaveProperty('lastRunId');
    expect(s).toHaveProperty('lastStatus');
  });
});
