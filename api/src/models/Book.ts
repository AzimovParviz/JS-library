import mongoose, { Document } from 'mongoose'
import { BookDocument } from '../types'

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  ISBN: {
    type: String,
    required: true,
    index: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  genres: [String],
  author: {
    type: String,
    required: true,
  },
  description: String,
  borrowerID: mongoose.Schema.Types.ObjectId,
  borrowDate: Date,
  returnDate: Date,
})

export default mongoose.model<BookDocument>('Book', bookSchema)
