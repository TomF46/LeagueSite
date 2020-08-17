import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./common/Navigation";
import HomePage from "./home/homePage";
import ClubsPage from "./clubs/clubsPage";

const App = () => (
  <div className="container-fluid">
    <Navigation />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/clubs" component={ClubsPage} />
    </Switch>
  </div>
);

export default App;
