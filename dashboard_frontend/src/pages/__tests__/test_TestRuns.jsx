import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

// Mock paths must match component imports
jest.mock('../../services/testRunsService', () => ({
  __esModule: true,
  testRunsService: {
    list: jest.fn().mockResolvedValue([
      { id: '1001', suite: 'Smoke', status: 'passed', passed: 28, failed: 0, skipped: 1, durationSec: 120, startTime: '2024-01-01T00:00:00Z' },
      { id: '1002', suite: 'Regression', status: 'failed', passed: 20, failed: 8, skipped: 0, durationSec: 140, startTime: '2024-01-02T00:00:00Z' },
      { id: '1003', suite: 'API', status: 'flaky', passed: 26, failed: 2, skipped: 2, durationSec: 130, startTime: '2024-01-03T00:00:00Z' },
    ]),
    get: jest.fn(),
  },
}));

jest.mock('../../services/suitesService', () => ({
  __esModule: true,
  suitesService: {
    list: jest.fn().mockResolvedValue([
      { id: '1', name: 'Smoke', lastRunId: '1001', lastStatus: 'passed' },
      { id: '2', name: 'Regression', lastRunId: '1002', lastStatus: 'failed' },
    ]),
  },
}));

describe('TestRuns', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    jest.resetModules();
  });

  test('applies filters and search', async () => {
    const TestRuns = require('../TestRuns').default;
    renderWithProviders(<TestRuns />);

    await waitFor(() => expect(screen.getByText('Test Runs')).toBeInTheDocument());
    // Initially shows multiple rows
    expect(screen.getByText('Smoke')).toBeInTheDocument();
    expect(screen.getByText('Regression')).toBeInTheDocument();

    // Filter by status = passed
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'passed' } });
    await waitFor(() => expect(screen.queryByText('Regression')).not.toBeInTheDocument());
    expect(screen.getByText('Smoke')).toBeInTheDocument();

    // Filter by suite
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Suite'), { target: { value: 'Regression' } });
    await waitFor(() => {
      expect(screen.getByText('Regression')).toBeInTheDocument();
      expect(screen.queryByText('Smoke')).not.toBeInTheDocument();
    });

    // Search
    fireEvent.change(screen.getByPlaceholderText('Search by ID or suite'), { target: { value: '1003' } });
    await waitFor(() => {
      expect(screen.getByText('API')).toBeInTheDocument();
      expect(screen.queryByText('Regression')).not.toBeInTheDocument();
    });
  });
});
