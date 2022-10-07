import Book, { BookDocument, bookStatus } from '../models/Book'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

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

const findByISBN = async (ISBN: string): Promise<BookDocument[]> => {
  const foundBooks = await Book.find({ ISBN: ISBN })

  if (!foundBooks) {
    throw new NotFoundError(`Book ISBN ${ISBN} not found`)
  }

  return foundBooks
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

const addBorrower = async (
  bookId: string,
  borrowedBook: Partial<BookDocument>
): Promise<BookDocument | null> => {
  if (
    !borrowedBook.borrowerID &&
    borrowedBook.borrowStatus === bookStatus.borrowed
  ) {
    throw new BadRequestError('user ID is required')
  } else if (borrowedBook.borrowStatus === bookStatus.available) {
    borrowedBook.borrowerID = null
  }
  const foundBook = await Book.findByIdAndUpdate(bookId, borrowedBook, {
    new: true,
  })
  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }
  console.log(
    'what the fuck is the borrowerID and why does it get updated ffs',
    borrowedBook.borrowerID
  )
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
  addBorrower,
  deleteBook,
}
