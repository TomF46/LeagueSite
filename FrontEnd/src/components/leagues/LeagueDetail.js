import React from "react";
import PropTypes from "prop-types";

const LeagueDetail = ({ league }) => (
  <div>
    <p>Name: {league.name}</p>
    <p>Number of participants: {league.numberOfParticipants}</p>
  </div>
);

LeagueDetail.propTypes = {
  league: PropTypes.object.isRequired,
};

export default LeagueDetail;
