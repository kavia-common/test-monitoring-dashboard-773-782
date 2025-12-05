import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import Suites from '../Suites';

jest.mock('../../services/suitesService', () => ({
  suitesService: {
    list: jest.fn().mockResolvedValue([
      { id: '1', name: 'Smoke', lastRunId: '1001', lastStatus: 'passed' },
      { id: '2', name: 'Regression', lastRunId: '1002', lastStatus: 'failed' },
    ]),
  },
}));

describe('Suites', () => {
  test('lists suites with last run status', async () => {
    renderWithProviders(<Suites />);
    await waitFor(() => expect(screen.getByText('Suites')).toBeInTheDocument());
    expect(screen.getByText('Smoke')).toBeInTheDocument();
    expect(screen.getByText('Regression')).toBeInTheDocument();
    // badges rendered with status text
    expect(screen.getAllByText(/passed|failed/).length).toBeGreaterThan(0);
  });
});
