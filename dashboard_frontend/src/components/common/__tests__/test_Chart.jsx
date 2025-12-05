import React from 'react';
import { render, screen } from '@testing-library/react';
import Chart from '../Chart';

describe('Chart', () => {
  test('renders accessible svg', () => {
    render(<Chart />);
    const svg = screen.getByRole('img', { name: /trend chart/i });
    expect(svg).toBeInTheDocument();
  });

  test('renders path with provided data', () => {
    const points = [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: 15 },
    ];
    const { container } = render(<Chart points={points} width={200} height={100} />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path.getAttribute('d')).toMatch(/M/);
    expect(path.getAttribute('d')).toMatch(/L/);
  });
});
