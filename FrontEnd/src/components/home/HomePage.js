import React from "react";
import PropTypes from "prop-types";

const HomePage = ({ history }) => {
  return (
    <div className="home-page">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Welcome to the LeagueApp website</h1>
            <h2 className="subtitle">
              All the tools you need to administer your local league
            </h2>
          </div>
        </div>
      </section>
      <section>
        <div className="box">
          <div>
            <h3 className="title is-3">Features</h3>
            <p>
              <span className="has-text-weight-semibold">Team management:</span>{" "}
              View and manage clubs, squads and players
            </p>
            <p>
              <span className="has-text-weight-semibold">
                League management:
              </span>{" "}
              View and manage leagues season by season, with fixture and result
              management.
            </p>
            <p>
              <span className="has-text-weight-semibold">
                League tables and stats:
              </span>{" "}
              View and the important information about your league such as
              league tables and stats
            </p>
            <p>
              <span className="has-text-weight-semibold">
                Transfer management:
              </span>{" "}
              View and manage transfers of players between clubs
            </p>
          </div>
        </div>
      </section>
      <div className="columns mt-2 button-box-row">
        <div className="column">
          <div
            className="box button-box"
            onClick={() => history.push(`/leagues`)}
          >
            <h3 className="title is-3 pb-4">Leagues</h3>
            <h4 className="subtitle">
              View all the leagues, seasons, fixtures, league tables and stats.
            </h4>
          </div>
        </div>
        <div className="column">
          <div
            className="box button-box"
            onClick={() => history.push(`/clubs`)}
          >
            <h3 className="title is-3 pb-4">Clubs</h3>
            <h4 className="subtitle">
              View all the clubs, squads and players.
            </h4>
          </div>
        </div>
        <div className="column">
          <div
            className="box button-box"
            onClick={() => history.push(`/transfers`)}
          >
            <h3 className="title is-3 pb-4">Transfers</h3>
            <h4 className="subtitle">View all the latest transfers.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
