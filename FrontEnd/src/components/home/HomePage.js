import React from "react";

const HomePage = () => {
  return (
    <div>
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
    </div>
  );
};

export default HomePage;
