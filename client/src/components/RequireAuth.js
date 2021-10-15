import React from "react";
import { Navigate, Route } from "react-router-dom";

function RequireAuth({ children }) {

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/"/>;
}

export default RequireAuth;
