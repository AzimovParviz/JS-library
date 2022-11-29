import express from 'express'
import authCheck from '../middlewares/checkAuth'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
} from '../controllers/author.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Authors prefix
router.get('/', authCheck, findAll)
router.get('/:authorId', authCheck, findById)
router.put('/:authorId', authCheck, updateAuthor)
router.delete('/:authorId', authCheck, deleteAuthor)
router.post('/', authCheck, createAuthor)

export default router
