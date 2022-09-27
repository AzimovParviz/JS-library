import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { UpdatedBook, Book } from 'redux/slices/booksSlice'

type PutType = {
  bookId: string;
  updatedBook: UpdatedBook;
};

const URL = 'http://localhost:4000/api/v1/books';

export const fetchBooksThunk = createAsyncThunk('books/fetch', async () => {
  try {
    const res = await axios.get(`${URL}`);
    console.log('happening i think idk')
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    throw error;
  }
});

export const fetchBookThunk = createAsyncThunk(
  'book/fetch',
  async (bookId: string) => {
    try {
      const res = await axios.get(`${URL}/${bookId}`);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAvailableBooksThunk = createAsyncThunk('books/available', async () => {
  try {
    const res = await axios.get(`${URL}/available`);
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    throw error;
  }
});

export const createBookThunk = createAsyncThunk(
  'book/create',
  async (book: Book) => {
    try {
      const res = await axios.post(`${URL}/`, book);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const updateBookThunk = createAsyncThunk(
  'book/update',
  async (data: PutType) => {
    try {
      const { bookId, updatedBook } = data;
      const res = await axios.put(`${URL}/${bookId}`, updatedBook);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteBookThunk = createAsyncThunk(
  'book/delete',
  async (bookId: string) => {
    try {
      const res = await axios.delete(`${URL}/${bookId}`);

      return {
        data: bookId,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);




