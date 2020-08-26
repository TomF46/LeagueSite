import React from "react";
import PropTypes from "prop-types";

const FixtureDetail = ({ fixture }) => (
  <div>
    <h2>
      {fixture.homeTeamName} - {fixture.awayTeamName}
    </h2>
    {fixture.complete ? (
      <p>
        Result: {fixture.homeScore} - {fixture.awayScore}
      </p>
    ) : (
      <p>Fixture not yet complete</p>
    )}
  </div>
);

FixtureDetail.propTypes = {
  fixture: PropTypes.object.isRequired,
};

export default FixtureDetail;
