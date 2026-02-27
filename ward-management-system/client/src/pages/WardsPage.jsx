import React, { useEffect } from 'react';
import TopBar from '../components/Layout/TopBar';
import WardGrid from '../components/Wards/WardGrid';
import { useWard } from '../context/WardContext';

export default function WardsPage() {
  const { wards, fetchWards, loading } = useWard();
  useEffect(() => { fetchWards(); }, [fetchWards]);

  const totalBeds = wards.reduce((s, w) => s + w.totalBeds, 0);
  const occupied = wards.reduce((s, w) => s + w.occupiedBeds, 0);

  return (
    <div>
      <TopBar title="Wards" subtitle={`${wards.length} wards · ${occupied}/${totalBeds} beds occupied`} />
      <div style={{ padding: '28px 32px' }}>
        {loading && !wards.length ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>Loading wards…</div>
        ) : (
          <WardGrid wards={wards} />
        )}
      </div>
    </div>
  );
}
