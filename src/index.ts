import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import posts from './routes/posts'

const app = new Hono()
app.use(logger())
app.use(prettyJSON())

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})
app.route('/posts', posts)

export default app
