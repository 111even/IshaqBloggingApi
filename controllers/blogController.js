// controllers/blogController.js

const Blog = require('../models/Blog');

// Controller function to get all blogs
async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ status: 'success', data: blogs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

// Controller function to create a blog 
async function createBlog(req, res) {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({ title, content });
        await newBlog.save();
        res.status(201).json({ status: 'success', message: 'Blog created successfully', data: newBlog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

// Controller function to get a blog by ID
async function getBlogById(req, res) {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (blog) {
            res.status(200).json({ status: 'success', data: blog });
        } else {
            res.status(404).json({ status: 'error', message: 'Blog not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

// Controller function to update a blog by ID
async function updateBlog(req, res) {
    try {
        const blogId = req.params.id;
        const { title, content } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content }, { new: true });
        if (updatedBlog) {
            res.status(200).json({ status: 'success', message: 'Blog updated successfully', data: updatedBlog });
        } else {
            res.status(404).json({ status: 'error', message: 'Blog not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

// Controller function to delete a blog by ID
async function deleteBlog(req, res) {
    try {
        const blogId = req.params.id;
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (deletedBlog) {
            res.status(200).json({ status: 'success', message: 'Blog deleted successfully' });
        } else {
            res.status(404).json({ status: 'error', message: 'Blog not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

// Controller function to update the read count for a blog/article
async function updateReadCount(req, res) {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (blog) {
            blog.read_count += 1;
            await blog.save();
            res.status(200).json({ status: 'success', message: 'Read count updated successfully' });
        } else {
            res.status(404).json({ status: 'error', message: 'Blog not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

module.exports = { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog, updateReadCount };
