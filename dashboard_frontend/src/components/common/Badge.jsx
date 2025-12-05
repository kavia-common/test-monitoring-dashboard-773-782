import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Small rounded badge with tone styles.
 */
export default function Badge({ text, tone = 'default' }) {
  const toneStyles = {
    default: { background: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border)' },
    secondary: { background: 'rgba(156,163,175,0.15)', color: 'var(--color-secondary)', borderColor: 'var(--color-border)' },
    success: { background: 'rgba(16,185,129,0.1)', color: 'var(--color-success)', borderColor: 'var(--color-success)' },
    error: { background: 'rgba(239,68,68,0.1)', color: 'var(--color-error)', borderColor: 'var(--color-error)' },
  };
  const st = toneStyles[tone] || toneStyles.default;
  return (
    <span
      className="status-badge"
      style={{ ...st, border: `1px solid ${st.borderColor}` }}
    >
      {text}
    </span>
  );
}
