import React from "react";
import PropTypes from "prop-types";

const PlayerDetail = ({ player, club, squad }) => (
  <div>
    <p>Name: {`${player.firstName} ${player.lastName}`}</p>
    <p>Position: {player.position}</p>
    <p>Club: {club.name}</p>
    <p>Squad: {squad.name}</p>
  </div>
);

PlayerDetail.propTypes = {
  player: PropTypes.object.isRequired,
  club: PropTypes.object.isRequired,
  squad: PropTypes.object.isRequired,
};

export default PlayerDetail;
