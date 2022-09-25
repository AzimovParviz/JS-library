export enum bookStatus {
  available = 'available',
  borrowed = 'borrowed'
}

export type Book = {
  name: string
  publishedYear: number
  genres: string[]
  ISBN: string
  author: string[]
  publisher: string
  description: string
  borrowStatus: bookStatus 
		borrowerID: string 
		borrowDate: Date
  returnDate: Date

}
