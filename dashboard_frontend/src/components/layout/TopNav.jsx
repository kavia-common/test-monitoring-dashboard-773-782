import React from 'react';
import { useTheme } from '../common/ThemeProvider';
import Badge from '../common/Badge';
import { useEnv } from '../../hooks/useEnv';

/**
 * PUBLIC_INTERFACE
 * Top navigation bar with title, environment badge, search, and theme toggle.
 */
export default function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const env = useEnv();

  return (
    <header className="topnav" style={styles.header}>
      <div style={styles.left}>
        <a href="#/" aria-label="Go to Dashboard" style={styles.brandLink}>
          <span style={styles.brand} data-testid="app-title">
            Test Monitoring Dashboard
          </span>
        </a>
        <Badge text={(env.NODE_ENV || 'development').toUpperCase()} tone="secondary" />
      </div>

      <div style={styles.center}>
        <input
          type="search"
          placeholder="Search runs, suites, tests..."
          aria-label="Search"
          className="input"
          style={{ width: '100%', maxWidth: 420 }}
        />
      </div>

      <div style={styles.right}>
        <button
          className="btn secondary"
          onClick={toggleTheme}
          aria-label={`Toggle theme, current ${theme}`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    height: 56,
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: 12,
    padding: '8px 16px',
    background: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
  },
  left: { display: 'flex', alignItems: 'center', gap: 10 },
  center: { display: 'flex', justifyContent: 'center' },
  right: { display: 'flex', justifyContent: 'flex-end' },
  brand: { fontWeight: 700, fontSize: 16, color: 'var(--color-primary)' },
  brandLink: { display: 'inline-flex', alignItems: 'center', gap: 8 }
};
