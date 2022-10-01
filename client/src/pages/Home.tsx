import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useAppDispatch } from "redux/hooks";
import { fetchBooksThunk } from "redux/slices/booksSlice";
import { borrowBooksThunk } from "redux/slices/usersSlice";
import { addBorrowerThunk } from "redux/slices/booksSlice";
import { bookStatus } from "types";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);
  const books = useSelector((state: RootState) => state.books.items);
  const user = useSelector((state: RootState) => state.users.loggedIn);
		//TODO: when you borrow a book, the button dissapears , right now it only dissapears on reload 
  return (
    <div>
      <h1>Library page</h1>
      {books &&
        books.map((book) => (
          <p key={book._id}>
            {book.name}{" "}
				{book.borrowStatus===bookStatus.available && user._id && <button
              onClick={() => {
                dispatch(
                  borrowBooksThunk({
                    userId: user._id,
                    updatedUser: {
                      borrowedBooks: [book._id],
                    },
                  })
                );
                dispatch(
                  addBorrowerThunk({
                    bookId: book._id,
                    updatedBook: {
                      borrowerID: user._id,
                      borrowStatus: bookStatus.borrowed,
                    },
                  })
                );
              }}
            >
              borrow
            </button>
 }
		  </p>
        ))}
    </div>
  );
};

export default Home;
