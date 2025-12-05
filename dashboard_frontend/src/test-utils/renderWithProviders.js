import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { StoreProvider } from '../state/store';

// PUBLIC_INTERFACE
export function renderWithProviders(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}
