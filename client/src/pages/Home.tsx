import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useAppDispatch } from "redux/hooks";
import { fetchBooksThunk } from "redux/slices/booksSlice";
import BookCard from "components/BookCard";
import Box from "@mui/material/Box";
import SearchBar from "components/SearchBar";
import {fetchAuthorsThunk} from "redux/slices/authorsSlice";

export const style = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-around",
  flexWrap: "wrap",
};

const Home = () => {
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState("");
  useEffect(() => {
    dispatch(fetchBooksThunk());
    dispatch(fetchAuthorsThunk())
  }, [dispatch]);
  const handleChange = (e: any) => {
    setTerm((e.target as HTMLInputElement).value);
  };

  const books = useSelector((state: RootState) => state.books.items);
  const authors = useSelector((state: RootState) => state.authors.allAuthors);
  let filtered = books;
  filtered = filtered.filter(
    (b) =>
      b.name.toLowerCase().includes(term.toLowerCase()) ||
      b.author?.toString().toLowerCase().includes(term.toLowerCase()) ||
      b.description?.toLowerCase().includes(term.toLowerCase())
  );
  //TODO: when you borrow a book, the Button dissapears , right now it only dissapears on reload
  return (
    <div>
      <h1>Library page</h1>
      <form>
        <SearchBar
          searchTerm={term}
          handleTermChange={(e) => handleChange(e)}
        />
      </form>
      <Box sx={style}>
        {filtered && filtered.map((book) => <BookCard book={book} />)}
      </Box>
    </div>
  );
};

export default Home;
