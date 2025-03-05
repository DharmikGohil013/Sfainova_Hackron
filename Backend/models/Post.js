const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  PostName: {
    type: String,
    required: true
  },
  UserId: {
    type: String,
    required: true
  },
  Posttitle: {
    type: String,
    required: true
  },
  Discription: {
    type: String,
    required: true
  },
  postphoto: {
    type: String, // Stores the file path
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);