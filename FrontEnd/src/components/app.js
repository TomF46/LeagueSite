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
import ManagePlayerPage from "./clubs/squads/players/ManagePlayerPage";
import PlayerPage from "./clubs/squads/players/PlayerPage";
import TransfersPage from "./transfers/TransfersPage";
import ManageTransferPage from "./transfers/ManageTransferPage";

const App = () => (
  <div className="container-fluid">
    <Navigation />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/clubs" component={ClubsPage} />
      <Route
        path="/club/:clubId/squad/:squadId/player/:playerId/edit"
        component={ManagePlayerPage}
      />
      <Route
        path="/club/:clubId/squad/:squadId/player/:playerId"
        component={PlayerPage}
      />
      <Route
        path="/club/:clubId/squad/:squadId/player/"
        component={ManagePlayerPage}
      />
      <Route
        path="/club/:clubId/squad/:squadId/edit"
        component={ManageSquadPage}
      />
      <Route path="/club/:clubId/squad/:squadId" component={SquadPage} />
      <Route path="/club/:clubId/squad/" component={ManageSquadPage} />
      <Route path="/club/:id/edit" component={ManageClubPage} />
      <Route path="/club/:id" component={ClubPage} />
      <Route path="/club" component={ManageClubPage} />
      <Route path="/transfers" component={TransfersPage} />
      <Route path="/transfer" component={ManageTransferPage} />
    </Switch>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
