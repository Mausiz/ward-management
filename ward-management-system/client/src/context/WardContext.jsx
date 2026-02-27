import React, { createContext, useContext, useState, useCallback } from 'react';
import * as api from '../services/api';

const WardContext = createContext(null);

export const WardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState(null);
  const [patients, setPatients] = useState([]);
  const [wards, setWards] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try { setDashboard(await api.getDashboard()); }
    catch (e) { showNotification('Failed to load dashboard', 'error'); }
    finally { setLoading(false); }
  }, [showNotification]);

  const fetchPatients = useCallback(async (params) => {
    setLoading(true);
    try { setPatients(await api.getPatients(params)); }
    catch (e) { showNotification('Failed to load patients', 'error'); }
    finally { setLoading(false); }
  }, [showNotification]);

  const fetchWards = useCallback(async () => {
    setLoading(true);
    try { setWards(await api.getWards()); }
    catch (e) { showNotification('Failed to load wards', 'error'); }
    finally { setLoading(false); }
  }, [showNotification]);

  const fetchStaff = useCallback(async (params) => {
    setLoading(true);
    try { setStaff(await api.getStaff(params)); }
    catch (e) { showNotification('Failed to load staff', 'error'); }
    finally { setLoading(false); }
  }, [showNotification]);

  const addPatient = useCallback(async (data) => {
    const p = await api.createPatient(data);
    setPatients(prev => [p, ...prev]);
    showNotification(`${p.name} admitted successfully`);
    return p;
  }, [showNotification]);

  const editPatient = useCallback(async (id, data) => {
    const p = await api.updatePatient(id, data);
    setPatients(prev => prev.map(pt => pt.id === id ? p : pt));
    showNotification('Patient record updated');
    return p;
  }, [showNotification]);

  const dischargePatient = useCallback(async (id, name) => {
    await api.deletePatient(id);
    setPatients(prev => prev.filter(p => p.id !== id));
    showNotification(`${name} discharged successfully`);
  }, [showNotification]);

  return (
    <WardContext.Provider value={{
      dashboard, patients, wards, staff, loading, notification,
      fetchDashboard, fetchPatients, fetchWards, fetchStaff,
      addPatient, editPatient, dischargePatient, showNotification,
    }}>
      {children}
    </WardContext.Provider>
  );
};

export const useWard = () => useContext(WardContext);
