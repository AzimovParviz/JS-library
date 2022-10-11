import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { RootState } from "redux/store";
import {
  addBorrowerThunk,
  fetchAvailableBooksThunk,
} from "redux/slices/booksSlice";
import { bookStatus } from "types";
import { borrowBooksThunk } from "redux/slices/usersSlice";
import Button from "@mui/material/Button";
import BookCard from "components/BookCard";

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
      {books &&
        books.map((book) => (
          <div className="bookCard">
            <BookCard book={book} />
            {book.borrowStatus === bookStatus.available && user._id && (
              <Button
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
            )}
          </div>
        ))}
    </div>
  );
};

export default AvailableBooks;
