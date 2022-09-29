import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'

// import session from 'express-session'
// import cookieParser from 'cookie-parser'
import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import bookRouter from './routers/book.router'
import userRouter from './routers/user.router'
import loginWithGoogle from './passport/google'
import { JWT_SECRET } from './util/secrets'

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
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.session())
*/

app.use(passport.initialize())
passport.use(loginWithGoogle())
// Set up routers
app.use('/api/v1/books', bookRouter)

app.use('/api/v1/users', userRouter)

app.post(
  '/api/v1/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user: any = req.user

    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.json({ token, user })
  }
)

// Custom API error handler
app.use(apiErrorHandler)

export default app
