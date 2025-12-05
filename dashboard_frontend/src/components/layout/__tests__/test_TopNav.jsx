import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import TopNav from '../TopNav';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';

describe('TopNav', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.restoreAllMocks();
    process.env = { ...OLD_ENV, REACT_APP_NODE_ENV: 'test' };
    localStorage.clear();
    document.documentElement.setAttribute('data-theme', 'light');
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('shows app title and env badge', () => {
    renderWithProviders(<TopNav />);
    expect(screen.getByTestId('app-title')).toHaveTextContent('Test Monitoring Dashboard');
    // badge text set to env node env in uppercase
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('toggles theme via button', () => {
    renderWithProviders(<TopNav />);
    const btn = screen.getByRole('button', { name: /toggle theme/i });
    const before = document.documentElement.getAttribute('data-theme');
    fireEvent.click(btn);
    const after = document.documentElement.getAttribute('data-theme');
    expect(before).not.toEqual(after);
  });
});
