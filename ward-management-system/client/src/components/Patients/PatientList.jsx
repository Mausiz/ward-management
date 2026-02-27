import React, { useState } from 'react';
import { Search, Edit2, Trash2, ChevronDown } from 'lucide-react';
import Badge from '../shared/Badge';

const TH = ({ children, style }) => (
  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#8BA3BC', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'DM Sans', sans-serif", borderBottom: '1px solid #EAF0F7', background: '#F7FAFE', ...style }}>
    {children}
  </th>
);

export default function PatientList({ patients, wards, onEdit, onDischarge }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [wardFilter, setWardFilter] = useState('');

  const filtered = patients.filter(p => {
    const s = search.toLowerCase();
    const matchSearch = !s || p.name.toLowerCase().includes(s) || p.condition.toLowerCase().includes(s) || (p.doctor||'').toLowerCase().includes(s);
    const matchStatus = !statusFilter || p.status === statusFilter;
    const matchWard = !wardFilter || p.wardId === wardFilter;
    return matchSearch && matchStatus && matchWard;
  });

  const selectStyle = { padding: '8px 12px', border: '1px solid #D5E3EF', borderRadius: 8, fontSize: 13, color: '#1A3A55', fontFamily: "'DM Sans', sans-serif", background: '#fff', cursor: 'pointer', outline: 'none' };

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#8BA3BC' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search patients, conditions, doctors…"
            style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #D5E3EF', borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: '#1A3A55', outline: 'none', background: '#F9FBFD', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#0B4F82'}
            onBlur={e => e.target.style.borderColor = '#D5E3EF'}
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
          <option value="">All Statuses</option>
          {['stable','critical','recovering','palliative'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
        <select value={wardFilter} onChange={e => setWardFilter(e.target.value)} style={selectStyle}>
          <option value="">All Wards</option>
          {wards.map(w => <option key={w.id} value={w.id}>{w.name} — {w.type}</option>)}
        </select>
        <div style={{ fontSize: 12, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }}>
          {filtered.length} patient{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #EAF0F7', boxShadow: '0 2px 12px rgba(11,79,130,0.06)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <TH>Patient</TH>
                <TH>Ward / Bed</TH>
                <TH>Condition</TH>
                <TH>Doctor</TH>
                <TH>Admitted</TH>
                <TH>Status</TH>
                <TH style={{ textAlign: 'right' }}>Actions</TH>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>No patients found</td></tr>
              ) : filtered.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F0F6FB', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F7FAFE'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: `hsl(${(i * 47 + 200) % 360},55%,88%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: `hsl(${(i * 47 + 200) % 360},55%,35%)`, flexShrink: 0 }}>
                        {p.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#07355A', fontFamily: "'DM Sans', sans-serif" }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: '#8BA3BC' }}>{p.age} yrs · {p.gender} · {p.bloodType}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                    <span style={{ fontWeight: 600, color: '#0B4F82' }}>{(wards.find(w=>w.id===p.wardId)||{name:p.wardId}).name}</span>
                    <span style={{ color: '#8BA3BC' }}> · {p.bed}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#1A3A55', fontFamily: "'DM Sans', sans-serif", maxWidth: 160 }}>{p.condition}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#4A6A8A', fontFamily: "'DM Sans', sans-serif" }}>{p.doctor}</td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>{p.admittedDate}</td>
                  <td style={{ padding: '14px 16px' }}><Badge status={p.status} /></td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button onClick={() => onEdit(p)} title="Edit" style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #D5E3EF', background: '#F4F8FC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Edit2 size={13} color="#5A7EA8" />
                      </button>
                      <button onClick={() => onDischarge(p)} title="Discharge" style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #FFCDD4', background: '#FFF5F6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trash2 size={13} color="#E8465A" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
