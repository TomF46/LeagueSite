import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const FixtureDetail = ({ fixture }) => (
  <>
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          {fixture.complete ? (
            <h1 className="title has-text-centered">
              {fixture.homeTeamName} {fixture.homeScore} - {fixture.awayScore}{" "}
              {fixture.awayTeamName}
            </h1>
          ) : (
            <h1 className="title has-text-centered">
              {fixture.homeTeamName} - {fixture.awayTeamName}
            </h1>
          )}
          <p className="has-text-centered">
            <Moment format="DD/MM/YYYY">{fixture.date}</Moment>
          </p>
        </div>
      </div>
    </section>
    <div className="box">
      {fixture.complete ? (
        <div>
          <div className="columns">
            <div className="column">
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th className="has-text-right">{`${fixture.homeTeamName} ${fixture.homeScore}`}</th>
                  </tr>
                </thead>
                <tbody>
                  {fixture.homeGoalScorers.map((goal, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: "right" }}>
                          {goal.playerDisplayName}
                        </td>
                      </tr>
                    );
                  })}
                  {[
                    ...Array(
                      fixture.homeScore - fixture.homeGoalScorers.length
                    ),
                  ].map((e, i) => (
                    <tr key={i}>
                      <td style={{ textAlign: "right" }}>Unknown player</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="column">
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th className="has-text-left">{`${fixture.awayScore} ${fixture.awayTeamName}`}</th>
                  </tr>
                </thead>
                <tbody>
                  {fixture.awayGoalScorers.map((goal, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: "left" }}>
                          {goal.playerDisplayName}
                        </td>
                      </tr>
                    );
                  })}
                  {[
                    ...Array(
                      fixture.awayScore - fixture.awayGoalScorers.length
                    ),
                  ].map((e, i) => (
                    <tr key={i}>
                      <td style={{ textAlign: "left" }}>Unknown player</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h5 className="has-text-centered title is-5">
          Fixture not yet complete
        </h5>
      )}
    </div>
  </>
);

FixtureDetail.propTypes = {
  fixture: PropTypes.object.isRequired,
};

export default FixtureDetail;
