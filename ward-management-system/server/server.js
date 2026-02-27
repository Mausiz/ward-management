const express = require('express');
const cors = require('cors');
const path = require('path');
const patientsRouter = require('./routes/patients');
const wardsRouter = require('./routes/wards');
const staffRouter = require('./routes/staff');
const { activity } = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// Routes
app.use('/api/patients', patientsRouter);
app.use('/api/wards', wardsRouter);
app.use('/api/staff', staffRouter);

// Dashboard stats route
app.get('/api/dashboard', (req, res) => {
  const { patients } = require('./data/mockData');
  const { wards } = require('./data/mockData');

  const totalBeds = wards.reduce((sum, w) => sum + w.totalBeds, 0);
  const occupiedBeds = patients.length;
  const criticalCount = patients.filter(p => p.status === 'critical').length;
  const todayAdmissions = patients.filter(p => p.admittedDate === '2026-02-17').length;

  const wardOccupancy = wards.map(ward => ({
    wardId: ward.id,
    name: ward.name,
    type: ward.type,
    totalBeds: ward.totalBeds,
    occupiedBeds: patients.filter(p => p.wardId === ward.id).length,
  }));

  res.json({
    totalBeds,
    occupiedBeds,
    availableBeds: totalBeds - occupiedBeds,
    criticalCount,
    todayAdmissions,
    occupancyRate: Math.round((occupiedBeds / totalBeds) * 100),
    wardOccupancy,
    recentActivity: activity,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Serve React app for all other routes (must be after API routes)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Ward Management API running on http://localhost:${PORT}`);
});
