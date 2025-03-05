const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: Number,
    required: true,
    unique: true
  },
  photo: {
    type: String, // Stores the path to the uploaded photo
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  doctorSpecialist: {
    type: String,
    required: true
  },
  clinicName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);