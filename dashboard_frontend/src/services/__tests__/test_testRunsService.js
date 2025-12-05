import { testRunsService } from '../testRunsService';
import * as utilsEnv from '../utilsEnv';

describe('testRunsService', () => {
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

  test('list returns mocked data when API disabled', async () => {
    const list = await testRunsService.list();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
    const r = list[0];
    expect(r).toHaveProperty('id');
    expect(r).toHaveProperty('suite');
    expect(r).toHaveProperty('status');
    expect(r).toHaveProperty('passed');
    expect(r).toHaveProperty('failed');
    expect(r).toHaveProperty('skipped');
    expect(r).toHaveProperty('durationSec');
    expect(r).toHaveProperty('startTime');
    expect(Array.isArray(r.tests)).toBe(true);
  });

  test('get returns one mocked run by id when API disabled', async () => {
    const any = await testRunsService.get('1000');
    expect(any).toHaveProperty('id');
    expect(any).toHaveProperty('suite');
  });
});
