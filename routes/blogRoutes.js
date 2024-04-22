// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog, updateReadCount } = require('../controllers/blogController');

// Retrieve all blogs
router.get('/', getAllBlogs);

// Create a new blog
router.post('/', createBlog);

// Retrieve a single blog by ID
router.get('/:id', getBlogById);

// Update a blog by ID
router.put('/:id', updateBlog);

// Delete a blog by ID
router.delete('/:id', deleteBlog);

// Update the read count for a blog/article
router.get('/:id/update-read-count', updateReadCount);

module.exports = router;
