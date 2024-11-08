const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/employees', verifyToken, employeeRoutes);

module.exports = app;
