import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authorService from "redux/services/author.service";
import { Author, AuthorPutType, AuthorsState } from "types";

const initialState: AuthorsState = {
  allAuthors: [], 
  isLoading: false,
};

export const fetchAuthorsThunk = createAsyncThunk("authors/fetch", async () => {
  const data = await authorService.getAllAuthors();

  return data;
});

export const fetchAuthorThunk = createAsyncThunk(
  "author/fetch",
  async (authorId: string) => {
    const data = await authorService.getAuthor(authorId);
    return data;
  }
);

export const createAuthorThunk = createAsyncThunk(
  "author/create",
  async (author: Author) => {
    const data = await authorService.createAuthor(author);

    return data;
  }
);

export const updateAuthorThunk = createAsyncThunk(
  "author/update",
  async (author: AuthorPutType) => {
    const data = await authorService.updateAuthor(author);
    return data;
  }
);

export const deleteAuthorThunk = createAsyncThunk(
  "author/delete",
  async (authorId: string) => {
    const data = await authorService.deleteAuthor(authorId);
    return data;
  }
);
export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorsThunk.pending, (state: AuthorsState) => {
      state.allAuthors = [];
      state.isLoading = true;
    });
    builder.addCase(
      fetchAuthorsThunk.fulfilled,
      (state: AuthorsState, action) => {
        state.allAuthors = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchAuthorsThunk.rejected,
      (state: AuthorsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
    builder.addCase(fetchAuthorThunk.pending, (state: AuthorsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAuthorThunk.fulfilled,
      (state: AuthorsState) => {
        state.isLoading = false;
      }
    );
    builder.addCase(fetchAuthorThunk.rejected, (state: AuthorsState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(createAuthorThunk.pending, (state: AuthorsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      createAuthorThunk.fulfilled,
      (state: AuthorsState, action) => {
        state.allAuthors = [...state.allAuthors, action.payload.data];
        state.isLoading = false;
      }
    );
    builder.addCase(
      createAuthorThunk.rejected,
      (state: AuthorsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
    builder.addCase(updateAuthorThunk.pending, (state: AuthorsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateAuthorThunk.fulfilled,
      (state: AuthorsState, action) => {
        console.log("author updated", action.payload.data);
      }
    );
    builder.addCase(
      updateAuthorThunk.rejected,
      (state: AuthorsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
    builder.addCase(deleteAuthorThunk.pending, (state: AuthorsState) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteAuthorThunk.fulfilled,
      (state: AuthorsState, action) => {
        state.allAuthors = state.allAuthors.filter(
          (author) => author._id !== action.payload.data
        );
        state.isLoading = false;
      }
    );
    builder.addCase(
      deleteAuthorThunk.rejected,
      (state: AuthorsState, error) => {
        console.log(error);
        state.isLoading = false;
      }
    );
  },
});

export default authorsSlice.reducer;
