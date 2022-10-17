import AdminTable from "components/AdminTable";
import { useAppDispatch } from "redux/hooks";
import { fetchUsersThunk } from "redux/slices/usersSlice"

import { useEffect } from "react";
export default function Dashboard() {
    const dispatch = useAppDispatch()
    useEffect(() => {
    dispatch(fetchUsersThunk());
    }, [dispatch]);
    return(
        <AdminTable />
    )
}
