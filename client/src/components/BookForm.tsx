import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Book, BookCardProps } from "types";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll'
};

export default function BookForm(book: BookCardProps) {
  return (
    <Box sx={style}>
      <TextField id="outlined-basic" label="Name" variant="outlined" defaultValue={book.book.name}margin="normal" />
      <TextField id="outlined-basic" label="ISBN" variant="outlined" defaultValue={book.book.ISBN}margin="normal" />
      <TextField id="outlined-basic" label="Publisher" variant="outlined" defaultValue={book.book.publisher}margin="normal" />
      <TextField id="outlined-basic" label="Year of publication" variant="outlined" defaultValue={book.book.publishedYear}margin="normal" />
      <TextField id="outlined-basic" label="Author(s)" variant="outlined" defaultValue={book.book.author}margin="normal" />
      <TextField id="outlined-basic" label="Description" variant="outlined" defaultValue={book.book.description}margin="normal" />
      <TextField id="outlined-basic" label="Status" variant="outlined" defaultValue={book.book.borrowStatus}margin="normal" />
      <TextField id="outlined-basic" label="Borrower's ID" variant="outlined" defaultValue={book.book.borrowerID}margin="normal" />
      <br></br>
      <Button>Reset</Button>
      <Button>Update</Button>
    </Box>
  );
}
