import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';

const INPUT_STYLE = {
  width: '100%', padding: '10px 12px', border: '1px solid #D5E3EF', borderRadius: 8,
  fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: '#1A3A55', outline: 'none',
  background: '#F9FBFD', boxSizing: 'border-box', transition: 'border-color 0.15s',
};

const LABEL_STYLE = { fontSize: 12, fontWeight: 600, color: '#4A6A8A', fontFamily: "'DM Sans', sans-serif", marginBottom: 6, display: 'block' };

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={LABEL_STYLE}>{label}</label>
    {children}
  </div>
);

const EMPTY = { name: '', age: '', gender: 'Male', wardId: '', bed: '', condition: '', status: 'stable', doctor: '', bloodType: 'O+', contact: '' };
const WARDS = ['ward-a','ward-b','ward-c','ward-d','ward-e','ward-f'];
const WARD_NAMES = { 'ward-a':'Ward A','ward-b':'Ward B','ward-c':'Ward C','ward-d':'Ward D','ward-e':'Ward E','ward-f':'Ward F' };

export default function PatientModal({ isOpen, onClose, onSave, patient, wards = [] }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(patient ? { ...patient } : EMPTY);
  }, [patient, isOpen]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.wardId || !form.bed || !form.condition) return;
    setSaving(true);
    try { await onSave(form); onClose(); }
    catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const inp = (k) => ({
    style: INPUT_STYLE,
    value: form[k] || '',
    onChange: e => set(k, e.target.value),
    onFocus: e => e.target.style.borderColor = '#0B4F82',
    onBlur: e => e.target.style.borderColor = '#D5E3EF',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={patient ? 'Edit Patient Record' : 'Admit New Patient'} width={580}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <div style={{ gridColumn: '1/-1' }}>
          <Field label="Full Name *"><input {...inp('name')} placeholder="Patient full name" /></Field>
        </div>
        <Field label="Age *"><input {...inp('age')} type="number" placeholder="Age" /></Field>
        <Field label="Gender">
          <select {...inp('gender')} style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </Field>
        <Field label="Ward *">
          <select {...inp('wardId')} style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
            <option value="">Select ward...</option>
            {(wards.length ? wards : WARDS).map(w => {
              const id = w.id || w; const name = w.name || WARD_NAMES[id] || id;
              return <option key={id} value={id}>{name} {w.type ? `— ${w.type}` : ''}</option>;
            })}
          </select>
        </Field>
        <Field label="Bed *"><input {...inp('bed')} placeholder="e.g. A-3" /></Field>
        <div style={{ gridColumn: '1/-1' }}>
          <Field label="Condition / Diagnosis *"><input {...inp('condition')} placeholder="Primary diagnosis" /></Field>
        </div>
        <Field label="Status">
          <select {...inp('status')} style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
            {['stable','critical','recovering','palliative'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
        </Field>
        <Field label="Blood Type">
          <select {...inp('bloodType')} style={{ ...INPUT_STYLE, cursor: 'pointer' }}>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Attending Doctor"><input {...inp('doctor')} placeholder="e.g. Dr. Smith" /></Field>
        <Field label="Contact Number"><input {...inp('contact')} placeholder="Patient contact" /></Field>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8, paddingTop: 16, borderTop: '1px solid #EAF0F7' }}>
        <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #D5E3EF', background: '#F4F8FC', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#5A7EA8', fontFamily: "'DM Sans', sans-serif" }}>
          Cancel
        </button>
        <button onClick={handleSubmit} disabled={saving} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #0D5E9A, #0B4F82)', cursor: saving ? 'wait' : 'pointer', fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: "'DM Sans', sans-serif", opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : patient ? 'Save Changes' : 'Admit Patient'}
        </button>
      </div>
    </Modal>
  );
}
