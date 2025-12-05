import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Minimal SVG trend chart placeholder.
 */
export default function Chart({ points = [], width = 400, height = 120 }) {
  if (!points.length) {
    points = Array.from({ length: 8 }).map((_, i) => ({ x: i, y: Math.sin(i / 2) * 10 + 20 }));
  }
  const maxX = Math.max(...points.map(p => p.x), 1);
  const maxY = Math.max(...points.map(p => p.y), 1);

  const path = points.map((p, i) => {
    const x = (p.x / maxX) * (width - 20) + 10;
    const y = height - ((p.y / maxY) * (height - 20) + 10);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} role="img" aria-label="Trend chart">
      <rect x="0" y="0" width={width} height={height} fill="var(--color-bg)" />
      <path d={path} stroke="var(--color-primary)" fill="none" strokeWidth="2" />
    </svg>
  );
}
