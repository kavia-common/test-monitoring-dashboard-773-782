import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Table from '../components/common/Table';
import { testRunsService } from '../services/testRunsService';

/**
 * PUBLIC_INTERFACE
 * Test run details page.
 */
export default function TestRunDetails({ runId }) {
  const [run, setRun] = useState(null);
  const [tab, setTab] = useState('Overview');

  useEffect(() => {
    testRunsService.get(runId).then(setRun);
  }, [runId]);

  if (!run) return <div className="container"><p>Loading run...</p></div>;

  const testsColumns = [
    { header: 'Test', accessor: 'name' },
    { header: 'Status', accessor: 'status' },
    { header: 'Duration (s)', accessor: 'durationSec' },
  ];

  return (
    <div className="container">
      <Card
        title={`Run ${run.id}`}
        subtitle={`${run.suite} • ${run.startTime}`}
        actions={<Badge text={run.status} tone={run.status === 'passed' ? 'success' : run.status === 'failed' ? 'error' : 'secondary'} />}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
          <button className={`btn secondary`} onClick={() => setTab('Overview')} aria-current={tab === 'Overview' ? 'page' : undefined}>Overview</button>
          <button className={`btn secondary`} onClick={() => setTab('Tests')} aria-current={tab === 'Tests' ? 'page' : undefined}>Tests</button>
          <button className={`btn secondary`} onClick={() => setTab('Logs')} aria-current={tab === 'Logs' ? 'page' : undefined}>Logs</button>
          <button className={`btn secondary`} onClick={() => setTab('Artifacts')} aria-current={tab === 'Artifacts' ? 'page' : undefined}>Artifacts</button>
        </div>
        <hr className="hr" />
        {tab === 'Overview' && (
          <div style={{ display: 'grid', gap: 8 }}>
            <div>Passed: {run.passed} • Failed: {run.failed} • Skipped: {run.skipped}</div>
            <div>Duration: {run.durationSec}s</div>
          </div>
        )}
        {tab === 'Tests' && (
          <Table columns={testsColumns} data={run.tests || []} rowKey="name" />
        )}
        {tab === 'Logs' && <pre style={{ whiteSpace: 'pre-wrap' }}>{run.logs || 'No logs available.'}</pre>}
        {tab === 'Artifacts' && <div>No artifacts available.</div>}
      </Card>
    </div>
  );
}
