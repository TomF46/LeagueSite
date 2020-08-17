import React from "react";
import PropTypes from "prop-types";

const ClubDetail = ({ club }) => (
  <div>
    <p>Name: {club.name}</p>
    <p>Location: {club.location}</p>
  </div>
);

ClubDetail.propTypes = {
  club: PropTypes.object.isRequired,
};

export default ClubDetail;
