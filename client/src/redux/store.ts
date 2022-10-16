import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import usersReducer from "redux/slices/usersSlice"
import booksReducer from "redux/slices/booksSlice"
import authorsReducer from "redux/slices/authorsSlice"
export const store = configureStore({
  reducer: {
    //TODO: dashboard reducer for admin contrlloing users and a user reducer for the logged in user
    users: usersReducer,
    books: booksReducer,
    authors: authorsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
