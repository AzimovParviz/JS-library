import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useAppDispatch } from "redux/hooks"
import { RootState } from "redux/store"
import { fetchBorrowedBooksThunk, removeBorrowerThunk } from "redux/slices/booksSlice"
import { bookStatus } from "types"
import { returnBooksThunk } from "redux/slices/usersSlice"
import Button from "@mui/material/Button";

const BorrowedBooks = () => {
	const books = useSelector(
		(state: RootState) => state.books.borrowedItems
	)
	const user = useSelector(
		(state: RootState) => state.users.loggedIn
	)
	console.log('logged in user', user)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchBorrowedBooksThunk(user._id))
	}, [dispatch])
	return (
		<div>
			<h1>Your borrowed books</h1>
			{books.length === 0 && <p>no books rented</p>}
			{books.length > 0 &&
				books.map((book) => (
					<p key={book._id}>{book.name}
						{book.borrowStatus === bookStatus.borrowed && user._id && <Button
							onClick={() => {
								dispatch(
									returnBooksThunk({
										userId: user._id,
										updatedUser: {
											borrowedBooks: [book._id],
										},
									})
								);
								dispatch(
									removeBorrowerThunk({
										bookId: book._id,
										updatedBook: {
											borrowerID: undefined,
											borrowStatus: bookStatus.available,
										},
									})
								);
							}}>return</Button>
						}
					</p>
				))}
		</div>
	)
}

export default BorrowedBooks
