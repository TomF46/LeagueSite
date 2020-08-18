import React from "react";
import PropTypes from "prop-types";

const SquadDetail = ({ squad, club }) => (
  <div>
    <p>Name: {squad.name}</p>
    <p>Club: {club.name}</p>
  </div>
);

SquadDetail.propTypes = {
  squad: PropTypes.object.isRequired,
  club: PropTypes.object.isRequired,
};

export default SquadDetail;
