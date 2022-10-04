import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import AvailableBooks from "pages/AvailableBooks";
import Header from "./NavBar";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { signIn } from "redux/slices/usersSlice";
import { useAppDispatch } from "redux/hooks";
import { useSelector } from "react-redux"
import BorrowedBooks from "pages/BorrowedBooks";
import { RootState } from "redux/store"
import ProtectedRoute from "./ProtectedRoute";
import Login from "pages/Login";

const App = () => {
	const [displayLogin, setDisplayLogin] = useState(true);
	const dispatch = useAppDispatch();

	const user = useSelector((state: RootState) => state.users.loggedIn)
	return (
		<BrowserRouter>
			<Header>
				<Link to="/">Home</Link>
				<Link to="/available">Available books</Link>
				<Link to="/borrowed">Borrowed books</Link>
				<Link to="/login"></Link>
				{user._id && <span>Welcome, {user.firstName}</span>}
			</Header>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={
					<ProtectedRoute user={user}>
						<Home />
					</ProtectedRoute>
				} />
				<Route
					path="/available"
					element={
						<ProtectedRoute user={user}>
							<AvailableBooks />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/borrowed"
					element={
						<ProtectedRoute user={user}>
							<BorrowedBooks />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
export default App;
