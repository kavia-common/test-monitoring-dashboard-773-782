import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Badge from '../components/common/Badge';
import { testRunsService } from '../services/testRunsService';
import { suitesService } from '../services/suitesService';

export default function TestRuns() {
  const [runs, setRuns] = useState([]);
  const [suites, setSuites] = useState([]);
  const [filters, setFilters] = useState({ status: '', suite: '', q: '' });

  useEffect(() => {
    testRunsService.list().then(setRuns);
    suitesService.list().then(setSuites);
  }, []);

  const filtered = useMemo(() => {
    return runs.filter(r => {
      if (filters.status && r.status !== filters.status) return false;
      if (filters.suite && r.suite !== filters.suite) return false;
      if (filters.q && !(`${r.id} ${r.suite}`.toLowerCase().includes(filters.q.toLowerCase()))) return false;
      return true;
    });
  }, [runs, filters]);

  const columns = [
    { header: 'Run ID', accessor: 'id' },
    { header: 'Suite', accessor: 'suite' },
    { header: 'Status', accessor: 'status' },
    { header: 'Passed', accessor: 'passed' },
    { header: 'Failed', accessor: 'failed' },
    { header: 'Skipped', accessor: 'skipped' },
    { header: 'Duration (s)', accessor: 'durationSec' },
    { header: 'Start Time', accessor: 'startTime' },
    { header: 'Actions', accessor: 'actions' },
  ];

  return (
    <div className="container">
      <Card
        title="Filters"
        actions={<button className="btn secondary" onClick={() => setFilters({ status: '', suite: '', q: '' })}>Clear</button>}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <select
            className="select"
            aria-label="Status"
            value={filters.status}
            onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
          >
            <option value="">All Statuses</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="flaky">Flaky</option>
          </select>
          <select
            className="select"
            aria-label="Suite"
            value={filters.suite}
            onChange={(e) => setFilters(f => ({ ...f, suite: e.target.value }))}
          >
            <option value="">All Suites</option>
            {suites.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <input
            className="input"
            placeholder="Search by ID or suite"
            value={filters.q}
            onChange={(e) => setFilters(f => ({ ...f, q: e.target.value }))}
          />
        </div>
      </Card>

      <div style={{ height: 12 }} />

      <Card title="Test Runs">
        <Table
          columns={columns}
          data={filtered}
          rowKey="id"
          renderCell={(row, col) => {
            if (col.accessor === 'status') {
              const tone = row.status === 'passed' ? 'success' : row.status === 'failed' ? 'error' : 'secondary';
              return <Badge text={row.status} tone={tone} />;
            }
            if (col.accessor === 'actions') {
              return <a className="btn secondary" href={`#/runs/${row.id}`}>Open</a>;
            }
            return row[col.accessor];
          }}
        />
      </Card>
    </div>
  );
}
