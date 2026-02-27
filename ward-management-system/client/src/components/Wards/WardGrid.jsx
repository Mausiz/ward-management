import React, { useState } from 'react';
import { BedDouble, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from '../shared/Badge';

const bedStatusColor = (patient) => {
  if (!patient) return { bg: '#EDF7ED', border: '#C3E6C3', label: 'Available' };
  const map = { critical: { bg: '#FFF0F2', border: '#FFCDD4' }, stable: { bg: '#EBF4FF', border: '#BFDBFE' }, recovering: { bg: '#FFFBEB', border: '#FDE68A' }, palliative: { bg: '#F9F0FF', border: '#E9D5FF' } };
  return map[patient.status] || map.stable;
};

function WardCard({ ward }) {
  const [expanded, setExpanded] = useState(false);
  const pct = Math.round((ward.occupiedBeds / ward.totalBeds) * 100);
  const barColor = pct >= 90 ? '#E8465A' : pct >= 70 ? '#F59E0B' : '#0B4F82';

  // Create a virtual bed grid
  const beds = Array.from({ length: ward.totalBeds }, (_, i) => {
    const bedId = `${ward.id.replace('ward-','').toUpperCase()}-${i + 1}`;
    const patient = (ward.patients || []).find(p => p.bed === bedId);
    return { id: bedId, patient };
  });

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #EAF0F7', boxShadow: '0 2px 12px rgba(11,79,130,0.06)', overflow: 'hidden' }}>
      {/* Ward Header */}
      <div style={{ padding: '18px 20px', background: 'linear-gradient(135deg, #F7FAFD, #EBF4FF)', borderBottom: '1px solid #EAF0F7' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: '#07355A' }}>{ward.name}</span>
              <span style={{ fontSize: 11, color: '#5A7EA8', background: '#D9ECFF', padding: '2px 9px', borderRadius: 20, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{ward.type}</span>
            </div>
            <div style={{ fontSize: 12, color: '#8BA3BC', marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>Floor {ward.floor} · Head: {ward.headNurse}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: barColor, fontFamily: "'DM Sans', sans-serif", lineHeight: 1, letterSpacing: '-0.03em' }}>{pct}%</div>
            <div style={{ fontSize: 11, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>{ward.occupiedBeds}/{ward.totalBeds} beds</div>
          </div>
        </div>
        {/* Progress Bar */}
        <div style={{ marginTop: 12, height: 6, background: '#E2EBF4', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: 10, transition: 'width 0.6s ease' }} />
        </div>
        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#4A6A8A', fontFamily: "'DM Sans', sans-serif" }}>
            <BedDouble size={13} /> {ward.totalBeds - ward.occupiedBeds} available
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#4A6A8A', fontFamily: "'DM Sans', sans-serif" }}>
            <Users size={13} /> {ward.occupiedBeds} patients
          </div>
          {(ward.patients||[]).filter(p=>p.status==='critical').length > 0 && (
            <div style={{ fontSize: 12, color: '#C4002D', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
              ⚠ {(ward.patients||[]).filter(p=>p.status==='critical').length} critical
            </div>
          )}
        </div>
      </div>

      {/* Bed Map Toggle */}
      <button onClick={() => setExpanded(e => !e)} style={{ width: '100%', padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#5A7EA8', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
        View bed map
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {expanded && (
        <div style={{ padding: '4px 20px 18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))', gap: 6 }}>
            {beds.map(({ id, patient }) => {
              const cfg = bedStatusColor(patient);
              return (
                <div key={id} title={patient ? `${patient.name} (${patient.status})` : 'Available'}
                  style={{ padding: '6px 4px', borderRadius: 7, border: `1px solid ${cfg.border}`, background: cfg.bg, textAlign: 'center', cursor: patient ? 'pointer' : 'default', transition: 'transform 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                >
                  <BedDouble size={13} color={patient ? (patient.status === 'critical' ? '#C4002D' : '#0B4F82') : '#2E9E4F'} />
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#4A6A8A', marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{id}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            {[['#EDF7ED','#C3E6C3','Available'], ['#EBF4FF','#BFDBFE','Stable'], ['#FFF0F2','#FFCDD4','Critical'], ['#FFFBEB','#FDE68A','Recovering']].map(([bg,border,label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: bg, border: `1px solid ${border}` }} /> {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WardGrid({ wards }) {
  if (!wards?.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
      {wards.map(ward => <WardCard key={ward.id} ward={ward} />)}
    </div>
  );
}
