import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Badge from '../components/common/Badge';
import { suitesService } from '../services/suitesService';

export default function Suites() {
  const [suites, setSuites] = useState([]);

  useEffect(() => {
    suitesService.list().then(setSuites);
  }, []);

  const columns = [
    { header: 'Suite', accessor: 'name' },
    { header: 'Last Run', accessor: 'lastRunId' },
    { header: 'Status', accessor: 'lastStatus' },
  ];

  return (
    <div className="container">
      <Card title="Suites">
        <Table
          columns={columns}
          data={suites}
          rowKey="id"
          renderCell={(row, col) => {
            if (col.accessor === 'lastStatus') {
              const tone = row.lastStatus === 'passed' ? 'success' : row.lastStatus === 'failed' ? 'error' : 'secondary';
              return <Badge text={row.lastStatus} tone={tone} />;
            }
            return row[col.accessor];
          }}
        />
      </Card>
    </div>
  );
}
