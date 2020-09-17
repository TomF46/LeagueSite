import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SeasonList = ({ seasons, onDeleteClick, userIsAuthenticated }) => (
  <div className="my-4">
    <div className="box">
      <h3 className="title is-3">Seasons</h3>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current season</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {seasons.map((season) => {
              return (
                <tr key={season.id}>
                  <td>
                    <Link to={`/league/${season.leagueId}/season/${season.id}`}>
                      {season.name}
                    </Link>
                  </td>
                  <td>{season.active ? "Yes" : "No"}</td>
                  <td>
                    {userIsAuthenticated && (
                      <button
                        className="delete is-large is-pulled-right"
                        onClick={() => onDeleteClick(season)}
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
  </div>
);

SeasonList.propTypes = {
  seasons: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
};

export default SeasonList;
