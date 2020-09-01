import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PlayerList = ({ players, onDeleteClick }) => (
  <>
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
              <td>
                <button
                  className="button is-danger is-outlined"
                  onClick={() => onDeleteClick(player)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);

PlayerList.propTypes = {
  players: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default PlayerList;
