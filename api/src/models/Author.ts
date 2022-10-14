import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  books: mongoose.Schema.Types.ObjectId[]
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    index: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
  },
})

export default mongoose.model<AuthorDocument>('Book', authorSchema)
