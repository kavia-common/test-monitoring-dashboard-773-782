import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import Dashboard from '../Dashboard';

jest.mock('../../services/testRunsService', () => {
  return {
    testRunsService: {
      list: jest.fn().mockResolvedValue([
        { id: '1', suite: 'Smoke', status: 'passed', passed: 10, failed: 0, skipped: 1, durationSec: 100, startTime: '2024-01-01T00:00:00Z' },
        { id: '2', suite: 'Regression', status: 'failed', passed: 8, failed: 2, skipped: 0, durationSec: 120, startTime: '2024-01-02T00:00:00Z' },
      ]),
    },
  };
});

describe('Dashboard', () => {
  test('shows KPI cards, chart, and recent runs table', async () => {
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
