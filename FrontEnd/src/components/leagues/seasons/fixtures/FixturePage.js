import React, { useEffect, useState } from "react";
import * as FixtureApi from "../../../../api/fixtureApi";
import * as ResultApi from "../../../../api/resultApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner";
import FixtureDetail from "./FixtureDetail";

const FixturePage = ({ id, leagueId, seasonId, history }) => {
  const [fixture, setFixture] = useState(null);

  useEffect(() => {
    if (!fixture) {
      FixtureApi.getFixtureById(id)
        .then((fixtureData) => {
          setFixture(fixtureData);
        })
        .catch((error) => {
          console.log("Error getting the fixture data " + error);
        });
    }
  }, [id, fixture]);

  function removeResult(fixture) {
    ResultApi.deleteResult(fixture)
      .then(() => {
        FixtureApi.getFixtureById(id)
          .then((fixtureData) => {
            setFixture(fixtureData);
          })
          .catch((error) => {
            console.log("Error getting the fixture data " + error);
          });
      })
      .catch((err) => {
        console.log("Unable to remove result " + err);
      });
  }

  return !fixture ? (
    <Spinner />
  ) : (
    <>
      <FixtureDetail fixture={fixture} />
      {fixture.complete ? (
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary remove-result"
          onClick={() => removeResult(fixture)}
        >
          Remove result
        </button>
      ) : (
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary edit-result"
          onClick={() =>
            history.push(
              `/league/${leagueId}/season/${seasonId}/fixture/${id}/result`
            )
          }
        >
          Add result
        </button>
      )}
    </>
  );
};

FixturePage.propTypes = {
  id: PropTypes.any.isRequired,
  leagueId: PropTypes.any.isRequired,
  seasonId: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const seasonId = ownProps.match.params.seasonId;
  const leagueId = ownProps.match.params.leagueId;
  return {
    id,
    leagueId,
    seasonId,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FixturePage);
