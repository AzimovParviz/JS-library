import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import AvailableBooks from 'pages/AvailableBooks'
import Header from './NavBar'
import { Link } from 'react-router-dom'

const App = () => {
  return (
   <BrowserRouter>
        <Header>
		  <Link to='/'>Home</Link>
		  <Link to='/available'>Available books</Link>
		</Header>
      <Routes>
        <Route path="/" element={<Home />} />
		<Route path="/available" element={<AvailableBooks />}/>
		</Routes>
    </BrowserRouter>
  )
}
export default App
