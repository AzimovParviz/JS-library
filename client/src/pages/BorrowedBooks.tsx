import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { RootState } from "redux/store";
import {
  fetchBorrowedBooksThunk,
  removeBorrowerThunk,
} from "redux/slices/booksSlice";
import { bookStatus } from "types";
import { returnBooksThunk } from "redux/slices/usersSlice";
import Button from "@mui/material/Button";
import BookCard from "components/BookCard";
import Box from "@mui/material/Box";
import { style } from "./Home";
import { fetchAuthorsThunk } from "redux/slices/authorsSlice";

const BorrowedBooks = () => {
  const books = useSelector((state: RootState) => state.books.borrowedItems);
  const user = useSelector((state: RootState) => state.users.loggedIn);
  const authors = useSelector((state: RootState) => state.authors.allAuthors);
  console.log("logged in user", user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBorrowedBooksThunk(user._id));
    dispatch(fetchAuthorsThunk());
  }, [dispatch]);
  return (
    <div>
      <h1>Your borrowed books</h1>
      {books.length === 0 && <p>no books rented</p>}
      <Box sx={style}>
        {books.length > 0 &&
          books.map((book) => (
            <div className="bookCard" key={book._id}>
              {" "}
              <BookCard
                book={book}
                author={authors.find((author) =>
                  author.books.includes(book._id)
                )}
              />
              {book.borrowStatus === bookStatus.borrowed && user._id && (
                <Button
                  onClick={() => {
                    dispatch(
                      returnBooksThunk({
                        userId: user._id,
                        updatedUser: {
                          borrowedBooks: [book._id],
                        },
                      })
                    );
                    dispatch(
                      removeBorrowerThunk({
                        bookId: book._id,
                        updatedBook: {
                          borrowerID: undefined,
                          borrowStatus: bookStatus.available,
                        },
                      })
                    );
                  }}
                >
                  return
                </Button>
              )}
            </div>
          ))}
      </Box>
    </div>
  );
};

export default BorrowedBooks;
