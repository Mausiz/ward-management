import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WardProvider } from './context/WardContext';
import Sidebar from './components/Layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import WardsPage from './pages/WardsPage';
import StaffPage from './pages/StaffPage';

const GLOBAL_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; background: #F0F6FB; }
  button { font-family: 'DM Sans', sans-serif; }
  input, select, textarea { font-family: 'DM Sans', sans-serif; }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.95) translateY(-8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #F0F6FB; }
  ::-webkit-scrollbar-thumb { background: #C0D4E8; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #0B4F82; }
`;

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: 240, minHeight: '100vh', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <WardProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/wards" element={<WardsPage />} />
              <Route path="/staff" element={<StaffPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </WardProvider>
    </>
  );
}
