import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SquadList = ({ squads, onDeleteClick }) => (
  <div className="my-4">
    <h3 className="title is-3">Squads</h3>
    <div className="box">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>League</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {squads.map((squad) => {
            return (
              <tr key={squad.id}>
                <td>
                  <Link to={`/club/${squad.clubId}/squad/${squad.id}`}>
                    {squad.name}
                  </Link>
                </td>
                <td>{squad.leagueName}</td>
                <td>
                  <button
                    className="delete is-large is-pulled-right"
                    onClick={() => onDeleteClick(squad)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

SquadList.propTypes = {
  squads: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default SquadList;
