import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

// Mock path must match component import: '../services/testRunsService' -> '../../services/testRunsService'
jest.mock('../../services/testRunsService', () => ({
  __esModule: true,
  testRunsService: {
    list: jest.fn().mockResolvedValue([
      { id: '1', suite: 'Smoke', status: 'passed', passed: 10, failed: 0, skipped: 1, durationSec: 100, startTime: '2024-01-01T00:00:00Z' },
      { id: '2', suite: 'Regression', status: 'failed', passed: 8, failed: 2, skipped: 0, durationSec: 120, startTime: '2024-01-02T00:00:00Z' },
    ]),
    get: jest.fn(),
  },
}));

describe('Dashboard', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    jest.resetModules();
  });

  test('shows KPI cards, chart, and recent runs table', async () => {
    // Require component after mocks to ensure no race on import order
    const Dashboard = require('../Dashboard').default;
    renderWithProviders(<Dashboard />);
    // KPI titles
    expect(screen.getByText('Total Runs')).toBeInTheDocument();
    expect(screen.getByText('Passed')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Flaky')).toBeInTheDocument();
    expect(screen.getByText('Avg Duration (s)')).toBeInTheDocument();

    // Chart
    expect(screen.getByRole('img', { name: /trend chart/i })).toBeInTheDocument();

    // Table rows rendered
    await waitFor(() => expect(screen.getByText('Smoke')).toBeInTheDocument());
    expect(screen.getByText('Regression')).toBeInTheDocument();
  });
});
