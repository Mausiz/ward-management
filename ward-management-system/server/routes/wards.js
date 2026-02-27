const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData');

router.get('/', (req, res) => {
  const wardsWithOccupancy = mockData.wards.map(ward => ({
    ...ward,
    occupiedBeds: mockData.patients.filter(p => p.wardId === ward.id).length,
    patients: mockData.patients.filter(p => p.wardId === ward.id),
  }));
  res.json(wardsWithOccupancy);
});

router.get('/:id', (req, res) => {
  const ward = mockData.wards.find(w => w.id === req.params.id);
  if (!ward) return res.status(404).json({ error: 'Ward not found' });
  const wardWithData = {
    ...ward,
    occupiedBeds: mockData.patients.filter(p => p.wardId === ward.id).length,
    patients: mockData.patients.filter(p => p.wardId === ward.id),
    staff: mockData.staff.filter(s => s.wardId === ward.id),
  };
  res.json(wardWithData);
});

module.exports = router;
