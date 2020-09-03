import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ClubList = ({ clubs, onDeleteClick, userIsAuthenticated }) => (
  <div className="box">
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {clubs.map((club) => {
          return (
            <tr key={club.id}>
              <td>
                <Link to={`/club/${club.id}`}>{club.name}</Link>
              </td>
              <td>{club.location}</td>
              <td>
                {userIsAuthenticated && (
                  <button
                    className="delete is-large is-pulled-right"
                    onClick={() => onDeleteClick(club)}
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
);

ClubList.propTypes = {
  clubs: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
};

export default ClubList;
