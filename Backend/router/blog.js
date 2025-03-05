// Backend/routes/blogRoutes.js
import express from 'express';
import { createBlog, updateBlog, getSingleBlog, getAllBlogs, getFeaturedBlogs } from '../controllers/blogController.js';

const router = express.Router();

router.post('/', createBlog);
router.put('/:id', updateBlog);
router.get('/:id', getSingleBlog);
router.get('/', getAllBlogs);
router.get('/featured', getFeaturedBlogs);

export default router;