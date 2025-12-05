import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Simple card container.
 */
export default function Card({ title, subtitle, actions, children }) {
  return (
    <section className="card" role="region" aria-label={title || 'Card'}>
      {(title || actions || subtitle) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            {title && <div style={{ fontWeight: 700 }}>{title}</div>}
            {subtitle && <div style={{ color: 'var(--color-secondary)', fontSize: 12 }}>{subtitle}</div>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
