import { initialState, rootReducer } from '../reducers';

describe('reducers', () => {
  test('returns default state for unknown action', () => {
    const next = rootReducer(initialState, { type: 'unknown' });
    expect(next).toEqual(initialState);
  });

  test('handles known actions', () => {
    let state = rootReducer(initialState, { type: 'ui/loading', payload: true });
    expect(state.ui.loading).toBe(true);

    state = rootReducer(state, { type: 'runs/set', payload: [{ id: '1' }] });
    expect(state.runs.list).toEqual([{ id: '1' }]);

    state = rootReducer(state, { type: 'suites/set', payload: [{ id: '2' }] });
    expect(state.suites.list).toEqual([{ id: '2' }]);

    state = rootReducer(state, { type: 'settings/theme', payload: 'dark' });
    expect(state.settings.theme).toBe('dark');
  });
});
