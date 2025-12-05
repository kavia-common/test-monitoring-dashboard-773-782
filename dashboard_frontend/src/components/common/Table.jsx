import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Simple table with horizontal scroll wrapper.
 */
export default function Table({ columns = [], data = [], rowKey = 'id', renderCell }) {
  return (
    <div className="scroll-x">
      <table className="table" role="table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key || c.accessor} scope="col">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((c) => (
                <td key={c.key || c.accessor}>
                  {renderCell ? renderCell(row, c) : row[c.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
