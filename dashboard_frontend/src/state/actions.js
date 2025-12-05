export const setLoading = (flag) => ({ type: 'ui/loading', payload: flag });
export const setRuns = (list) => ({ type: 'runs/set', payload: list });
export const setSuites = (list) => ({ type: 'suites/set', payload: list });
export const setTheme = (theme) => ({ type: 'settings/theme', payload: theme });
