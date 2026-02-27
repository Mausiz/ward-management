import React, { useEffect } from 'react';
import TopBar from '../components/Layout/TopBar';
import StatsCards from '../components/Dashboard/StatsCards';
import OccupancyChart from '../components/Dashboard/OccupancyChart';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { useWard } from '../context/WardContext';

export default function DashboardPage() {
  const { dashboard, fetchDashboard, loading } = useWard();

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  return (
    <div>
      <TopBar title="Dashboard" subtitle="Ward overview & live statistics" />
      <div style={{ padding: '28px 32px' }}>
        {loading && !dashboard ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>Loading dashboard…</div>
        ) : (
          <>
            <StatsCards data={dashboard} />
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
              <OccupancyChart data={dashboard?.wardOccupancy} />
              <RecentActivity data={dashboard?.recentActivity} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
