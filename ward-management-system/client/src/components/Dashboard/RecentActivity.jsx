import React from 'react';
import { UserPlus, LogOut, AlertCircle, RefreshCw } from 'lucide-react';

const typeConfig = {
  admission: { icon: UserPlus,   color: '#2E9E4F', bg: '#EDF7ED', label: 'Admission' },
  discharge:  { icon: LogOut,     color: '#2179C4', bg: '#E8F2FF', label: 'Discharge' },
  alert:      { icon: AlertCircle,color: '#C4002D', bg: '#FFF0F2', label: 'Alert' },
  update:     { icon: RefreshCw,  color: '#7C4D91', bg: '#F5EEFF', label: 'Update' },
};

export default function RecentActivity({ data }) {
  if (!data?.length) return null;
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '22px 24px', border: '1px solid #EAF0F7', boxShadow: '0 2px 12px rgba(11,79,130,0.06)', minWidth: 300 }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: '#07355A', margin: 0 }}>Recent Activity</h3>
        <p style={{ fontSize: 12, color: '#8BA3BC', margin: '4px 0 0', fontFamily: "'DM Sans', sans-serif" }}>Today's ward events</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.map((item, i) => {
          const cfg = typeConfig[item.type] || typeConfig.update;
          const Icon = cfg.icon;
          return (
            <div key={item.id || i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 12px',
              borderRadius: 10, transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F7FAFE'}
            onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <Icon size={15} color={cfg.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: '#1A3A55', fontWeight: 500, lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif" }}>{item.message}</div>
                <div style={{ fontSize: 11, color: '#A0B4C8', marginTop: 3 }}>{item.time}</div>
              </div>
              <span style={{ fontSize: 10, color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: 20, fontWeight: 600, whiteSpace: 'nowrap', alignSelf: 'flex-start', marginTop: 3, letterSpacing: '0.02em' }}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
