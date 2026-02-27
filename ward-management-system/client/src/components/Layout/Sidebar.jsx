import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, UserCheck, Activity, Cross } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/wards', label: 'Wards', icon: Building2 },
  { to: '/staff', label: 'Staff', icon: UserCheck },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: 240, minHeight: '100vh', background: 'linear-gradient(180deg, #07355A 0%, #0B4F82 60%, #0D5E9A 100%)',
      display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
      boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: 'rgba(255,255,255,0.15)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Cross size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1 }}>MedWard</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>Ward Management</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 12px', marginBottom: 4 }}>
          Navigation
        </div>
        {navItems.map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
              borderRadius: 10, marginBottom: 4, textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
              transition: 'all 0.2s ease',
            })}
            onMouseEnter={e => { if (!e.currentTarget.classList.contains('active')) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}}
            onMouseLeave={e => { if (!e.currentTarget.getAttribute('aria-current')) { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #5BB8FF, #2179C4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff'
          }}>
            A
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Admin</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Ward Supervisor</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
