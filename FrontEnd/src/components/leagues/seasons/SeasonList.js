import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SeasonList = ({ seasons }) => (
  <>
    <h3>Seasons</h3>
    <table className="table">
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
  </>
);

SeasonList.propTypes = {
  seasons: PropTypes.array.isRequired,
};

export default SeasonList;
