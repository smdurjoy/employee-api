const express = require('express');
const { getHierarchy } = require('../controllers/employeeController');

const router = express.Router();

router.get('/hierarchy/:id', getHierarchy);

module.exports = router;
