import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { RootState } from "redux/store";
import { fetchAvailableBooksThunk } from "redux/slices/booksSlice";
const AvailableBooks = () => {
  const books = useSelector((state: RootState) => state.books.availableItems);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAvailableBooksThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Books available for renting</h1>
      {books && books.map((book) => <p key={book._id}>{book.name}</p>)}
    </div>
  );
};

export default AvailableBooks;
