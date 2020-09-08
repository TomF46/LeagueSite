import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SquadDetail = ({ squad }) => (
  <div>
    <p>Name: {squad.name}</p>
    <p>Club: {squad.clubName}</p>
    {squad.leagueName && (
      <p>
        League: <Link to={`/league/${squad.leagueId}`}>{squad.leagueName}</Link>
      </p>
    )}
  </div>
);

SquadDetail.propTypes = {
  squad: PropTypes.object.isRequired,
};

export default SquadDetail;
