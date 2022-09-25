import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findByISBN = async (ISBN: string): Promise<BookDocument> => {
  const foundBook = await Book.findOne({ ISBN: ISBN })

  if (!foundBook) {
    throw new NotFoundError(`Book ISBN ${ISBN} not found`)
  }

  return foundBook
}

const findByBorrower = async (userId: string): Promise<BookDocument[]> => {
  const foundBooks = await Book.find({ borrowerID: userId })

  if (!foundBooks) {
    throw new NotFoundError('no books borrowed by this user')
  }
  return foundBooks
}

const findAllAvailable = async (): Promise<BookDocument[]> => {
  const foundBooks = await Book.find({ borrowStatus: 'available' })

  if (!foundBooks) {
    throw new NotFoundError('no books available to borrow')
  }

  return foundBooks
}

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ name: 1, publishedYear: -1 })
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  findById,
  findByISBN,
  findByBorrower,
  findAllAvailable,
  findAll,
  update,
  deleteBook,
}
