import { useEffect, useState } from "react";
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

  return (
    <div>
      <h1>Library page</h1>
      {books && books.map((book) => <p>{book.name}</p>)}
    </div>
  );
};

export default Home;
