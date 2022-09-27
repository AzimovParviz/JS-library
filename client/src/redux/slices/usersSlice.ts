import { createSlice } from "@reduxjs/toolkit";
import {
  createUserThunk,
  deleteUserThunk,
  fetchUsersThunk,
  fetchUserThunk,
  updateUserThunk,
} from 'redux/services/user.service';

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  borrowedBooks: string[]
}

export type UpdatedUser = Partial<User> 

export interface UsersState {
  allUsers: User[];
  singleUser: User;
  isLoading: boolean;
}

const initialState: UsersState = {
  allUsers: [],
		singleUser: {
				_id: '',
				firstName: '',
				lastName: '',
				email: '',
				borrowedBooks: []
		},
		isLoading: false
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state: UsersState) => {
      state.allUsers = [];
      state.isLoading = true;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state: UsersState, action) => {
      state.allUsers = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchUsersThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(fetchUserThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state: UsersState, action) => {
      state.singleUser = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchUserThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(createUserThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(createUserThunk.fulfilled, (state: UsersState, action) => {
      state.allUsers = [...state.allUsers, action.payload.data];
      state.isLoading = false;
    });
    builder.addCase(createUserThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(updateUserThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
    builder.addCase(deleteUserThunk.pending, (state: UsersState) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state: UsersState, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload.data
      );
      state.isLoading = false;
    });
    builder.addCase(deleteUserThunk.rejected, (state: UsersState, error) => {
      console.log(error);
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
