const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only images based on extension
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  console.log('File original name:', file.originalname);
  console.log('File MIME type:', file.mimetype);
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

// Create Post
exports.createPost = [
  upload.single('postphoto'),
  async (req, res) => {
    try {
      const { PostName, UserId, Posttitle, Discription, createdAt } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: 'Photo is required' });
      }

      const postData = {
        PostName,
        UserId,
        Posttitle,
        Discription,
        postphoto: req.file.path,
        createdAt: new Date(createdAt)
      };

      const newPost = new Post(postData);
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
];

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};