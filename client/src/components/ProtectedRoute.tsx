import { Navigate } from "react-router-dom";
import { User } from "types";

type Props = {
    user: User,
    children: any,
    adminCheck?: boolean
}

const ProtectedRoute = ({ user, children, adminCheck }: Props) => {
    if (!user._id) {
        return <Navigate to="/login" replace />;
    }
    if (adminCheck) {
        if (!user.isAdmin) {
            return <Navigate to="/login" replace />;
        }
    }
    return children;
};

export default ProtectedRoute
