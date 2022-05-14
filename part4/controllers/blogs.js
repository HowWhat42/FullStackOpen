const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if(blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(400).end()
  }
})

blogRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body
  if (!title && !url) {
    return res.status(400).json({ error: 'content missing' })
  }
  const user = req.user
  
  const newBlog = {
    title,
    author,
    url,
    likes: likes || 0,
    user: user.id
  }

  
  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(!blog) {
    return res.status(404).send({ error: 'unknown endpoint' })
  }
  const user = req.user
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true, context: 'query' })
  res.status(200).json(updatedBlog)
})

module.exports = blogRouter