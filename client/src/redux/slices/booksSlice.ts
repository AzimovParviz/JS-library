import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Book, BooksState, bookStatus, PutType } from "types";
import bookService from "redux/services/book.service";



const initialState: BooksState = {
	items: [],
	availableItems: [],
	borrowedItems: [],
	singleBook: {
		_id: "",
		name: "",
		publishedYear: 1,
		genres: [],
		ISBN: "",
		author: [],
		publisher: "",
		description: "",
		imageUrl: "",
		borrowStatus: bookStatus.available,
	},
};

export const fetchBooksThunk = createAsyncThunk("books/", async () => {
	const data = await bookService.getAll();
	return data;
});

export const fetchAvailableBooksThunk = createAsyncThunk(
	"books/available",
	async () => {
		const data = await bookService.getAvailable();
		return data;
	}
);

export const fetchBorrowedBooksThunk = createAsyncThunk(
	"books/borrowed",
	async (userId: string) => {
		const data = await bookService.getBorrowed(userId);
		return data;
	}
);

export const fetchBookThunk = createAsyncThunk(
	"books/:bookId",
	async (bookId: string) => {
		const data = await bookService.getOne(bookId);
		return data;
	}
);

export const createBookThunk = createAsyncThunk(
	"books/create",
	async (book: Book) => {
		const data = await bookService.createOne(book);
		return data;
	}
);

export const updateBookThunk = createAsyncThunk(
	"books/update",
	async (book: PutType) => {
		const data = await bookService.updateOne(book);
		return data;
	}
);

export const deleteBookThunk = createAsyncThunk(
	"books/delete",
	async (bookId: string) => {
		const data = await bookService.deleteOne(bookId);
		return data;
	}
);

export const addBorrowerThunk = createAsyncThunk(
	"books/addborrower",
	async (updatedBook: PutType) => {
		const data = await bookService.addBorrower(updatedBook);
		return data;
	}
);

export const removeBorrowerThunk = createAsyncThunk(
	"books/removeborrower",
	async (updatedBook: PutType) => {
		const data = await bookService.removeBorrower(updatedBook);
		return data;
	}
);


export const booksSlice = createSlice({
	name: "books",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchBooksThunk.pending,
			(state: BooksState) => {
				state.items = [];
				console.log("pending all boks");
			}
		);
		builder.addCase(
			fetchBooksThunk.fulfilled,
			(state: BooksState, action) => {
				state.items = action.payload.data;
				console.log(
					"all books success",
					action.payload.data
				);
			}
		);
		//TODO: add error for fetchBooks
		builder.addCase(
			fetchBooksThunk.rejected,
			(error) => {
				console.log(error);
			}
		);
		builder.addCase(
			fetchAvailableBooksThunk.pending,
			(state: BooksState) => {
				state.availableItems = [];
				console.log("looking for available books");
				console.log(
					`Bearer ${localStorage.getItem(
						"token"
					)}`
				);
			}
		);
		builder.addCase(
			fetchAvailableBooksThunk.fulfilled,
			(state: BooksState, action) => {
				state.availableItems = action.payload.data;
				console.log(
					"borrowable books found",
					action.payload.data
				);
			}
		);
		builder.addCase(
			fetchAvailableBooksThunk.rejected,
			(error) => {
				console.log(error);
			}
		);
		builder.addCase(
			fetchBorrowedBooksThunk.pending,
			() => {}
		);
		builder.addCase(
			fetchBorrowedBooksThunk.fulfilled,
			(state: BooksState, action) => {
				state.borrowedItems = action.payload.data;
			}
		);
		builder.addCase(
			fetchBorrowedBooksThunk.rejected,
			(error) => {
				console.log(
					"cannot fetch borrowed books",
					error
				);
			}
		);
		builder.addCase(
			fetchBookThunk.pending,
			() => {}
		);
		builder.addCase(
			fetchBookThunk.fulfilled,
			(state: BooksState, action) => {
				state.singleBook = action.payload.data;
			}
		);
		builder.addCase(
			fetchBookThunk.rejected,
			(error) => {
				console.log(error);
			}
		);
		builder.addCase(
			createBookThunk.pending,
			() => {}
		);
		builder.addCase(
			createBookThunk.fulfilled,
			(state: BooksState, action) => {
				state.items = [
					...state.items,
					action.payload.data,
				];
			}
		);
		builder.addCase(
			createBookThunk.rejected,
			(error) => {
				console.log(error);
			}
		);
		builder.addCase(
			updateBookThunk.pending,
			() => {}
		);
		builder.addCase(
			updateBookThunk.rejected,
			(error) => {
				console.log(error);
			}
		);
		builder.addCase(
			deleteBookThunk.pending,
			() => {}
		);
		builder.addCase(
			deleteBookThunk.fulfilled,
			(state: BooksState, action) => {
				state.items = state.items.filter(
					(book) =>
						book._id !== action.payload.data
				);
			}
		);
		builder.addCase(
			deleteBookThunk.rejected,
			(error) => {
				console.log(error);
			}
		);
		builder.addCase(
			addBorrowerThunk.pending,
			() => {}
		);
		builder.addCase(
			addBorrowerThunk.fulfilled,
			(state: BooksState, action) => {
				state.borrowedItems = [
					...state.borrowedItems,
					action.payload.data,
				];
				state.availableItems.splice(state.availableItems.findIndex((item)=> item._id === action.payload.data._id),1)
				console.log('current availableItems', state.availableItems)
				console.log(
					"books borrowed",
					action.payload.data
				);
			}
		);
		builder.addCase(
			addBorrowerThunk.rejected,
			(error) => {
				console.log(error);
			}
		);
		builder.addCase(
			removeBorrowerThunk.pending,
			() => {}
		);
		builder.addCase(
			removeBorrowerThunk.fulfilled,
			(state: BooksState, action) => {
				state.availableItems = [
					...state.availableItems,
					action.payload.data,
				];
				state.borrowedItems.splice(state.borrowedItems.findIndex((item)=> item._id === action.payload.data._id),1)
				console.log('current availableItems', state.availableItems)
				console.log(
					"books borrowed",
					action.payload.data
				);
			}
		);
		builder.addCase(
			removeBorrowerThunk.rejected,
			(error) => {
				console.log(error);
			}
		);
	},
});
export default booksSlice.reducer;
