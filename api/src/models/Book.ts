import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  name: string
  publishedYear: number
  genres: string[]
  ISBN: string
  author: string
}

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
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
    min: 1900,
  },
  genres: [String],
  author: String,
})

export default mongoose.model<BookDocument>('Book', bookSchema)
