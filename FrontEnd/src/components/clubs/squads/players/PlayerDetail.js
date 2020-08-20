import React from "react";
import PropTypes from "prop-types";

const PlayerDetail = ({ player }) => (
  <div>
    <p>Name: {player.displayName}</p>
    <p>Position: {player.position}</p>
    <p>Club: {player.clubName}</p>
    <p>Squad: {player.squadName}</p>
  </div>
);

PlayerDetail.propTypes = {
  player: PropTypes.object.isRequired,
};

export default PlayerDetail;
