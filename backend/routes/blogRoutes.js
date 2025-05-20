import express from 'express';
import blogController from '../controllers/blogController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/drafts', authMiddleware, blogController.saveDraft);
router.post('/publish/:blogId', authMiddleware, blogController.publishBlog);
router.get('/my-blogs', authMiddleware, blogController.getUserBlogs);
router.delete('/:blogId', authMiddleware, blogController.deleteBlog);

// Public routes
router.get('/', blogController.getAllPublishedBlogs);
router.get('/:blogId', blogController.getBlogById);

export default router;