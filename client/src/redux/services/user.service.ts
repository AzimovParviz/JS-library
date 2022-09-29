import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { UpdatedUser, User } from "redux/slices/usersSlice"

type PutType = {
  userId: string
  updatedUser: UpdatedUser
}

const URL = "http://localhost:4000/api/v1/users"

//TODO: refactor how the thunks are created like in user service

export default {
getAllUsers: async () => {
		try {
			const res = await axios.get(`${URL}`)
			console.log("happening i think idk")
			return {
				data: res.data,
				status: res.status,
			}
		} catch (error) {
			throw error
		}
	},
	getUser: async (userId: string) => {
		try {
			const res = await axios.get(`${URL}/${userId}`)

			return {
				data: res.data,
				status: res.status,
			}
		} catch (error) {
			throw error
		}
	},	
	createUser: async (user: User) => {
		try {
			const res = await axios.post(`${URL}/`, user)

			return {
				data: res.data,
				status: res.status,
			}
		} catch (error) {
			throw error
		}
	},
	updateUser: async (data: PutType) => {
		try {
			const { userId, updatedUser } = data
			const res = await axios.put(
				`${URL}/${userId}`,
				updatedUser
			)

			return {
				data: res.data,
				status: res.status,
			}
		} catch (error) {
			throw error
		}
	},
	deleteUser: async (userId: string) => {
		try {
			const res = await axios.delete(`${URL}/${userId}`)

			return {
				data: userId,
				status: res.status,
			}
		} catch (error) {
			throw error
		}
	},

}


