import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { BookCardProps } from 'types';
//TODO: Description in a collapsible
export default function BookCard(book: BookCardProps) {
    return (
	    <Card sx={{ width: 300,  height: 400, margin: '5px' }}>
            <CardHeader title={book.book.name}
            subheader={book.book.author} />
            <CardMedia
                component="img"
                height="194"
		width="194"
                image={book.book.imageUrl}
                alt="Cover of the book"
            />
            <CardContent>
                {book.book.description}
            </CardContent>
        </Card>
    )
}
