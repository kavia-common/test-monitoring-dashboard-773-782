import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { StoreProvider, useStore } from '../store';

describe('store', () => {
  test('initializes with expected slices and allows dispatch', () => {
    const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;
    const { result } = renderHook(() => useStore(), { wrapper });
    const [state, dispatch] = result.current;
    expect(state).toHaveProperty('ui');
    expect(state).toHaveProperty('runs');
    expect(state).toHaveProperty('suites');
    expect(state).toHaveProperty('settings');

    act(() => dispatch({ type: 'ui/loading', payload: true }));
    const [nextState] = result.current;
    expect(nextState.ui.loading).toBe(true);
  });
});
