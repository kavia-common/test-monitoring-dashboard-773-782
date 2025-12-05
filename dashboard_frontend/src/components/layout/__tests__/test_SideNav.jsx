import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SideNav from '../SideNav';

describe('SideNav', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders links and highlights active route', () => {
    render(<SideNav activeRoute="runs" />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByTitle('Dashboard')).toBeInTheDocument();
    const runsLink = screen.getByTitle('Test Runs');
    expect(runsLink).toBeInTheDocument();
    expect(runsLink).toHaveAttribute('aria-current', 'page');
  });

  test('collapses/expands and persists state', () => {
    render(<SideNav activeRoute="dashboard" />);
    const toggle = screen.getByRole('button', { name: /menu/i });
    // initial not collapsed
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(toggle);
    expect(localStorage.getItem('sidenav-collapsed')).toBe('true');
    // re-render to read saved state
    render(<SideNav activeRoute="dashboard" />);
    // check aria expanded false on new button instance
    const toggle2 = screen.getAllByRole('button', { name: /menu/i })[0];
    expect(toggle2).toHaveAttribute('aria-expanded', 'false');
  });
});
