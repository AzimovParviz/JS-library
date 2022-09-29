import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "pages/Home"
import AvailableBooks from "pages/AvailableBooks"
import Header from "./NavBar"
import { Link } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"

const App = () => {
	const [displayLogin, setDisplayLogin] = useState(true)
	return (
		<BrowserRouter>
			<Header>
				<Link to="/">Home</Link>
				<Link to="/available">Available books</Link>
				{displayLogin && (
					<GoogleLogin
						onSuccess={(
							credentialResponse
						) => {
							if (
								credentialResponse.credential
							) {
								console.log(
									"login succes",
									credentialResponse.clientId
								)
								setDisplayLogin(
									false
								)
								axios.post(
									"http://localhost:4000/api/v1/login",
									{},
									{
										headers: {
											id_token: credentialResponse.credential,
										},
									}
								).then(
									(
										res: any
									) => {
										console.log(
											res
										)
										localStorage.setItem(
											"token",
											res
												.data
												.token
										)
									}
								)
							}
						}}
						onError={() => {
							console.log(
								"Login Failed"
							)
						}}
					/>
				)}
				{!displayLogin && <span>Welcome, </span>}
			</Header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/available"
					element={<AvailableBooks />}
				/>
			</Routes>
		</BrowserRouter>
	)
}
export default App
