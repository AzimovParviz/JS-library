import AdminTable from "components/AdminTable";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function Dashboard() {
    const books = useSelector((state: RootState) => state.books.items);
    const user = useSelector((state: RootState) => state.users.loggedIn);

    return(
        <AdminTable books={books}/>
    )
}