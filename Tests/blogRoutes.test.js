const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from index.js
const mongoose = require('mongoose');
const Blog = require('../models/Blog');

// Test data
const testData = {
  title: 'Test Blog',
  description: 'This is a test blog',
  author: 'Test Author',
  state: 'draft',
  tags: ['test', 'example'],
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

// Store the ID of the created blog for later use in tests
let createdBlogId;

// Test suite for blog routes
describe('Blog Routes', () => {
  // Before running the tests, create a test blog
  beforeAll(async () => {
    const newBlog = await Blog.create(testData);
    createdBlogId = newBlog._id;
  });

  // After running the tests, clean up by deleting the test blog
  afterAll(async () => {
    await Blog.findByIdAndDelete(createdBlogId);
    mongoose.connection.close();
  });

  // Test GET all blogs endpoint
  it('GET /blogs - should get all blogs', async () => {
    const response = await request(app).get('/blogs');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.blogs.length).toBeGreaterThan(0);
  });

  // Test POST create blog endpoint
  it('POST /blogs - should create a new blog', async () => {
    const response = await request(app).post('/blogs').send(testData);
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.blog).toHaveProperty('_id');
  });

  // Test GET single blog by ID endpoint
  it('GET /blogs/:id - should get a single blog by ID', async () => {
    const response = await request(app).get(`/blogs/${createdBlogId}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.blog._id).toBe(createdBlogId.toString());
  });

  // Test PUT update blog by ID endpoint
  it('PUT /blogs/:id - should update a blog by ID', async () => {
    const updatedData = { title: 'Updated Test Blog' };
    const response = await request(app).put(`/blogs/${createdBlogId}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.blog.title).toBe(updatedData.title);
  });

  // Test DELETE blog by ID endpoint
  it('DELETE /blogs/:id - should delete a blog by ID', async () => {
    const response = await request(app).delete(`/blogs/${createdBlogId}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Blog deleted successfully');
  });

  // Test GET update read count endpoint
  it('GET /blogs/:id/update-read-count - should update the read count for a blog', async () => {
    const response = await request(app).get(`/blogs/${createdBlogId}/update-read-count`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Read count updated successfully');
  });
});
