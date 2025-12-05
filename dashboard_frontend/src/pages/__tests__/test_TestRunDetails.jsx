import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

// Mock path matches component import
jest.mock('../../services/testRunsService', () => ({
  __esModule: true,
  testRunsService: {
    list: jest.fn(),
    get: jest.fn().mockResolvedValue({
      id: '1005',
      suite: 'Regression',
      status: 'failed',
      passed: 20,
      failed: 8,
      skipped: 2,
      durationSec: 150,
      startTime: '2024-01-10T00:00:00Z',
      tests: [{ name: 'Test A', status: 'passed', durationSec: 5 }],
      logs: 'Some logs',
    }),
  },
}));

describe('TestRunDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    jest.resetModules();
  });

  test('renders tabs and switches between them', async () => {
    const TestRunDetails = require('../TestRunDetails').default;
    renderWithProviders(<TestRunDetails runId="1005" />);
    await waitFor(() => expect(screen.getByText(/Run 1005/)).toBeInTheDocument());

    // Overview visible
    expect(screen.getByText(/Passed:/)).toBeInTheDocument();

    // Switch to Tests
    const testsBtn = screen.getByRole('button', { name: 'Tests' });
    testsBtn && testsBtn.click();
    expect(screen.getByText('Test A')).toBeInTheDocument();

    // Switch to Logs
    const logsBtn = screen.getByRole('button', { name: 'Logs' });
    logsBtn && logsBtn.click();
    expect(screen.getByText('Some logs')).toBeInTheDocument();

    // Switch to Artifacts
    const artBtn = screen.getByRole('button', { name: 'Artifacts' });
    artBtn && artBtn.click();
    expect(screen.getByText(/No artifacts available/)).toBeInTheDocument();
  });
});
