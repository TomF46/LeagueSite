import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PlayerList = ({ players, onDeleteClick, userIsAuthenticated }) => (
  <div className="my-4">
    <div className="box">
      <h3 className="title is-3">Players</h3>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr key={player.id}>
                <td>
                  <Link
                    to={`/club/${player.clubId}/squad/${player.squadId}/player/${player.id}`}
                  >
                    {player.displayName}
                  </Link>
                </td>
                <td>{player.position}</td>
                <td>
                  {userIsAuthenticated && (
                    <button
                      className="delete is-large is-pulled-right"
                      onClick={() => onDeleteClick(player)}
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

PlayerList.propTypes = {
  players: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
};

export default PlayerList;
