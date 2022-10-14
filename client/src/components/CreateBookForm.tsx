import { Book, bookStatus, UpdatedBook } from "types";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppDispatch } from "redux/hooks";
import { createBookThunk } from "redux/slices/booksSlice";

const schema = z.object({
  ISBN: z.string(),
  name: z.string(),
  description: z.string(),
  publisher: z.string(),
})

export default function CreateBookForm() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatedBook>({
    mode: 'all',
    resolver: zodResolver(schema),
  })
  const errorsValues = Object.entries(errors)

  const onSubmit = handleSubmit((data) => {
    const book: Book = {
      ...data,
      _id: '',
      ISBN: data.ISBN!,
      name: data.name!,
      publisher: data.publisher!,
      publishedYear: 1,
      author: [''],
      imageUrl: '',
      description: '',
      borrowerID: '',
      borrowDate: new Date(),
      returnDate: new Date(),
      genres: [''],
      borrowStatus: bookStatus.available
    }
    dispatch(createBookThunk(book))
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
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
      <input {...register('ISBN')} placeholder="(ex: 12312313-3)" />

      <label>title</label>
      <input {...register('name')} placeholder="Romeo and Juliet" />
      <label>publisher</label>
      <input {...register('publisher')} placeholder="Epic Books Publishing" />
      <label>Description</label>
      <input {...register('description')} placeholder="A next chapter in the saga of Foo and Bar..."/>
      <input type="submit" />
    </form>
  );
}
