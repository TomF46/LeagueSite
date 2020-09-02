import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SeasonList = ({ seasons }) => (
  <div className="my-4">
    <h3 className="title is-3">Seasons</h3>
    <div className="box">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Current season</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

SeasonList.propTypes = {
  seasons: PropTypes.array.isRequired,
};

export default SeasonList;
