import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
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
})

export default mongoose.model<AuthorDocument>('Book', authorSchema)
