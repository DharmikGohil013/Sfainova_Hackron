const express = require('express');
const router = express.Router();
const bloodReportController = require('../controllers/bloodReport.controller');

router.post('/', bloodReportController.createBloodReport);
router.get('/', bloodReportController.getAllBloodReports);
router.get('/report/:reportId', bloodReportController.getBloodReportById);
router.get('/user/:userId', bloodReportController.getBloodReportsByUserId);

module.exports = router;