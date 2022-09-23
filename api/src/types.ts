import mongoose from 'mongoose'

export type BookDocument = Document & {
  name: string
  publishedYear: number
  genres: string[]
  ISBN: string
  author: string
  description: string
  borrowerID: mongoose.Schema.Types.ObjectId
  borrowDate: Date
  returnDate: Date
}
