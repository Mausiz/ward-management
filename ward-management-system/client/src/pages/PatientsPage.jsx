import React, { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import TopBar from '../components/Layout/TopBar';
import PatientList from '../components/Patients/PatientList';
import PatientModal from '../components/Patients/PatientModal';
import Modal from '../components/shared/Modal';
import { useWard } from '../context/WardContext';

export default function PatientsPage() {
  const { patients, wards, fetchPatients, fetchWards, addPatient, editPatient, dischargePatient, loading } = useWard();
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [dischargeTarget, setDischargeTarget] = useState(null);

  useEffect(() => {
    fetchPatients();
    fetchWards();
  }, [fetchPatients, fetchWards]);

  const handleSave = async (form) => {
    if (editTarget) await editPatient(editTarget.id, form);
    else await addPatient(form);
  };

  const handleDischargeConfirm = async () => {
    if (dischargeTarget) {
      await dischargePatient(dischargeTarget.id, dischargeTarget.name);
      setDischargeTarget(null);
    }
  };

  return (
    <div>
      <TopBar title="Patients" subtitle={`${patients.length} patients currently admitted`} />
      <div style={{ padding: '28px 32px' }}>
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button onClick={() => { setEditTarget(null); setShowModal(true); }} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
            background: 'linear-gradient(135deg, #0D5E9A, #0B4F82)', border: 'none', borderRadius: 10,
            cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 4px 16px rgba(11,79,130,0.3)',
          }}>
            <UserPlus size={16} /> Admit Patient
          </button>
        </div>

        {loading && !patients.length ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#8BA3BC', fontFamily: "'DM Sans', sans-serif" }}>Loading patients…</div>
        ) : (
          <PatientList
            patients={patients}
            wards={wards}
            onEdit={(p) => { setEditTarget(p); setShowModal(true); }}
            onDischarge={(p) => setDischargeTarget(p)}
          />
        )}

        <PatientModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setEditTarget(null); }}
          onSave={handleSave}
          patient={editTarget}
          wards={wards}
        />

        {/* Discharge Confirmation Modal */}
        <Modal isOpen={!!dischargeTarget} onClose={() => setDischargeTarget(null)} title="Confirm Discharge" width={420}>
          <p style={{ fontSize: 14, color: '#4A6A8A', fontFamily: "'DM Sans', sans-serif", margin: '0 0 20px', lineHeight: 1.6 }}>
            Are you sure you want to discharge <strong style={{ color: '#07355A' }}>{dischargeTarget?.name}</strong>? This action will remove them from the ward.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={() => setDischargeTarget(null)} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #D5E3EF', background: '#F4F8FC', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#5A7EA8', fontFamily: "'DM Sans', sans-serif" }}>
              Cancel
            </button>
            <button onClick={handleDischargeConfirm} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#E8465A', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
              Discharge Patient
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
