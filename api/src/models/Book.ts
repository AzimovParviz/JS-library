import mongoose, { Document } from 'mongoose'
export type BookDocument = Document & {
  name: string
  publishedYear: number
  genres: string[]
  ISBN: string
  author: string[]
  description: string
  borrowerID: mongoose.Schema.Types.ObjectId
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
  genres: [String],
  author: {
    type: [String],
    required: true,
  },
  description: String,
  borrowerID: mongoose.Schema.Types.ObjectId,
  borrowDate: Date,
  returnDate: Date,
})

export default mongoose.model<BookDocument>('Book', bookSchema)
