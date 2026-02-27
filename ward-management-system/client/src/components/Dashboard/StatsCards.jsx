import React from 'react';
import { BedDouble, AlertTriangle, UserPlus, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, sub, accent, bg }) => (
  <div style={{
    background: '#fff', borderRadius: 14, padding: '22px 24px',
    border: '1px solid #EAF0F7', boxShadow: '0 2px 12px rgba(11,79,130,0.06)',
    display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1, minWidth: 180,
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'default',
  }}
  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(11,79,130,0.1)'; }}
  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(11,79,130,0.06)'; }}
  >
    <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={22} color={accent} />
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#07355A', fontFamily: "'DM Sans', sans-serif", lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</div>
      <div style={{ fontSize: 13, color: '#4A6A8A', fontWeight: 500, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: accent, fontWeight: 600, marginTop: 4 }}>{sub}</div>}
    </div>
  </div>
);

export default function StatsCards({ data }) {
  if (!data) return null;
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
      <StatCard icon={BedDouble} label="Total Beds" value={data.totalBeds} sub={`${data.availableBeds} available`} accent="#0B4F82" bg="#EBF4FF" />
      <StatCard icon={TrendingUp} label="Occupied Beds" value={data.occupiedBeds} sub={`${data.occupancyRate}% occupancy`} accent="#2179C4" bg="#E8F2FF" />
      <StatCard icon={AlertTriangle} label="Critical Patients" value={data.criticalCount} sub="Requires attention" accent="#C4002D" bg="#FFF0F2" />
      <StatCard icon={UserPlus} label="Today's Admissions" value={data.todayAdmissions} sub="New patients today" accent="#2E9E4F" bg="#EDF7ED" />
    </div>
  );
}
