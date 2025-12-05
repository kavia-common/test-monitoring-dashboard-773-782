export const initialState = {
  ui: { loading: false },
  runs: { list: [] },
  suites: { list: [] },
  settings: { theme: 'light' },
};

// PUBLIC_INTERFACE
export function rootReducer(state, action) {
  switch (action.type) {
    case 'ui/loading':
      return { ...state, ui: { ...state.ui, loading: action.payload } };
    case 'runs/set':
      return { ...state, runs: { ...state.runs, list: action.payload || [] } };
    case 'suites/set':
      return { ...state, suites: { ...state.suites, list: action.payload || [] } };
    case 'settings/theme':
      return { ...state, settings: { ...state.settings, theme: action.payload } };
    default:
      return state;
  }
}
