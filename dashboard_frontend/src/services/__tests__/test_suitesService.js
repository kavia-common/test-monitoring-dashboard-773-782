import { suitesService } from '../suitesService';
import * as utilsEnv from '../utilsEnv';

describe('suitesService', () => {
  beforeEach(() => {
    jest.spyOn(utilsEnv, 'getEnvStatic').mockReturnValue({
      API_BASE: '',
      BACKEND_URL: '',
      LOG_LEVEL: 'info',
    });
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
