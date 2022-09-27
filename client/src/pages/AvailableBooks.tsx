
import {useEffect, useState} from "react"
import { Book} from "types"
import { useSelector } from "react-redux"
import { RootState } from "redux/store"
import {useAppDispatch} from "redux/hooks"
import {fetchBooksThunk} from "redux/services/book.service"
const AvailableBooks = () => {
	    	
		const books = useSelector((state:RootState)=> state.books.items) 


		return(
				<div>
						<h1>Books available for renting</h1>
						{books && books.map(book=><p>{book.name}</p>)}
				</div>
		)
}

export default AvailableBooks
