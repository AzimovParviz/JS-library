import { createSlice } from "@reduxjs/toolkit";
import { bookStatus }from 'types'
import {
  createBookThunk,
  deleteBookThunk,
  fetchBooksThunk,
  fetchAvailableBooksThunk,
  fetchBookThunk,
  updateBookThunk,
} from 'redux/services/book.service';

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
		
export interface BooksState {
		items: Book[],
		singleBook: Book
}

const initialState: BooksState = {
		items: [],
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
		state.items = [];
		console.log('looking for available books')
	})
    builder.addCase(fetchAvailableBooksThunk.fulfilled, (state: BooksState, action) => {
		state.items = action.payload.data
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
