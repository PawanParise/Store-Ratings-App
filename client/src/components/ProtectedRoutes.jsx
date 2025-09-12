// ProtectedRoutes.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Context.jsx";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(UserContext);

  const isLoggedIn = !!user;
  const userRole = user?.type || "Guest";
  console.log('user',user)
 

  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
