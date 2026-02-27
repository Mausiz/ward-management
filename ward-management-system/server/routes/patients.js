const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const mockData = require('../data/mockData');

// GET all patients
router.get('/', (req, res) => {
  const { search, wardId, status } = req.query;
  let result = [...mockData.patients];

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.condition.toLowerCase().includes(s) ||
      p.doctor.toLowerCase().includes(s)
    );
  }
  if (wardId) result = result.filter(p => p.wardId === wardId);
  if (status) result = result.filter(p => p.status === status);

  res.json(result);
});

// GET single patient
router.get('/:id', (req, res) => {
  const patient = mockData.patients.find(p => p.id === req.params.id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
});

// POST create patient
router.post('/', (req, res) => {
  const newPatient = {
    id: uuidv4(),
    admittedDate: new Date().toISOString().split('T')[0],
    ...req.body,
  };
  mockData.patients.push(newPatient);
  mockData.activity.unshift({
    id: uuidv4(),
    type: 'admission',
    message: `${newPatient.name} admitted to ${newPatient.wardId} - Bed ${newPatient.bed}`,
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    date: newPatient.admittedDate,
    wardId: newPatient.wardId,
  });
  res.status(201).json(newPatient);
});

// PUT update patient
router.put('/:id', (req, res) => {
  const idx = mockData.patients.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Patient not found' });
  mockData.patients[idx] = { ...mockData.patients[idx], ...req.body };
  res.json(mockData.patients[idx]);
});

// DELETE (discharge) patient
router.delete('/:id', (req, res) => {
  const idx = mockData.patients.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Patient not found' });
  const patient = mockData.patients[idx];
  mockData.patients.splice(idx, 1);
  mockData.activity.unshift({
    id: uuidv4(),
    type: 'discharge',
    message: `Patient ${patient.name} discharged from ${patient.wardId}`,
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toISOString().split('T')[0],
    wardId: patient.wardId,
  });
  res.json({ message: 'Patient discharged successfully' });
});

module.exports = router;
