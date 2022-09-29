import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "redux/store"
import { useAppDispatch } from "redux/hooks"
import { fetchBooksThunk } from "redux/slices/booksSlice"
//import {borrowBookThunk} from "redux/slices/usersSlice"
import {PutType} from "redux/services/user.service"
import {updateUserThunk} from "redux/slices/usersSlice"
import {updateBookThunk} from "redux/slices/booksSlice"

const Home = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchBooksThunk())
	}, [dispatch])
	const books = useSelector((state: RootState) => state.books.items)
    const user = useSelector((state: RootState) => state.users.loggedIn)
	return (
		<div>
			<h1>Library page</h1>
			{books &&
				books.map((book) => (
						<p key={book._id}>{book.name} <button onClick={()=> { 
										dispatch(updateUserThunk(
								{"userId":user._id,
										"updatedUser": {
												"borrowedBooks":[book._id]
										}
								}))
										dispatch(updateBookThunk({
												"bookId":book._id,
												"updatedBook": {
												"borrowerID":user._id
												}
										}))
						}
						}>
								borrow
				</button>
		</p>
				))}
		</div>
	)
}

export default Home
