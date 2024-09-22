import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const ProtectedRoute = ({ children, onlyBiz }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (onlyBiz && !user.biz) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
