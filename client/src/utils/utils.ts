import {Author, Book} from "types";

export default function getAuthor (authors: Author[], book: Book) {
	return authors.find(author => author.books.includes(book._id))
}
