import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { RootState } from "redux/store";
import { addBorrowerThunk, fetchAvailableBooksThunk } from "redux/slices/booksSlice";
import { bookStatus } from "types";
import { borrowBooksThunk } from "redux/slices/usersSlice";
import Button from "@mui/material/Button";

const AvailableBooks = () => {
  const books = useSelector((state: RootState) => state.books.availableItems);
  const user = useSelector((state: RootState) => state.users.loggedIn);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAvailableBooksThunk());
  }, [dispatch]);
  return (
    <div>
      <h1>Books available for renting</h1>
      {books && books.map((book) => <p key={book._id}>
        {book.name}
        {book.borrowStatus === bookStatus.available && user._id && <Button
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
        </Button>
        }
      </p>)}
    </div>
  );
};

export default AvailableBooks;
