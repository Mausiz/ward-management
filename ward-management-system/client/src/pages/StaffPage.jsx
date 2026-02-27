import React, { useEffect } from 'react';
import TopBar from '../components/Layout/TopBar';
import StaffRoster from '../components/Staff/StaffRoster';
import { useWard } from '../context/WardContext';

export default function StaffPage() {
  const { staff, wards, fetchStaff, fetchWards, loading } = useWard();
  useEffect(() => { fetchStaff(); fetchWards(); }, [fetchStaff, fetchWards]);

  return (
    <div>
      <TopBar title="Staff Roster" subtitle={`${staff.length} staff members · ${staff.filter(s=>s.status==='on-duty').length} on duty`} />
      <div style={{ padding: '28px 32px' }}>
        {loading && !staff.length ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>Loading staff…</div>
        ) : (
          <StaffRoster staff={staff} wards={wards} />
        )}
      </div>
    </div>
  );
}
