import React from "react";
import PropTypes from "prop-types";

const SquadDetail = ({ squad }) => (
  <div>
    <p>Name: {squad.name}</p>
    <p>Club: {squad.clubName}</p>
    {squad.leagueName && <p>League: {squad.leagueName}</p>}
  </div>
);

SquadDetail.propTypes = {
  squad: PropTypes.object.isRequired,
};

export default SquadDetail;
