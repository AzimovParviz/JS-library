import { UpdateBookFormProps, PutType, UpdatedBook } from "types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "redux/hooks";
import { updateBookThunk } from "redux/slices/booksSlice";
import TextField from "@mui/material/TextField";

const schema = z.object({
  ISBN: z.string(),
  name: z.string(),
  description: z.string(),
  publisher: z.string(),
  //publishedYear: z.number(),
  //author: z,
  imageUrl: z.string(),
  //borrowerID: z.string(),
  //borrowDate: z.date(),
  //returnDate: z.date(),
  //genres: [""],
  //borrowStatus: z.enum([bookStatus.available, bookStatus.borrowed]),
});

export default function UpdateBookForm({ bookToEdit }: UpdateBookFormProps) {
  const dispatch = useAppDispatch();
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

      <label>ISBN</label>
      <TextField {...register("ISBN")} placeholder={bookToEdit.ISBN} />

      <label>title</label>
      <TextField {...register("name")} placeholder={bookToEdit.name} />
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
