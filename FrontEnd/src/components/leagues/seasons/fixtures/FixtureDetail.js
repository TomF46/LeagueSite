import React from "react";
import PropTypes from "prop-types";

const FixtureDetail = ({ fixture }) => (
  <div>
    <h2>
      {fixture.homeTeamName} - {fixture.awayTeamName}
    </h2>
    {fixture.complete ? (
      <>
        <p>
          Result: {fixture.homeScore} - {fixture.awayScore}
        </p>
        <p>{`${fixture.homeTeamName} scorers`}</p>
        <ul>
          {fixture.homeGoalScorers.map((goal, index) => {
            return <li key={index}>{goal.playerDisplayName}</li>;
          })}
        </ul>
        <p>{`${fixture.awayTeamName} scorers`}</p>
        <ul>
          {fixture.awayGoalScorers.map((goal, index) => {
            return <li key={index}>{goal.playerDisplayName}</li>;
          })}
        </ul>
      </>
    ) : (
      <p>Fixture not yet complete</p>
    )}
  </div>
);

FixtureDetail.propTypes = {
  fixture: PropTypes.object.isRequired,
};

export default FixtureDetail;
