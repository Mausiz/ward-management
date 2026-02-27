const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData');

router.get('/', (req, res) => {
  const { wardId, shift, status } = req.query;
  let result = [...mockData.staff];
  if (wardId) result = result.filter(s => s.wardId === wardId);
  if (shift) result = result.filter(s => s.shift === shift);
  if (status) result = result.filter(s => s.status === status);
  res.json(result);
});

router.get('/:id', (req, res) => {
  const member = mockData.staff.find(s => s.id === req.params.id);
  if (!member) return res.status(404).json({ error: 'Staff member not found' });
  res.json(member);
});

module.exports = router;
