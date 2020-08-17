import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./common/Navigation";
import HomePage from "./home/homePage";
import ClubsPage from "./clubs/clubsPage";
import ManageClubPage from "./clubs/ManageClubPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <div className="container-fluid">
    <Navigation />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/clubs" component={ClubsPage} />
      <Route path="/club/:id" component={ManageClubPage} />
      <Route path="/club" component={ManageClubPage} />
    </Switch>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
