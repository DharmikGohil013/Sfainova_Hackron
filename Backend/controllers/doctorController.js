const Doctor = require('../models/Doctor');
const multer = require('multer');
const path = require('path');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/'; // Store in uploads directory
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'doctor-photo-' + uniqueSuffix + path.extname(file.originalname)); // Unique filename
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  console.log('File original name:', file.originalname);
  console.log('File extension:', ext);
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpg, jpeg, png, gif)'), false);
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Create a new doctor
exports.createDoctor = [
  upload.single('photo'), // 'photo' is the field name for the file
  async (req, res) => {
    try {
      const { doctorId, name, mobileNumber, emailId, doctorSpecialist, clinicName, description, district, state, timeSlot, fees } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'Photo is required' });
      }

      const doctorData = {
        doctorId: parseInt(doctorId),
        photo: req.file.filename, // Store the filename (relative path)
        name,
        mobileNumber,
        emailId,
        doctorSpecialist,
        clinicName,
        description,
        district,
        state,
        timeSlot,
        fees: parseInt(fees)
      };

      const newDoctor = new Doctor(doctorData);
      await newDoctor.save();
      res.status(201).json(newDoctor);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else if (error.code === 11000) { // Duplicate key error
        res.status(400).json({ message: 'Doctor ID or email already exists' });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
];

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctorId: req.params.id });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};