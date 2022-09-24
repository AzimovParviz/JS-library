import mongoose, { Document } from 'mongoose'
export type BookDocument = Document & {
  name: string
  publishedYear: number
  genres: string[]
  ISBN: string
  author: string[]
  publisher: string
  description: string
  borrowStatus: 'borrowed' | 'available'
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
  publisher: {
    type: String,
    required: true,
  },
  description: String,
  borrowStatus: {
    type: String,
    enum: ['borrowed', 'available'],
  },
  borrowerID: mongoose.Schema.Types.ObjectId,
  borrowDate: Date,
  returnDate: Date,
})

export default mongoose.model<BookDocument>('Book', bookSchema)
