import express from 'express'

import {
  createBook,
  findById,
  findByISBN,
  deleteBook,
  findAll,
  updateBook,
} from '../controllers/book.controller'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.get('/:bookId', findById)
router.get('/ISBN/:ISBN', findByISBN)
router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)
router.post('/', createBook)

export default router
