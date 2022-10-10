import AdminTable from "components/AdminTable";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useAppDispatch } from "redux/hooks";
import { fetchUsersThunk } from "redux/slices/usersSlice"

import { useEffect } from "react";
export default function Dashboard() {
    const dispatch = useAppDispatch()
    useEffect(() => {
    dispatch(fetchUsersThunk());
    }, [dispatch]);

    const books = useSelector((state: RootState) => state.books.items);
    const currentUser = useSelector((state: RootState) => state.users.loggedIn);
    const users = useSelector((state:RootState)=>state.users.allUsers)
    console.log(users)
    return(
        <AdminTable books={books} users={users}/>
    )
}
