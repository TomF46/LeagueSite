import React from "react";
import PropTypes from "prop-types";

const LeagueTable = ({ leagueTable }) => (
  <>
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{leagueTable.seasonDisplayName}</h1>
        </div>
      </div>
    </section>
    <div className="box">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>Goals for</th>
            <th>Goals against</th>
            <th>Goals difference</th>
            <th>Points</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leagueTable.rows.map((row, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{row.teamDisplayName}</th>
                <th>{row.gamesPlayed}</th>
                <th>{row.gamesWon}</th>
                <th>{row.gamesDrawn}</th>
                <th>{row.gamesLost}</th>
                <th>{row.goalsScored}</th>
                <th>{row.goalsConceded}</th>
                <th>{row.goalDifference}</th>
                <th>{row.points}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

LeagueTable.propTypes = {
  leagueTable: PropTypes.object.isRequired,
};

export default LeagueTable;
