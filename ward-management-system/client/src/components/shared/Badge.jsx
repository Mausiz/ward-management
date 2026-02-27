import React from 'react';

const statusConfig = {
  critical:   { bg: '#FFF0F2', color: '#C4002D', border: '#FFCDD4', dot: '#E8465A', label: 'Critical' },
  stable:     { bg: '#EDF7ED', color: '#1A6B2F', border: '#C3E6C3', dot: '#2E9E4F', label: 'Stable' },
  recovering: { bg: '#EFF6FF', color: '#1D4E89', border: '#BFDBFE', dot: '#3B82F6', label: 'Recovering' },
  palliative: { bg: '#FEF9EE', color: '#92400E', border: '#FDE68A', dot: '#D97706', label: 'Palliative' },
  'on-duty':  { bg: '#EDF7ED', color: '#1A6B2F', border: '#C3E6C3', dot: '#2E9E4F', label: 'On Duty' },
  'off-duty': { bg: '#F5F5F5', color: '#666',    border: '#E0E0E0', dot: '#9E9E9E', label: 'Off Duty' },
};

export default function Badge({ status, size = 'sm' }) {
  const cfg = statusConfig[status] || statusConfig.stable;
  const pad = size === 'lg' ? '5px 12px' : '3px 9px';
  const fontSize = size === 'lg' ? 13 : 11;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: pad,
      borderRadius: 20, border: `1px solid ${cfg.border}`, background: cfg.bg,
      color: cfg.color, fontSize, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
      whiteSpace: 'nowrap', letterSpacing: '0.01em',
    }}>
      <span style={{ width: size === 'lg' ? 8 : 6, height: size === 'lg' ? 8 : 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}
