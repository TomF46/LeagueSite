import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SquadList = ({ squads, onDeleteClick }) => (
  <>
    <h3 className="title is-3">Squads</h3>
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
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
              <td>
                <button
                  className="button is-danger is-outlined"
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
  </>
);

SquadList.propTypes = {
  squads: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default SquadList;
