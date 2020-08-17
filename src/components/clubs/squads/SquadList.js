import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SquadList = ({ squads, onDeleteClick }) => (
  <>
    <h3>Squads</h3>
    <table className="table">
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
                <Link
                  to={"/club/" + squad.clubId + "/squad/" + squad.id + "/edit"}
                >
                  {squad.name}
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
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
