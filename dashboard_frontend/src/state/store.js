import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { rootReducer, initialState } from './reducers';

const StoreContext = createContext([initialState, () => {}]);

/**
 * PUBLIC_INTERFACE
 * Global store provider.
 */
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state, dispatch]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// PUBLIC_INTERFACE
export function useStore() {
  return useContext(StoreContext);
}
