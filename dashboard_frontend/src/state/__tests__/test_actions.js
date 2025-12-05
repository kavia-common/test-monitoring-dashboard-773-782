import { setLoading, setRuns, setSuites, setTheme } from '../actions';

describe('actions', () => {
  test('creators return expected shapes', () => {
    expect(setLoading(true)).toEqual({ type: 'ui/loading', payload: true });
    expect(setRuns([1])).toEqual({ type: 'runs/set', payload: [1] });
    expect(setSuites([2])).toEqual({ type: 'suites/set', payload: [2] });
    expect(setTheme('dark')).toEqual({ type: 'settings/theme', payload: 'dark' });
  });
});
