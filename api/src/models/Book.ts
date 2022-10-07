import mongoose, { Document } from 'mongoose'

export enum bookStatus {
  available = 'available',
  borrowed = 'borrowed',
}

export type BookDocument = Document & {
  name: string
  publishedYear: number
  genres: string[]
  ISBN: string
  author: string[]
  publisher: string
  description: string
  borrowStatus: bookStatus
  borrowerID: mongoose.Schema.Types.ObjectId | null
  borrowDate: Date
  returnDate: Date
}

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
  genres: {
    type: [String],
    required: true,
  },
  author: {
    type: [String],
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  description: String,
  borrowStatus: {
    type: String,
    enum: Object.values(bookStatus),
    default: bookStatus.available,
  },
  borrowerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  borrowDate: Date,
  returnDate: Date,
})

export default mongoose.model<BookDocument>('Book', bookSchema)
