import express from 'express'
import authCheck from '../middlewares/checkAuth'

import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
} from '../controllers/Author.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Authors prefix
router.get('/', authCheck, findAll)
router.get('/:AuthorId', authCheck, findById)
router.put('/:AuthorId', authCheck, updateAuthor)
router.delete('/:AuthorId', authCheck, deleteAuthor)
router.post('/create', authCheck, createAuthor)

export default router
