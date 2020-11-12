import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const user = localStorage.getItem("user");
  const [isAuthenticated, setIsAuthenticated] = useState(user !== null);
  if (isAuthenticated === true) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
