export enum bookStatus {
  available = "available",
  borrowed = "borrowed",
}

export type SearchBarProps = {
  //input values
  searchTerm: string;
  handleTermChange: React.ChangeEventHandler<HTMLInputElement>;
};

export type BookCardProps = {
  book: Book;
  author: Author | undefined;
};

export type UpdateBookFormProps = {
  bookToEdit: Book;
};

export type Book = {
  _id: string;
  name: string;
  publishedYear: number;
  genres: string[];
  ISBN: string;
  author: string[];
  publisher: string;
  description: string;
  imageUrl: string;
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

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  borrowedBooks: string[];
  isAdmin: boolean;
};

export type UpdatedUser = Partial<User>;

export type UserPutType = {
  userId: string;
  updatedUser: UpdatedUser;
};

export interface UsersState {
  allUsers: User[];
  loggedIn: User;
  singleUser: User;
  isLoading: boolean;
}

export type Author = {
  _id: string;
  name: string;
  books: string[];
};

export type UpdatedAuthor = Partial<Author>;

export type AuthorPutType = {
  authorId: string;
  updatedAuthor: UpdatedAuthor;
};

export interface AuthorsState {
  allAuthors: Author[];
  isLoading: boolean;
}
