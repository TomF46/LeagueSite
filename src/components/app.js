import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./common/Navigation";
import HomePage from "./home/HomePage";
import ClubsPage from "./clubs/ClubsPage";
import ManageClubPage from "./clubs/ManageClubPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClubPage from "./clubs/ClubPage";
import ManageSquadPage from "./clubs/squads/ManageSquadPage";
import SquadPage from "./clubs/squads/SquadPage";

const App = () => (
  <div className="container-fluid">
    <Navigation />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/clubs" component={ClubsPage} />
      <Route
        path="/club/:clubId/squad/:squadId/edit"
        component={ManageSquadPage}
      />
      <Route path="/club/:clubId/squad/:squadId" component={SquadPage} />
      <Route path="/club/:clubId/squad/" component={ManageSquadPage} />
      <Route path="/club/:id/edit" component={ManageClubPage} />
      <Route path="/club/:id" component={ClubPage} />
      <Route path="/club" component={ManageClubPage} />
    </Switch>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
