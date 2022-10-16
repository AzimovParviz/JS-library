import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  name: string
  pseudonyms: string[]
  books: mongoose.Schema.Types.ObjectId[]
}

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pseudonyms: [String],
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
  },
})

export default mongoose.models['Author'] ||
  mongoose.model('Author', authorSchema)
