import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from './test-utils/renderWithProviders';
import { AppRouter } from './router';

describe('AppRouter + Layout', () => {
  const origFetch = global.fetch;

  beforeEach(() => {
    window.location.hash = '#/';
    // Stub fetch to avoid any accidental network calls from mounted pages/components
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  afterEach(() => {
    global.fetch = origFetch;
    jest.restoreAllMocks();
  });

  test('renders dashboard by default and highlights side nav', () => {
    renderWithProviders(<AppRouter />);
    expect(screen.getByTestId('app-title')).toBeInTheDocument();
    const dashboardLink = screen.getByTitle('Dashboard');
    expect(dashboardLink).toHaveAttribute('aria-current', 'page');
  });

  test('navigates to runs and settings via hash changes', () => {
    renderWithProviders(<AppRouter />);
    window.location.hash = '#/runs';
    // dispatch hashchange
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(screen.getByText('Filters')).toBeInTheDocument();

    window.location.hash = '#/settings';
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(screen.getByText('Preferences')).toBeInTheDocument();
  });
});
