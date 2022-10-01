import express from 'express'
import authCheck from '../middlewares/checkAuth'

import {
  createBook,
  findById,
  findByISBN,
  deleteBook,
  findAll,
  findAllAvailable,
  updateBook,
  addBorrower,
  findByBorrower,
} from '../controllers/book.controller'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAll)
router.get('/available', authCheck, findAllAvailable)
router.get('/:bookId', findById)
router.get('/ISBN/:ISBN', findByISBN)
router.get('/borrowed/:userId', findByBorrower)
router.put('/borrowed/:bookId', authCheck, addBorrower)
router.put('/:bookId', authCheck, updateBook)
router.delete('/:bookId', authCheck, deleteBook)
router.post('/', createBook)

export default router
