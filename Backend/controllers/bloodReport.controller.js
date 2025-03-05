const BloodReport = require('../models/bloodReport.model');

exports.createBloodReport = async (req, res) => {
  try {
    const bloodReport = new BloodReport(req.body);
    const savedReport = await bloodReport.save();
    
    res.status(201).json({
      success: true,
      data: savedReport,
      message: 'Blood report created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllBloodReports = async (req, res) => {
  try {
    const bloodReports = await BloodReport.find();
    res.status(200).json({
      success: true,
      count: bloodReports.length,
      data: bloodReports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getBloodReportById = async (req, res) => {
  try {
    const bloodReport = await BloodReport.findOne({ ReportId: req.params.reportId });
    if (!bloodReport) {
      return res.status(404).json({
        success: false,
        message: 'Blood report not found'
      });
    }
    res.status(200).json({
      success: true,
      data: bloodReport
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getBloodReportsByUserId = async (req, res) => {
  try {
    const bloodReports = await BloodReport.find({ UserId: req.params.userId });
    res.status(200).json({
      success: true,
      count: bloodReports.length,
      data: bloodReports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};