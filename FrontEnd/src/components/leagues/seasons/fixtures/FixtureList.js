import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const FixtureList = ({ fixtures }) => (
  <>
    <div className="box">
      <h3 className="title is-3">Fixtures</h3>

      {fixtures.map((fixture, index) => (
        <>
          <div key={index}>
            <h5 className="title is-5">
              <Moment format="DD/MM/YYYY">{fixture.date}</Moment>
            </h5>
          </div>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Home team</th>
                <th>Home score</th>
                <th>Away score</th>
                <th>Away team</th>
                <th>Fixture complete?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fixture.fixtures.map((fixture) => {
                return (
                  <tr key={fixture.id}>
                    <th>{fixture.homeTeamName}</th>
                    <th>{fixture.complete ? fixture.homeScore : "-"}</th>
                    <th>{fixture.complete ? fixture.awayScore : "-"}</th>
                    <th>{fixture.awayTeamName}</th>
                    <th>{fixture.complete ? "Yes" : "No"}</th>
                    <th>
                      <Link to={`${fixture.seasonId}/fixture/${fixture.id}`}>
                        View
                      </Link>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ))}
    </div>
  </>
);

FixtureList.propTypes = {
  fixtures: PropTypes.array.isRequired,
};

export default FixtureList;
