import User, { UserDocument } from '../models/User'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ lastName: 1 })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const addBorrowedBooks = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  if (!update.borrowedBooks) {
    throw new BadRequestError('Book ID(s) required')
  }
  if (update.borrowedBooks.length <= 0)
    throw new BadRequestError('no book ids were provided')
  const foundUser = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { borrowedBooks: update.borrowedBooks[0] } }
  )

  if (!foundUser) {
    throw new NotFoundError(`Book ${userId} not found`)
  }

  return foundUser
}

const returnBorrowedBooks = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  if (!update.borrowedBooks || update.borrowedBooks.length <= 0) {
    throw new BadRequestError('Book ID(s) required')
  }
  const foundUser = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { borrowedBooks: update.borrowedBooks[0] } }
  )

  if (!foundUser) {
    throw new NotFoundError(`Book ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
  addBorrowedBooks,
  returnBorrowedBooks,
  deleteUser,
}
