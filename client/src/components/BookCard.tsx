import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { BookCardProps } from "types";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: any) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  width: 300,
  minHeight: 400,
  margin: "5px",
};

export default function BookCard(book: BookCardProps) {
  const [expanded, setExpanded] = useState(false);
  const authors = useSelector((state: RootState) => state.authors.allAuthors);
  console.log(authors);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //TODO: ask Yazan or someone how to implement author name
  return (
    <Card sx={style}>
      <CardHeader
        title={book.book.name}
        subheader={authors.find((author) => author._id === book.book._id)?.name}
      />
      <CardMedia
        component="img"
        height="194"
        width="194"
        image={book.book.imageUrl}
        alt="Cover of the book"
      />
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography sx={{ margin: "5px", textAlign: "center" }}>
          {book.book.description}
        </Typography>
      </Collapse>
    </Card>
  );
}
