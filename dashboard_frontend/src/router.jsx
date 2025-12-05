import React, { useEffect, useMemo, useState } from 'react';
import Layout from './routes/AppRoutes';
import Dashboard from './pages/Dashboard';
import TestRuns from './pages/TestRuns';
import TestRunDetails from './pages/TestRunDetails';
import Suites from './pages/Suites';
import Settings from './pages/Settings';

/**
 * Simple hash-based router with v6-like interface (very minimal).
 * Supports:
 * - /#/            -> Dashboard
 * - /#/runs        -> TestRuns
 * - /#/runs/:id    -> TestRunDetails
 * - /#/suites      -> Suites
 * - /#/settings    -> Settings
 */

// PUBLIC_INTERFACE
export function useHashLocation() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handler);
    if (!window.location.hash) {
      window.location.replace('#/');
    }
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return [hash, (to) => { window.location.hash = to; }];
}

function parseRoute(hash) {
  const path = hash.replace(/^#/, '') || '/';
  const segments = path.split('?')[0].split('/').filter(Boolean);
  return { path, segments };
}

function matchPath(segments) {
  // Routes
  if (segments.length === 0) return { name: 'dashboard' };
  if (segments[0] === 'runs' && segments.length === 1) return { name: 'runs' };
  if (segments[0] === 'runs' && segments[1]) return { name: 'runDetails', id: segments[1] };
  if (segments[0] === 'suites') return { name: 'suites' };
  if (segments[0] === 'settings') return { name: 'settings' };
  return { name: 'dashboard' };
}

// PUBLIC_INTERFACE
export function AppRouter() {
  const [hash] = useHashLocation();
  const route = useMemo(() => {
    const { segments } = parseRoute(hash);
    return matchPath(segments);
  }, [hash]);

  return (
    <Layout activeRoute={route.name}>
      {route.name === 'dashboard' && <Dashboard />}
      {route.name === 'runs' && <TestRuns />}
      {route.name === 'runDetails' && <TestRunDetails runId={route.id} />}
      {route.name === 'suites' && <Suites />}
      {route.name === 'settings' && <Settings />}
    </Layout>
  );
}
