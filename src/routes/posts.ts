import { Hono } from 'hono'

const posts = new Hono()

posts.get('/', (c) => {
  return c.text('Hello Hono!')
})

posts.post('/', (c) => {
  return c.text('Hello Hono!')
})

posts.patch('/:slug', (c) => {
  return c.text('Hello Hono!')
})

posts.delete('/:slug', (c) => {
  return c.text('Hello Hono!')
})

export default posts
