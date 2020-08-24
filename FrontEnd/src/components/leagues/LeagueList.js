import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LeagueList = ({ leagues, onDeleteClick }) => (
  <table className="table">
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
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(league)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

LeagueList.propTypes = {
  leagues: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default LeagueList;
