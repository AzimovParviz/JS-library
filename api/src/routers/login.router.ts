import express from 'express'
import passport from 'passport'
import loginWithGoogle from '../passport/google'
import { login } from '../controllers/login.controller'

const router = express.Router()
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
router.use(cookieParser())
router.use(
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
router.use(passport.session())
*/

router.use(passport.initialize())
passport.use(loginWithGoogle())
router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  login
)

export default router
