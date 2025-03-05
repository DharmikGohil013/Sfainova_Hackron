const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/doctors', doctorController.createDoctor);
router.get('/doctors', doctorController.getAllDoctors);
router.get('/doctors/:id', doctorController.getDoctorById);

module.exports = router;