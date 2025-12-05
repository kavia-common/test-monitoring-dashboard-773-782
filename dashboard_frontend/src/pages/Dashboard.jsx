import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Badge from '../components/common/Badge';
import Chart from '../components/common/Chart';
import { testRunsService } from '../services/testRunsService';

export default function Dashboard() {
  const [runs, setRuns] = useState([]);
  useEffect(() => {
    testRunsService.list().then(setRuns).catch(() => setRuns([]));
  }, []);

  const kpis = useMemo(() => {
    const total = runs.length;
    const passed = runs.filter(r => r.status === 'passed').length;
    const failed = runs.filter(r => r.status === 'failed').length;
    const flaky = runs.filter(r => r.status === 'flaky').length;
    const avgDuration = runs.length ? Math.round(runs.reduce((s, r) => s + (r.durationSec || 0), 0) / runs.length) : 0;
    return { total, passed, failed, flaky, avgDuration };
  }, [runs]);

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
      <div className="grid cols-5">
        <Card title="Total Runs"><div className="kpi"><span className="label">All time</span><span className="value">{kpis.total}</span></div></Card>
        <Card title="Passed"><div className="kpi"><span className="label">All time</span><span className="value" style={{ color: 'var(--color-success)' }}>{kpis.passed}</span></div></Card>
        <Card title="Failed"><div className="kpi"><span className="label">All time</span><span className="value" style={{ color: 'var(--color-error)' }}>{kpis.failed}</span></div></Card>
        <Card title="Flaky"><div className="kpi"><span className="label">All time</span><span className="value">{kpis.flaky}</span></div></Card>
        <Card title="Avg Duration (s)"><div className="kpi"><span className="label">Last 30</span><span className="value">{kpis.avgDuration}</span></div></Card>
      </div>

      <div style={{ height: 16 }} />

      <Card title="Trends">
        <Chart />
      </Card>

      <div style={{ height: 16 }} />

      <Card title="Recent Runs" subtitle="Latest executions across suites">
        <Table
          columns={columns}
          data={runs.slice(0, 10)}
          rowKey="id"
          renderCell={(row, col) => {
            if (col.accessor === 'status') {
              const tone = row.status === 'passed' ? 'success' : row.status === 'failed' ? 'error' : 'secondary';
              return <Badge text={row.status} tone={tone} />;
            }
            if (col.accessor === 'actions') {
              return <a className="btn secondary" href={`#/runs/${row.id}`}>View</a>;
            }
            return row[col.accessor];
          }}
        />
      </Card>
    </div>
  );
}
