const mongoose = require('mongoose');
const db = require('../config/db');
const reportSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User', 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  filePath: {
    type: String, 
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  fileType: {
    type: String, 
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;