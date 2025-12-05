import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  test('renders title and children', () => {
    render(
      <Card title="My Card" subtitle="sub">
        <div>content</div>
      </Card>
    );
    expect(screen.getByRole('region', { name: 'My Card' })).toBeInTheDocument();
    expect(screen.getByText('My Card')).toBeInTheDocument();
    expect(screen.getByText('sub')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  test('supports actions click handler', () => {
    const onClick = jest.fn();
    render(<Card title="Actions" actions={<button onClick={onClick}>Do</button>} />);
    fireEvent.click(screen.getByText('Do'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
