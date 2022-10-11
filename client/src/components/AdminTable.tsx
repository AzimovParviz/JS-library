import {
  Button,
  TableContainer,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
} from "@mui/material/";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { bookStatus, User } from "types";
import { Book } from "types";
import { useState } from "react";
import BookForm from "./BookForm";

type TableProps = {
  books: Book[];
  users: User[];
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  height: 500,
  width: '90%',
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function AdminTable(props: TableProps) {
  const books = props.books;
  const users = props.users;
  const [openbooks, setOpenbooks] = useState(false);
  const [openusers, setOpenusers] = useState(false);
  const [openEditBook, setEditBook] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(books[0]);
  const handleBooksOpen = () => setOpenbooks(true);
  const handleBooksClose = () => setOpenbooks(false);
  const handleUsersOpen = () => setOpenusers(true);
  const handleUsersClose = () => setOpenusers(false);
  const handleBookEditOpen = () => setEditBook(true);
  const handleBookEditClose = () => setEditBook(false);
  return (
    <div>
      <Modal
        open={openEditBook}
        onClose={handleBookEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BookForm book={bookToEdit} />
      </Modal>
      <div>
        <Button onClick={handleBooksOpen}>Open books table</Button>
        <Modal
          open={openbooks}
          onClose={handleBooksClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              List of books
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Authors</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Borrower ID</TableCell>
                  </TableRow>
                </TableHead>
                {books && (
                  <TableBody>
                    {books.map((book: Book) => (
                      <TableRow key={book._id}>
                        <TableCell>{book.name}</TableCell>
                        <TableCell>{book.ISBN}</TableCell>
                        <TableCell>{book.description}</TableCell>
                        <TableCell>
                          {book.author.map((author) => author)}
                        </TableCell>
                        <TableCell>{book.borrowStatus}</TableCell>
                        <TableCell>
                          {book.borrowStatus === bookStatus.borrowed
                            ? book.borrowerID
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              setBookToEdit(book);
                              handleBookEditOpen()
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </div>
      <div>
        <Button onClick={handleUsersOpen}>Open users table</Button>
        <Modal
          open={openusers}
          onClose={handleUsersClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Admin?</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>First name</TableCell>
                    <TableCell>Last name</TableCell>
                    <TableCell>User ID</TableCell>
                  </TableRow>
                </TableHead>

                {users && (
                  <TableBody>
                    {users.map((user: User) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.isAdmin ? "true" : "false"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>
                          {user.borrowedBooks.map((book) => book)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
