import axios from "axios";

import { UpdatedUser, User } from "types";

export type PutType = {
	userId: string;
	updatedUser: UpdatedUser;
};

export type BorrowType = {
	bookId: string;
	userId: string;
};

const URL = "http://localhost:4000/api/v1/users";

//TODO: refactor how the thunks are created like in user service

export default {
	singInUser: async (token_id: string) => {
		try {
			const data: any = await axios.post(
				"http://localhost:4000/api/v1/login",
				{},
				{
					headers: {
						id_token: token_id,
					},
				}
			);
			localStorage.setItem("token", data.data.token);
			return {
				data: data.data.user,
				status: data.status,
			};
		} catch (error) {
			throw error;
		}
	},
	getAllUsers: async () => {
		try {
			const res = await axios.get(`${URL}`);
			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	getUser: async (userId: string) => {
		try {
			const res = await axios.get(`${URL}/${userId}`);

			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	createUser: async (user: User) => {
		try {
			const res = await axios.post(`${URL}/`, user);

			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	updateUser: async (data: PutType) => {
		try {
			const { userId, updatedUser } = data;
			const res = await axios.put(
				`${URL}/${userId}`,
				updatedUser,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	borrowBook: async (data: PutType) => {
		try {
			const { userId, updatedUser } = data;
			const res = await axios.put(
				`${URL}/borrowed/${userId}`,
				{
					"borrowedBooks": updatedUser.borrowedBooks![0]
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			return {
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	returnBook: async (data: PutType) => {
		try {
			const { userId, updatedUser } = data;
			const res = await axios.put(
				`${URL}/return/${userId}`,
				{
					"borrowedBooks": updatedUser.borrowedBooks![0]
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	deleteUser: async (userId: string) => {
		try {
			const res = await axios.delete(`${URL}/${userId}`);

			return {
				data: userId,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
};
