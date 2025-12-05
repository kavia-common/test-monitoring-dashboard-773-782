import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge', () => {
  test('renders with default tone', () => {
    render(<Badge text="Default" />);
    const el = screen.getByText('Default');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('status-badge');
  });

  test('renders with success tone', () => {
    render(<Badge text="ok" tone="success" />);
    const el = screen.getByText('ok');
    expect(el).toBeInTheDocument();
    // style color applied by inline style; ensure style contains color token
    expect(el.getAttribute('style')).toMatch(/--color-success/);
  });

  test('renders with error tone', () => {
    render(<Badge text="bad" tone="error" />);
    const el = screen.getByText('bad');
    expect(el.getAttribute('style')).toMatch(/--color-error/);
  });

  test('falls back to default tone on unknown', () => {
    render(<Badge text="weird" tone="unknown" />);
    expect(screen.getByText('weird')).toBeInTheDocument();
  });
});
