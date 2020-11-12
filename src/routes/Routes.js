import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Homepage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import CvPage from "../pages/CvPage";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <ProtectedRoute path="/coverletter" exact component={CvPage} />
      </Switch>
    </div>
  );
};

export default Routes;
