import { UpdateBookFormProps, PutType, UpdatedBook, bookStatus } from "types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "redux/hooks";
import { updateBookThunk } from "redux/slices/booksSlice";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const schema = z.object({
  ISBN: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  publisher: z.string().optional(),
  publishedYear: z.number().optional(),
  author: z.string(),
  imageUrl: z.string().optional(),
  borrowerID: z.string().optional(),
  borrowDate: z.date().optional(),
  returnDate: z.date().optional(),
  genres: z.string().optional(),
  borrowStatus: z.enum([bookStatus.available, bookStatus.borrowed]).optional(),
});

export default function UpdateBookForm({ bookToEdit }: UpdateBookFormProps) {
  const dispatch = useAppDispatch();
  const [succ, setSucc] = useState(false);
  const authors = useSelector((state: RootState) => state.authors.allAuthors);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatedBook>({
    mode: "all",
    resolver: zodResolver(schema),
  });
  const errorsValues = Object.entries(errors);

  const onSubmit = handleSubmit((data) => {
    const book: PutType = {
      ...data,
      bookId: bookToEdit._id,
      updatedBook: data,
    };
    dispatch(updateBookThunk(book));
    setSucc(true);
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {errorsValues.length > 0 && (
        <fieldset>
          <legend>Uh oh! there are errors!</legend>
          <ul>
            {errorsValues.map(
              ([name, error]) =>
                error && (
                  <li key={name}>
                    {name}: {error.message}
                  </li>
                )
            )}
          </ul>
        </fieldset>
      )}
      {succ && <p style={{ color: "green" }}>Succesfully updated</p>}
      <label>ISBN</label>
      <TextField {...register("ISBN")} placeholder={bookToEdit.ISBN} />

      <label>title</label>
      <TextField {...register("name")} placeholder={bookToEdit.name} />
      <label>Authors</label>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        {...register("author")}
      >
        {authors.map((a) => (
          <MenuItem value={a._id}>{a.name}</MenuItem>
        ))}
      </Select>
      <label>publisher</label>
      <TextField
        {...register("publisher")}
        placeholder={bookToEdit.publisher}
      />
      <label>Description</label>
      <TextField
        {...register("description")}
        placeholder={bookToEdit.description}
      />
      <label>Cover image</label>
      <TextField {...register("imageUrl")} placeholder={bookToEdit.imageUrl} />
      <input type="submit" />
    </form>
  );
}
