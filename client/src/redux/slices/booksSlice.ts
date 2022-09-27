import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookStatus }from 'types'
import bookService from "redux/services/book.service";

export type Book = {
  _id: string,
  name: string
  publishedYear: number
  genres: string[]
  ISBN: string
  author: string[]
  publisher: string
  description: string
  borrowStatus: bookStatus 
  borrowerID?: string 
  borrowDate?: Date
  returnDate?: Date
}
//TODO: look at typescript slides for required, maybe rename singleBook to item 
export type UpdatedBook = Partial<Book>

type PutType = {
  bookId: string;
  updatedBook: UpdatedBook;
};
	
export interface BooksState {
		items: Book[],
		availableItems: Book[],
		singleBook: Book
}

const initialState: BooksState = {
		items: [],
		availableItems: [],
		singleBook: {
				_id: '',
				name: '',
				publishedYear: 1,
				genres: [],
				ISBN: '',
				author: [],
				publisher: '',
				description: '',
				borrowStatus: bookStatus.available
		}
}

export const fetchBooksThunk = createAsyncThunk('books/', async() => {
		const data = await bookService.getAll()
		return data;
})

export const fetchAvailableBooksThunk = createAsyncThunk('books/available', async() => {
		const data = await bookService.getAvailable()
		return data;
})

export const fetchBookThunk = createAsyncThunk('books/:bookId', async(bookId: string) => {
		const data = await bookService.getOne(bookId)
		return data;
})

export const createBookThunk = createAsyncThunk('books/create', async(book: Book) => {
		const data = await bookService.createOne(book)
		return data
})

export const updateBookThunk = createAsyncThunk('books/update', async(book: PutType) => {
		const data = await bookService.updateOne(book)
		return data
})

export const deleteBookThunk = createAsyncThunk('books/delete', async(bookId: string) => {
		const data = await bookService.deleteOne(bookId)
		return data
})

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooksThunk.pending, (state: BooksState) => {
      state.items = [];
      console.log('pending all boks') 
    });
    builder.addCase(fetchBooksThunk.fulfilled, (state: BooksState, action) => {
      state.items = action.payload.data;
      console.log('all books success', action.payload.data)
	});
		  //TODO: add error for fetchBooks
    builder.addCase(fetchBooksThunk.rejected, (state: BooksState, error) => {
      console.log(error);
      
    });
    builder.addCase(fetchAvailableBooksThunk.pending, (state: BooksState) => {
		state.availableItems = [];
		console.log('looking for available books')
	})
    builder.addCase(fetchAvailableBooksThunk.fulfilled, (state: BooksState, action) => {
			state.availableItems = action.payload.data
		console.log('borrowable books found', action.payload.data)
	})
    builder.addCase(fetchBookThunk.pending, (state: BooksState) => {
      
    });
    builder.addCase(fetchBookThunk.fulfilled, (state: BooksState, action) => {
      state.singleBook = action.payload.data;
      
    });
    builder.addCase(fetchBookThunk.rejected, (state: BooksState, error) => {
      console.log(error);
      
    });
    builder.addCase(createBookThunk.pending, (state: BooksState) => {
      
    });
    builder.addCase(createBookThunk.fulfilled, (state: BooksState, action) => {
      state.items = [...state.items, action.payload.data];
      
    });
    builder.addCase(createBookThunk.rejected, (state: BooksState, error) => {
      console.log(error);
      
    });
    builder.addCase(updateBookThunk.pending, (state: BooksState) => {
      
    });
    builder.addCase(updateBookThunk.rejected, (state: BooksState, error) => {
      console.log(error);
      
    });
    builder.addCase(deleteBookThunk.pending, (state: BooksState) => {
      
    });
    builder.addCase(deleteBookThunk.fulfilled, (state: BooksState, action) => {
      state.items = state.items.filter(
        (book) => book._id !== action.payload.data
      );
      
    });
    builder.addCase(deleteBookThunk.rejected, (state: BooksState, error) => {
      console.log(error);
      
    });
  },
});
export default booksSlice.reducer 
