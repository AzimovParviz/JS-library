import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  borrowedBooks: mongoose.Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
  },
  lastName: {
    type: String,
    index: true,
  },
  email: {
    type: String,
  },
  borrowedBooks: {
    type: [mongoose.Schema.Types.ObjectId],
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
