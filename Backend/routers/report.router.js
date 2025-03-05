const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('file'), reportController.uploadReport);
router.get('/user/:userId', reportController.getReportsByUserId);

module.exports = router;