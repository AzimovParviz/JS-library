import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useAppDispatch } from "redux/hooks";
import { fetchBooksThunk } from "redux/slices/booksSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);
  const books = useSelector((state: RootState) => state.books.items);
  //TODO: when you borrow a book, the Button dissapears , right now it only dissapears on reload
  return (
    <div>
      <h1>Library page</h1>
      {books &&
        books.map((book) => (
          <p key={book._id}>
            {book.name}{" "}


          </p>
        ))}
    </div>
  );
};

export default Home;
