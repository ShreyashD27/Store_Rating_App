import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

function ProtectedRoute({ allowedRoles, children }) {
  const user = getUserFromToken();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
