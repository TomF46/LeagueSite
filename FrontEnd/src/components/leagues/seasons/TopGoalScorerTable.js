import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TopGoalScorerTable = ({ scorers }) => (
  <>
    <div className="box">
      <h3 className="title is-3">Top goal scorers</h3>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Goals scored</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scorers.map((scorer, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/club/${scorer.player.clubId}/squad/${scorer.player.squadId}/player/${scorer.player.id}`}
                    >
                      {scorer.player.displayName}
                    </Link>
                  </td>
                  <td>{scorer.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

TopGoalScorerTable.propTypes = {
  scorers: PropTypes.array.isRequired,
};

export default TopGoalScorerTable;
