import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useAppDispatch } from "redux/hooks"
import { RootState } from "redux/store"
import { fetchBorrowedBooksThunk } from "redux/slices/booksSlice"
const BorrowedBooks = () => {
	const books = useSelector(
		(state: RootState) => state.books.borrowedItems
	)
    const user = useSelector(
		(state: RootState) => state.users.loggedIn
	)
		console.log('logged in user',user)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchBorrowedBooksThunk(user._id))
	}, [dispatch])
	return (
		<div>
			<h1>Books available for renting</h1>
			{books &&
				books.map((book) => (
					<p key={book._id}>{book.name}</p>
				))}
		</div>
	)
}

export default BorrowedBooks
