import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: '#fff', border: '1px solid #EAF0F7', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 16px rgba(11,79,130,0.12)', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ fontWeight: 700, color: '#07355A', marginBottom: 4 }}>{label} — {d.type}</div>
      <div style={{ fontSize: 13, color: '#4A6A8A' }}>Occupied: <b style={{ color: '#0B4F82' }}>{d.occupiedBeds}</b> / {d.totalBeds}</div>
      <div style={{ fontSize: 13, color: '#4A6A8A' }}>Available: <b style={{ color: '#2E9E4F' }}>{d.totalBeds - d.occupiedBeds}</b></div>
    </div>
  );
};

export default function OccupancyChart({ data }) {
  if (!data?.length) return null;

  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '22px 24px', border: '1px solid #EAF0F7', boxShadow: '0 2px 12px rgba(11,79,130,0.06)', flex: 1 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: '#07355A', margin: 0 }}>Ward Occupancy</h3>
        <p style={{ fontSize: 12, color: '#8BA3BC', margin: '4px 0 0', fontFamily: "'DM Sans', sans-serif" }}>Beds occupied vs total capacity per ward</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EAF0F7" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(11,79,130,0.04)', radius: 4 }} />
          <Bar dataKey="totalBeds" fill="#EBF4FF" radius={[6,6,0,0]} name="Total Beds" />
          <Bar dataKey="occupiedBeds" radius={[6,6,0,0]} name="Occupied">
            {data.map((entry, i) => {
              const pct = entry.occupiedBeds / entry.totalBeds;
              const color = pct >= 0.9 ? '#E8465A' : pct >= 0.7 ? '#F59E0B' : '#0B4F82';
              return <Cell key={i} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 16, marginTop: 12, justifyContent: 'center' }}>
        {[['#EBF4FF', 'Total Capacity'], ['#0B4F82', 'Occupied (Normal)'], ['#F59E0B', 'Occupied (High)'], ['#E8465A', 'Occupied (Critical)']].map(([color, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: color, border: color === '#EBF4FF' ? '1px solid #D1E4F5' : 'none' }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
