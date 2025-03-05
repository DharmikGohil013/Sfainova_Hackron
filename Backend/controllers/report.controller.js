const Report = require('../models/report.model');

exports.uploadReport = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const file = req.file;
    console.log(req.body,req.file);
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const report = new Report({
      userId,
      title,
      description,
      filePath: file.path,
      fileType: file.mimetype.split('/')[1],
      fileSize: file.size,
    });

    await report.save();
    res.status(201).json({ message: 'Report uploaded successfully', report });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

exports.getReportsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await Report.find({ userId }).sort({ uploadedAt: -1 }); // Sort by most recent
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};