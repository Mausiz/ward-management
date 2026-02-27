import React, { useState } from 'react';
import { Phone, Stethoscope, Shield } from 'lucide-react';
import Badge from '../shared/Badge';

const roleIcon = (role) => {
  if (role === 'Consultant') return <Stethoscope size={14} />;
  if (role.includes('Nurse')) return <Shield size={14} />;
  return <Phone size={14} />;
};

const ROLE_COLORS = {
  'Consultant':  { bg: '#EBF4FF', color: '#0B4F82' },
  'Head Nurse':  { bg: '#F5EEFF', color: '#7C4D91' },
  'Nurse':       { bg: '#FFFBEB', color: '#B45309' },
};

export default function StaffRoster({ staff, wards }) {
  const [wardFilter, setWardFilter] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');

  const filtered = staff.filter(s => {
    if (wardFilter && s.wardId !== wardFilter) return false;
    if (shiftFilter && s.shift !== shiftFilter) return false;
    return true;
  });

  const onDuty = filtered.filter(s => s.status === 'on-duty').length;

  const selectStyle = { padding: '8px 12px', border: '1px solid #D5E3EF', borderRadius: 8, fontSize: 13, color: '#1A3A55', fontFamily: "'DM Sans', sans-serif", background: '#fff', cursor: 'pointer', outline: 'none' };

  return (
    <div>
      {/* Summary Bar */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
        {[['On Duty', onDuty, '#2E9E4F', '#EDF7ED'], ['Off Duty', filtered.length - onDuty, '#8BA3BC', '#F5F5F5'], ['Total Staff', filtered.length, '#0B4F82', '#EBF4FF']].map(([label, val, color, bg]) => (
          <div key={label} style={{ padding: '12px 20px', background: bg, borderRadius: 10, border: `1px solid ${color}22` }}>
            <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'DM Sans', sans-serif", lineHeight: 1, letterSpacing: '-0.03em' }}>{val}</div>
            <div style={{ fontSize: 11, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <select value={wardFilter} onChange={e => setWardFilter(e.target.value)} style={selectStyle}>
          <option value="">All Wards</option>
          {wards.map(w => <option key={w.id} value={w.id}>{w.name} — {w.type}</option>)}
        </select>
        <select value={shiftFilter} onChange={e => setShiftFilter(e.target.value)} style={selectStyle}>
          <option value="">All Shifts</option>
          <option value="Day">Day Shift</option>
          <option value="Night">Night Shift</option>
        </select>
      </div>

      {/* Staff Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {filtered.map((member, i) => {
          const rc = ROLE_COLORS[member.role] || ROLE_COLORS['Nurse'];
          const wardName = (wards.find(w => w.id === member.wardId) || {}).name || member.wardId;
          return (
            <div key={member.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #EAF0F7', padding: '18px', boxShadow: '0 2px 8px rgba(11,79,130,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(11,79,130,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(11,79,130,0.04)'; }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: `hsl(${(i * 61 + 210) % 360},50%,85%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: `hsl(${(i * 61 + 210) % 360},50%,35%)`, flexShrink: 0 }}>
                  {member.name.split(' ').filter(n=>!n.startsWith('Dr.')).map(n=>n[0]).join('').slice(0,2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#07355A', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: rc.color, background: rc.bg, padding: '2px 8px', borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>
                      {roleIcon(member.role)} {member.role}
                    </span>
                  </div>
                </div>
                <Badge status={member.status} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[['Specialty', member.specialty], ['Ward', wardName], ['Shift', member.shift], ['Experience', member.experience], ['Contact', member.contact]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                    <span style={{ color: '#8BA3BC' }}>{k}</span>
                    <span style={{ color: '#1A3A55', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
