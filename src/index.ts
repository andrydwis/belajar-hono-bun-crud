import { Hono } from 'hono'
import { logger } from 'hono/logger'

import posts from './routes/posts'

const app = new Hono()
// Use logger only in development environment
if (process.env.APP_ENV !== 'production') {
  app.use(logger())
}

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})
app.route('/posts', posts)

export default app
