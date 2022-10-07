import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "redux/services/user.service";
import { User, UserPutType, UsersState } from "types";



const initialState: UsersState = {
	allUsers: [],
	singleUser: {
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		borrowedBooks: [],
		isAdmin: false
	},
	loggedIn: {
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		borrowedBooks: [],
		isAdmin: false
	},
	isLoading: false,
};

export const signIn = createAsyncThunk(
	"user/login",
	async (token_id: string) => {
		const data = await userService.singInUser(token_id);

		return data;
	}
);

export const borrowBooksThunk = createAsyncThunk(
	"users/borrowBook",
	async (data: UserPutType) => {
		const status = await userService.borrowBook(data);
		return status;
	}
);
export const returnBooksThunk = createAsyncThunk(
	"users/returnBook",
	async (data: UserPutType) => {
		const status = await userService.returnBook(data);
		return status;
	}
);
export const fetchUsersThunk = createAsyncThunk("users/fetch", async () => {
	const data = await userService.getAllUsers();

	return data;
});

export const fetchUserThunk = createAsyncThunk(
	"user/fetch",
	async (userId: string) => {
		const data = await userService.getUser(userId);
		return data;
	}
);

export const createUserThunk = createAsyncThunk(
	"user/create",
	async (user: User) => {
		const data = await userService.createUser(user);

		return data;
	}
);

export const updateUserThunk = createAsyncThunk(
	"user/update",
	async (user: UserPutType) => {
		const data = await userService.updateUser(user);
		return data;
	}
);

export const deleteUserThunk = createAsyncThunk(
	"user/delete",
	async (userId: string) => {
		const data = await userService.deleteUser(userId);
		return data;
	}
);
export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signIn.pending, (state: UsersState) => {
			state.isLoading = true;
		});
		builder.addCase(
			signIn.fulfilled,
			(state: UsersState, action) => {
				state.loggedIn = action.payload.data;
				state.isLoading = false;
			}
		);
		builder.addCase(signIn.rejected, (state: UsersState, error) => {
			console.log(error);
			state.isLoading = false;
		});
		builder.addCase(
			fetchUsersThunk.pending,
			(state: UsersState) => {
				state.allUsers = [];
				state.isLoading = true;
			}
		);
		builder.addCase(
			fetchUsersThunk.fulfilled,
			(state: UsersState, action) => {
				state.allUsers = action.payload.data;
				state.isLoading = false;
			}
		);
		builder.addCase(
			fetchUsersThunk.rejected,
			(state: UsersState, error) => {
				console.log(error);
				state.isLoading = false;
			}
		);
		builder.addCase(fetchUserThunk.pending, (state: UsersState) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchUserThunk.fulfilled,
			(state: UsersState, action) => {
				state.singleUser = action.payload.data;
				state.isLoading = false;
			}
		);
		builder.addCase(
			fetchUserThunk.rejected,
			(state: UsersState, error) => {
				console.log(error);
				state.isLoading = false;
			}
		);
		builder.addCase(
			createUserThunk.pending,
			(state: UsersState) => {
				state.isLoading = true;
			}
		);
		builder.addCase(
			createUserThunk.fulfilled,
			(state: UsersState, action) => {
				state.allUsers = [
					...state.allUsers,
					action.payload.data,
				];
				state.isLoading = false;
			}
		);
		builder.addCase(
			createUserThunk.rejected,
			(state: UsersState, error) => {
				console.log(error);
				state.isLoading = false;
			}
		);
		builder.addCase(
			updateUserThunk.pending,
			(state: UsersState) => {
				state.isLoading = true;
			}
		);
		builder.addCase(
			updateUserThunk.fulfilled,
			(state: UsersState, action) => {
				console.log(
					"user updated",
					action.payload.data
				);
			}
		);
		builder.addCase(
			updateUserThunk.rejected,
			(state: UsersState, error) => {
				console.log(error);
				state.isLoading = false;
			}
		);
		builder.addCase(
			borrowBooksThunk.pending,
			(state: UsersState) => {}
		);
		builder.addCase(
			borrowBooksThunk.fulfilled,
			(state: UsersState, action) => {
				console.log("book borrowed to user");
			}
		);
		builder.addCase(
			returnBooksThunk.pending,
			() => {}
		);
		builder.addCase(
			returnBooksThunk.fulfilled,
			() => {
				console.log("book returned to user");
			}
		);
		builder.addCase(
			deleteUserThunk.pending,
			(state: UsersState) => {
				state.isLoading = true;
			}
		);
		builder.addCase(
			deleteUserThunk.fulfilled,
			(state: UsersState, action) => {
				state.allUsers = state.allUsers.filter(
					(user) =>
						user._id !== action.payload.data
				);
				state.isLoading = false;
			}
		);
		builder.addCase(
			deleteUserThunk.rejected,
			(state: UsersState, error) => {
				console.log(error);
				state.isLoading = false;
			}
		);
	},
});

export default usersSlice.reducer;
