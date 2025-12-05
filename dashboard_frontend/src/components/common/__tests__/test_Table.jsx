import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table';

const columns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
];

describe('Table', () => {
  test('renders headers and rows', () => {
    render(<Table columns={columns} data={[{ id: '1', name: 'Alpha' }]} rowKey="id" />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  test('renders via renderCell', () => {
    render(
      <Table
        columns={columns}
        data={[{ id: '2', name: 'Beta' }]}
        rowKey="id"
        renderCell={(row, col) => (col.accessor === 'name' ? `Hello ${row.name}` : row[col.accessor])}
      />
    );
    expect(screen.getByText('Hello Beta')).toBeInTheDocument();
  });

  test('supports horizontal scroll wrapper', () => {
    const { container } = render(<Table columns={columns} data={[]} rowKey="id" />);
    const wrapper = container.querySelector('.scroll-x');
    expect(wrapper).toBeInTheDocument();
  });
});
