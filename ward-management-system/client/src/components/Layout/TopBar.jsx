import React, { useState, useEffect } from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import { useWard } from '../../context/WardContext';

export default function TopBar({ title, subtitle }) {
  const { notification } = useWard();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <>
      <header style={{
        height: 72, background: '#fff', borderBottom: '1px solid #EAF0F7',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 12px rgba(11,79,130,0.06)',
      }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: '#07355A', margin: 0, lineHeight: 1.2 }}>
            {title}
          </h1>
          {subtitle && <p style={{ fontSize: 12, color: '#8BA3BC', margin: 0, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{subtitle}</p>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Live Clock */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0B4F82', fontFamily: "'DM Sans', sans-serif", fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
              {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div style={{ fontSize: 11, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>
              {days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}
            </div>
          </div>

          {/* Alert Bell */}
          <button style={{
            width: 40, height: 40, borderRadius: 10, border: '1px solid #E2EBF4',
            background: '#F4F8FC', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', position: 'relative', transition: 'all 0.2s'
          }}>
            <Bell size={18} color="#5A7EA8" />
            <span style={{
              position: 'absolute', top: 8, right: 8, width: 8, height: 8,
              background: '#E8465A', borderRadius: '50%', border: '2px solid #F4F8FC'
            }} />
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: 84, right: 24, zIndex: 9999,
          background: notification.type === 'error' ? '#FFF0F2' : '#EDF7ED',
          border: `1px solid ${notification.type === 'error' ? '#FFCDD4' : '#C3E6C3'}`,
          borderLeft: `4px solid ${notification.type === 'error' ? '#E8465A' : '#2E9E4F'}`,
          borderRadius: 10, padding: '12px 18px', maxWidth: 340,
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          animation: 'slideIn 0.3s ease',
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: notification.type === 'error' ? '#B91C35' : '#1A6B2F',
        }}>
          <AlertCircle size={16} />
          {notification.message}
        </div>
      )}
    </>
  );
}
