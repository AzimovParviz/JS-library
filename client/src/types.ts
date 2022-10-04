export enum bookStatus {
	available = "available",
	borrowed = "borrowed",
}

export type SearchBarProps = {
	//input values
	searchTerm: string
	handleTermChange: React.ChangeEventHandler<HTMLInputElement>
}

export type Book = {
	_id: string;
	name: string;
	publishedYear: number;
	genres: string[];
	ISBN: string;
	author: string[];
	publisher: string;
	description: string;
	borrowStatus: bookStatus;
	borrowerID?: string;
	borrowDate?: Date;
	returnDate?: Date;
};
//TODO: look at typescript slides for required, maybe rename singleBook to item
export type UpdatedBook = Partial<Book>;

export type PutType = {
	bookId: string;
	updatedBook: UpdatedBook;
};

export interface BooksState {
	items: Book[];
	availableItems: Book[];
	borrowedItems: Book[];
	singleBook: Book;
}