import React from "react";
import { Navigate } from "react-router-dom";
import useAuthenticate from "../Hooks/useAuthenticate";

const ProtectedRoute = (props) => {
  const { auth } = useAuthenticate();

  if (auth.user) {
    return props.children;
  } else {
    return <Navigate to="/landing" />;
  }
};

export default ProtectedRoute;
