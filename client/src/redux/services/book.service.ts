import axios from "axios";

import { UpdatedBook, Book, PutType } from "types";

const URL = "http://localhost:4000/api/v1/books";

export default {
	getAll: async () => {
		try {
			const res = await axios.get(`${URL}`);
			console.log("happening i think idk");
			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	getOne: async (bookId: string) => {
		try {
			const res = await axios.get(`${URL}/${bookId}`);

			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	getByISBN: async (bookId: string) => {
		try {
			const res = await axios.get(`${URL}/${bookId}`);

			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	getAvailable: async () => {
		try {
			const res = await axios.get(`${URL}/available`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"token"
					)}`,
				},
			});
			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	getBorrowed: async (userId: string) => {
		try {
			const res = await axios.get(
				`${URL}/borrowed/${userId}`
			);
			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	createOne: async (book: Book) => {
		try {
			const res = await axios.post(`${URL}/`, book);

			return {
				data: res.data,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	updateOne: async (data: PutType) => {
		try {
			const { bookId, updatedBook } = data;
			const res = await axios.put(
				`${URL}/${bookId}`,
				updatedBook,
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
	deleteOne: async (bookId: string) => {
		try {
			const res = await axios.delete(`${URL}/${bookId}`);

			return {
				data: bookId,
				status: res.status,
			};
		} catch (error) {
			throw error;
		}
	},
	addBorrower: async (data: PutType) => {
		try {
			const { bookId, updatedBook } = data;
			const res = await axios.put(
				`${URL}/borrowed/${bookId}`,
				updatedBook,
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
	removeBorrower: async (data: PutType) => {
		try {
			const { bookId, updatedBook } = data;
			const res = await axios.put(
				`${URL}/return/${bookId}`,
				updatedBook,
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
};
