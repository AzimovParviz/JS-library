import axios from "axios"
import Header from "components/NavBar"
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import { Book} from "types"


const Home = () => {
		const [books, setBooks] = useState<Book[]>([])
		useEffect(()=>{
				axios.get('http://localhost:4000/api/v1/books/')
						.then(res=>setBooks(res.data))

		}, [books])


		return(
				<div>
												<h1>Library page</h1>
						{books.map(book=> <p>{book.name}</p>)}
				</div>
		)
}

export default Home
