import { PrismaClient } from '@prisma/client'
import { Hono } from 'hono'

const prisma = new PrismaClient()
const posts = new Hono()

// Get all posts
posts.get('/', async (c) => {
  const posts = await prisma.posts.findMany()
  return c.json({ posts })
})

// Create a new post
posts.post('/', async (c) => {
  const { title, slug, content } = await c.req.json()

  if (!title || !slug || !content) {
    return c.json({ error: 'Title, slug, and content are required' }, 400)
  }

  try {
    const post = await prisma.posts.create({
      data: {
        title,
        slug,
        content,
      },
    })
    return c.json({ post }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create post' }, 500)
  }
})

// Get a post by slug
posts.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const post = await prisma.posts.findUnique({
    where: {
      slug,
    },
  })

  if (!post) {
    return c.json({ error: 'Post not found' }, 404)
  }

  return c.json({ post })
})

// Update a post by slug
posts.patch('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const { title, content } = await c.req.json()

  if (!title && !content) {
    return c.json({ error: 'Title or content is required for update' }, 400)
  }

  try {
    const post = await prisma.posts.updateMany({
      where: {
        slug,
      },
      data: {
        title,
        content,
      },
    })

    if (post.count === 0) {
      return c.json({ error: 'Post not found' }, 404)
    }

    return c.json({ message: 'Post updated successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to update post' }, 500)
  }
})

// Delete a post by slug
posts.delete('/:slug', async (c) => {
  const slug = c.req.param('slug')

  try {
    const post = await prisma.posts.deleteMany({
      where: {
        slug,
      },
    })

    if (post.count === 0) {
      return c.json({ error: 'Post not found' }, 404)
    }

    return c.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to delete post' }, 500)
  }
})

export default posts
