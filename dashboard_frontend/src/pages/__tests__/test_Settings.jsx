import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import Settings from '../Settings';

describe('Settings', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = {
      ...OLD_ENV,
      REACT_APP_FEATURE_FLAGS: 'ab,cd',
      REACT_APP_EXPERIMENTS_ENABLED: 'true',
      REACT_APP_LOG_LEVEL: 'debug',
      REACT_APP_NEXT_TELEMETRY_DISABLED: 'true',
      REACT_APP_API_BASE: '',
      REACT_APP_WS_URL: '',
      REACT_APP_FRONTEND_URL: 'http://localhost:3000',
    };
    localStorage.setItem('x', '1');
    sessionStorage.setItem('y', '2');
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('shows env/config values and triggers clear cache', () => {
    renderWithProviders(<Settings />);
    expect(screen.getByText(/Feature Flags:/)).toBeInTheDocument();
    expect(screen.getByText(/Experiments Enabled:/)).toBeInTheDocument();
    expect(screen.getByText(/Log Level:/)).toBeInTheDocument();
    expect(screen.getByText(/Telemetry Disabled:/)).toBeInTheDocument();
    expect(screen.getByText(/API URL:/)).toBeInTheDocument();
    expect(screen.getByText(/WS URL:/)).toBeInTheDocument();
    expect(screen.getByText(/Frontend URL:/)).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /clear local cache/i });
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });
});
