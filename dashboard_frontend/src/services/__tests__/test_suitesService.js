/**
 * Mock utilsEnv at module level so when the service imports it, it sees mock values.
 * This must appear before requiring the service under test.
 */
jest.mock('../utilsEnv', () => ({
  __esModule: true,
  getEnvStatic: () => ({
    API_BASE: '',
    BACKEND_URL: '',
    LOG_LEVEL: 'info',
  }),
}));

describe('suitesService', () => {
  let suitesService;

  beforeEach(() => {
    // Reset module registry so the service picks up our mocks on require
    jest.resetModules();

    // Safety net: avoid any real network calls
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    // Require the service after mocks are in place
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
