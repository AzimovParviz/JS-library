import { Book, bookStatus, UpdatedBook } from "types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "redux/hooks";
import { createBookThunk } from "redux/slices/booksSlice";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { MenuItem, Select } from "@mui/material";

const schema = z.object({
  ISBN: z.string(),
  name: z.string(),
  description: z.string(),
  publisher: z.string(),
  author: z.string(),
  imageUrl: z.string().optional(),
  genres: z.string(),
});

export default function CreateBookForm() {
  const dispatch = useAppDispatch();
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
    //const bookGenres = data.genres!.split(',')
    //const bookAuthors = data.author!.split(',')
    const book: Book = {
      ...data,
      _id: "", //it gets auto generated anyways so just passing an empty string
      ISBN: data.ISBN!,
      name: data.name!,
      publisher: data.publisher!,
      publishedYear: 1,
      author: data.author!,
      imageUrl: data.imageUrl!,
      description: data.description!,
      borrowerID: undefined,
      borrowDate: new Date(),
      returnDate: new Date(Date.now() + 7),
      genres: data.author!,
      borrowStatus: bookStatus.available,
    };
    dispatch(createBookThunk(book));
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
      <TextField {...register("ISBN")} placeholder="(ex: 12312313-3)" />

      <label>title</label>
      <TextField {...register("name")} placeholder="Romeo and Juliet" />
      <label>publisher</label>
      <TextField
        {...register("publisher")}
        placeholder="Epic Books Publishing"
      />
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
      <label>Description</label>
      <TextField
        {...register("description")}
        placeholder="A next chapter in the saga of Foo and Bar..."
      />
      <label>Genres</label>
      <TextField {...register("genres")} placeholder="Adventure, Romance" />
      <label>Cover image URL</label>
      <TextField
        {...register("imageUrl")}
        placeholder="http://localhost:4000/covers/cover2.jpg"
      />
      <input type="submit" />
    </form>
  );
}
