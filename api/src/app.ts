import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// import session from 'express-session'
// import cookieParser from 'cookie-parser'
import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import bookRouter from './routers/book.router'
import userRouter from './routers/user.router'
import loginRouter from './routers/login.router'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(apiContentType)
app.use(express.json())

// Set up routers
app.use('/api/v1/books', bookRouter)

app.use('/api/v1/users', userRouter)

app.use('/api/v1/login', loginRouter)
// Custom API error handler
app.use(apiErrorHandler)

export default app
