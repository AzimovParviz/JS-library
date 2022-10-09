import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useAppDispatch } from "redux/hooks";
import { fetchBooksThunk, removeBorrowerThunk } from "redux/slices/booksSlice";
import { borrowBooksThunk, returnBooksThunk } from "redux/slices/usersSlice";
import { addBorrowerThunk } from "redux/slices/booksSlice";
import { bookStatus } from "types";
import Button from "@mui/material/Button";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);
  const books = useSelector((state: RootState) => state.books.items);
  const user = useSelector((state: RootState) => state.users.loggedIn);
  //TODO: when you borrow a book, the Button dissapears , right now it only dissapears on reload 
  return (
    <div>
      <h1>Library page</h1>
      {books &&
        books.map((book) => (
          <p key={book._id}>
            {book.name}{" "}
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
            {book.borrowStatus === bookStatus.borrowed && user._id && <Button
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
              }}>return</Button>
          }
          </p>
        ))}
    </div>
  );
};

export default Home;
