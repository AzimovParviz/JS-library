import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import AvailableBooks from "pages/AvailableBooks";
import Header from "./NavBar";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { signIn } from "redux/slices/usersSlice";
import { useAppDispatch } from "redux/hooks";
import BorrowedBooks from "pages/BorrowedBooks";

const App = () => {
	const [displayLogin, setDisplayLogin] = useState(true);
	const dispatch = useAppDispatch();
	return (
		<BrowserRouter>
			<Header>
				<Link to="/">Home</Link>
				<Link to="/available">Available books</Link>
				<Link to="/borrowed">Borrowed books</Link>
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
									credentialResponse.credential
								);
								setDisplayLogin(
									false
								);
								dispatch(
									signIn(
										credentialResponse.credential
									)
								);
							}
						}}
						onError={() => {
							console.log(
								"Login Failed"
							);
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
				<Route
					path="/borrowed"
					element={<BorrowedBooks />}
				/>
			</Routes>
		</BrowserRouter>
	);
};
export default App;
