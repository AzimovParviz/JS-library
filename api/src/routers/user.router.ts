import express from 'express'
import authCheck from '../middlewares/checkAuth'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
} from '../controllers/user.controller'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', authCheck, findAll)
router.get('/:userId', authCheck, findById)
router.put('/:userId', authCheck, updateUser)
router.delete('/:userId', authCheck, deleteUser)
router.post('/create', authCheck, createUser)

export default router
