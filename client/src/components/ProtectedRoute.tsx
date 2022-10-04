import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "redux/slices/usersSlice";

type Props = {
    user: User,
    children: any
}

const ProtectedRoute = ({ user, children }:Props) => {
    if (!user._id) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

export default ProtectedRoute