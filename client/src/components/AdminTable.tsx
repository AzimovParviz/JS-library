import {
    Button,
    TableContainer,
    TableCell,
    TableRow,
    Table,
    TableHead,
    TableBody,
} from '@mui/material/'
import { bookStatus, User } from 'types'
import { Book } from 'types'

type TableProps = {
    books?: Book[],
    users?: User[]
}


export default function AdminTable(props: TableProps) {
    const books = props.books
    const users = props.users
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                    </TableRow>
                </TableHead>
                {books &&
                    <TableBody>
                        {
                            books.map((book: Book) => (
                                <TableRow key={book._id}>
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.ISBN}</TableCell>
                                    <TableCell>{book.description}</TableCell>
                                    <TableCell>{book.author.map(author => author)}</TableCell>
                                    <TableCell>{book.borrowStatus}</TableCell>
                                    <TableCell>{book.borrowStatus === bookStatus.borrowed? book.borrowerID : "-"}</TableCell>
                                </TableRow>
                            )
                            )
                        }

                    </TableBody>

                }
                {users &&
                    <TableBody>
                        {
                            users.map((user: User) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.isAdmin? "true" : "false"}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.borrowedBooks.map(book => book)}</TableCell>
                                </TableRow>
                            )
                            )
                        }

                    </TableBody>

                }
            </Table>
        </TableContainer>
    )
}
