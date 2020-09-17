import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LeagueList = ({ leagues, onDeleteClick, userIsAuthenticated }) => (
  <div className="box">
    <div className="table-container">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Participants</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => {
            return (
              <tr key={league.id}>
                <td>
                  <Link to={`/league/${league.id}`}>{league.name}</Link>
                </td>
                <td>{league.numberOfParticipants}</td>
                <td>
                  {userIsAuthenticated && (
                    <button
                      className="delete is-large is-pulled-right"
                      onClick={() => onDeleteClick(league)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

LeagueList.propTypes = {
  leagues: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
};

export default LeagueList;
