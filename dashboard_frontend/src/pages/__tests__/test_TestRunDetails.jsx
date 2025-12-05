import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import TestRunDetails from '../TestRunDetails';

jest.mock('../../services/testRunsService', () => ({
  __esModule: true,
  testRunsService: {
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
  });

  test('renders tabs and switches between them', async () => {
    renderWithProviders(<TestRunDetails runId="1005" />);
    await waitFor(() => expect(screen.getByText(/Run 1005/)).toBeInTheDocument());

    // Overview visible
    expect(screen.getByText(/Passed:/)).toBeInTheDocument();

    // Switch to Tests
    fireEvent.click(screen.getByRole('button', { name: 'Tests' }));
    expect(screen.getByText('Test A')).toBeInTheDocument();

    // Switch to Logs
    fireEvent.click(screen.getByRole('button', { name: 'Logs' }));
    expect(screen.getByText('Some logs')).toBeInTheDocument();

    // Switch to Artifacts
    fireEvent.click(screen.getByRole('button', { name: 'Artifacts' }));
    expect(screen.getByText(/No artifacts available/)).toBeInTheDocument();
  });
});
