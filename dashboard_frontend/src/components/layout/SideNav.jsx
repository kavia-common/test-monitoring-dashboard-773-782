import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Collapsible side navigation with persistence in localStorage.
 */
export default function SideNav({ activeRoute }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidenav-collapsed');
    if (saved != null) setCollapsed(saved === 'true');
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidenav-collapsed', String(next));
  };

  const items = [
    { href: '#/', key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { href: '#/runs', key: 'runs', label: 'Test Runs', icon: '🏃' },
    { href: '#/suites', key: 'suites', label: 'Suites', icon: '🧪' },
    { href: '#/settings', key: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav
      className="sidenav"
      aria-label="Main navigation"
      style={{
        borderRight: '1px solid var(--color-border)',
        background: 'var(--color-bg)',
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <button
        className="btn secondary"
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        aria-expanded={!collapsed}
        aria-controls="sidenav-items"
      >
        {collapsed ? '➡️' : '⬅️'} Menu
      </button>

      <ul id="sidenav-items" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((it) => {
          const active = activeRoute === it.key;
          return (
            <li key={it.key}>
              <a
                href={it.href}
                aria-current={active ? 'page' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 8,
                  color: active ? 'var(--color-primary)' : 'inherit',
                  background: active ? 'var(--color-surface)' : 'transparent',
                }}
                title={it.label}
              >
                <span aria-hidden="true">{it.icon}</span>
                {!collapsed && <span>{it.label}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
