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
import LeaguesPage from "./leagues/LeaguesPage";
import LeaguePage from "./leagues/LeaguePage";
import ManageLeaguePage from "./leagues/ManageLeaguePage";
import SeasonPage from "./leagues/seasons/SeasonPage";
import ManageSeasonPage from "./leagues/seasons/ManageSeasonPage";
import FixturePage from "./leagues/seasons/fixtures/FixturePage";
import ManageResultPage from "./leagues/seasons/fixtures/ManageResultPage";
import LeagueTablePage from "./leagues/seasons/LeagueTablePage";

const App = () => (
  <>
    <Navigation />
    <section className="section">
      <div className="container">
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
          <Route path="/leagues" component={LeaguesPage} />
          <Route
            path="/league/:leagueId/season/:seasonId/fixture/:id/result"
            component={ManageResultPage}
          />
          <Route
            path="/league/:leagueId/season/:seasonId/fixture/:id"
            component={FixturePage}
          />
          <Route
            path="/league/:leagueId/season/:id/edit"
            component={ManageSeasonPage}
          />
          <Route
            path="/league/:leagueId/season/:seasonId/table"
            exact
            component={LeagueTablePage}
          />

          <Route path="/league/:leagueId/season/:id" component={SeasonPage} />
          <Route path="/league/:leagueId/season" component={ManageSeasonPage} />
          <Route path="/league/:id/edit" component={ManageLeaguePage} />
          <Route path="/league/:id" component={LeaguePage} />
          <Route path="/league" component={ManageLeaguePage} />
        </Switch>
      </div>
    </section>
    <ToastContainer autoClose={3000} hideProgressBar />
  </>
);

export default App;
